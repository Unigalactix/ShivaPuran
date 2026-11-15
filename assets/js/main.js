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

  // 4) Verse of the Day — one of seven verses, chosen by the date
  const verseBox = document.querySelector('[data-verse-day]');
  if (verseBox) {
    const VERSES = [
      { deva: 'ॐ नमः शिवाय', iast: 'oṁ namaḥ śivāya',
        en: 'Om. I bow to Śiva — the five syllables that carry the five elements, the five faces, and the whole of the Purāṇa in a single breath.',
        src: 'Pañcākṣarī Mantra · The Five Syllables' },
      { deva: 'वन्दे शम्भुमुमापतिं सुरगुरुं वन्दे जगत्कारणम् ।<br/>वन्दे पन्नगभूषणं मृगधरं वन्दे पशूनां पतिम् ॥',
        iast: 'vande śambhum umāpatiṁ suraguruṁ vande jagat-kāraṇam | vande pannaga-bhūṣaṇaṁ mṛgadharaṁ vande paśūnāṁ patim ||',
        en: 'I bow to Śambhu, Umā’s lord, guru of the gods, cause of the world. I bow to Him who wears the serpent as an ornament, who holds the deer, the Lord of all creatures.',
        src: 'Śiva Mahāpurāṇa · Maṅgalācaraṇa' },
      { deva: 'नमः शिवाय शान्ताय कारणत्रयहेतवे ।<br/>निवेदयामि चात्मानं गतिस्त्वं परमेश्वर ॥',
        iast: 'namaḥ śivāya śāntāya kāraṇa-traya-hetave | nivedayāmi cātmānaṁ gatistvaṁ parameśvara ||',
        en: 'Salutation to Śiva the Peaceful, the cause of the three causes. I offer You my very self — O Supreme Lord, You alone are my refuge.',
        src: 'Śiva Mahāpurāṇa · Invocation' },
      { deva: 'मृत्युञ्जयाय रुद्राय नीलकण्ठाय शम्भवे ।<br/>अमृतेशाय शर्वाय महादेवाय ते नमः ॥',
        iast: 'mṛtyuñjayāya rudrāya nīlakaṇṭhāya śambhave | amṛteśāya śarvāya mahādevāya te namaḥ ||',
        en: 'To the Conqueror of Death, to Rudra, to the Blue-Throated, to Śambhu — to the Lord of Immortality, to Śarva, to Mahādeva: salutations to You.',
        src: 'Mahā-Mṛtyuñjaya Stava' },
      { deva: 'नमस्ते अस्तु भगवान् विश्वेश्वराय महादेवाय<br/>त्र्यम्बकाय त्रिपुरान्तकाय त्रिकाग्निकालाय ।',
        iast: 'namaste astu bhagavān viśveśvarāya mahādevāya tryambakāya tripurāntakāya trikāgni-kālāya |',
        en: 'Salutation be to You, O Lord — to the Lord of the Universe, the Great God, the Three-Eyed, the Ender of Tripura, the Fire of the three times.',
        src: 'Śatarudrīya · Taittirīya Saṁhitā' },
      { deva: 'त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।<br/>उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
        iast: 'tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam | urvārukam-iva bandhanān mṛtyor-mukṣīya mā’mṛtāt ||',
        en: 'We worship the Three-Eyed One, fragrant, nourisher of all — release me from the bondage of death like the ripe cucumber from its vine, but not from immortality.',
        src: 'Ṛgveda 7.59.12 · Mahā-Mṛtyuñjaya Mantra' },
      { deva: 'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि ।<br/>तन्नो रुद्रः प्रचोदयात् ॥',
        iast: 'oṁ tatpuruṣāya vidmahe mahādevāya dhīmahi | tanno rudraḥ pracodayāt ||',
        en: 'Om. May we know that Supreme Person; may we meditate on Mahādeva. May Rudra inspire and impel us.',
        src: 'Śiva Gāyatrī · Taittirīya Āraṇyaka' }
    ];
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now - start) / 86400000);
    const v = VERSES[day % VERSES.length];
    const set = (sel, html) => { const el = verseBox.querySelector(sel); if (el) el.innerHTML = html; };
    set('[data-verse-deva]', v.deva);
    set('[data-verse-iast]', v.iast);
    set('[data-verse-en]', v.en);
    set('[data-verse-src]', v.src);
  }
})();
