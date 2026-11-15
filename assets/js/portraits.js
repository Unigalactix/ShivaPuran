/* ============================================================
   SIVA PURANA CODEX — Madhubani Character Portraits
   One shared medallion system in the Mithila folk idiom:
   patterned double border, rayed golden halo, bharni fills,
   bold ink outlines, flat natural pigments on cream paper.
   Character spec (shared across the four codices):
   Siva = ash-grey skin + vermilion, crescent, third eye,
   trishul, damru, serpent · Parvati = lotus pink / vermilion ·
   Vishnu = deep indigo-blue skin.
   ============================================================ */
(function () {
  'use strict';
  var INK = '#2e1608', PAPER = '#f7ead2', YEL = '#e8a812', RED = '#d43d1a',
      IND = '#1d4e89', GRN = '#3e7d2c', PNK = '#e56b9f',
      SKIN = '#f3d9ae', ASH = '#b7ad9f', HAIR = '#3a2210',
      BLUE = '#33629e', WHITE = '#fdf8ea';

  /* ---------------- shared primitives ---------------- */
  function defs(u) {
    return '<defs>' +
      '<pattern id="dia-' + u + '" width="15" height="15" patternUnits="userSpaceOnUse"><rect width="15" height="15" fill="' + YEL + '"/><path d="M7.5 1.5 L13.5 7.5 L7.5 13.5 L1.5 7.5Z" fill="' + RED + '" stroke="' + INK + '" stroke-width=".9"/><circle cx="7.5" cy="7.5" r="1.3" fill="' + PAPER + '"/></pattern>' +
      '<pattern id="dt-' + u + '" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="5.5" cy="5.5" r="1.6" fill="' + INK + '" opacity=".45"/></pattern>' +
      '<pattern id="st-' + u + '" width="13" height="13" patternUnits="userSpaceOnUse"><rect width="6.5" height="13" fill="' + INK + '" opacity=".14"/></pattern>' +
      '<clipPath id="cp-' + u + '"><circle cx="100" cy="100" r="77"/></clipPath>' +
      '</defs>';
  }

  function halo(cx, cy, flame) {
    var s = '', i, a, x1, y1, x2, y2;
    for (i = 0; i < 24; i++) {
      a = i / 24 * Math.PI * 2;
      x1 = cx + 35 * Math.cos(a); y1 = cy + 35 * Math.sin(a);
      if (flame) {
        x2 = cx + 47 * Math.cos(a); y2 = cy + 47 * Math.sin(a);
        s += '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" stroke="' + (i % 2 ? RED : YEL) + '" stroke-width="3.4" stroke-linecap="round"/>';
      } else {
        x2 = cx + 45 * Math.cos(a); y2 = cy + 45 * Math.sin(a);
        s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + YEL + '" stroke-width="2.6" stroke-linecap="round"/>';
      }
    }
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="' + YEL + '" opacity=".55"/>' +
               '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="none" stroke="' + INK + '" stroke-width="1.6" opacity=".65"/>';
  }

  function frame(u, bg, inner) {
    return '<svg viewBox="0 0 200 200" role="img" aria-hidden="true" focusable="false">' + defs(u) +
      '<circle cx="100" cy="100" r="98" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<circle cx="100" cy="100" r="90" fill="none" stroke="url(#dia-' + u + ')" stroke-width="12"/>' +
      '<circle cx="100" cy="100" r="83" fill="none" stroke="' + INK + '" stroke-width="1.5"/>' +
      '<circle cx="100" cy="100" r="77" fill="' + bg + '"/>' +
      '<g clip-path="url(#cp-' + u + ')">' + inner + '</g>' +
      '<circle cx="100" cy="100" r="77" fill="none" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<circle cx="100" cy="100" r="71" fill="none" stroke="' + PNK + '" stroke-width="2.6" stroke-dasharray="0.1 8.2" stroke-linecap="round" opacity=".8"/>' +
      '</svg>';
  }

  function eyes(y, stern) {
    var brow = stern
      ? '<path d="M84 84 L97 88 M116 88 L129 84" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>'
      : '<path d="M85 85 Q92 82 98 85 M102 85 Q108 82 115 85" fill="none" stroke="' + INK + '" stroke-width="1.9"/>';
    return brow +
      '<path d="M86 ' + y + ' Q92 ' + (y - 4.5) + ' 98 ' + y + ' Q92 ' + (y + 3.2) + ' 86 ' + y + 'Z" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><circle cx="92" cy="' + (y - .4) + '" r="1.9" fill="' + INK + '"/>' +
      '<path d="M102 ' + y + ' Q108 ' + (y - 4.5) + ' 114 ' + y + ' Q108 ' + (y + 3.2) + ' 102 ' + y + 'Z" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><circle cx="108" cy="' + (y - .4) + '" r="1.9" fill="' + INK + '"/>';
  }
  function noseMouth(ny, my) {
    return '<path d="M100 ' + ny + ' L98.4 ' + (ny + 8) + ' Q100 ' + (ny + 10) + ' 101.8 ' + (ny + 8) + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<path d="M94.5 ' + my + ' Q100 ' + (my + 3) + ' 105.5 ' + my + ' Q100 ' + (my + 1.2) + ' 94.5 ' + my + 'Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1"/>';
  }
  function tripundra() {
    return '<path d="M86 76 Q100 72 114 76 M86 80.5 Q100 76.5 114 80.5 M87 85 Q100 81.5 113 85" fill="none" stroke="#fff" stroke-width="2.1"/>' +
           '<circle cx="100" cy="79" r="2.1" fill="' + RED + '" stroke="' + INK + '" stroke-width=".8"/>';
  }
  function thirdEye() {
    return '<path d="M100 62 Q104.5 70 100 79 Q95.5 70 100 62Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.3"/>' +
           '<path d="M100 67 Q102.4 71 100 75.5 Q97.6 71 100 67Z" fill="' + RED + '"/>';
  }
  function bindi() { return '<circle cx="100" cy="80" r="2.4" fill="' + RED + '" stroke="' + INK + '" stroke-width=".9"/>'; }
  function vaishnav() {
    return '<path d="M94 70 L94 84 Q94 90 100 90 Q106 90 106 84 L106 70" fill="none" stroke="#fff" stroke-width="2.6"/>' +
           '<line x1="100" y1="72" x2="100" y2="87" stroke="' + RED + '" stroke-width="1.8"/>';
  }
  function face(skin) {
    return '<rect x="93" y="104" width="14" height="13" fill="' + skin + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="79.5" cy="93" r="4.4" fill="' + skin + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<circle cx="120.5" cy="93" r="4.4" fill="' + skin + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<ellipse cx="100" cy="91" rx="19" ry="21.5" fill="' + skin + '" stroke="' + INK + '" stroke-width="2.6"/>';
  }
  function hairBun(crescent, ganga) {
    var s = '<path d="M79 84 Q76 58 100 56 Q124 58 121 84 L118 108 Q112 112 111 100 L111 76 Q100 70 89 76 L89 100 Q88 112 82 108Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="100" cy="50" r="8.5" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="2.2"/>';
    if (crescent) s += '<path d="M84 44 A11 11 0 1 0 84 62 A8.6 8.6 0 1 1 84 44Z" fill="#fdf6da" stroke="' + INK + '" stroke-width="1.7"/>';
    if (ganga) s += '<path d="M107 42 q4 7 0 12 q7 -2 6 -10Z" fill="#7db8dd" stroke="' + INK + '" stroke-width="1.3"/>';
    return s;
  }
  function hairLong() {
    return '<path d="M80 72 Q78 52 100 50 Q122 52 120 72 L124 124 Q116 130 112 118 L112 76 Q100 68 88 76 L88 118 Q84 130 76 124Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="100" cy="66" r="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      '<path d="M100 69 v6" stroke="' + YEL + '" stroke-width="1.8"/><circle cx="100" cy="77" r="2" fill="' + RED + '" stroke="' + INK + '" stroke-width=".9"/>';
  }
  function crown(tall) {
    var h = tall ? 40 : 30;
    return '<path d="M81 76 L85 ' + (76 - h + 12) + ' Q100 ' + (76 - h) + ' 115 ' + (76 - h + 12) + ' L119 76 Q100 69 81 76Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="100" cy="' + (76 - h + 14) + '" r="3.4" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.1"/>' +
      '<circle cx="89" cy="' + (76 - h + 18) + '" r="2" fill="' + IND + '"/><circle cx="111" cy="' + (76 - h + 18) + '" r="2" fill="' + GRN + '"/>' +
      '<path d="M81 76 Q100 69 119 76" fill="none" stroke="' + INK + '" stroke-width="1.6"/>';
  }
  function torso(u, garment, pat, opts) {
    opts = opts || {};
    var s = '<path d="M60 178 L68 127 Q100 114 132 127 L140 178Z" fill="' + garment + '" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M60 178 L68 127 Q100 114 132 127 L140 178Z" fill="url(#' + pat + '-' + u + ')"/>' +
      '<path d="M85 120 Q100 133 115 120" fill="none" stroke="' + INK + '" stroke-width="1.9"/>';
    if (opts.breast) s += '<path d="M103 136 Q117 129 124 141 Q116 147 105 143" fill="none" stroke="' + INK + '" stroke-width="1.7"/>';
    if (!opts.noNecklace) s += '<path d="M83 122 Q100 141 117 122" fill="none" stroke="' + YEL + '" stroke-width="2.6"/><circle cx="100" cy="137" r="3.1" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.1"/>';
    if (opts.tulsi) s += '<path d="M80 126 Q100 150 120 126" fill="none" stroke="' + GRN + '" stroke-width="3" stroke-dasharray="0.1 6" stroke-linecap="round"/>';
    return s;
  }
  function snakeNeck() {
    return '<path d="M82 116 Q100 126 118 116 Q112 122 100 122 Q88 122 82 116Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M118 116 q8 -2 9 -9 l4.5 2.5 q-.5 8 -7 11Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.7"/>' +
      '<circle cx="129" cy="108" r="1.3" fill="' + INK + '"/><path d="M132 110 l4.5 -1.6 M132 110 l4.6 .8" stroke="' + RED + '" stroke-width="1.1"/>';
  }
  function trishul(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.3" fill="none" stroke-linecap="round">' +
      '<line x1="0" y1="34" x2="0" y2="-16"/><path d="M-11 -8 Q-11 6 0 6 Q11 6 11 -8"/><line x1="-11" y1="-8" x2="-11" y2="-18"/><line x1="11" y1="-8" x2="11" y2="-18"/><line x1="0" y1="-16" x2="0" y2="-26"/></g>' +
      '<path d="M' + x + ' ' + (y - 26 * s) + ' l3.4 6 h-6.8Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/>';
  }
  function damru(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-8 -11 L8 -11 L1.5 0 L8 11 L-8 11 L-1.5 0Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M-8 -11 Q-15 -4 -12 3 M8 -11 Q15 -4 12 3" fill="none" stroke="' + INK + '" stroke-width="1.5"/><circle cx="-12" cy="5" r="2.2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="12" cy="5" r="2.2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/></g>';
  }
  function lotus(x, y, s, color) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M0 26 L0 4" stroke="' + GRN + '" stroke-width="2.6"/>' +
      '<path d="M0 2 Q-3.4 -10 0 -17 Q3.4 -10 0 2Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.7"/>' +
      '<path d="M-2 2 Q-13 -5 -14 -13 Q-5 -10 0 -2Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.7"/>' +
      '<path d="M2 2 Q13 -5 14 -13 Q5 -10 0 -2Z" fill="' + color + '" stroke="' + INK + '" stroke-width="1.7"/></g>';
  }
  function conch(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M0 -14 Q13 -8 11 4 Q9 15 -3 14 Q-13 12 -11 1 Q-4 4 0 -1 Q-8 -2 -7 -9 Q-3 -14 0 -14Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M-9 5 Q0 9 8 5" fill="none" stroke="' + INK + '" stroke-width="1.4"/></g>';
  }
  function discus(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<circle r="12" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle r="12" fill="none" stroke="' + INK + '" stroke-width="4.6" stroke-dasharray="2.6 3.1"/>' +
      '<circle r="4.6" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.4"/></g>';
  }
  function vel(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<line x1="0" y1="36" x2="0" y2="-12" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M0 -34 Q7 -20 0 -6 Q-7 -20 0 -34Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.8"/></g>';
  }
  function veena() {
    return '<g><line x1="70" y1="152" x2="126" y2="98" stroke="' + INK + '" stroke-width="3.4"/>' +
      '<circle cx="70" cy="152" r="10.5" fill="#a5542a" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="124" cy="101" r="7" fill="#a5542a" stroke="' + INK + '" stroke-width="2"/>' +
      '<line x1="73" y1="149" x2="127" y2="99" stroke="' + YEL + '" stroke-width="1.2"/>' +
      '<path d="M126 98 l7 -6 M129 101 l8 -3" stroke="' + INK + '" stroke-width="1.8"/></g>';
  }

  /* ---------------- the fourteen faces ---------------- */
  function drawShiva(u) {
    return halo(100, 92, false) + torso(u, '#ece5d8', 'st', {}) + trishul(143, 118, .95) + damru(56, 112, .95) +
      hairBun(true, true) + face(ASH) + tripundra() + thirdEye() + eyes(92, false) + noseMouth(94, 107) + snakeNeck();
  }
  function drawParvati(u) {
    return halo(100, 92, false) + torso(u, PNK, 'dt', { breast: true }) + lotus(143, 122, .95, PNK) +
      hairLong() + face(SKIN) + bindi() + eyes(92, false) + noseMouth(94, 107) +
      '<circle cx="79.5" cy="99" r="2.2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1"/><circle cx="120.5" cy="99" r="2.2" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1"/>';
  }
  function drawSati(u) {
    return halo(100, 92, true) + torso(u, RED, 'st', { breast: true }) +
      hairLong() + face(SKIN) + bindi() + eyes(92, false) + noseMouth(94, 107) +
      '<path d="M64 168 q6 -12 2 -22 M136 168 q-6 -12 -2 -22" fill="none" stroke="' + RED + '" stroke-width="2.6"/>' +
      '<path d="M66 146 q4 -7 1 -13 q6 4 4 12Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><path d="M134 146 q-4 -7 -1 -13 q-6 4 -4 12Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/>';
  }
  function drawGanesha(u) {
    var s = halo(100, 90, false) + torso(u, YEL, 'dt', {}) +
      '<ellipse cx="70" cy="92" rx="12" ry="18" fill="#d9a08a" stroke="' + INK + '" stroke-width="2.3"/>' +
      '<ellipse cx="130" cy="92" rx="12" ry="18" fill="#d9a08a" stroke="' + INK + '" stroke-width="2.3"/>' +
      '<ellipse cx="70" cy="92" rx="6.5" ry="11" fill="url(#dt-' + u + ')"/><ellipse cx="130" cy="92" rx="6.5" ry="11" fill="url(#dt-' + u + ')"/>' +
      '<ellipse cx="100" cy="88" rx="19.5" ry="21" fill="#d9a08a" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M100 96 Q99 118 90 130 Q84 139 90 143 Q97 146 99 136" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M100 96 Q99 118 90 130 Q84 139 90 143 Q97 146 99 136" fill="none" stroke="#d9a08a" stroke-width="4.6" stroke-linecap="round"/>' +
      '<path d="M88 112 l-3 8 7 -2Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      '<path d="M86 74 Q100 70 114 74 M86 79 Q100 75 114 79" fill="none" stroke="#fff" stroke-width="2"/>' +
      eyes(88, false) + crown(false) +
      '<path d="M52 150 h20 l-3 12 h-14Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<circle cx="58" cy="146" r="3.4" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="1.1"/><circle cx="66" cy="146" r="3.4" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="1.1"/><circle cx="62" cy="141" r="3.4" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="1.1"/>';
    return s;
  }
  function sideFace(x, skin, flip) {
    return '<g transform="translate(' + x + ' 92) scale(' + (flip ? -1 : 1) + ' 1)">' +
      '<ellipse cx="0" cy="0" rx="10" ry="17" fill="' + skin + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M8 -2 L13 3 L8 6" fill="' + skin + '" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<circle cx="2" cy="-3" r="1.6" fill="' + INK + '"/><path d="M0 8 Q4 10 7 8" fill="none" stroke="' + INK + '" stroke-width="1.3"/></g>';
  }
  function drawKartikeya(u) {
    return halo(100, 92, false) + torso(u, RED, 'dt', {}) + vel(144, 116, .95) +
      sideFace(72, SKIN, true) + sideFace(128, SKIN, false) +
      face(SKIN) + crown(false) +
      '<path d="M96 44 q4 -8 10 -9 q-1 7 -5 10 q5 0 8 -3 q0 8 -7 11Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.3"/><circle cx="100" cy="47" r="1.8" fill="' + IND + '"/>' +
      bindi() + eyes(92, false) + noseMouth(94, 107);
  }
  function drawNandi(u) {
    return halo(100, 90, false) +
      '<path d="M62 178 L70 140 Q100 130 130 140 L138 178Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M78 62 Q62 52 58 34 Q74 38 82 52Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M122 62 Q138 52 142 34 Q126 38 118 52Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M58 34 l-3 -6 M142 34 l3 -6" stroke="' + YEL + '" stroke-width="3.4" stroke-linecap="round"/>' +
      '<ellipse cx="72" cy="86" rx="8" ry="12" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2" transform="rotate(18 72 86)"/>' +
      '<ellipse cx="128" cy="86" rx="8" ry="12" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2" transform="rotate(-18 128 86)"/>' +
      '<ellipse cx="100" cy="90" rx="21" ry="22" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<ellipse cx="100" cy="106" rx="13.5" ry="9.5" fill="#efe3d2" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="94.5" cy="105" r="1.9" fill="' + INK + '"/><circle cx="105.5" cy="105" r="1.9" fill="' + INK + '"/>' +
      '<path d="M92 111 Q100 115 108 111" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
      eyes(86, false) + tripundra() +
      '<path d="M76 128 Q100 142 124 128 L124 138 Q100 150 76 138Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="100" cy="146" r="6" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.8"/><path d="M97 144 h6" stroke="' + INK + '" stroke-width="1.2"/>';
  }
  function drawVishnu(u) {
    return halo(100, 92, false) + torso(u, YEL, 'st', { tulsi: true }) + conch(55, 112, 1) + discus(145, 108, 1) +
      face(BLUE) + crown(true) + vaishnav() + eyes(92, false) + noseMouth(94, 107);
  }
  function drawBrahma(u) {
    return halo(100, 92, false) + torso(u, '#ece5d8', 'dt', {}) + lotus(56, 124, .9, PNK) +
      '<path d="M138 138 q10 0 10 10 q0 9 -10 9 q-10 0 -10 -9 q0 -10 10 -10Z" fill="#a5542a" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M132 138 q6 -6 12 0" fill="none" stroke="' + INK + '" stroke-width="1.8"/>' +
      sideFace(74, SKIN, true) + sideFace(126, SKIN, false) +
      face(SKIN) + crown(false) + bindi() + eyes(92, false) + noseMouth(94, 104) +
      '<path d="M86 108 Q100 128 114 108 Q112 124 100 130 Q88 124 86 108Z" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M92 116 q2 5 0 9 M100 120 q2 5 0 10 M108 116 q-2 5 0 9" fill="none" stroke="' + INK + '" stroke-width="1" opacity=".5"/>';
  }
  function drawDaksha(u) {
    return halo(100, 92, false) + torso(u, IND, 'st', {}) +
      face(SKIN) + crown(false) + eyes(92, true) +
      '<path d="M100 94 L98.4 102 Q100 104 101.8 102" fill="none" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<path d="M88 106 Q100 100 112 106 Q106 112 100 109 Q94 112 88 106Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      '<path d="M95 116 Q100 114 105 116" fill="none" stroke="' + INK + '" stroke-width="1.7"/>';
  }
  function drawKamadeva(u) {
    return halo(100, 92, false) + torso(u, GRN, 'dt', {}) +
      '<path d="M146 66 Q166 104 146 146" fill="none" stroke="' + GRN + '" stroke-width="3.6"/>' +
      '<circle cx="152" cy="76" r="4" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="158" cy="96" r="4" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="158" cy="116" r="4" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="152" cy="136" r="4" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      '<line x1="147" y1="70" x2="147" y2="142" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<path d="M147 106 L128 106 M128 106 l7 -3.4 M128 106 l7 3.4" stroke="' + RED + '" stroke-width="2.2" fill="none"/>' +
      face(SKIN) +
      '<path d="M80 70 Q100 52 120 70 L118 62 Q100 48 82 62Z" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<circle cx="88" cy="60" r="3" fill="' + PNK + '" stroke="' + INK + '" stroke-width="1"/><circle cx="100" cy="55" r="3.4" fill="' + RED + '" stroke="' + INK + '" stroke-width="1"/><circle cx="112" cy="60" r="3" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1"/>' +
      bindi() + eyes(92, false) + noseMouth(94, 107) +
      '<g transform="translate(58 128)"><ellipse cx="0" cy="0" rx="8" ry="5.4" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.6"/><circle cx="8" cy="-4" r="3.6" fill="' + GRN + '" stroke="' + INK + '" stroke-width="1.4"/><path d="M11 -5 l5 1.6 -4.6 2Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1"/><path d="M-4 -4 q-4 -7 -9 -8 q2 6 1 10" fill="' + IND + '" stroke="' + INK + '" stroke-width="1.2"/></g>';
  }
  function drawRavana(u) {
    var heads = '', pos = [[52, 96], [60, 66], [78, 48], [100, 40], [122, 48], [140, 66], [148, 96], [64, 122], [136, 122]], i, p;
    for (i = 0; i < pos.length; i++) {
      p = pos[i];
      heads += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="10.5" fill="#bd8f6e" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<path d="M' + (p[0] - 7) + ' ' + (p[1] - 7) + ' L' + p[0] + ' ' + (p[1] - 14) + ' L' + (p[0] + 7) + ' ' + (p[1] - 7) + 'Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/>' +
        '<circle cx="' + (p[0] - 3.4) + '" cy="' + p[1] + '" r="1.2" fill="' + INK + '"/><circle cx="' + (p[0] + 3.4) + '" cy="' + p[1] + '" r="1.2" fill="' + INK + '"/>' +
        '<path d="M' + (p[0] - 3.6) + ' ' + (p[1] + 5) + ' Q' + p[0] + ' ' + (p[1] + 7.4) + ' ' + (p[0] + 3.6) + ' ' + (p[1] + 5) + '" fill="none" stroke="' + INK + '" stroke-width="1.1"/>';
    }
    return halo(100, 92, false) + torso(u, IND, 'st', {}) + heads + veena() +
      face('#c9a189') + crown(false) + eyes(92, true) +
      '<path d="M100 94 L98.4 102 Q100 104 101.8 102" fill="none" stroke="' + INK + '" stroke-width="1.4"/>' +
      '<path d="M89 105 Q100 100 111 105 Q105 110 100 107.6 Q95 110 89 105Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="1.1"/>' +
      '<path d="M95 115 Q100 113 105 115" fill="none" stroke="' + INK + '" stroke-width="1.6"/>';
  }
  function drawNarada(u) {
    return halo(100, 92, false) + torso(u, RED, 'st', { tulsi: true }) + veena() +
      '<path d="M82 76 Q80 56 100 55 Q120 56 118 76 L114 74 Q112 62 100 61 Q88 62 86 74Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M100 55 q-2 -9 4 -13 q3 7 -1 13Z" fill="' + HAIR + '" stroke="' + INK + '" stroke-width="1.7"/>' +
      face(SKIN) + vaishnav() + eyes(92, false) + noseMouth(94, 107);
  }
  function drawArdha(u) {
    var left = '<g clip-path="url(#ah-' + u + ')">' + torso(u, IND, 'st', { noNecklace: true }) +
      '<ellipse cx="100" cy="91" rx="19" ry="21.5" fill="' + ASH + '"/>' +
      '<path d="M79 84 Q76 58 100 56 Q124 58 121 84 L118 106 Q112 110 111 98 L111 76 Q100 70 89 76 L89 98 Q88 110 82 106Z" fill="' + HAIR + '"/>' +
      '<circle cx="100" cy="50" r="8.5" fill="' + HAIR + '"/>' +
      '<path d="M84 44 A11 11 0 1 0 84 62 A8.6 8.6 0 1 1 84 44Z" fill="#fdf6da"/>' + tripundra() + '</g>';
    var right = '<g clip-path="url(#bh-' + u + ')">' + torso(u, PNK, 'dt', { breast: true, noNecklace: true }) +
      '<ellipse cx="100" cy="91" rx="19" ry="21.5" fill="' + SKIN + '"/>' +
      '<path d="M80 72 Q78 52 100 50 Q122 52 120 72 L124 124 Q116 130 112 118 L112 76 Q100 68 88 76 L88 118 Q84 130 76 124Z" fill="' + HAIR + '"/>' + bindi() + '</g>';
    return '<defs><clipPath id="ah-' + u + '"><rect x="20" y="20" width="80" height="160"/></clipPath>' +
      '<clipPath id="bh-' + u + '"><rect x="100" y="20" width="80" height="160"/></clipPath></defs>' +
      halo(100, 92, false) + left + right +
      '<ellipse cx="100" cy="91" rx="19" ry="21.5" fill="none" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<line x1="100" y1="69.5" x2="100" y2="112.5" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<circle cx="79.5" cy="93" r="4.4" fill="' + ASH + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<circle cx="120.5" cy="93" r="4.4" fill="' + SKIN + '" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M82 116 Q91 123 100 121 Q109 123 118 116" fill="none" stroke="' + GRN + '" stroke-width="2.6"/>' +
      '<path d="M83 122 Q100 141 117 122" fill="none" stroke="' + YEL + '" stroke-width="2.4"/>' +
      eyes(92, false) + noseMouth(94, 107) + trishul(52, 118, .9) + lotus(148, 122, .9, PNK);
  }
  function drawNataraja(u) {
    var flames = '', i, a, fx, fy;
    for (i = 0; i < 20; i++) {
      a = i / 20 * Math.PI * 2; fx = 100 + 66 * Math.cos(a); fy = 100 + 66 * Math.sin(a);
      flames += '<path d="M' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ' q4.6 -9 0 -13.5 q-4.6 4.5 0 13.5Z" fill="' + (i % 2 ? YEL : RED) + '" stroke="' + INK + '" stroke-width="1.2" transform="rotate(' + (a * 180 / Math.PI + 90) + ' ' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ')"/>';
    }
    return flames + '<circle cx="100" cy="100" r="66" fill="#f3e3c2" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M88 118 L112 118 L116 158 L84 158Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="2.3"/>' +
      '<path d="M88 118 L112 118 L116 158 L84 158Z" fill="url(#st-' + u + ')"/>' +
      '<path d="M90 124 L64 106 M64 106 l-6 -9 M92 132 L68 142 M110 124 L134 108 M134 108 l7 -8 M108 132 L128 146" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
      damru(56, 94, .8) +
      '<path d="M140 96 q7 -3 8 4 q-7 4 -10 -1 q-1 -3 2 -3Z" fill="' + RED + '" stroke="' + INK + '" stroke-width="1.3"/>' +
      '<path d="M94 156 L86 172 L66 176 M106 156 L118 168 L138 160" fill="none" stroke="' + INK + '" stroke-width="4.4" stroke-linecap="round"/>' +
      '<ellipse cx="102" cy="172" rx="17" ry="5.6" fill="' + IND + '" stroke="' + INK + '" stroke-width="1.8"/><circle cx="97" cy="169" r="2.2" fill="' + PAPER + '"/><circle cx="109" cy="169" r="2.2" fill="' + PAPER + '"/>' +
      '<path d="M80 82 Q70 66 84 58 M120 82 Q130 66 116 58" fill="none" stroke="' + HAIR + '" stroke-width="5" stroke-linecap="round"/>' +
      face(ASH) +
      '<g transform="translate(0 -8)">' + tripundra() + thirdEye() + '</g>' +
      eyes(84, false) + noseMouth(86, 99) +
      '<path d="M116 56 A10 10 0 1 0 116 72 A7.8 7.8 0 1 1 116 56Z" fill="#fdf6da" stroke="' + INK + '" stroke-width="1.5"/>';
  }

  var FIGURES = [
    { id: 'shiva',    name: 'Śiva',             deva: 'शिव',            bg: '#efe6cf', draw: drawShiva,
      role: 'The Auspicious — ash-grey ascetic of Kailāsa, crescent-crowned, who holds the poison and the dance.' },
    { id: 'parvati',  name: 'Pārvatī',          deva: 'पार्वती',        bg: '#fbe9ef', draw: drawParvati,
      role: 'Daughter of the Mountain — Śakti herself, whose tapasyā won the unmoving Lord.' },
    { id: 'sati',     name: 'Satī',             deva: 'सती',            bg: '#fbe7d2', draw: drawSati,
      role: 'The First Consort — devotion that walked into fire rather than bow to insult.' },
    { id: 'ganesha',  name: 'Gaṇeśa',           deva: 'गणेश',           bg: '#fdf3d3', draw: drawGanesha,
      role: 'Lord of Beginnings — elephant-headed remover of obstacles, first worshipped in every rite.' },
    { id: 'kartikeya', name: 'Kārtikeya · Murugan', deva: 'कार्तिकेय', bg: '#fdeee0', draw: drawKartikeya,
      role: 'The Six-Faced Commander — born of fire-sparks, rider of the peacock, slayer of Tārakāsura.' },
    { id: 'nandi',    name: 'Nandi',            deva: 'नन्दि',          bg: '#f3efe2', draw: drawNandi,
      role: 'The Joyful Bull — vāhana, gatekeeper, and the foremost devotee who never looks away.' },
    { id: 'vishnu',   name: 'Viṣṇu',            deva: 'विष्णु',         bg: '#e3ecf9', draw: drawVishnu,
      role: 'The Preserver — deep-blue, conch and discus in hand, who reclines upon Ananta-Śeṣa.' },
    { id: 'brahma',   name: 'Brahmā',           deva: 'ब्रह्मा',        bg: '#f7ead2', draw: drawBrahma,
      role: 'The Creator — four-faced and lotus-born, who speaks the worlds out of the Vedas.' },
    { id: 'daksha',   name: 'Dakṣa',            deva: 'दक्ष',           bg: '#e9e4f2', draw: drawDaksha,
      role: 'The Prajāpati — father of Satī, whose pride lit the fire that undid his sacrifice.' },
    { id: 'kamadeva', name: 'Kāmadeva',         deva: 'कामदेव',        bg: '#eef3e2', draw: drawKamadeva,
      role: 'God of Love — bearer of the flower-bow, burned by the third eye and reborn formless.' },
    { id: 'ravana',   name: 'Rāvaṇa',           deva: 'रावण',           bg: '#eee7da', draw: drawRavana,
      role: 'The Ten-Headed King — scholar, vīṇā-master, and the devotee who shook Kailāsa.' },
    { id: 'narada',   name: 'Nārada',           deva: 'नारद',           bg: '#fdeee0', draw: drawNarada,
      role: 'The Wandering Sage — vīṇā in hand, carrying news and devotion between the three worlds.' },
    { id: 'ardha',    name: 'Ardhanārīśvara',   deva: 'अर्धनारीश्वर',  bg: '#f6e8d8', draw: drawArdha,
      role: 'The Half-Woman Lord — Śiva and Śakti in a single body, creation held whole.' },
    { id: 'nataraja', name: 'Naṭarāja',         deva: 'नटराज',         bg: '#f9ecca', draw: drawNataraja,
      role: 'King of Dancers — creation and dissolution in one step, within a ring of flame.' }
  ];

  function medallion(fig) { return frame(fig.id, fig.bg, fig.draw(fig.id)); }

  function renderGrid(host) {
    host.innerHTML = FIGURES.map(function (f) {
      return '<article class="pt-card"><div class="pt-card__art">' + medallion(f) + '</div>' +
        '<div class="pt-card__body"><p class="pt-card__deva" lang="sa">' + f.deva + '</p>' +
        '<h3 class="pt-card__name">' + f.name + '</h3>' +
        '<p class="pt-card__role">' + f.role + '</p></div></article>';
    }).join('');
  }

  function renderStrip(host) {
    var wanted = (host.getAttribute('data-portraits-strip') || '').split(',').map(function (s) { return s.trim(); });
    host.innerHTML = FIGURES.filter(function (f) { return wanted.indexOf(f.id) !== -1; }).map(function (f) {
      return '<a class="pt-strip__item" href="characters.html#portraits">' + medallion(f) +
        '<span class="pt-strip__name">' + f.name + '</span><span class="pt-strip__deva" lang="sa">' + f.deva + '</span></a>';
    }).join('');
  }

  /* Shared with the Reading Book (assets/js/book.js) — medallion plates by figure id. */
  window.ShivaPortraits = { figures: FIGURES, medallion: medallion };

  document.querySelectorAll('[data-portraits]').forEach(renderGrid);
  document.querySelectorAll('[data-portraits-strip]').forEach(renderStrip);
})();
