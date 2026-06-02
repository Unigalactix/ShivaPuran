# ŚIVA PURĀṆA CODEX

> *ॐ नमः शिवाय*

A devotional, premium static website on **Lord Śiva**, **Pārvatī Mā**, **Kālī Mā**, and the universe of the Śiva Mahāpurāṇa — built for GitHub Pages so future generations can study the stories, characters, incarnations, the Tāṇḍava, the temples, and the eternal love.

**Live:** [unigalactix.github.io/ShivaPuran](https://unigalactix.github.io/ShivaPuran/)

**Sister codices:** [Rāmāyaṇa](https://unigalactix.github.io/RAMAYANA/) · [Bhāgavata](https://unigalactix.github.io/BHAGAVATHAM/) · [Mahābhārata](https://unigalactix.github.io/Mahabharat/)

---

## Twelve Chapters of the Codex

| # | Page | Theme |
|---|------|-------|
| 1 | [index.html](index.html) | Home — Pañcānana hero, stats, doorway to all chapters |
| 2 | [characters.html](characters.html) | The Pantheon — holographic character codex with realm filters |
| 3 | [avatars.html](avatars.html) | The 19 Rudra-avatāras + the Avatāri insight |
| 4 | [jyotirlingas.html](jyotirlingas.html) | The 12 self-manifest Jyotirliṅgas across Bhārat |
| 5 | [tandava.html](tandava.html) | The 7 Tāṇḍavas + Pañcakṛtya + Pañcānana |
| 6 | [love-story.html](love-story.html) | Śiva–Pārvatī in 7 chapters — Satī to Ardhanārīśvara |
| 7 | [stories.html](stories.html) | 12 classical kathās of the Mahāpurāṇa |
| 8 | [parvati.html](parvati.html) | Pārvatī Mā — Navadurgā + 6 classical forms + Ādiśakti |
| 9 | [kali.html](kali.html) | Kālī Mā — the Daśa-Mahāvidyā |
| 10 | [trimurti.html](trimurti.html) | Brahmā · Viṣṇu · Śiva and the Pañcakṛtya |
| 11 | [themes.html](themes.html) | 8 eternal currents — bhasma, ānanda, tapas, prema, mauna, līlā, ākāśa, anugraha |
| 12 | [lineage.html](lineage.html) | The divine family tree from Parabrahman to the gaṇas of Kailāsa |

---

## Design System

- **Visual signature:** glass surfaces (rgba + low-alpha gradients) with a holographic-foil sweep (conic-gradient `::before` rotating on hover), radial cosmic gradients, ornamental `✦ ❀ ✦` dividers, and devanagari mantras at every section head.
- **Premium navigation:** sticky 72px header with a gold hairline glow, brand triśūla drop-shadow, hairline underline on each link, an `✦` active-link glyph, and a dedicated round-pill **Search** button (`⌘K`).
- **Search palette:** glass modal overlay with backdrop blur, an in-memory index of ~150 entries spanning every chapter (titles + devanāgarī + snippets + page chip), live `<mark>` highlighting, scored ranking, full keyboard control (`↑ ↓ ↵ / Esc`), and global triggers — `Ctrl/Cmd + K` anywhere, or `/` outside of an input.
- **Palette tokens** (in `assets/css/global.css`): `--ink-night`, `--ink-deep`, `--ash-vibhuti`, `--gold-trishul`, `--silver-trishul`, `--cosmic-violet`, `--cosmic-blue`, `--sacred-fire`, `--snake-green`, `--blood-kali`.
- **Typography:** *Cormorant Garamond* (display serif) · *Cinzel* (caps) · *Inter* (UI) · *Noto Serif Devanagari* (Sanskrit).
- **Shared utilities:** `.shell`, `.section`, `.divider`, `.shloka`, `.chip` (variants: `--fire`, `--gold`, `--violet`, `--blue`, `--green`, `--kali`), `.btn` / `.btn--ghost`, `.gold-text`, `.deva` / `.deva-sm`.
- **Layout:** sticky `.site-header` + responsive `.site-nav` with mobile toggle; full-width `.site-footer` with `ॐ`, the Sanskrit benediction, and links to the sister codices.

```
ShivaPuran/
├── .nojekyll                       # tell GH Pages to skip Jekyll
├── index.html                      # Chapter 1
├── characters.html … lineage.html  # Chapters 2–13 (incl. shakti-peethas.html)
├── glossary.html                   # Chapter 14 — the Codex Śabdakośa
├── README.md
└── assets/
    ├── css/
    │   ├── reset.css
    │   ├── global.css              # tokens, premium header/footer, utilities
    │   ├── search.css              # ⌘K palette overlay
    │   └── pages/
    │       ├── index.css           characters.css      avatars.css
    │       ├── jyotirlingas.css    shakti-peethas.css  tandava.css
    │       ├── love-story.css      stories.css         parvati.css
    │       ├── kali.css            trimurti.css        themes.css
    │       └── lineage.css         glossary.css
    └── js/
        ├── main.js                 # nav toggle, year, smooth-scroll
        ├── search.js               # palette index + scoring + keyboard
        └── characters.js           # pantheon filter logic
```

---

## Local preview

This is a pure static site — **no build step**. Open `index.html` directly, or serve the folder:

```pwsh
# Option 1 — Python
python -m http.server 5500

# Option 2 — Node
npx serve .
```

Then visit `http://localhost:5500/`.

## Deploy to GitHub Pages

1. Push this folder to the `main` branch of your repo.
2. **Settings → Pages →** *Build from branch* → `main` / `/ (root)`.
3. `.nojekyll` is included so Pages serves the files as-is.

A few minutes later your codex is live at `https://<user>.github.io/<repo>/`.

---

## Accessibility & SEO

- Semantic HTML5 throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- `aria-current="page"` on the active nav item.
- Open Graph + Twitter Card meta on every page.
- `prefers-reduced-motion` respected (holographic foil sweeps degrade gracefully).
- Mobile-first responsive — every grid uses `auto-fit minmax(min(...,100%), 1fr)`.

---

## Provenance

A devotional retelling inspired by **Vyāsa's Śiva Mahāpurāṇa**, the **Liṅga Purāṇa**, the **Skanda Purāṇa**, the **Devī Bhāgavata Purāṇa**, the **Mārkaṇḍeya Purāṇa**, and the **hymns of Ādi Śaṅkara**. The text is summarised and reframed for the modern reader; the spirit is faithful to the source.

```
सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः ।
सर्वे भद्राणि पश्यन्तु · मा कश्चिद् दुःख-भाग् भवेत् ॥
```

*May all beings be happy · may all beings be free from illness · may all behold what is auspicious · may none come to grief.*

---

`ॐ नमः शिवाय`
