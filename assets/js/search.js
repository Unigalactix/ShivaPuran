/* ===========================================================
   SEARCH — assets/js/search.js
   Premium client-side search modal for the Śiva Purāṇa Codex.
   No dependencies. Triggers: ⌘K · Ctrl+K · "/" · Search button.
   =========================================================== */
(function () {
  'use strict';

  /* -------- The Index --------
     Each entry: t = title, p = page#anchor, d = deva, s = snippet, g = group/page name
  ----------------------------- */
  const INDEX = [
    // ===== HOME =====
    { t: 'Home — Codex of the Lord of Beginnings & Endings', p: 'index.html', d: 'ॐ', s: 'Pañcānana hero, verse of the day, doorway to all chapters of the Śiva Purāṇa.', g: 'Home' },
    { t: 'Verse of the Day', p: 'index.html#verse', d: 'श्लोक', s: 'Daily Sanskrit verse with translation from the Śiva Mahāpurāṇa.', g: 'Home' },

    // ===== PANTHEON / CHARACTERS =====
    { t: 'Pantheon — The 24 Beings of Kailāsa', p: 'characters.html', d: 'पात्र', s: 'Holographic codex of 24 characters: mythic, legendary, fierce, sage, mortal.', g: 'Pantheon' },
    { t: 'Śiva — the Ādiyogī, the Auspicious One', p: 'characters.html#shiva', d: 'शिव', s: 'Mahādeva, Lord of the Tāṇḍava, ascetic of Kailāsa, husband of Pārvatī.', g: 'Pantheon' },
    { t: 'Pārvatī — Daughter of the Mountain', p: 'characters.html#parvati', d: 'पार्वती', s: 'Reborn Satī, consort of Śiva, mother of Gaṇeśa and Kārtikeya.', g: 'Pantheon' },
    { t: 'Ardhanārīśvara — Half Woman Half Lord', p: 'characters.html#ardha', d: 'अर्धनारीश्वर', s: 'The fused form: Śiva and Śakti as one body, two natures.', g: 'Pantheon' },
    { t: 'Gaṇeśa — Lord of Beginnings', p: 'characters.html#ganesha', d: 'गणेश', s: 'Elephant-headed remover of obstacles, first to be worshipped in any rite.', g: 'Pantheon' },
    { t: 'Kārtikeya — Commander of the Devas', p: 'characters.html#kartikeya', d: 'कार्तिकेय', s: 'Six-faced Skanda, born of the Kṛttikā stars, slayer of Tārakāsura.', g: 'Pantheon' },
    { t: 'Nandi — the Bull, gatekeeper of Kailāsa', p: 'characters.html#nandi', d: 'नन्दि', s: 'Śiva’s eternal vāhana and foremost devotee.', g: 'Pantheon' },
    { t: 'Satī — Dakṣa’s daughter, first wife of Śiva', p: 'characters.html#sati', d: 'सती', s: 'Self-immolated at her father’s yajña; reborn as Pārvatī.', g: 'Pantheon' },
    { t: 'Dakṣiṇāmūrti — the silent guru facing south', p: 'characters.html#dakshina', d: 'दक्षिणामूर्ति', s: 'Śiva as the teacher who teaches by silence alone.', g: 'Pantheon' },
    { t: 'Kālī — the dark goddess of time', p: 'characters.html#kali', d: 'काली', s: 'Born from Durgā’s brow to drink Raktabīja’s blood mid-air.', g: 'Pantheon' },
    { t: 'Durgā — the unconquerable Mahiṣamardinī', p: 'characters.html#durga', d: 'दुर्गा', s: 'The Mother who slew the buffalo-demon Mahiṣāsura.', g: 'Pantheon' },
    { t: 'Bhairava — the Wrathful, severer of Brahmā’s fifth head', p: 'characters.html#bhairava', d: 'भैरव', s: 'Kāla-Bhairava of Kāśī, gaurdian of the city of liberation.', g: 'Pantheon' },
    { t: 'Vīrabhadra — born of Śiva’s lock of hair', p: 'characters.html#virabhadra', d: 'वीरभद्र', s: 'Destroyer of Dakṣa’s yajña, beheader of the father-in-law.', g: 'Pantheon' },
    { t: 'Annapūrṇā — Mother of food, queen of Kāśī', p: 'characters.html#annapurna', d: 'अन्नपूर्णा', s: 'Pārvatī as the goddess who feeds every being including Śiva.', g: 'Pantheon' },
    { t: 'Gaṅgā — the river held in Śiva’s matted hair', p: 'characters.html#ganga', d: 'गङ्गा', s: 'Daughter of Himavān, brought down by Bhagīratha’s tapasyā.', g: 'Pantheon' },
    { t: 'Hanumān — eleventh Rudra-avatāra', p: 'characters.html#hanuman', d: 'हनुमान्', s: 'Vāyu’s son, Rāma’s servant, counted in the 19 avatāras of Śiva.', g: 'Pantheon' },
    { t: 'Brahmā — the four-headed creator', p: 'characters.html#brahma', d: 'ब्रह्मा', s: 'The first of the Trimūrti, born of Viṣṇu’s navel-lotus.', g: 'Pantheon' },
    { t: 'Viṣṇu — the preserver, lord of Vaikuṇṭha', p: 'characters.html#vishnu', d: 'विष्णु', s: 'The blue-skinned one, who reclines on Ananta-Śeṣa.', g: 'Pantheon' },
    { t: 'Kāmadeva — the god of love, burned by the third eye', p: 'characters.html#kamadeva', d: 'कामदेव', s: 'Wielder of the sugarcane bow, reborn as Anaṅga (the bodiless).', g: 'Pantheon' },
    { t: 'Mārkaṇḍeya — the boy who out-prayed Yama', p: 'characters.html#markandeya', d: 'मार्कण्डेय', s: 'Saved by Mṛtyuñjaya from death at age sixteen.', g: 'Pantheon' },
    { t: 'Nārada — wandering sage, lord of vīṇā', p: 'characters.html#narada', d: 'नारद', s: 'Carrier of news between the three worlds; perpetual devotee.', g: 'Pantheon' },
    { t: 'Rāvaṇa — devotee-king who lifted Kailāsa', p: 'characters.html#ravana', d: 'रावण', s: 'Ten-headed Lankan king who composed the Śiva Tāṇḍava Stotram.', g: 'Pantheon' },

    // ===== AVATARAS =====
    { t: 'Avatāras — the 19 descents of Rudra', p: 'avatars.html', d: 'अवतार', s: 'Nineteen Rudra-avatāras and the Avatārī insight.', g: 'Avatāras' },
    { t: 'Vīrabhadra — 1st Avatāra', p: 'avatars.html#av-01', d: 'वीरभद्र', s: 'Born from Śiva’s lock to destroy Dakṣa’s sacrifice.', g: 'Avatāras' },
    { t: 'Pippalāda — 2nd Avatāra', p: 'avatars.html#av-02', d: 'पिप्पलाद', s: 'Curses Śani for his orphanhood, then teaches mercy.', g: 'Avatāras' },
    { t: 'Śarabha — 3rd Avatāra', p: 'avatars.html#av-03', d: 'शरभ', s: 'Part-bird part-lion form that calmed Narasiṁha’s wrath.', g: 'Avatāras' },
    { t: 'Bhikṣuvarya — 6th Avatāra, the divine mendicant', p: 'avatars.html#av-06', d: 'भिक्षुवर्य', s: 'Śiva as the wandering beggar-saint.', g: 'Avatāras' },
    { t: 'Kirāta — 8th Avatāra, the hunter of Arjuna', p: 'avatars.html#av-08', d: 'किरात', s: 'Tested Arjuna’s tapas in the form of a tribal hunter; gave the Pāśupatāstra.', g: 'Avatāras' },
    { t: 'Hanumān — 11th Avatāra', p: 'avatars.html#av-11', d: 'हनुमान्', s: 'The greatest Rudra-avatāra of the Tretā Yuga.', g: 'Avatāras' },
    { t: 'Bhairava — 16th Avatāra', p: 'avatars.html#av-16', d: 'भैरव', s: 'The terror-form that severed Brahmā’s fifth head.', g: 'Avatāras' },
    { t: 'Durvāsa — 17th Avatāra, the wrathful sage', p: 'avatars.html#av-17', d: 'दुर्वासा', s: 'Famous for curses that became blessings — the saṁyamana of tapas.', g: 'Avatāras' },
    { t: 'Aśvatthāmā — 18th Avatāra', p: 'avatars.html#av-18', d: 'अश्वत्थामा', s: 'Born with the jewel; cursed to wander to the end of the kalpa.', g: 'Avatāras' },

    // ===== JYOTIRLINGAS =====
    { t: 'Jyotirliṅgas — the 12 self-arisen pillars of light', p: 'jyotirlingas.html', d: 'ज्योतिर्लिङ्ग', s: 'The twelve liṅgas across Bhārat where Śiva manifested as pure radiance.', g: 'Jyotirliṅgas' },
    { t: 'Somnāth — 1st Jyotirliṅga, Gujarāt', p: 'jyotirlingas.html#j-01', d: 'सोमनाथ', s: 'On the shore of the Arabian Sea, the moon-god’s own liṅga.', g: 'Jyotirliṅgas' },
    { t: 'Mallikārjuna — 2nd Jyotirliṅga, Śrīśailam', p: 'jyotirlingas.html#j-02', d: 'मल्लिकार्जुन', s: 'Where Kumāra’s sulk drew the Mother and Father down from Kailāsa.', g: 'Jyotirliṅgas' },
    { t: 'Mahākāleśvara — 3rd Jyotirliṅga, Ujjain', p: 'jyotirlingas.html#j-03', d: 'महाकालेश्वर', s: 'The only south-facing liṅga; lord of time itself.', g: 'Jyotirliṅgas' },
    { t: 'Omkāreśvara — 4th Jyotirliṅga, Madhya Pradeśa', p: 'jyotirlingas.html#j-04', d: 'ओङ्कारेश्वर', s: 'On the island shaped like the Om syllable in the Narmadā.', g: 'Jyotirliṅgas' },
    { t: 'Kedārnāth — 5th Jyotirliṅga, Himālaya', p: 'jyotirlingas.html#j-05', d: 'केदारनाथ', s: 'At 3,583m, the bull-back form of Śiva in the eternal snow.', g: 'Jyotirliṅgas' },
    { t: 'Bhīmaśaṅkara — 6th Jyotirliṅga, Mahārāṣṭra', p: 'jyotirlingas.html#j-06', d: 'भीमशङ्कर', s: 'Source of the Bhīmā river; slayer of Tripurāsura’s son.', g: 'Jyotirliṅgas' },
    { t: 'Kāśī Viśvanātha — 7th Jyotirliṅga, Vārāṇasī', p: 'jyotirlingas.html#j-07', d: 'विश्वनाथ', s: 'The Lord of the Universe at the heart of the city of liberation.', g: 'Jyotirliṅgas' },
    { t: 'Trimbakeśvara — 8th Jyotirliṅga, Nāsik', p: 'jyotirlingas.html#j-08', d: 'त्र्यम्बकेश्वर', s: 'Source of the Godāvarī; the three-eyed lord.', g: 'Jyotirliṅgas' },
    { t: 'Vaidyanātha — 9th Jyotirliṅga, Deoghar', p: 'jyotirlingas.html#j-09', d: 'वैद्यनाथ', s: 'The physician-lord, won by Rāvaṇa’s ten-fold offering.', g: 'Jyotirliṅgas' },
    { t: 'Nageśvara — 10th Jyotirliṅga, Dvārakā', p: 'jyotirlingas.html#j-10', d: 'नागेश्वर', s: 'The serpent-lord; story of devotee Supriya saved from Dāruka.', g: 'Jyotirliṅgas' },
    { t: 'Rāmeśvaram — 11th Jyotirliṅga, Tamil Nāḍu', p: 'jyotirlingas.html#j-11', d: 'रामेश्वरम्', s: 'Installed by Rāma before crossing to Laṅkā.', g: 'Jyotirliṅgas' },
    { t: 'Ghṛṣṇeśvara — 12th Jyotirliṅga, Verul', p: 'jyotirlingas.html#j-12', d: 'घृष्णेश्वर', s: 'The devotee Ghuśmā’s son brought back by the lord.', g: 'Jyotirliṅgas' },

    // ===== ŚAKTI PEEṬHAS =====
    { t: 'Aṣṭādaśa Śakti Peeṭhas — the 18 seats of the Mother', p: 'shakti-peethas.html', d: 'पीठानि', s: 'Where the limbs of Satī fell, Ādi Śaṅkara’s canonical list of eighteen.', g: 'Peeṭhas' },
    { t: 'Śāṅkarī — Trincomalee, Laṅkā', p: 'shakti-peethas.html#sp-01', d: 'शाङ्करी', s: 'The first peeṭha; cliff-temple of Koṇeśvaram destroyed in 1622.', g: 'Peeṭhas' },
    { t: 'Kāmākṣī — Kāñcīpuram, Tamil Nāḍu', p: 'shakti-peethas.html#sp-02', d: 'कामाक्षी', s: 'The Devī of desire whose glance fulfils every wish.', g: 'Peeṭhas' },
    { t: 'Cāmuṇḍeśvarī — Mysūru, Karnāṭaka', p: 'shakti-peethas.html#sp-04', d: 'चामुण्डा', s: 'Slayer of Caṇḍa and Muṇḍa; kuladevatā of the Mysore kings.', g: 'Peeṭhas' },
    { t: 'Bhramarāmbikā — Śrīśailam, Āndhra Pradeśa', p: 'shakti-peethas.html#sp-06', d: 'भ्रमराम्बिका', s: 'Took the form of a swarm of bees to slay Aruṇāsura.', g: 'Peeṭhas' },
    { t: 'Mahālakṣmī — Kolhāpur, Mahārāṣṭra', p: 'shakti-peethas.html#sp-07', d: 'महालक्ष्मी', s: 'Devī as the Mother of wealth at Karavīra-kṣetra.', g: 'Peeṭhas' },
    { t: 'Mahākālī — Ujjain (Harasiddhi)', p: 'shakti-peethas.html#sp-09', d: 'महाकाली', s: 'Kuladevatā of Vikramāditya, paired with Mahākāleśvara Jyotirliṅga.', g: 'Peeṭhas' },
    { t: 'Bhavānī — Tulajāpur, Mahārāṣṭra', p: 'shakti-peethas.html#sp-11', d: 'भवानी', s: 'Mother who gave Chatrapati Śivājī Mahārāj His sword.', g: 'Peeṭhas' },
    { t: 'Bimalā — Purī, inside Jagannātha temple', p: 'shakti-peethas.html#sp-12', d: 'विमला', s: 'Only place where mahāprasāda is first offered to the Devī.', g: 'Peeṭhas' },
    { t: 'Kanyākumārī — southern tip of Bhārat', p: 'shakti-peethas.html#sp-13', d: 'कुमारी', s: 'The eternal virgin goddess where three seas meet.', g: 'Peeṭhas' },
    { t: 'Viśālākṣī — Vārāṇasī, consort of Viśvanātha', p: 'shakti-peethas.html#sp-17', d: 'विशालाक्षी', s: 'The wide-eyed mother at the heart of Kāśī.', g: 'Peeṭhas' },
    { t: 'Śāradā — Kāśmīr, Ādi Śaṅkara’s throne', p: 'shakti-peethas.html#sp-18', d: 'सरस्वती', s: 'The sarvajña-pīṭha to which Śaṅkara climbed and was declared all-knowing.', g: 'Peeṭhas' },

    // ===== TĀṆḌAVA =====
    { t: 'Tāṇḍava — the cosmic dance of Śiva', p: 'tandava.html', d: 'ताण्डव', s: 'Seven Tāṇḍavas, the Pañcakṛtya, and the Pañcānana five faces.', g: 'Tāṇḍava' },
    { t: 'Ānanda Tāṇḍava — the dance of bliss', p: 'tandava.html#dance-1', d: 'आनन्द', s: 'The Naṭarāja form at Cidambaram; joy of pure existence.', g: 'Tāṇḍava' },
    { t: 'Saṁhāra Tāṇḍava — the dance of destruction', p: 'tandava.html#dance-2', d: 'संहार', s: 'When the kalpa ends, Śiva dances the worlds back into ash.', g: 'Tāṇḍava' },
    { t: 'Raudra Tāṇḍava — the wrathful dance', p: 'tandava.html#dance-3', d: 'रौद्र', s: 'After Satī’s death; the dance that nearly shattered creation.', g: 'Tāṇḍava' },
    { t: 'Tripura Tāṇḍava — the dance of triple-city slaying', p: 'tandava.html#dance-4', d: 'त्रिपुर', s: 'A single smile burns the three flying cities of asuras.', g: 'Tāṇḍava' },
    { t: 'Sandhyā Tāṇḍava — the twilight dance', p: 'tandava.html#dance-5', d: 'सन्ध्या', s: 'Performed at the cusp of day and night, on the lip of dissolution.', g: 'Tāṇḍava' },
    { t: 'Pañcakṛtya — the five acts: creation to grace', p: 'tandava.html#pancha', d: 'पञ्चकृत्य', s: 'Sṛṣṭi · Sthiti · Saṁhāra · Tirobhāva · Anugraha.', g: 'Tāṇḍava' },
    { t: 'Pañcānana — the five faces of Sadāśiva', p: 'tandava.html#faces', d: 'पञ्चानन', s: 'Īśāna · Tatpuruṣa · Aghora · Vāmadeva · Sadyojāta.', g: 'Tāṇḍava' },

    // ===== LOVE STORY =====
    { t: 'The Eternal Love — Śiva and Pārvatī in 7 chapters', p: 'love-story.html', d: 'प्रेम', s: 'From Satī’s svayaṁvara to Ardhanārīśvara, the cosmic romance.', g: 'Love' },
    { t: 'Satī’s Svayaṁvara', p: 'love-story.html#ch-1', d: 'सती', s: 'The garland thrown into the empty air; only Śiva caught it.', g: 'Love' },
    { t: 'Dakṣa-yajña — the broken sacrifice', p: 'love-story.html#ch-2', d: 'दक्षयज्ञ', s: 'Satī walks into the fire; Vīrabhadra is born; 51 śaktipīṭhas appear.', g: 'Love' },
    { t: 'Pārvatī’s Tapasyā — Aparṇā, Pañcāgni', p: 'love-story.html#ch-4', d: 'तपस्या', s: 'Standing on one toe, surrounded by five fires; the great penance.', g: 'Love' },
    { t: 'The Brahmacārī Test — Śiva slanders Himself', p: 'love-story.html#ch-5', d: 'परीक्षा', s: 'Disguised as a young ascetic, He tests Her devotion.', g: 'Love' },
    { t: 'Kalyāṇa-Sundara — the wedding on the mountain', p: 'love-story.html#ch-6', d: 'कल्याण', s: 'Brahmā priest, Viṣṇu best man, all the worlds in attendance.', g: 'Love' },
    { t: 'Kailāsa marriage life — the divine household', p: 'love-story.html#ch-7', d: 'कैलास', s: 'Gaṇeśa, Kumāra, and the foretelling of Ardhanārī.', g: 'Love' },

    // ===== KATHĀS =====
    { t: 'The 15 Great Kathās of Śiva', p: 'stories.html', d: 'कथा', s: 'Classical stories of the Mahāpurāṇa, including the births of His three sons.', g: 'Kathās' },
    { t: 'I · Liṅgodbhava — pillar of light', p: 'stories.html#kt-01', d: 'लिङ्गोद्भव', s: 'Brahmā lies, Viṣṇu tells truth; the formless reveals Itself as a column.', g: 'Kathās' },
    { t: 'II · Nīlakaṇṭha — drinker of poison', p: 'stories.html#kt-02', d: 'नीलकण्ठ', s: 'Śiva swallows the hālāhala from the churning ocean.', g: 'Kathās' },
    { t: 'III · Tripurāntaka — slayer of three cities', p: 'stories.html#kt-03', d: 'त्रिपुरान्तक', s: 'Three flying cities of asuras destroyed in a single moment of intent.', g: 'Kathās' },
    { t: 'IV · Mārkaṇḍeya — the boy who defeated Yama', p: 'stories.html#kt-04', d: 'मार्कण्डेय', s: 'Śiva as Mṛtyuñjaya, conqueror of death.', g: 'Kathās' },
    { t: 'V · Gaṅgāvataraṇa — descent of the Ganges', p: 'stories.html#kt-05', d: 'गङ्गावतरण', s: 'Śiva catches the river in His matted hair to save the earth.', g: 'Kathās' },
    { t: 'VI · Bhasmāsura — undone by his own boon', p: 'stories.html#kt-06', d: 'भस्मासुर', s: 'Viṣṇu as Mohinī tricks the asura into burning himself to ash.', g: 'Kathās' },
    { t: 'VII · Andhakāsura — blind asura turned sage', p: 'stories.html#kt-07', d: 'अन्धकासुर', s: 'Born from a drop of Pārvatī’s sweat; becomes Bhṛṅgi.', g: 'Kathās' },
    { t: 'VIII · Jalandhara — Vṛndā and the tulasī', p: 'stories.html#kt-08', d: 'जलन्धर', s: 'The asura born of Śiva’s third eye; killed when Viṣṇu broke Vṛndā’s pātivratya.', g: 'Kathās' },
    { t: 'IX · Kāmadahana — burning of the god of love', p: 'stories.html#kt-09', d: 'कामदहन', s: 'Kāma loosens his arrow on Śiva and is burned to ash, reborn as Anaṅga.', g: 'Kathās' },
    { t: 'X · Dakṣiṇāmūrti — the silent guru', p: 'stories.html#kt-10', d: 'दक्षिणामूर्ति', s: 'Teaching the four Kumāras without a single word.', g: 'Kathās' },
    { t: 'XI · Ardhanārīśvara — Bhṛṅgi’s lesson', p: 'stories.html#kt-11', d: 'अर्धनारी', s: 'The sage who circles only Śiva learns the Mother is half.', g: 'Kathās' },
    { t: 'XII · Bhairava — Brahmā’s fifth head, Kāśī', p: 'stories.html#kt-12', d: 'भैरव', s: 'Plucks the fifth head of Brahmā; the kapāla released at Kapālamocana.', g: 'Kathās' },
    { t: 'XIII · Gaṇeśa-janma — boy from sandalwood', p: 'stories.html#kt-13', d: 'गणेशजन्म', s: 'Pārvatī forms a son from saffron paste; Śiva severs and restores His head as an elephant’s.', g: 'Kathās' },
    { t: 'XIV · Kumāra-janma — boy with six faces', p: 'stories.html#kt-14', d: 'कुमारजन्म', s: 'Born in the Śaravaṇa reeds, six Kṛttikā stars nurse Him at once.', g: 'Kathās' },
    { t: 'XV · Ayyappa-janma — born of Hari and Hara', p: 'stories.html#kt-15', d: 'अय्यप्पजन्म', s: 'Hari-Hara-suta who took His seat atop Śabarimala’s 18 sacred steps.', g: 'Kathās' },

    // ===== PĀRVATĪ =====
    { t: 'Pārvatī Mā — Ādiśakti, the eternal Mother', p: 'parvati.html', d: 'पार्वती', s: 'Ādiśakti panel, Navadurgā 9-grid, and 6 classical forms of the Mother.', g: 'Pārvatī' },
    { t: 'Navadurgā — the 9 forms of the festival', p: 'parvati.html#nava', d: 'नवदुर्गा', s: 'Śailaputrī through Siddhidātrī — one form for each night of Navarātri.', g: 'Pārvatī' },
    { t: 'Śailaputrī — daughter of the mountain (Day 1)', p: 'parvati.html#nava-1', d: 'शैलपुत्री', s: 'Mūlādhāra cakra · white bull · sense of foundation.', g: 'Pārvatī' },
    { t: 'Brahmacāriṇī — walker on the path of tapas (Day 2)', p: 'parvati.html#nava-2', d: 'ब्रह्मचारिणी', s: 'Svādhiṣṭhāna cakra · standing on bare feet.', g: 'Pārvatī' },
    { t: 'Candraghaṇṭā — bearing the moon-bell (Day 3)', p: 'parvati.html#nava-3', d: 'चन्द्रघण्टा', s: 'Maṇipūra · golden complexion · rides a tiger.', g: 'Pārvatī' },
    { t: 'Kūṣmāṇḍā — creator of the cosmic egg (Day 4)', p: 'parvati.html#nava-4', d: 'कूष्माण्डा', s: 'Anāhata · whose smile produces the universe.', g: 'Pārvatī' },
    { t: 'Skandamātā — mother of Kumāra (Day 5)', p: 'parvati.html#nava-5', d: 'स्कन्दमाता', s: 'Viśuddha · holds the infant Kārtikeya on Her lap.', g: 'Pārvatī' },
    { t: 'Kātyāyanī — slayer of Mahiṣāsura (Day 6)', p: 'parvati.html#nava-6', d: 'कात्यायनी', s: 'Born in sage Kātyāyana’s āśrama; bride-wish goddess.', g: 'Pārvatī' },
    { t: 'Kālarātri — the dark night, dispeller of fear (Day 7)', p: 'parvati.html#nava-7', d: 'कालरात्रि', s: 'Ājñā cakra · midnight-skinned, donkey vāhana.', g: 'Pārvatī' },
    { t: 'Mahāgaurī — the supreme luminous (Day 8)', p: 'parvati.html#nava-8', d: 'महागौरी', s: 'Sahasrāra · the pure white Pārvatī after Her tapasyā.', g: 'Pārvatī' },
    { t: 'Siddhidātrī — bestower of all attainments (Day 9)', p: 'parvati.html#nava-9', d: 'सिद्धिदात्री', s: 'Crown cakra · gave Śiva His ardhanārī body.', g: 'Pārvatī' },
    { t: 'Annapūrṇā — She who feeds the worlds', p: 'parvati.html#form-annapurna', d: 'अन्नपूर्णा', s: 'Pārvatī as the queen of Kāśī who feeds even Śiva from Her ladle.', g: 'Pārvatī' },
    { t: 'Lalitā Tripurasundarī — supreme Śrī Vidyā', p: 'parvati.html#form-lalita', d: 'ललिता', s: 'The most beautiful in the three worlds, seated on the Śrī Cakra.', g: 'Pārvatī' },
    { t: 'Mīnākṣī — fish-eyed mother of Madurai', p: 'parvati.html#form-minakshi', d: 'मीनाक्षी', s: 'Pāṇḍya queen-goddess wedded to Sundareśvara.', g: 'Pārvatī' },

    // ===== KĀLĪ =====
    { t: 'Kālī Mā — Daśa Mahāvidyā', p: 'kali.html', d: 'काली', s: 'Origin from Raktabīja war, then the ten Mahāvidyās in detail.', g: 'Kālī' },
    { t: 'Raktabīja — the bleeding asura', p: 'kali.html#origin', d: 'रक्तबीज', s: 'Each drop of his blood spawned another like him; Kālī drank from the air.', g: 'Kālī' },
    { t: 'I · Kālī — liberator from time', p: 'kali.html#mv-01', d: 'काली', s: 'The first Mahāvidyā, blue-black, garland of skulls, foot on Śiva.', g: 'Kālī' },
    { t: 'II · Tārā — saviour goddess, saved Śiva after hālāhala', p: 'kali.html#mv-02', d: 'तारा', s: 'North direction · safe crossings · taught by Buddha to the Tibetans.', g: 'Kālī' },
    { t: 'III · Tripurasundarī — Śrī Vidyā', p: 'kali.html#mv-03', d: 'त्रिपुरसुन्दरी', s: 'East · the great Śrī Cakra goddess of Tantra.', g: 'Kālī' },
    { t: 'IV · Bhuvaneśvarī — sovereign of the spheres', p: 'kali.html#mv-04', d: 'भुवनेश्वरी', s: 'West · ākāśa-element; the Mother of the worlds.', g: 'Kālī' },
    { t: 'V · Bhairavī — tapas-fire goddess', p: 'kali.html#mv-05', d: 'भैरवी', s: 'SE · Bhairava’s consort; the heat of penance.', g: 'Kālī' },
    { t: 'VI · Chinnamastā — the self-decapitated', p: 'kali.html#mv-06', d: 'छिन्नमस्ता', s: 'NE · three streams of blood feeding Ḍākinī, Varṇinī, and Her own severed head.', g: 'Kālī' },
    { t: 'VII · Dhūmāvatī — the smoke widow', p: 'kali.html#mv-07', d: 'धूमावती', s: 'SW · the only widow Mahāvidyā; rides a wheel-less chariot.', g: 'Kālī' },
    { t: 'VIII · Bagalāmukhī — paralyser of speech', p: 'kali.html#mv-08', d: 'बगलामुखी', s: 'South · stambhana-vidyā; pulls the enemy’s tongue with one hand.', g: 'Kālī' },
    { t: 'IX · Mātaṅgī — outcaste Sarasvatī', p: 'kali.html#mv-09', d: 'मातङ्गी', s: 'NW · vīṇā · accepts the leftover food, queen of poetry.', g: 'Kālī' },
    { t: 'X · Kamalā — Tantric Lakṣmī', p: 'kali.html#mv-10', d: 'कमला', s: 'Centre · four elephants pour water on Her from golden pots.', g: 'Kālī' },

    // ===== TRIMŪRTI =====
    { t: 'Trimūrti — Brahmā, Viṣṇu, Śiva', p: 'trimurti.html', d: 'त्रिमूर्ति', s: 'Three faces of the One Brahman, breath as trinity.', g: 'Trimūrti' },
    { t: 'Brahmā — the creator', p: 'trimurti.html#brahma', d: 'ब्रह्मा', s: 'Born of Viṣṇu’s navel-lotus; only 2 temples after losing the fifth head.', g: 'Trimūrti' },
    { t: 'Viṣṇu — the preserver', p: 'trimurti.html#vishnu', d: 'विष्णु', s: 'Reclines on Ananta-Śeṣa, with Lakṣmī at His feet, garuḍa as vāhana.', g: 'Trimūrti' },
    { t: 'Śiva — the dissolver', p: 'trimurti.html#shiva', d: 'शिव', s: 'Performs not three but five acts: Pañcakṛtya-kartā.', g: 'Trimūrti' },
    { t: 'Liṅgodbhava — the pillar of light', p: 'trimurti.html#lingodbhava', d: 'लिङ्गोद्भव', s: 'Why Brahmā has only 2 temples and Viṣṇu is the eternal best man.', g: 'Trimūrti' },

    // ===== THEMES =====
    { t: 'Themes — 8 eternal currents of the codex', p: 'themes.html', d: 'भाव', s: 'Bhasma, ānanda, tapas, prema, mauna, līlā, ākāśa, anugraha.', g: 'Themes' },
    { t: 'Bhasma — ash, impermanence', p: 'themes.html#th-1', d: 'भस्म', s: 'The white-grey dust that reminds us nothing endures except awareness.', g: 'Themes' },
    { t: 'Ānanda — bliss for its own sake', p: 'themes.html#th-2', d: 'आनन्द', s: 'The dance with no audience; the joy that needs no reason.', g: 'Themes' },
    { t: 'Tapas — the refining fire', p: 'themes.html#th-3', d: 'तपस्', s: 'Voluntary heat that purifies; the engine of every transformation.', g: 'Themes' },
    { t: 'Prema — love as the ultimate reality', p: 'themes.html#th-4', d: 'प्रेम', s: 'The current that wedded Śiva to Pārvatī and holds the cosmos together.', g: 'Themes' },
    { t: 'Mauna — the silence of Dakṣiṇāmūrti', p: 'themes.html#th-5', d: 'मौन', s: 'The teaching that has no need of words.', g: 'Themes' },
    { t: 'Līlā — cosmic play', p: 'themes.html#th-6', d: 'लीला', s: 'All of creation as Śiva’s game; serious but not solemn.', g: 'Themes' },
    { t: 'Ākāśa — spaciousness, Cidambaram', p: 'themes.html#th-7', d: 'आकाश', s: 'The empty inner-sanctum that contains everything.', g: 'Themes' },
    { t: 'Anugraha — grace asking nothing', p: 'themes.html#th-8', d: 'अनुग्रह', s: 'The fifth act; pure unearned compassion.', g: 'Themes' },

    // ===== LINEAGE =====
    { t: 'Lineage — the divine family tree', p: 'lineage.html', d: 'वंश', s: 'From Parabrahman through Trimūrti to the gaṇas of Kailāsa.', g: 'Lineage' },
    { t: 'Gen I — Parabrahman, the unmanifest source', p: 'lineage.html#gen-1', d: 'परं ब्रह्म', s: 'Before names, before time; the silence from which all forms arise.', g: 'Lineage' },
    { t: 'Gen II — Trimūrti', p: 'lineage.html#gen-2', d: 'त्रिमूर्ति', s: 'Brahmā creates, Viṣṇu preserves, Śiva dissolves.', g: 'Lineage' },
    { t: 'Gen III — Śiva-Pārvatī and Their children', p: 'lineage.html#gen-3', d: 'सन्तति', s: 'Gaṇeśa, Kārtikeya, and the daughter Aśokasundarī.', g: 'Lineage' },
    { t: 'Gen IV — Court of Kailāsa', p: 'lineage.html#gen-4', d: 'कैलासगण', s: 'Nandi, Vīrabhadra, Bhairava, Bhṛṅgī — the inner circle.', g: 'Lineage' },
    { t: 'Gen V — The Students', p: 'lineage.html#gen-5', d: 'शिष्याः', s: 'Four Kumāras, Mārkaṇḍeya, Nārada, Durvāsa, Ādi Śaṅkara.', g: 'Lineage' },

    // ===== GLOSSARY =====
    { t: 'Glossary — Śabdakośa of the Codex', p: 'glossary.html', d: 'शब्दकोश', s: 'A-to-Z dictionary of every Sanskrit term used across the chapters.', g: 'Glossary' }
  ];

  /* -------- Build modal DOM (once) -------- */
  let modal, input, results, isOpen = false, activeIdx = -1, currentItems = [];

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Search the codex');
    modal.innerHTML = `
      <div class="search-panel" role="combobox" aria-expanded="true" aria-haspopup="listbox" aria-owns="searchResults">
        <div class="search-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input type="search" class="search-input" id="searchInput" autocomplete="off" spellcheck="false"
                 placeholder="Search the codex — kathās, peeṭhas, mantras, beings…" aria-label="Search query" />
          <button class="search-close" type="button" data-search-close aria-label="Close search">
            <span class="search-esc">ESC</span>
          </button>
        </div>
        <div class="search-results" id="searchResults" role="listbox" aria-label="Search results"></div>
        <div class="search-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> to navigate · <kbd>↵</kbd> to open</span>
          <span><kbd>Ctrl</kbd>+<kbd>K</kbd> or <kbd>/</kbd> to open · <kbd>Esc</kbd> to close</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    input   = modal.querySelector('.search-input');
    results = modal.querySelector('.search-results');

    // Close on backdrop click
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
    // Close on close button
    modal.querySelector('[data-search-close]').addEventListener('click', closeSearch);
    // Input handling
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', onKey);
  }

  /* -------- Highlight matching substrings -------- */
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const safe = escapeHtml(text);
    const re   = new RegExp('(' + escapeReg(q) + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* -------- Scoring + render -------- */
  function score(item, q) {
    const lq = q.toLowerCase();
    const t  = item.t.toLowerCase();
    const s  = (item.s || '').toLowerCase();
    const d  = (item.d || '');
    let pts = 0;
    if (t.startsWith(lq)) pts += 100;
    if (t.includes(lq))   pts += 50;
    if (d.includes(q))    pts += 40;          // devanagari exact
    if (s.includes(lq))   pts += 15;
    // small bonus per word match
    lq.split(/\s+/).filter(Boolean).forEach(w => {
      if (t.includes(w)) pts += 10;
      if (s.includes(w)) pts += 3;
    });
    return pts;
  }

  function render(q) {
    q = (q || '').trim();
    if (!q) {
      // Welcome state — show curated highlights
      const curated = ['Home','Pantheon','Jyotirliṅgas','Peeṭhas','Kathās','Pārvatī','Glossary'];
      const groups  = {};
      INDEX.filter(x => curated.includes(x.g) && !x.p.includes('#')).forEach(x => {
        (groups[x.g] = groups[x.g] || []).push(x);
      });
      results.innerHTML = renderGroups(groups, '');
      currentItems = INDEX.filter(x => curated.includes(x.g) && !x.p.includes('#'));
      activeIdx = -1;
      return;
    }
    const scored = INDEX
      .map(x => ({ x, s: score(x, q) }))
      .filter(o => o.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map(o => o.x);

    currentItems = scored;
    activeIdx = scored.length ? 0 : -1;

    if (!scored.length) {
      results.innerHTML = `
        <div class="search-empty">
          <div class="search-empty__big">ॐ</div>
          <p>No matches for <strong>"${escapeHtml(q)}"</strong>.</p>
          <p style="font-size:.85rem; opacity:.7;">Try a deity name, a peeṭha, a kathā number, or a Sanskrit term.</p>
        </div>`;
      return;
    }
    // group by page
    const groups = {};
    scored.forEach(x => { (groups[x.g] = groups[x.g] || []).push(x); });
    results.innerHTML = renderGroups(groups, q);
    paintActive();
  }

  function renderGroups(groups, q) {
    let html = '';
    let i = 0;
    Object.keys(groups).forEach(g => {
      html += `<div class="search-group">${escapeHtml(g)}</div>`;
      groups[g].forEach(x => {
        html += `
          <a class="search-result" role="option" href="${x.p}" data-idx="${i}">
            <span class="search-result__deva" aria-hidden="true">${x.d || '✦'}</span>
            <span class="search-result__body">
              <p class="search-result__title">${highlight(x.t, q)}</p>
              <p class="search-result__snip">${highlight(x.s || '', q)}</p>
            </span>
            <span class="search-result__page">${escapeHtml(x.g)}</span>
          </a>`;
        i++;
      });
    });
    return html;
  }

  function paintActive() {
    if (!results) return;
    results.querySelectorAll('.search-result').forEach((el, i) => {
      el.classList.toggle('is-active', i === activeIdx);
    });
    const el = results.querySelector('.search-result.is-active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  /* -------- Keyboard -------- */
  function onKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!currentItems.length) return;
      activeIdx = (activeIdx + 1) % currentItems.length;
      paintActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!currentItems.length) return;
      activeIdx = (activeIdx - 1 + currentItems.length) % currentItems.length;
      paintActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const el = results.querySelector('.search-result.is-active') || results.querySelector('.search-result');
      if (el) window.location.href = el.getAttribute('href');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    }
  }

  /* -------- Open / Close -------- */
  function openSearch() {
    buildModal();
    if (isOpen) return;
    modal.classList.add('is-open');
    document.body.classList.add('search-open');
    isOpen = true;
    render('');
    setTimeout(() => input && input.focus(), 30);
  }
  function closeSearch() {
    if (!isOpen) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('search-open');
    isOpen = false;
    if (input) input.value = '';
  }

  /* -------- Wire triggers -------- */
  function init() {
    // Click on any [data-search-open]
    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });
    // Global keys
    document.addEventListener('keydown', (e) => {
      const inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
        return;
      }
      // "/" anywhere except in another input
      if (e.key === '/' && !inField && !isOpen) {
        e.preventDefault();
        openSearch();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
