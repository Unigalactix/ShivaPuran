/* ============================================================
   THE READING BOOK — assets/js/book.js
   A JINX-style page-turning reader: hidden-measure pagination,
   3D leaf flips, chapter select, text size, full screen, swipe.
   Data: assets/js/book-data.js (window.SHIVA_BOOK).
   Plates: assets/js/madhubani-scenes.js + assets/js/portraits.js.
   ============================================================ */
(function () {
  'use strict';

  var BOOK = window.SHIVA_BOOK;
  var $ = function (id) { return document.getElementById(id); };
  if (!BOOK || !BOOK.chapters || !BOOK.chapters.length) return;

  var STORAGE_KEY = 'shiva-purana-book-v1';

  function node(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function pageForAnchor(pages, anchor) {
    var result = 0;
    pages.forEach(function (page, index) {
      var start = page.segments[0];
      if (start && (start.block < anchor.block || (start.block === anchor.block && start.offset <= anchor.offset))) result = index;
    });
    return result;
  }

  /* ---------- plates ---------- */
  function plateHTML(chapter) {
    if (!chapter.plate) return '';
    try {
      if (chapter.plate.scene && window.ShivaScenes) {
        var scene = null;
        window.ShivaScenes.scenes.forEach(function (s) { if (s.kind === chapter.plate.scene) scene = s; });
        if (scene) return '<div class="book-plate book-plate--scene">' + window.ShivaScenes.svgFor(scene) + '</div>';
      }
      if (chapter.plate.portrait && window.ShivaPortraits) {
        var fig = null;
        window.ShivaPortraits.figures.forEach(function (f) { if (f.id === chapter.plate.portrait) fig = f; });
        if (fig) return '<div class="book-plate book-plate--portrait">' + window.ShivaPortraits.medallion(fig) + '</div>';
      }
    } catch (e) { /* plates are ornament — never break the book */ }
    return '';
  }

  function Reader() {
    this.reader = $('reader');
    this.viewport = $('reader-viewport');
    this.book = $('book');
    this.surface = $('book-page');
    this.measure = $('book-measure');
    this.chapterIndex = 0;
    this.pageIndex = -1;               // -1 = cover
    this.pages = [];
    this.size = 18;
    this.ready = false;
    this.turning = false;
    this.resumePage = 0;
    this.geometry = '';
    this.pendingResize = false;
    this.reflowAnchor = null;
    this.fullPage = false;
    this.ownsFullscreen = false;
    this.fullscreenBusy = false;
    this.viewNotice = '';

    var self = this;

    /* chapter select */
    var select = $('reader-chapter');
    var coverOpt = node('option', '', 'Cover'); coverOpt.value = '-1';
    select.appendChild(coverOpt);
    BOOK.chapters.forEach(function (chapter, index) {
      var opt = node('option', '', chapter.number + ' · ' + chapter.title);
      opt.value = String(index);
      select.appendChild(opt);
    });
    select.addEventListener('change', function () {
      var index = Number(select.value);
      if (index === -1) self.goToCover();
      else self.changeChapter(index);
    });

    $('next-page').addEventListener('click', function () { self.move(1); });
    $('previous-page').addEventListener('click', function () { self.move(-1); });
    $('book-cover').addEventListener('click', function () { self.goToCover(); });
    $('smaller-text').addEventListener('click', function () { self.setSize(self.size - 1); });
    $('larger-text').addEventListener('click', function () { self.setSize(self.size + 1); });
    $('book-fullscreen').addEventListener('click', function () { self.toggleFullscreen(); });
    document.addEventListener('fullscreenchange', function () {
      if (self.ownsFullscreen && document.fullscreenElement !== self.viewport) {
        self.ownsFullscreen = false;
        self.setFullPage(false);
      }
    });

    /* keyboard — arrows turn pages; Esc leaves full screen, then the book */
    document.addEventListener('keydown', function (event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      var target = event.target;
      var inField = target && target.closest && target.closest('select, input, textarea');
      if (inField) return;
      if (event.key === 'Escape') { self.escape(); return; }
      if ((target && target.closest && target.closest('#reader')) || target === document.body) {
        if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); self.move(1); }
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); self.move(-1); }
      }
    });

    /* click the page's right / left side to turn */
    this.book.addEventListener('click', function (event) {
      if (self.pageIndex < 0 || self.turning || !self.ready) return;
      if (event.target.closest('a, button, select')) return;
      if (window.getSelection && String(window.getSelection())) return;
      var rect = self.book.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      if (x > 0.62) self.move(1);
      else if (x < 0.38) self.move(-1);
    });

    /* swipe */
    var touch = null;
    this.book.addEventListener('touchstart', function (event) {
      touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    this.book.addEventListener('touchend', function (event) {
      if (!touch || !event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - touch.x;
      var dy = event.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) self.move(dx < 0 ? 1 : -1);
    }, { passive: true });
    this.book.addEventListener('touchcancel', function () { touch = null; }, { passive: true });

    /* repaginate on resize */
    if ('ResizeObserver' in window) {
      this.observer = new ResizeObserver(function () {
        if (!self.ready) return;
        var geometry = self.book.clientWidth + ':' + self.book.clientHeight;
        if (geometry === self.geometry) return;
        if (self.turning) { self.pendingResize = true; return; }
        self.repaginate();
      });
      this.observer.observe(this.book);
    }

    this.init();
  }

  Reader.prototype.init = function () {
    /* deep link: book.html#chapter-<id> opens inside that chapter */
    var startChapter = 0, startInside = false;
    var m = /^#chapter-([a-z0-9-]+)$/.exec(window.location.hash || '');
    if (m) {
      for (var i = 0; i < BOOK.chapters.length; i++) {
        if (BOOK.chapters[i].id === m[1]) { startChapter = i; startInside = true; break; }
      }
    }
    this.chapterIndex = startChapter;
    try {
      this.paginate();
      var ratio = 0;
      if (!startInside) {
        var saved = null;
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { saved = null; }
        if (saved && saved.chapter === BOOK.chapters[this.chapterIndex].id) ratio = saved.ratio || 0;
        /* if the reader left off in another chapter, resume there */
        if (saved && saved.chapter !== BOOK.chapters[this.chapterIndex].id) {
          for (var j = 0; j < BOOK.chapters.length; j++) {
            if (BOOK.chapters[j].id === saved.chapter) {
              this.chapterIndex = j;
              this.paginate();
              ratio = saved.ratio || 0;
              break;
            }
          }
        }
      }
      this.resumePage = Math.min(this.pages.length - 1, Math.round(ratio * Math.max(0, this.pages.length - 1)));
      this.pageIndex = startInside ? 0 : -1;
      this.ready = true;
      this.render();
    } catch (error) {
      this.fail(error);
    }
    var self = this;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { self.repaginate(); });
    }
  };

  Reader.prototype.fail = function (error) {
    console.error('Could not prepare the book:', error);
    this.ready = false;
    var message = node('div', 'error-message', 'The book could not be opened. ' + error.message);
    var button = node('button', 'retry-button', 'Try again');
    button.type = 'button';
    button.addEventListener('click', function () { window.location.reload(); });
    message.appendChild(button);
    $('reader-state').replaceChildren(message);
    this.updateControls();
  };

  /* ---------- pagination (hidden measure, word-boundary search) ---------- */
  Reader.prototype.makeText = function (page, chapter) {
    var content = node('div', 'book-page-text');
    if (page.heading) {
      content.appendChild(node('h3', '', page.heading));
      if (page.subheading) content.appendChild(node('p', 'book-chapter-subtitle', page.subheading));
      if (chapter.deva) {
        var deva = node('p', 'book-chapter-deva', chapter.deva);
        deva.setAttribute('lang', 'sa');
        content.appendChild(deva);
      }
      var plate = plateHTML(chapter);
      if (plate) {
        var holder = node('div', '');
        holder.innerHTML = plate;
        content.appendChild(holder.firstChild);
      }
    }
    page.segments.forEach(function (segment) {
      var part = segment.kind === 'break' ? node('hr') : node('p', segment.kind === 'context' ? 'source-context' : '', segment.text);
      part.dataset.block = String(segment.block);
      part.dataset.offset = String(segment.offset);
      content.appendChild(part);
    });
    return content;
  };

  Reader.prototype.paginate = function () {
    var chapter = BOOK.chapters[this.chapterIndex];
    var pages = [];
    var page = { heading: chapter.title, subheading: chapter.subtitle, segments: [] };
    var content = this.makeText(page, chapter);
    this.measure.replaceChildren(content);
    var self = this;
    function fits() { return content.scrollHeight <= content.clientHeight + 1; }
    if (content.clientHeight < 35) throw new Error('There is not enough room for a book page. Enlarge the window or rotate your device.');
    function finish() {
      if (page.segments.length || page.heading) pages.push(page);
      page = { heading: '', segments: [] };
      content = self.makeText(page, chapter);
      self.measure.replaceChildren(content);
    }
    var segmenter = ('Intl' in window && Intl.Segmenter) ? new Intl.Segmenter('en', { granularity: 'word' }) : null;
    chapter.blocks.forEach(function (block, blockIndex) {
      if (block.kind === 'break') {
        var rule = node('hr');
        content.appendChild(rule);
        if (!fits()) { rule.remove(); finish(); content.appendChild(rule); }
        page.segments.push({ kind: block.kind, text: block.text, block: blockIndex, offset: 0 });
        return;
      }
      var offset = 0;
      while (offset < block.text.length) {
        var rest = block.text.slice(offset);
        var paragraph = node('p', block.kind === 'context' ? 'source-context' : '', rest);
        content.appendChild(paragraph);
        if (fits()) {
          page.segments.push({ kind: block.kind, text: rest, block: blockIndex, offset: offset });
          break;
        }
        var ends;
        if (segmenter) {
          ends = Array.from(segmenter.segment(rest)).map(function (part) { return part.index + part.segment.length; });
        } else {
          ends = [];
          var re = /\s+/g, mm;
          while ((mm = re.exec(rest))) ends.push(mm.index + mm[0].length);
          ends.push(rest.length);
        }
        var low = 0, high = ends.length;
        while (low < high) {
          var middle = Math.ceil((low + high) / 2);
          paragraph.textContent = rest.slice(0, ends[middle - 1]);
          if (fits()) low = middle; else high = middle - 1;
        }
        if (!low) {
          paragraph.remove();
          if (!page.segments.length && !page.heading) throw new Error('Text cannot fit on this page. Reduce the text size or enlarge the window.');
          finish();
          continue;
        }
        var length = ends[low - 1];
        var text = rest.slice(0, length);
        paragraph.textContent = text;
        page.segments.push({ kind: block.kind, text: text, block: blockIndex, offset: offset });
        offset += length;
        finish();
      }
    });
    if (page.segments.length || page.heading) pages.push(page);
    this.pages = pages;
    this.geometry = this.book.clientWidth + ':' + this.book.clientHeight;
    this.measure.replaceChildren();
  };

  Reader.prototype.anchor = function () {
    if (this.reflowAnchor) return this.reflowAnchor;
    var idx = this.pageIndex < 0 ? (this.resumePage || 0) : this.pageIndex;
    var start = this.pages[idx] && this.pages[idx].segments[0];
    return start ? { block: start.block, offset: start.offset } : { block: 0, offset: 0 };
  };

  Reader.prototype.repaginate = function () {
    if (!this.ready) return;
    var cover = this.pageIndex < 0;
    var anchor = this.anchor();
    try {
      this.paginate();
      var target = pageForAnchor(this.pages, anchor);
      if (cover) this.resumePage = target;
      this.pageIndex = cover ? -1 : target;
      this.reflowAnchor = anchor;
      this.render();
    } catch (error) { this.fail(error); }
  };

  Reader.prototype.setSize = function (size) {
    if (!this.ready || this.turning) return;
    this.size = Math.max(15, Math.min(25, size));
    this.book.style.setProperty('--book-size', this.size + 'px');
    this.repaginate();
  };

  /* ---------- drawing ---------- */
  Reader.prototype.drawCover = function (surface) {
    surface.classList.add('cover-page');
    var chapterCount = BOOK.chapters.length;
    var art = '';
    try {
      if (window.ShivaScenes) {
        var scene = null;
        window.ShivaScenes.scenes.forEach(function (s) { if (s.kind === 'nataraja') scene = s; });
        if (scene) art = window.ShivaScenes.svgFor(scene);
      }
    } catch (e) { art = ''; }
    var button = node('button', 'book-cover-open');
    button.type = 'button';
    button.setAttribute('aria-label', 'Open book');
    button.disabled = !this.ready || this.turning;
    button.innerHTML =
      '<div class="mb-cover">' +
        '<div class="mb-cover__band" aria-hidden="true"></div>' +
        '<p class="mb-cover__deva" lang="sa">शिवपुराण</p>' +
        '<h3 class="mb-cover__title">Śiva Purāṇa</h3>' +
        '<p class="mb-cover__sub">The Book of Kathās</p>' +
        '<p class="mb-cover__count">' + chapterCount + ' chapters · from the Codex</p>' +
        (art ? '<div class="mb-cover__art" aria-hidden="true">' + art + '</div>' : '') +
        '<p class="mb-cover__flame" aria-hidden="true">✦</p>' +
        '<p class="mb-cover__hint">Open book →</p>' +
        '<div class="mb-cover__band" aria-hidden="true"></div>' +
      '</div>';
    var self = this;
    button.addEventListener('click', function () { self.move(1); });
    surface.replaceChildren(button);
  };

  Reader.prototype.drawPage = function (surface, index) {
    if (index < 0) { this.drawCover(surface); return; }
    surface.classList.remove('cover-page');
    var chapter = BOOK.chapters[this.chapterIndex];
    var running = node('div', 'book-running-title', BOOK.title + ' / ' + chapter.title);
    var folio = node('div', 'book-folio');
    folio.append(node('span', '', 'Chapter ' + chapter.number), node('span', '', (index + 1) + ' / ' + this.pages.length));
    surface.replaceChildren(running, this.makeText(this.pages[index], chapter), folio);
  };

  Reader.prototype.render = function () {
    this.drawPage(this.surface, this.pageIndex);
    $('reader-chapter').value = String(this.pageIndex < 0 ? -1 : this.chapterIndex);
    var chapter = BOOK.chapters[this.chapterIndex];
    $('reader-number').textContent = this.pageIndex < 0 ? 'The book / ŚIVA PURĀṆA' : chapter.number + ' / ' + chapter.title;
    var source = $('chapter-source');
    if (chapter.source) { source.hidden = false; source.href = chapter.source; }
    else source.hidden = true;
    if (this.pageIndex >= 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          chapter: chapter.id,
          ratio: this.pages.length > 1 ? this.pageIndex / (this.pages.length - 1) : 0
        }));
      } catch (e) { /* private mode — reading simply lasts the session */ }
    }
    this.updateControls();
  };

  Reader.prototype.syncViewControls = function () {
    $('book-fullscreen-label').textContent = this.fullPage ? 'Exit full screen' : 'Full screen';
    var btn = $('book-fullscreen');
    btn.setAttribute('aria-label', this.fullPage ? 'Exit full screen' : 'Full screen');
    btn.setAttribute('aria-pressed', String(this.fullPage));
    btn.disabled = this.fullscreenBusy || this.turning;
    var status = $('book-view-status');
    status.textContent = this.viewNotice || '';
    status.hidden = !this.viewNotice;
  };

  Reader.prototype.updateControls = function () {
    this.syncViewControls();
    var busy = !this.ready || this.turning;
    var last = this.chapterIndex === BOOK.chapters.length - 1 && this.pageIndex === this.pages.length - 1;
    $('previous-page').disabled = busy || this.pageIndex < 0;
    $('next-page').disabled = busy || last;
    $('previous-page').textContent = '← Previous page';
    $('next-page').textContent = this.pageIndex < 0 ? 'Open book →' : (last ? 'End of book' : 'Next page →');
    $('reader-position').textContent = this.pageIndex < 0 ? 'Cover' : (this.pages.length ? 'Page ' + (this.pageIndex + 1) + ' of ' + this.pages.length : '');
    $('book-cover').disabled = busy || this.pageIndex < 0;
    $('reader-chapter').disabled = busy;
    $('smaller-text').disabled = busy || this.size <= 15;
    $('larger-text').disabled = busy || this.size >= 25;
    var cover = this.surface.querySelector('.book-cover-open');
    if (cover) cover.disabled = busy;
  };

  /* ---------- the leaf turn ---------- */
  Reader.prototype.turnTo = function (target, direction, outgoing) {
    if (this.turning || !this.ready) return Promise.resolve();
    var self = this;
    var leaf = node('div', 'book-leaf');
    leaf.setAttribute('aria-hidden', 'true');
    leaf.inert = true;
    var front = node('div', 'book-page');
    if (direction > 0) {
      var old = outgoing || this.surface;
      front.className = old.className;
      front.replaceChildren.apply(front, Array.from(old.childNodes).map(function (child) { return child.cloneNode(true); }));
      this.drawPage(this.surface, target);
    } else {
      this.drawPage(front, target);
    }
    leaf.append(front, node('div', 'book-leaf-back'));
    this.book.appendChild(leaf);
    this.turning = true;
    this.book.dataset.turning = direction > 0 ? 'forward' : 'backward';
    this.updateControls();
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var frames = reduced
      ? [{ opacity: direction > 0 ? 1 : 0 }, { opacity: direction > 0 ? 0 : 1 }]
      : direction > 0
        ? [{ transform: 'rotateY(0deg)', opacity: 1, offset: 0 },
           { transform: 'rotateY(-95deg)', opacity: 1, offset: 0.6 },
           { transform: 'rotateY(-175deg)', opacity: 0, offset: 1 }]
        : [{ transform: 'rotateY(-175deg)', opacity: 0, offset: 0 },
           { transform: 'rotateY(-95deg)', opacity: 1, offset: 0.4 },
           { transform: 'rotateY(0deg)', opacity: 1, offset: 1 }];
    this.animation = leaf.animate(frames, { duration: reduced ? 120 : 720, easing: 'cubic-bezier(.25,.65,.3,1)', fill: 'forwards' });
    return this.animation.finished.then(function () {
      self.pageIndex = target;
      self.reflowAnchor = null;
      self.render();
      self.book.focus({ preventScroll: true });
    }).catch(function (error) {
      if (!(error instanceof DOMException) || error.name !== 'AbortError') throw error;
    }).finally(function () {
      leaf.remove();
      self.turning = false;
      delete self.book.dataset.turning;
      self.updateControls();
      if (self.pendingResize) { self.pendingResize = false; self.repaginate(); }
    });
  };

  Reader.prototype.changeChapter = function (index, opts) {
    opts = opts || {};
    if (!this.ready || this.turning || index < 0 || index >= BOOK.chapters.length) return;
    var outgoing = this.surface.cloneNode(true);
    this.chapterIndex = index;
    try {
      this.paginate();
      this.turnTo(opts.end ? this.pages.length - 1 : 0, opts.direction || 1, outgoing);
    } catch (error) { this.fail(error); }
  };

  Reader.prototype.move = function (direction) {
    if (!this.ready || this.turning) return;
    if (this.pageIndex < 0) {
      if (direction > 0) this.turnTo(Math.min(this.resumePage || 0, this.pages.length - 1), 1);
      return;
    }
    var target = this.pageIndex + direction;
    if (target < 0) {
      if (this.chapterIndex > 0) this.changeChapter(this.chapterIndex - 1, { end: true, direction: -1 });
      else this.goToCover();
    } else if (target >= this.pages.length) {
      if (this.chapterIndex < BOOK.chapters.length - 1) this.changeChapter(this.chapterIndex + 1);
    } else {
      this.turnTo(target, direction);
    }
  };

  Reader.prototype.goToCover = function () {
    if (!this.ready || this.turning || this.pageIndex < 0) return;
    this.resumePage = this.pageIndex;
    this.turnTo(-1, -1);
  };

  /* ---------- full screen (JINX pattern: API + full-page fallback) ---------- */
  Reader.prototype.setFullPage = function (value) {
    this.fullPage = value;
    this.reader.classList.toggle('reader-full-page', value);
    if (!value) this.viewNotice = '';
    this.syncViewControls();
    if (this.turning) this.pendingResize = true;
    else this.repaginate();
  };

  Reader.prototype.toggleFullscreen = function () {
    if (this.fullscreenBusy || this.turning) return Promise.resolve();
    if (this.fullPage) return this.exitFullscreen();
    var self = this;
    this.fullscreenBusy = true;
    this.viewNotice = '';
    this.setFullPage(true);
    var done = function () { self.fullscreenBusy = false; self.syncViewControls(); };
    try {
      if (document.fullscreenElement) { done(); return Promise.resolve(); }
      if (!document.fullscreenEnabled || !this.viewport.requestFullscreen) {
        this.viewNotice = 'Full-page view is active. Browser full screen is unavailable here.';
        done();
        return Promise.resolve();
      }
      return this.viewport.requestFullscreen().then(function () {
        self.ownsFullscreen = true;
      }).catch(function (error) {
        console.warn('Browser full screen was unavailable; keeping the expanded reader:', error);
        self.viewNotice = 'Full-page view is active. Browser full screen is unavailable here.';
      }).then(done);
    } catch (error) {
      this.viewNotice = 'Full-page view is active. Browser full screen is unavailable here.';
      done();
      return Promise.resolve();
    }
  };

  Reader.prototype.exitFullscreen = function () {
    if (this.fullscreenBusy) return Promise.resolve(false);
    var self = this;
    this.fullscreenBusy = true;
    this.syncViewControls();
    var finish = function (ok) { self.fullscreenBusy = false; self.syncViewControls(); return ok; };
    try {
      var p = (this.ownsFullscreen && document.fullscreenElement === this.viewport)
        ? document.exitFullscreen() : Promise.resolve();
      return p.then(function () {
        self.ownsFullscreen = false;
        self.setFullPage(false);
        return finish(true);
      }).catch(function (error) {
        console.error('Could not exit full screen:', error);
        self.viewNotice = 'Could not exit full screen. Try again or use your browser\u2019s Escape key.';
        return finish(false);
      });
    } catch (error) {
      return Promise.resolve(finish(false));
    }
  };

  Reader.prototype.escape = function () {
    if (this.fullscreenBusy) return;
    if (this.fullPage) this.exitFullscreen();
    else window.location.href = 'index.html';
  };

  window.ShivaBookReader = new Reader();
})();
