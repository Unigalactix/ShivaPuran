/* Site-wide JS — kept tiny, no dependencies. */
(function () {
  'use strict';

  // 1) Mobile nav toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav    = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // close on link click (mobile)
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 1100px)').matches) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2) Year stamp in footer
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());

  // 3) Stat bars in cards — read data-value and animate width
  const bars = document.querySelectorAll('.card__bar > i[data-value]');
  bars.forEach((b) => {
    const v = Math.max(0, Math.min(100, Number(b.dataset.value) || 0));
    requestAnimationFrame(() => { b.style.width = v + '%'; });
  });
})();
