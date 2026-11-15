/* ============================================================
   SIVA PURANA CODEX — Madhubani (Mithila) Key Scenes
   One shared folk-art system: bold ink outlines, flat natural
   pigments on cream paper, double border bands (geometric +
   floral), bharni pattern-fills, sun/moon faces, fish, lotus,
   peacocks, snakes and the tree of life.
   ============================================================ */
(function () {
  'use strict';
  var INK = '#2e1608', PAPER = '#f7ead2', YEL = '#e8a812', RED = '#d43d1a',
      IND = '#1d4e89', GRN = '#3e7d2c', PNK = '#e56b9f', SKIN = '#f3d9ae';

  function defs(id) {
    return '<defs>' +
      '<pattern id="dia-' + id + '" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="' + YEL + '"/><path d="M9 2 L16 9 L9 16 L2 9 Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1"/><circle cx="9" cy="9" r="1.6" fill="' + PAPER + '"/></pattern>' +
      '<pattern id="sc-' + id + '" width="18" height="12" patternUnits="userSpaceOnUse"><rect width="18" height="12" fill="#bcd6ea"/><path d="M0 12 A9 9 0 0 1 18 12 M-9 5 A9 9 0 0 1 9 5 M9 5 A9 9 0 0 1 27 5" fill="none" stroke="' + IND + '" stroke-width="1.5"/></pattern>' +
      '<pattern id="ht-' + id + '" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8 L8 0" stroke="' + INK + '" stroke-width="1.1" opacity=".45"/></pattern>' +
      '<pattern id="dt-' + id + '" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="6.5" cy="6.5" r="1.9" fill="' + INK + '" opacity=".5"/></pattern>' +
      '<pattern id="st-' + id + '" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="8" height="16" fill="' + INK + '" opacity=".16"/></pattern>' +
      '</defs>';
  }

  function border(id) {
    var buds = '', x, y;
    for (x = 44; x <= 356; x += 26) {
      buds += '<path d="M' + x + ' 25 q5 -9 10 0 q-5 5 -10 0Z" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.1"/>' +
              '<path d="M' + x + ' 275 q5 9 10 0 q-5 -5 -10 0Z" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.1"/>';
    }
    for (y = 50; y <= 250; y += 26) {
      buds += '<path d="M25 ' + y + ' q-9 5 0 10 q5 -5 0 -10Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.1"/>' +
              '<path d="M375 ' + y + ' q9 5 0 10 q-5 -5 0 -10Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.1"/>';
    }
    return '<rect x="3" y="3" width="394" height="294" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="3"/>' +
      '<rect x="12" y="12" width="376" height="276" fill="none" stroke="url(#dia-' + id + ')" stroke-width="11"/>' +
      '<rect x="21" y="21" width="358" height="258" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' + buds +
      '<rect x="31" y="31" width="338" height="238" fill="none" stroke="' + INK + '" stroke-width="2.6"/>';
  }

  function sunFace(cx, cy, r) {
    var rays = '', a, x1, y1, x2, y2;
    for (a = 0; a < 360; a += 30) {
      x1 = cx + (r + 3) * Math.cos(a * Math.PI / 180); y1 = cy + (r + 3) * Math.sin(a * Math.PI / 180);
      x2 = cx + (r + 11) * Math.cos(a * Math.PI / 180); y2 = cy + (r + 11) * Math.sin(a * Math.PI / 180);
      rays += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + INK + '" stroke-width="2.2"/>';
    }
    return rays + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.8"/>' +
      '<path d="M' + (cx - r * .55) + ' ' + cy + ' q4 -5 9 0 q-4 5 -9 0Z" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><circle cx="' + (cx - r * .33) + '" cy="' + cy + '" r="1.7" fill="' + INK + '"/>' +
      '<path d="M' + (cx + r * .18) + ' ' + cy + ' q4 -5 9 0 q-4 5 -9 0Z" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><circle cx="' + (cx + r * .4) + '" cy="' + cy + '" r="1.7" fill="' + INK + '"/>' +
      '<path d="M' + cx + ' ' + (cy - 2) + ' v7" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<path d="M' + (cx - 6) + ' ' + (cy + r * .52) + ' q6 5 12 0" fill="none" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<circle cx="' + cx + '" cy="' + (cy - r * .5) + '" r="2.2" fill="' + RED + '"/>';
  }

  function moonFace(cx, cy, s) {
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      '<path d="M-8 -15 A17 17 0 1 0 -8 15 A13 13 0 1 1 -8 -15Z" fill="#fdf6da" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="-9" cy="-2" r="1.8" fill="' + INK + '"/><path d="M-13 6 q4 3 8 1" fill="none" stroke="' + INK + '" stroke-width="1.5"/></g>';
  }

  function fish(x, y, s, flip, color) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')">' +
      '<path d="M-16 0 Q0 -11 15 0 Q0 11 -16 0Z" fill="' + color + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M14 0 L24 -8 L24 8Z" fill="' + color + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="-8" cy="-2" r="1.9" fill="' + INK + '"/><path d="M-3 -6 A8 8 0 0 1 -3 6 M4 -6 A8 8 0 0 1 4 6" fill="none" stroke="' + INK + '" stroke-width="1.3"/></g>';
  }

  function bird(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="none" stroke="' + INK + '" stroke-width="2">' +
      '<path d="M-11 0 Q-5 -8 0 0 Q5 -8 11 0"/><circle cx="0" cy="1.5" r="1.6" fill="' + INK + '" stroke="none"/></g>';
  }

  function lotus(x, y, s, color) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M0 6 Q-3 -6 0 -12 Q3 -6 0 6Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M-2 6 Q-12 -2 -13 -9 Q-5 -7 0 2Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M2 6 Q12 -2 13 -9 Q5 -7 0 2Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M-11 9 Q0 4 11 9" fill="none" stroke="' + GRN + '" stroke-width="2.2"/></g>';
  }

  function tree(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-4 60 Q-2 25 0 0 Q2 25 5 60Z" fill="#7a4a21" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M0 22 Q-16 12 -24 2 M0 16 Q14 8 22 -4" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="-22" cy="-8" r="15" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="20" cy="-14" r="17" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="0" cy="-26" r="18" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="-24" cy="-10" r="2" fill="' + YEL + '"/><circle cx="14" cy="-26" r="2" fill="' + PNK + '"/><circle cx="2" cy="-14" r="2" fill="' + YEL + '"/><circle cx="24" cy="-4" r="2" fill="' + RED + '"/></g>';
  }

  function peacock(x, y, s) {
    var fan = '', i, a;
    for (i = -2; i <= 2; i++) {
      a = i * 22;
      fan += '<g transform="rotate(' + a + ')"><line x1="0" y1="-6" x2="0" y2="-34" stroke="' + GRN + '" stroke-width="2"/>' +
        '<ellipse cx="0" cy="-36" rx="5.5" ry="8" fill="' + IND + '" stroke="' + INK + '" stroke-width="1.6"/>' +
        '<ellipse cx="0" cy="-36" rx="2.4" ry="4" fill="' + YEL + '"/></g>';
    }
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + fan +
      '<ellipse cx="0" cy="2" rx="9" ry="12" fill="' + IND + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M0 -8 Q2 -20 7 -24" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="8" cy="-25" r="4.4" fill="' + IND + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M5 -29 l-2 -5 M8 -30 l0 -6 M11 -29 l2 -5" stroke="' + INK + '" stroke-width="1.5"/></g>';
  }

  /* Shiva's head — almond eyes, tripundra, crescent moon, snake-ready */
  function head(cx, cy, s, opts) {
    opts = opts || {};
    var g = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">';
    g += '<path d="M-21 6 A22 24 0 1 1 21 6 L21 14 Q0 24 -21 14Z" fill="#4a2c14" stroke="' + INK + '" stroke-width="2.6"/>'; // hair mass
    g += '<circle cx="0" cy="-24" r="9" fill="#4a2c14" stroke="' + INK + '" stroke-width="2.4"/>'; // bun
    g += '<ellipse cx="0" cy="4" rx="16.5" ry="19" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="2.8"/>'; // face
    g += '<path d="M-12 -8 Q0 -12 12 -8 M-12 -4 Q0 -8 12 -4 M-11 0 Q0 -3 11 0" fill="none" stroke="#fff" stroke-width="2.1"/>'; // tripundra
    g += '<circle cx="0" cy="-6" r="2.3" fill="' + RED + '"/>';
    if (opts.thirdEye) g += '<path d="M0 -14 Q3.4 -8 0 -2 Q-3.4 -8 0 -14Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/>';
    g += '<path d="M-13 4 Q-8 0 -3 4 Q-8 7.5 -13 4Z" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><circle cx="-8" cy="3.6" r="1.9" fill="' + INK + '"/>';
    g += '<path d="M3 4 Q8 0 13 4 Q8 7.5 3 4Z" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><circle cx="8" cy="3.6" r="1.9" fill="' + INK + '"/>';
    g += '<path d="M0 6 L-1.5 12 Q0 13.5 2 12" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    g += '<path d="M-4.5 16.5 Q0 19 4.5 16.5 Q0 15 -4.5 16.5Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.1"/>';
    g += '<circle cx="-18" cy="10" r="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/><circle cx="18" cy="10" r="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/>';
    g += moonFace(-19, -17, 0.62); // crescent on the locks
    if (opts.ganga) g += '<path d="M6 -28 q3 8 -1 13 q6 -3 5 -11Z" fill="#7db8dd" stroke="' + INK + '" stroke-width="1.4"/>';
    return g + '</g>';
  }

  function snake(cx, cy, s) {
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      '<path d="M-20 0 Q0 13 20 0 Q10 -6 -2 1 Q-12 6 -20 0Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M20 0 q9 -3 10 -11 l5 3 q-1 9 -8 13Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="33" cy="-8" r="1.5" fill="' + INK + '"/><path d="M36 -6 l5 -2 M36 -6 l5 1" stroke="' + RED + '" stroke-width="1.3"/></g>';
  }

  function torso(cx, topY, s, color, patId, id) {
    return '<g transform="translate(' + cx + ' ' + topY + ') scale(' + s + ')">' +
      '<path d="M-17 0 L17 0 L26 52 L-26 52Z" fill="' + color + '" stroke="' + INK + '" stroke-width="2.8"/>' +
      '<path d="M-17 0 L17 0 L26 52 L-26 52Z" fill="url(#' + patId + '-' + id + ')"/>' +
      '<circle cx="-8" cy="20" r="2" fill="' + INK + '"/><circle cx="0" cy="24" r="2" fill="' + INK + '"/><circle cx="8" cy="20" r="2" fill="' + INK + '"/>' +
      '<path d="M-17 6 L-30 26 M17 6 L30 26" stroke="' + INK + '" stroke-width="4.4" stroke-linecap="round"/></g>';
  }

  function ground(id, water) {
    if (water) return '<rect x="31" y="222" width="338" height="47" fill="url(#sc-' + id + ')"/><rect x="31" y="222" width="338" height="47" fill="none" stroke="' + INK + '" stroke-width="2"/>';
    return '<rect x="31" y="228" width="338" height="41" fill="#e9d9ae"/><rect x="31" y="228" width="338" height="41" fill="url(#dt-' + id + ')"/><line x1="31" y1="228" x2="369" y2="228" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M60 228 q2 -9 5 0 M120 228 q2 -9 5 0 M300 228 q2 -9 5 0 M340 228 q2 -9 5 0" fill="none" stroke="' + GRN + '" stroke-width="2"/>';
  }

  var MOTIFS = {
    halahala: function (id) {
      return ground(id, true) + sunFace(70, 66, 15) + tree(338, 168, 0.9) +
        fish(95, 240, 1, false, PNK) + fish(300, 250, 0.85, true, YEL) +
        '<path d="M52 210 Q130 196 200 208 Q270 220 348 206" fill="none" stroke="' + GRN + '" stroke-width="5"/>' + // Vasuki rope
        head(200, 108, 1.55, {}) + snake(200, 148, 1.15) +
        '<rect x="182" y="140" width="36" height="9" rx="4" fill="' + IND + '" stroke="' + INK + '" stroke-width="2"/>' + // blue throat
        torso(200, 152, 1.15, IND, 'st', id) +
        '<path d="M238 168 q20 4 24 -14 l10 4 q-4 24 -26 22Z" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="2.2"/>' + // arm
        '<path d="M258 138 q14 -6 20 4 q-8 10 -20 6 q-6 -4 0 -10Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.2"/><path d="M262 140 q6 -14 12 -16 q1 10 -4 16Z" fill="' + IND + '" stroke="' + INK + '" stroke-width="1.6"/>'; // poison bowl
    },
    sati: function (id) {
      return ground(id, false) + sunFace(332, 64, 14) + bird(90, 70, 1) + bird(130, 56, 0.8) +
        '<rect x="52" y="90" width="12" height="138" fill="' + RED + '"/><rect x="336" y="90" width="12" height="138" fill="' + RED + '"/>' +
        '<path d="M52 90 h12 M336 90 h12" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<path d="M58 108 l16 12 M342 108 l-16 12" stroke="' + YEL + '" stroke-width="4"/>' +
        '<path d="M128 228 L272 228 L252 182 L148 182Z" fill="#a5542a" stroke="' + INK + '" stroke-width="3"/>' +
        '<path d="M128 228 L272 228 L252 182 L148 182Z" fill="url(#ht-' + id + ')"/>' +
        '<path d="M200 178 q-26 -34 -8 -66 q6 16 14 20 q-2 -26 12 -40 q20 30 8 54 q12 -8 14 -22 q22 30 2 54 q-20 12 -42 0Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="2.8"/>' +
        '<path d="M200 182 q-15 -22 -5 -44 q9 12 13 13 q1 -16 9 -25 q13 20 4 36 q-9 14 -21 20Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.2"/>' +
        '<ellipse cx="200" cy="150" rx="10" ry="14" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.2"/>' +
        '<path d="M96 150 q6 -14 0 -26 M304 150 q-6 -14 0 -26 M120 132 q5 -11 0 -20 M280 132 q-5 -11 0 -20" fill="none" stroke="' + INK + '" stroke-width="2" opacity=".55"/>' +
        lotus(84, 214, 1, PNK) + lotus(316, 214, 1, PNK);
    },
    wedding: function (id) {
      var garland = '', i, gx, gy;
      for (i = 0; i <= 8; i++) { gx = 158 + i * 10.5; gy = 168 + Math.sin(i / 8 * Math.PI) * 20; garland += '<circle cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) + '" r="4" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.3"/>'; }
      return ground(id, false) + sunFace(200, 58, 15) +
        '<rect x="70" y="86" width="260" height="12" fill="' + RED + '"/><rect x="70" y="86" width="260" height="12" fill="url(#st-' + id + ')"/><rect x="70" y="86" width="260" height="12" fill="none" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<rect x="76" y="98" width="10" height="130" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.2"/><rect x="314" y="98" width="10" height="130" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.2"/>' +
        '<path d="M86 112 q57 -14 114 0 q57 -14 114 0" fill="none" stroke="' + GRN + '" stroke-width="3.4"/>' +
        head(163, 138, 1.05, {}) + torso(163, 168, 0.82, '#ece5d8', 'dt', id) +
        head(240, 140, 0.98, {}) +
        '<path d="M222 158 L258 158 L266 208 L214 208Z" fill="' + PNK + '" stroke="' + INK + '" stroke-width="2.6"/><path d="M222 158 L258 158 L266 208 L214 208Z" fill="url(#dt-' + id + ')"/>' +
        '<path d="M226 128 q14 -16 28 0 l-3 -14 q-11 -8 -22 0Z" fill="' + INK + '"/>' +
        garland + peacock(96, 196, 0.95) + lotus(312, 216, 1, PNK) + bird(120, 66, 0.9) + bird(286, 70, 0.8);
    },
    ganga: function (id) {
      return ground(id, true) +
        '<path d="M31 228 L96 128 L140 190 L186 108 L238 196 L282 132 L369 228Z" fill="#cdbb96" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<path d="M31 228 L96 128 L140 190 L186 108 L238 196 L282 132 L369 228Z" fill="url(#st-' + id + ')"/>' +
        '<path d="M96 128 l-10 16 M186 108 l-10 16 M282 132 l-10 16" stroke="#fff" stroke-width="5"/>' +
        head(200, 96, 1.5, { ganga: true }) +
        '<path d="M186 52 q-6 44 -26 66 q-16 18 -14 44 M214 52 q6 44 26 66 q16 18 14 44" fill="none" stroke="' + IND + '" stroke-width="6"/>' +
        '<path d="M146 162 q-4 30 6 62 M254 162 q4 30 -6 62" fill="none" stroke="#7db8dd" stroke-width="5"/>' +
        fish(110, 244, 1, false, PNK) + fish(282, 252, 0.9, true, GRN) + lotus(200, 240, 1, YEL) + bird(80, 66, 1);
    },
    ardha: function (id) {
      return ground(id, false) + sunFace(72, 64, 14) + moonFace(330, 62, 1.05) + tree(52, 150, 0.8) + peacock(336, 200, 0.9) +
        head(200, 100, 1.3, {}) +
        '<path d="M200 66 L200 128" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<path d="M200 132 L200 232 L158 232 Q156 176 176 140 Q188 132 200 132Z" fill="' + IND + '" stroke="' + INK + '" stroke-width="2.8"/>' +
        '<path d="M200 132 L200 232 L244 232 Q248 176 226 140 Q212 132 200 132Z" fill="' + PNK + '" stroke="' + INK + '" stroke-width="2.8"/>' +
        '<path d="M200 132 L200 232" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<path d="M168 148 q-16 22 -10 44 M158 158 l-14 -34 M144 124 l-4 -16 M144 124 l6 -15 M144 124 l13 12" fill="none" stroke="' + INK + '" stroke-width="3.6" stroke-linecap="round"/>' + // trishul hand side
        '<path d="M236 150 q14 16 8 34" fill="none" stroke="' + INK + '" stroke-width="3.6" stroke-linecap="round"/>' +
        lotus(258, 196, 1.05, PNK) + snake(178, 138, 0.8) +
        '<path d="M176 108 q-6 40 4 58 M226 104 q10 34 2 62" fill="none" stroke="' + INK + '" stroke-width="2.6"/>'; // long hair right
    },
    nataraja: function (id) {
      var flames = '', i, a, fx, fy;
      for (i = 0; i < 18; i++) {
        a = i / 18 * Math.PI * 2; fx = 200 + 92 * Math.cos(a); fy = 148 + 92 * Math.sin(a);
        flames += '<path d="M' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ' q5 -10 0 -15 q-5 5 0 15Z" fill="' + (i % 2 ? YEL : RED) + '" stroke="' + INK + '" stroke-width="1.4" transform="rotate(' + (a * 180 / Math.PI + 90) + ' ' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ')"/>';
      }
      return ground(id, false) + flames +
        '<circle cx="200" cy="148" r="92" fill="none" stroke="' + INK + '" stroke-width="2.6"/>' +
        head(200, 92, 1.02, {}) +
        '<path d="M186 116 L214 116 L208 168 L192 168Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<path d="M188 124 L146 104 M146 104 l-8 -12 M188 132 L152 148 M212 124 L254 108 M254 108 l10 -10 M212 132 L246 152" stroke="' + INK + '" stroke-width="4.6" stroke-linecap="round"/>' +
        '<path d="M138 92 q-8 -4 -6 -12 q8 2 10 8Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.6"/>' + // damru
        '<circle cx="262" cy="98" r="6" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.6"/>' + // flame in hand
        '<path d="M194 168 L178 208 L150 220 M206 168 L224 196 L252 190" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
        '<ellipse cx="212" cy="222" rx="26" ry="8" fill="' + IND + '" stroke="' + INK + '" stroke-width="2.2"/><circle cx="204" cy="218" r="3.4" fill="' + PAPER + '"/><circle cx="220" cy="218" r="3.4" fill="' + PAPER + '"/>' + // apasmara
        moonFace(316, 58, 0.9) + bird(76, 62, 0.9);
    },
    tripura: function (id) {
      return ground(id, false) + sunFace(84, 62, 15) +
        head(118, 116, 1.15, {}) + torso(118, 146, 0.95, RED, 'st', id) +
        '<path d="M138 118 Q226 148 138 208" fill="none" stroke="' + INK + '" stroke-width="5"/>' +
        '<line x1="138" y1="118" x2="138" y2="208" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<line x1="140" y1="163" x2="252" y2="163" stroke="' + INK + '" stroke-width="2.6"/><path d="M252 163 l-13 -5 M252 163 l-13 5" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<circle cx="292" cy="112" r="21" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.8"/><circle cx="326" cy="150" r="21" fill="' + PNK + '" stroke="' + INK + '" stroke-width="2.8"/><circle cx="292" cy="188" r="21" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.8"/>' +
        '<path d="M292 88 q-6 -14 2 -22 q8 10 4 22 M326 126 q-6 -14 2 -22 q8 10 4 22 M292 164 q-6 -14 2 -22 q8 10 4 22" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<circle cx="292" cy="112" r="4" fill="' + INK + '"/><circle cx="326" cy="150" r="4" fill="' + INK + '"/><circle cx="292" cy="188" r="4" fill="' + INK + '"/>' +
        '<circle cx="86" cy="238" r="13" fill="none" stroke="' + INK + '" stroke-width="3"/><circle cx="150" cy="238" r="13" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
        '<path d="M60 226 h120" stroke="' + INK + '" stroke-width="3"/>' +
        '<path d="M52 214 q10 -12 22 -4 q12 -8 20 2 l-8 6 q-16 -6 -34 -4Z" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.2"/>'; // horse head
    },
    kama: function (id) {
      return ground(id, false) + tree(200, 66, 1.25) + sunFace(70, 62, 13) + bird(310, 66, 0.9) + bird(338, 84, 0.75) +
        '<path d="M148 232 L252 232 L238 206 L162 206Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.8"/><path d="M148 232 L252 232 L238 206 L162 206Z" fill="url(#st-' + id + ')"/>' + // tiger skin seat
        torso(200, 152, 0.98, '#ece5d8', 'dt', id) + head(200, 118, 1.22, { thirdEye: true }) + snake(200, 158, 0.95) +
        '<path d="M206 104 q26 2 44 14" fill="none" stroke="' + RED + '" stroke-width="3.4"/>' + // third-eye flame beam
        '<path d="M252 120 q8 -4 10 4 q-8 4 -12 -2Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.6"/>' +
        '<g transform="translate(308 158)"><circle cx="0" cy="-16" r="9" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="2.2"/>' +
        '<path d="M-7 -8 L7 -8 L11 22 L-11 22Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<path d="M-12 4 Q-24 -14 -8 -26 M-12 4 Q2 -2 8 8" fill="none" stroke="' + GRN + '" stroke-width="3.4"/>' +
        '<path d="M-8 -26 q8 -4 12 3 q-7 4 -12 -3Z" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.5"/></g>' + // Kamadeva + flower bow
        '<circle cx="282" cy="140" r="2.4" fill="' + INK + '" opacity=".6"/><circle cx="292" cy="152" r="2" fill="' + INK + '" opacity=".5"/><circle cx="276" cy="156" r="1.7" fill="' + INK + '" opacity=".45"/>' + // ash motes
        lotus(84, 218, 1, PNK) + lotus(120, 226, 0.8, YEL);
    }
  };

  var SCENES = [
    { id: 'halahala', kind: 'halahala', bg: '#f9ecca', sa: 'नीलकण्ठ', title: 'Nīlakaṇṭha — The Blue Throat',
      caption: 'At the churning of the ocean of milk, the world-poison Hālāhala rises first. Śiva drinks it and holds it in His throat, which turns blue — the saviour who swallows death itself so the worlds may live.' },
    { id: 'sati', kind: 'sati', bg: '#fbe7d2', sa: 'सती', title: 'Satī — The Fire of the Insulted',
      caption: 'At Dakṣa\'s great sacrifice, where Śiva alone was uninvited and insulted, Satī yields her body to a fire kindled from her own yoga — and the universe trembles at what her grief will wake in her Lord.' },
    { id: 'wedding', kind: 'wedding', bg: '#fdeef3', sa: 'शिवविवाह', title: 'The Wedding of Śiva & Pārvatī',
      caption: 'The mountain-king\'s daughter wins the ash-smeared ascetic who would not be moved. Gods, sages and peacocks gather as Kailāsa celebrates the wedding of the age — stillness wedded to the mountain\'s patience.' },
    { id: 'ganga', kind: 'ganga', bg: '#e7f0f7', sa: 'गङ्गावतरण', title: 'Gaṅgāvataraṇa — Catching the River',
      caption: 'The heavenly river plunges to earth to save Bhagīratha\'s ancestors, proud enough to shatter the world. Only Śiva\'s matted locks can break her fall — she wanders them a year, then flows down gently as a stream.' },
    { id: 'ardha', kind: 'ardha', bg: '#f9ecca', sa: 'अर्धनारीश्वर', title: 'Ardhanārīśvara — Half-Woman Lord',
      caption: 'One body, two halves: trident, snake and ash on the left; lotus, silk and long hair on the right. Śiva and Śakti are not two gods in alliance but a single form — creation held whole.' },
    { id: 'nataraja', kind: 'nataraja', bg: '#f7ead2', sa: 'नटराज', title: 'Naṭarāja — The Cosmic Dance',
      caption: 'Within a ring of flame the Lord dances creation and dissolution in the same step — drum beating time, foot pressed on the dwarf of ignorance, one hand raised: fear not.' },
    { id: 'tripura', kind: 'tripura', bg: '#f9ecca', sa: 'त्रिपुरान्तक', title: 'Tripurāntaka — One Arrow, Three Cities',
      caption: 'The three flying cities of the asuras align for a single instant in a thousand years. The earth is His chariot, the sun and moon its wheels; Śiva smiles, looses one arrow, and all three cities burn together.' },
    { id: 'kama', kind: 'kama', bg: '#eef3e2', sa: 'कामदहन', title: 'Kāmadahana — The Burning of Desire',
      caption: 'Sent to wake the meditating Lord, Kāma looses his flower-arrow from behind the trees. The third eye opens — and desire itself is reduced to ash, so that love may be reborn as devotion.' }
  ];

  function svgFor(s) {
    return '<svg viewBox="0 0 400 300" role="img" aria-label="' + s.title.replace(/&/g, '&amp;') + ' — Madhubani folk-art panel" preserveAspectRatio="xMidYMid meet">' +
      defs(s.id) +
      '<rect x="31" y="31" width="338" height="238" fill="' + s.bg + '"/>' +
      (MOTIFS[s.kind] ? MOTIFS[s.kind](s.id) : '') +
      border(s.id) + '</svg>';
  }

  function render(host) {
    host.innerHTML = SCENES.map(function (s) {
      return '<article class="mb-card">' +
        '<div class="mb-card__art">' + svgFor(s) + '</div>' +
        '<div class="mb-card__body"><p class="mb-card__sa" lang="sa">' + s.sa + '</p>' +
        '<h3 class="mb-card__title">' + s.title + '</h3>' +
        '<p class="mb-card__caption">' + s.caption + '</p></div></article>';
    }).join('');
  }

  /* Shared with the Reading Book (assets/js/book.js) — scene plates by kind. */
  window.ShivaScenes = { scenes: SCENES, svgFor: svgFor };

  document.querySelectorAll('[data-madhubani-scenes]').forEach(render);
})();
