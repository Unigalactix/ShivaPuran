/* =====================================================================
   PANTHEON — filter chips + stat-bar animation on view
   ===================================================================== */
(function () {
  'use strict';

  // ---- 1. Filter by data-tier / data-tribe ----
  const bar   = document.querySelector('[data-filterbar]');
  const cards = Array.from(document.querySelectorAll('.codex-grid .ccard'));
  const empty = document.querySelector('[data-empty]');

  if (bar && cards.length) {
    bar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const filter = chip.dataset.filter; // 'all' | tier | tribe value
      const key    = chip.dataset.filterKey || 'tier';   // 'tier' | 'tribe' | 'all'

      let visibleCount = 0;
      cards.forEach((card) => {
        let match = false;
        if (filter === 'all') {
          match = true;
        } else if (key === 'tier') {
          match = card.dataset.tier === filter;
        } else if (key === 'tribe') {
          // tribes is space-separated list, like "kailasa shakti"
          const tribes = (card.dataset.tribe || '').split(/\s+/);
          match = tribes.includes(filter);
        }
        card.hidden = !match;
        if (match) visibleCount++;
      });

      if (empty) empty.classList.toggle('is-visible', visibleCount === 0);
    });
  }

  // ---- 2. Animate stat bars on first scroll into view ----
  const bars = document.querySelectorAll('.ccard__bar > i[data-value]');
  if ('IntersectionObserver' in window && bars.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const v = Math.max(0, Math.min(100, Number(el.dataset.value) || 0));
          el.style.width = v + '%';
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    bars.forEach(b => io.observe(b));
  } else {
    // fallback — set immediately
    bars.forEach((b) => {
      const v = Math.max(0, Math.min(100, Number(b.dataset.value) || 0));
      b.style.width = v + '%';
    });
  }
})();
