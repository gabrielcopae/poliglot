# Poliglot — ce s-a făcut până acum

Ultima actualizare: 5 noiembrie 2026

Dacă începi o conversație nouă cu Claude, spune-i:
**„Citește fișierul D:\Traducator\PROGRES.md și continuă de unde ai rămas.”**

---

## 1. Aplicația (funcții)

- **Aplicație PWA** (merge pe laptop și pe telefon, fără internet după prima încărcare). Pornire: dublu-click pe `porneste.bat`.
- **Complet gratuită**: fără servicii plătite. Vocea e cea a sistemului (Windows / Android / iPhone).
- **Interfață cu 4 anotimpuri**, schimbate automat (primăvară, vară, toamnă, iarnă), plus zi și noapte. Are particule animate (petale, licurici, frunze, zăpadă), dealuri și un copac care se schimbă cu anotimpul.
- **Animația de început**: o carte apare, se deschide și se închide.
- **Conturi cu utilizator și parolă**, fiecare cu progresul lui separat.
- **Desfășurător** pentru fiecare limbă:
  - Ședința 1, Ședința 2, Teme…, grupate pe niveluri (A1, A2, B1… / N5, N4…).
  - Ține minte unde ai rămas („Continuă de unde ai rămas”).
- **Fiecare capitol** are:
  - **Ședința 1** (~40 min): încălzire cu recapitulare din capitolele vechi, dialog cu audio, cuvinte noi, exerciții, dictare, **Povestea capitolului** și text de lectură.
  - **Ședința 2** (~40 min): gramatică explicată detaliat, exerciții, roleplay, test.
  - **Teme** (~30 min): exerciții, traduceri, text de citit, compunere, exercițiu de vorbit.
- După ce termini o ședință ai un **cuprins**, din care sari la orice parte. Butonul **„Ia-o de la capăt”** șterge progresul capitolului.
- **Recapitulare inteligentă** a cuvintelor (repetiție spațiată, FSRS).
- **Dicționar** separat pentru fiecare limbă, cu 🔊 la fiecare cuvânt.
- **Cititor de texte**: rând cu rând, cu evidențiere, voci de bărbat și femeie, traducere la cerere și explicație la atingerea unui cuvânt. Poveștile apar ca o carte, pe paragrafe.
- **Japoneză**: lecții de hiragana și katakana, romaji la fiecare rând, cuvinte separate prin spații.
- **Regula textelor**: fiecare capitol are dialog **și** o poveste narativă, iar poveștile sunt tot mai lungi de la un capitol la altul.
- **Online, pe telefon**: https://gabrielcopae.github.io/poliglot/ (GitHub Pages, gratuit). Se instalează pe ecranul telefonului. Fiecare modificare verificată e publicată automat.
- **Voci înregistrate pentru telefon** (Kokoro, generate pe laptop): spaniolă Dora / Alex, japoneză Alpha / Kumo, italiană Sara / Nicola. Pe laptop rămân vocile Windows. În Setări: comutator și „Descarcă pentru offline”, plus alegerea vocii pentru cuvinte, femei și bărbați și un panou de diagnostic.
- **Ecran de start aerisit**: repetiția, cele 3 butoane (Pașaport, Conversații, Album) și limbile. În fiecare limbă: filele „În desfășurare” și „Lecții” (niveluri, unități, capitole cu bulinuțe).
- **🛂 Pașaportul călătorului**: o ștampilă (loc + dată) pentru fiecare capitol terminat; o viză pentru fiecare test de nivel trecut.
- **🃏 Albumul cu amintiri**: un cartonaș pentru fiecare capitol terminat; cele aurii sunt obiectele din povești (inelul lui Vasile, cocorul roșu, Leica lui Ion…).
- **💬 Conversează cu personajele**: 6 scene interactive (spaniolă: Kenji, Madrid, interviul Cervantes; japoneză: gara, ramen, Sakura rătăcită), cu reacții la greșeli, explicații și stele.
- **🏙️ Cartonașe pentru seria de zile**: în fiecare zi de învățat câștigi un loc unde se vorbește limba (Spania, America Latină, Japonia, Italia, Elveția, San Marino; România ca bonus): fotografie reală liberă (Wikimedia Commons), ramă (aurie la fiecare a 7-a zi), fun fact despre limbă pe spate. 62 de locuri; lista e în tools/rewards-list.mjs, pozele se refac cu node tools/fetch-rewards.mjs.
- **📚 Cartonașele ședințelor** (colecție separată, pe fiecare limbă): Ședința 1 și 2 din fiecare capitol → câte un loc din lumea limbii, cu fotografie și fun fact; Temele (ultima ședință) → cartonaș special auriu cu povestea capitolului. Lecțiile scurte → câte un loc. Locuri: 199 (es 132 = toate capitolele A1–B1, ja 61, it 6); listele: tools/session-places-list.mjs și tools/session-places-es2.mjs, pozele: node tools/fetch-rewards.mjs session. Pentru B2 și C1 se adaugă locuri noi odată cu capitolele.
- **👑 Contul admin**: utilizatorul „admin”, cu parolă fixă (în cod e doar amprenta ei, în src/accounts.ts). Vede toate cartonașele deblocate, cu filtru pe limbi.
- **🖌️ Kanji cu degetul** (japoneză → butonul „Kanji”): 89 de kanji N5 pe teme, cu sens, citiri, exemplu cu 🔊, animația ordinii liniilor, scris cu contur și din memorie (verde = exersat, auriu = din memorie). Linii din KanjiVG (CC BY-SA 3.0); lista e în tools/kanji-list.mjs, datele se refac cu node tools/fetch-kanji.mjs.
- **🏝️ Insula ta**: desen care crește din progres (case = capitole, copaci = cuvinte, locuitori = zile, bărci = conversații, far = test de nivel, moară = 10 kanji, soare = serie de 3 zile).
- **🚂 Trenul limbilor**: gările sunt locurile ședințelor, trenul înaintează cu fiecare ședință terminată.
- **🏛️ Muzeul personalităților**: portretele de pe ștampile, într-o galerie pe limbi.
- **🎎 Calendarul sărbătorilor**: 28 de sărbători (Spania, America Latină, Japonia, Italia), cu obiceiuri și cuvinte; anunț pe ecranul de start în ziua respectivă.
- **🧩 Perechi**, **📅 Calendarul** zilelor de învățat (fila Progres), **✨ cartonașe holografice** pentru serie, **🔍 prim-plan** cu ramă animată la atingerea oricărui cartonaș sau ștampile.
- **🛂 Ștampilele** au acum personalități (66 la spaniolă, 25 la japoneză): portret, oraș natal, fun fact (tools/people-list.mjs; pozele cu node tools/fetch-rewards.mjs people).
- **📝 Teste de nivel** (stil DELE / JLPT): 30 de întrebări din tot nivelul, 60% pentru trecere, viza apare în pașaport.
- **🌐 Interfața în 7 limbi** (Setări → limba interfeței): română, engleză, spaniolă, italiană, franceză, germană, japoneză. Lecțiile, explicațiile și poveștile sunt adaptate pentru fiecare limbă, nu traduse cuvânt cu cuvânt. Complet pentru toate 7. Încă lipsesc capitolele cursului de spaniolă (es-cap) în spaniolă, italiană, franceză, germană și japoneză (acolo apar deocamdată în engleză), plus cursul de japoneză în interfața japoneză (nu e nevoie de el).

---

## 2. Spaniolă 🇪🇸

Ordinea limbilor: întâi spaniolă și japoneză. Italiana vine după ce spaniola trece de A2.

### A1 — complet (capitolele 1–12)
Ser, estar, tener, familia, mâncarea, casa, orașul, ziua, cumpărăturile, vremea, gustar, planurile.

### A2 — complet (capitolele 13–36)
Perfecto, indefinido, neregulatele, imperfecto, imperfecto vs indefinido, pronumele, superlativul, gerunziul, viitorul, imperativul, la doctor, la hotel, munca, „se me”, condiționalul, ser/estar avansat, por/para, sentimente, păreri, relativele, sărbători, pluscuamperfecto, vorbirea indirectă, recapitularea A2 (călătoria în Japonia și cererea în căsătorie).

### B1 — complet: 30 din 30 de capitole (37–66)

| Unitate | Capitol | Temă | Stare |
|---|---|---|---|
| B1 · Dorințe și emoții | 37 | Subjonctiv prezent: quiero que, espero que, ojalá | ✅ testat |
| | 38 | Emoții + expresii impersonale (me alegra que, es importante que) | ✅ testat |
| | 39 | Părere și îndoială (creo que / no creo que, dudo que, a lo mejor) | ✅ testat |
| | 40 | Cuando + subjonctiv, antes de que, para que | ✅ testat |
| B1 · Ce-ar fi dacă… | 41 | Subjonctiv imperfect, concordanța timpurilor | ✅ testat |
| | 42 | Si tuviera…, viajaría… (ipoteze) | ✅ testat |
| | 43 | Como si, ojalá + imperfect, me gustaría que, aunque | ✅ testat |
| | 44 | Haya hecho, si hubiera sabido… (recapitularea subjonctivului) | ✅ testat |
| B1 · Lumea largă | 45 | Pasivul cu ser și cu se, se impersonal | ✅ testat |
| | 46 | Propoziții relative (lo que, el que, cuyo, donde) + subjonctiv în relative | ✅ testat |
| | 47 | Vorbirea indirectă la trecut (dijo que vendría, preguntó si) | ✅ testat |
| | 48 | Perifraze verbale (acabar de, llevar + gerundiu, volver a, dejar de) | ✅ testat |
| B1 · Viață nouă | 49 | Presupuneri și viitor anterior (¿dónde estará?, habré terminado) | ✅ testat |
| | 50 | Conectori (sin embargo, aun así, por lo tanto, en cambio) | ✅ testat |
| | 51 | Verbe de schimbare (ponerse, volverse, hacerse, quedarse) | ✅ testat |
| | 52 | Verbe cu prepoziție (pensar en, soñar con, acordarse de) + recapitulare | ✅ testat |
| B1 · Lumea muncii | 53 | Limbaj formal: scrisoare, CV, interviu | ✅ testat |
| | 54 | Ser / estar cu adjective care își schimbă sensul | ✅ testat |
| | 55 | Diminutive, augmentative, limbaj colocvial | ✅ testat |
| | 56 | Argumentare și dezbatere + recapitulare | ✅ testat |
| B1 · Condiții și nuanțe | 57 | Condiții: en caso de que, a menos que, siempre que, de + infinitiv, por si | ✅ testat |
| | 58 | Cauză și scop: como, ya que, dado que, gracias a, por culpa de, para que | ✅ testat |
| | 59 | Concesie: aunque, a pesar de (que), por mucho que, por muy… que, y eso que | ✅ testat |
| | 60 | „Lo” neutru: lo bueno, lo que, lo difícil que es, lo de + recapitulare | ✅ testat |
| B1 · Media și societate | 61 | Stilul de presă: según, verbe declarative, condițional de zvon, pasiv | ✅ testat |
| | 62 | Mediul: es urgente que + subj., hace falta que, deberíamos, cada vez más | ✅ testat |
| | 63 | Sănătate și obiceiuri: soler, acostumbrarse a, dejar de, volver a, seguir + gerunziu | ✅ testat |
| | 64 | Tehnologie: no es que + subj., el hecho de que, imperativ cu pronume + recapitulare | ✅ testat |
| B1 · Finalul B1 | 65 | Narațiune avansată: toate timpurile trecute + subjonctiv la trecut, conectori | ✅ testat |
| | 66 | Recapitulare B1 în format DELE + decizia Anei și a lui Mihai | ✅ testat |

### B2 — COMPLET: 36 din 36 de capitole (67–102)

| Unitate | Capitol | Temă | Stare |
|---|---|---|---|
| B2 · Nuanțele trecutului | 67 | Perfecto / indefinido / imperfecto / pluscuamperfecto, soler, pretérito anterior (tortilla lui Mihai) | ✅ testat |
| | 68 | Perifraze verbale de nivel B2 (volver a, dejar de, estar a punto de, llevar + gerunziu, tener + participiu) — cei zece ani ai Ecaterinei la Madrid | ✅ testat |
| | 69 | Viitorul și condiționalul de probabilitate, a lo mejor, puede que, deber de (litera mică din dedicație) | ✅ testat |
| | 70 | Vorbirea indirectă avansată + recapitularea unității (apelul video cu Andrés) | ✅ testat |
| B2 · Opinie și argumentare | 71 | Opinie și apreciere: creo que / no creo que, es evidente / es normal que, no es que… sino que (reîntâlnirea de la Madrid) | ✅ testat |
| | 72 | Cauză și consecință: como, ya que, debido a, gracias a / por culpa de, tan… que, de ahí que (postarea virală) | ✅ testat |
| | 73 | Concesia: aunque + ind./subj., por mucho que, por muy… que, si bien, y eso que (ultimele cinci pagini ale traducerii) | ✅ testat |
| | 74 | Condițiile: siempre que, con tal de que, a no ser que, en caso de que, de + infinitiv, como + subj. + recapitulare (lansarea de la București) | ✅ testat |
| B2 · Limba scrisă | 75 | Pronumele relative: el que, quien, el cual, cuyo, lo que / lo cual, explicative și specificative (camionul cu cărți) | ✅ testat |
| | 76 | Pasivul și impersonalul: ser / estar + participiu, se pasiv, se impersonal, persoana a III-a plural (Târgul de Carte de la Madrid) | ✅ testat |
| | 77 | Registrul formal: nominalizarea, conectorii (en primer lugar, asimismo, cabe destacar, no obstante), scrisoarea oficială (placa de pe strada Huertas) | ✅ testat |
| | 78 | Condoleanțe formale și personale, subjonctivul în urări + recapitularea unității (moartea lui Andrés, scrisoarea fără adresă) | ✅ testat |
| B2 · Schimbări și începuturi | 79 | Verbele de schimbare: ponerse, volverse, hacerse, convertirse en, llegar a ser, quedarse (iulie pe balcon, cartea Ecaterinei) | ✅ testat |
| | 80 | Por și para la nivel B2, expresii fixe, verbele cu prepoziție (august la sat, Andrei pleacă la Madrid) | ✅ testat |
| | 81 | Propozițiile temporale: al / nada más + infinitiv, en cuanto, una vez que, a medida que, desde que, hasta que, participiul absolut (septembrie la Madrid) | ✅ testat |
| | 82 | Trecutul ireal: si + hubiera → habría, condiționale mixte, de + infinitiv compus, ojalá + hubiera (dezvelirea plăcii) | ✅ testat |
| | 83 | Comparația avansată: cuanto más… más, cada vez más, tanto… como, el doble de, más de lo que, -ísimo, de lo más (examenul DELE B2) | ✅ testat |
| | 84 | Pronumele: se lo, poziția cu infinitiv / gerunziu / imperativ, dublarea complementului, se intensiv și se involuntar (Crăciunul la București, manuscrisul) | ✅ testat |
| B2 · Comunicare și nuanțe | 85 | Verbele de influență: pedir, rogar, aconsejar, prohibir, permitir + subjonctiv / infinitiv (notele editoarei, ianuarie) | ✅ testat |
| | 86 | Marcatorii discursului: es decir, o sea, en cambio, de todos modos, por cierto (rezultatele DELE B2) | ✅ testat |
| | 87 | Dorințele: ojalá, que + subjonctiv, a ver si, ¡quién pudiera! (încheietura ruptă, ghipsul Ecaterinei) | ✅ testat |
| | 88 | Exclamațiile: ¡qué…!, ¡cuánto…!, ¡vaya…!, lo + adjectiv + que (lansarea de la Madrid) | ✅ testat |
| | 89 | Gerunziul: perifraze, valori, greșeli tipice (lansarea de la Sevilla, doña Remedios) | ✅ testat |
| | 90 | Expresii idiomatice + recapitularea unității (Târgul de Carte, Faustino și doña Remedios) | ✅ testat |
| B2 · Vocabular și stil | 91 | Verbe care își schimbă sensul cu se: quedar/quedarse, llevar/llevarse, acordar/acordarse (lămpile din 18 iunie) | ✅ testat |
| | 92 | Pase lo que pase, digan lo que digan, indefinitele în -quiera (examenul C1, pneumonia bunicului, cererea în căsătorie) | ✅ testat |
| | 93 | Articolul de opinie și eseul argumentativ (bunicul la 97 de ani, „Las cartas que no mandamos”) | ✅ testat |
| | 94 | Verbele declarative și modul: asegurar, negar que, prometer que + condițional, advertir / recordar cu două moduri (rezultatele C1, ultima zi a lui Faustino pe Cuesta de Moyano) | ✅ testat |
| | 95 | Formarea cuvintelor: prefixe și sufixe (lansarea „Lampa aprinsă”, nunta de la Triana) | ✅ testat |
| | 96 | Colocațiile + recapitularea unității (al doilea examen C1 al domnului Dan, prima ninsoare) | ✅ testat |
| B2 · Finalul B2 | 97 | Scopul și consecința: para que, no vaya a ser que, de modo que, de ahí que (serbarea de Crăciun, atlasul din 1980, Revelionul la sat) | ✅ testat |
| | 98 | Ser și estar la nivel B2: adjective cu sens schimbat, estar de, ser pentru evenimente, pasiv vs rezultat (primul drum al lui Costel la Valencia, nucul lui Gheorghe plantat la liceul lui Álex, domnul Dan trece C1) | ✅ testat |
| | 99 | Timpurile povestirii: prezentul istoric, viitorul în trecut (condițional, iba a… pero, estaba a punto de… cuando), conectori narativi (februarie la Triana, introducerea antologiei, portocalul înflorit de Ziua Andaluziei) | ✅ testat |
| | 100 | Registrul colocvial: pues, venga, vaya, anda, o sea, ¡qué pasada!, ¡no me digas!, mogollón, colocvial vs formal (mărțișoarele pentru Spania, Costel pe Cuesta de Moyano cu Lucas, încolțește nucul de la Valencia) | ✅ testat |
| | 101 | Sentimente cu subjonctiv și corespondența timpurilor: me alegro de que hayas venido, me alegré de que vinieras, me habría gustado que, expresii de emoție (Ziua Cărții la Madrid, lansarea dublă, băiatul din Teruel și tatăl lui, scrisoarea Begoñei) | ✅ testat |
| | 102 | Marea recapitulare B2 în format DELE: timpuri, subjonctiv, trecut ireal, conectori, ser/estar, por/para, structura examenului (lămpile din 18 iunie, prima scrisoare a bunicului Gheorghe) | ✅ testat |

Poveștile B2: 67: 1480 · 68: 1511 · 69: 1540 · 70: 1572 · 71: 1579 · 72: 1630 · 73: 1642 · 74: 1645 · 75: 1675 · 76: 1752 · 77: 2028 · 78: 2169 · 79: 2239 · 80: 2395 · 81: 2448 · 82: 2501 · 83: 2554 · 84: 2614 · 85: 2672 · 86: 2732 · 87: 2778 · 88: 2886 · 89: 2944 · 90: 3033 · 91: 3095 · 92: 3176 · 93: 3232 · 94: 3237 · 95: 3363 · 96: 3538 · 97: 3648 · 98: 3850 · 99: 3964 · 100: 4034 · 101: 4092 · **102: 4175**. Primul capitol C1 (103) trebuie să aibă peste 4175.

🎓 **Nivelul B2 la spaniolă e COMPLET** (capitolele 67–102, șapte unități: „Nuanțele trecutului”, „Opinie și argumentare”, „Limba scrisă”, „Schimbări și începuturi”, „Comunicare și nuanțe”, „Vocabular și stil”, „Finalul B2”). Poveștile B2 au crescut de la 1480 la 4175 de cuvinte.

**Urmează:** celelalte limbi până la B2 (italiana, germana, japoneza), apoi C1.

**Firul poveștii în spaniolă:**
- Mihai (medic român) și Ana (profesoară de spaniolă) se cunosc la clubul de japoneză al lui Yuki. Kenji are un restaurant de ramen. Doamna Suzuki lucrează la bibliotecă și are pisica Tama.
- Ana și Mihai se căsătoresc pe 17 mai. Kenji e nașul. Cele două mame, Carmen și Elena, devin prietene.
- Luna de miere o petrec la bunicul Gheorghe, în Carpați. Yuki se întoarce la Tokyo.
- Mihai primește un post la București, iar ei se mută acolo pentru 2 ani. Ana predă la un liceu, unde îl are elev pe Andrei, care desenează.
- Ana e însărcinată: fetița se va numi **Rosa Elena**. Bunicul îi sculptează un leagăn.
- Casa bunicii lui Mihai a fost salvată, iar ei primesc cheia de la vecina, doamna Maria.
- Meșterul Ilie renovează casa și găsește sub podea o cutie cu inelul făcut de bunicul Vasile în război.
- Rosa Elena se naște pe 15 ianuarie. Familia lui Kenji vine în vizită. Bunicul Gheorghe vine la București și descoperă că a fost pe front cu Vasile.
- Se mută în casa renovată. Andrei câștigă un concurs de desen, iar tatăl lui acceptă să-l lase să devină arhitect.
- La un an, primele cuvinte ale Rosei Elena sunt „Pa” (tata / pan / pâine) și „Bu” (bunicu). Yuki s-a îndrăgostit de Takeshi.
- Ana e angajată la Institutul Cervantes din București (interviul cu Rosa Elena în brațe). Elevii ei adulți: Costel (șofer de camion), doamna Ecaterina (traducătoarea lui García Márquez în română) și domnul Dan, tatăl lui Andrei.
- Andrei petrece o vară la Madrid și se împrietenește cu doña Paquita, care vinde bilete de loterie. La grădinița Rosei Elena, părinții acceptă poveștile în mai multe limbi.
- Furtună pe Vârful Omu (cap. 57). Yuki și Takeshi Mori se logodesc (cap. 58). Costel vrea să renunțe, dar vorbește cu nepotul Álex din Valencia despre camioane (cap. 59).
- Zborul spre Kyoto și doamna Tanaka, cu cei o mie de cocori de hârtie (cap. 60). Nunta șintoistă a lui Yuki la Shimogamo; doamna Tanaka e bunica lui Takeshi; Rosa Elena primește cocorul cu numărul o mie (cap. 61).
- Curățenie în Delta Văcărești; plantează un nuc nou în locul nucului bunicului Vasile și găsesc cutiuța îngropată de el, cu medalia din război (cap. 62).
- Elena află că are diabet, își schimbă obiceiurile și face cozonac fără zahăr; apare mătușa Viorica, sora mai mică a lui Vasile (cap. 63).
- Clipul Vioricăi despre nuc devine viral; îi găsește António din Porto, fiul lui Ion Mărgărit, al treilea prieten din fotografia de pe front (cap. 64).
- António vine în satul bunicului Gheorghe; noua fotografie de pe piatră; aparatul Leica al lui Ion ajunge la Andrei (cap. 65).
- Costel, domnul Dan și o colegă iau examenul DELE B1. La petrecere, Ana și Mihai anunță că rămân la București (verile le petrec la Madrid) (cap. 66).

**Lungimea poveștilor B1 (cuvinte):** 37: 564 · 38: 636 · 39: 654 · 40: 671 · 41: 687 · 42: 698 · 43: 713 · 44: 732 · 45: 768 · 46: 815 · 47: 838 · 48: 883 · 49: 909 · 50: 924 · 51: 961 · 52: 1010 · 53: 1058 · 54: 1073 · 55: 1124 · 56: 1196 · 57: 1207 · 58: 1224 · 59: 1234 · 60: 1246 · 61: 1283 · 62: 1325 · 63: 1334 · 64: 1346 · 65: 1362 · **66: 1416**. Primul capitol B2 (67) trebuie să aibă peste 1416.

---

## 3. Japoneză 🇯🇵

- **Hiragana și katakana**: lecții separate de scriere.
- **N5 — complet (capitolele 1–20)**, testate toate:

| Cap. | Temă | Cap. | Temă |
|---|---|---|---|
| 1 | はじめまして (prezentarea) | 11 | numărători (ひとつ, ～まい, ～ほん…) |
| 2 | これ / それ / あれ, prețuri | 12 | comparații (より, ほう, いちばん) |
| 3 | ここ / そこ, あります / います | 13 | ～たい, ほしい |
| 4 | ora, verbele ～ます | 14 | forma de dicționar, ～こと が できます |
| 5 | verbe de mișcare, transport | 15 | forma ～ない (trebuie / nu trebuie) |
| 6 | を, invitații | 16 | forma ～た (experiențe) |
| 7 | adjectivele い / な | 17 | stilul familiar |
| 8 | すき, じょうず, わかります, から | 18 | ～と おもいます / いいました |
| 9 | grupele de verbe, forma ～て | 19 | propoziții descriptive, ～とき |
| 10 | ～ています, e voie / nu e voie | 20 | înainte / după, recapitularea N5 |

- **Firul poveștii în japoneză:** excursia lui Mihai și a Anei în Japonia (Tokyo, Kyoto, Hiroshima). Doamna Suzuki se împacă cu sora ei, Fumiko. Mihai o cere în căsătorie pe Ana la poarta torii de la Miyajima (capitolul 20).
- **N4 — în lucru: 5 din 30 de capitole gata (21–25)**, testate toate. Unitatea „N4 · Pregătiri de nuntă”:

| Cap. | Temă |
|---|---|
| 21 | forma potențială (よめる, たべられる, できる), ～ように なる, primele kanji 山 川 人 日 |
| 22 | ～たら (dacă / când), ～たら どう です か, ～なら |
| 23 | a da și a primi: あげる / くれる / もらう, ～て あげる / くれる / もらう, かす / かりる |
| 24 | ～ば și ～と, indicații de drum, どう すれば いい, ～ば よかった |
| 25 | ～そう (pare / se zice), ～よう です, ～みたい, ～らしい + recapitularea unității |

- **Firul poveștii N4:** înapoi la Madrid. Mihai învață kanji ca să citească scrisoarea doamnei Fumiko (21). Cele două mame, Carmen și Elena, gătesc împreună și cos în secret floarea albastră pe rochie (22). Doamna Fumiko vine pentru prima dată în străinătate și îi dăruiește Anei acul de păr al mamei ei (23). Haruka și Sakura vin la Madrid; Sakura se rătăcește și găsește drumul după mirosul de ramen (24). Nunta din 17 mai, văzută de Sakura: Mihai răspunde „Hai!”, Kenji caută inelele (25). Totul se potrivește cu nunta din cursul de spaniolă (capitolul 38).
- **Poveștile cresc de la 58 la 640 de cuvinte** (21: 562 · 22: 573 · 23: 591 · 24: 593 · **25: 640**). Capitolul 26 trebuie să aibă peste 640.
- **Urmează: N4, capitolele 26–50**, apoi N3, N2, N1.

---

## 4. Italiană 🇮🇹

Curs nou, în formatul capitolelor (ca franceza), cu explicații în română și engleză. Cele 6 lecții vechi au fost înlocuite. Personaje: **Matei**, restaurator de picturi din Sibiu, se mută la Florența, în cartierul Oltrarno, deasupra trattoriei „Da Graziella”; **signora Graziella** (proprietăreasa, florentină) și nepotul ei **Pietro** (8 ani); **Giulia**, colegă restauratoare din Napoli; **profesorul Bellini**, șeful atelierului de restaurare, foarte serios. Sora lui Matei, **Ilinca**, e la Sibiu.

| Unitate | Cap. | Conținut | Stare |
|---|---|---|---|
| A1 · Primii pași | 1 | Ciao, essere, pronumele (și „Lei”), non, întrebări, pronunția (c/g, gn, gli, consoane duble) | ✅ testat |
| | 2 | Avere, vârsta, articolele (il/lo/la, un/uno/una), familia, c’è / ci sono, numerele 0–20 (motanul Michelangelo) | ✅ testat |
| | 3 | Prezentul verbelor regulate (-are, -ere, -ire, -isc-), limbile, „a” cu orașe / „in” cu țări (prima zi la atelier, profesorul Bellini) | ✅ testat |
| | 4 | Andare, fare, ora, zilele săptămânii (il lunedì), numerele până la 100 (săptămâna lui Pietro) | ✅ testat |
| A1 · Viața de zi cu zi | 5 | La bar: vorrei, volere, potere, bere, partitivul (del/della/dei), prețurile, regulile cafelei (cappuccino-ul de la patru) | ✅ testat |
| | 6 | Rutina zilnică, verbele reflexive (mi alzo, devo alzarmi), sempre / spesso / non… mai, presto / tardi / in ritardo (ziua Graziellei) | ✅ testat |
| | 7 | În oraș: indicații, imperativul (gira / giri), prepozițiile articulate, de loc, venire, uscire (harta comorii) | ✅ testat |
| | 8 | Haine și culori, acordul adjectivelor, pluralul, questo / quello (cămașa albastră și petrecerea Giuliei) | ✅ testat |
| A1 · Lumea din jur | 9 | Vremea, anotimpurile, lunile, data (il primo maggio), stare + gerunziu, stare per (cele patru fețe ale Florenței) | ✅ testat |
| | 10 | Passato prossimo cu avere, participiile regulate și neregulate, ieri / fa / scorso, già / non… ancora (jurnalul lui Pietro, raviolii) | ✅ testat |
| | 11 | Passato prossimo cu essere, acordul participiului, verbele reflexive la trecut, conectorii (scuza Giuliei, weekendul la Napoli) | ✅ testat |
| | 12 | Posesivele (il mio, mio padre, il loro), familia extinsă, recapitularea A1 (albumul Graziellei, Crăciunul la Sibiu) | ✅ testat |
| A2 · Povești din trecut | 13 | Imperfetto: descriere și obiceiuri, c’era / c’erano, una volta… adesso (interviul lui Pietro, copilăria profesorului Bellini) | ✅ testat |
| | 14 | Imperfetto + passato prossimo (mentre / quando), descrierea fizică, plângerea la poliție (bicicleta furată, inundația din 1966 și Aldo) | ✅ testat |
| | 15 | Pronumele complement direct (lo, la, li, le, mi, ti…), acordul participiului (l’ho vista), conoscere / sapere, „lo so” (vizita Ilincăi la Florența) | ✅ testat |
|  | 16 | Pronumele complement indirect (gli, le, mi, ti…), piacere la prezent și trecut, mancare / servire / sembrare (cadoul pentru Giulia, „Mi piaci. Da ottobre.”) | ✅ testat |
| A2 · Oameni, cadouri și locuri | 17 | Comparativul (più… di / che, tanto… quanto), superlativul relativ și absolut, migliore / meglio, peggiore / peggio (apartamentul nou al Giuliei, dezbaterea de Pasquetta) | ✅ testat |
|  | 18 | Particulele ci (loc, ci vuole, ci metto) și ne (cantitate, „che ne pensi?”), acordul cu ne (mutarea Giuliei la etajul patru fără lift) | ✅ testat |
|  | 19 | Viitorul simplu (regulat și neregulat), quando / appena + viitor, se + prezent / viitor, viitorul de probabilitate (planuri de vară, scrisoarea lui Pietro pentru 2045) | ✅ testat |
|  | 20 | Pronumele duble (me lo, glielo, ce ne), andarsene, recapitularea unității (ceasul lui Pietro, nouă lumânărele) | ✅ testat |
| A2 · Amintiri și planuri | 21 | Pronumele relative che, cui, il quale, quello che / ciò che, chi (Giulia la Sibiu, Podul Minciunilor, cina cu părinții lui Matei) | ✅ testat |
|  | 22 | Condiționalul prezent: politețe, dorințe, sfaturi (dovresti, al posto tuo), vești nesigure (oferta de la Muzeul Brukenthal, „Accettiamo.”) | ✅ testat |
|  | 23 | Trapassato prossimo, dopo che, già / appena / non… mai (vestea lui Pietro, scrisoarea lui Ernesto Bellini din 1972 și pensula) | ✅ testat |
|  | 24 | Gerunziul (camminando, pur essendo, avendo finito), recapitularea unității (cererea în căsătorie pe Ponte Santa Trinita, sub zăpadă) | ✅ testat |
| A2 · Emoții și păreri | 25 | Congiuntivo presente după voglio che, penso che, spero che, bisogna che; congiuntivo sau infinitiv (iarna la Sibiu, bunicile și nunta) | ✅ testat |
|  | 26 | Congiuntivo după emoții (sono felice che, ho paura che) și conjuncții (benché, perché, prima che, purché, senza che) (Paștele Doinei la Napoli, scrisoarea în napoletană) | ✅ testat |
|  | 27 | Pronumele demonstrative (questo, quello) și posesive (il mio, la tua) fără substantiv, quello di / quello che (rochia de 90 de ani, nasturele Doinei) | ✅ testat |
|  | 28 | Vorbirea indirectă (dice che, chiede se, dice di + infinitiv, ha detto che era / aveva / sarebbe), recapitularea unității (expoziția de la Brukenthal, Radu) | ✅ testat |
| A2 · Nunta și viața nouă | 29 | Diateza pasivă (essere / venire + participiu, da), si pasiv (nunta de la Sorrento, tarantella și hora) | ✅ testat |
|  | 30 | Nehotărâtele (qualcuno, qualcosa, qualche, alcuni, ogni, ognuno) și negațiile (non… nessuno / niente / mai / più, né… né, neanche) (luna de miere în Sicilia, Caravaggio la Siracusa) | ✅ testat |
|  | 31 | Cauza și consecința: perché, siccome, dato che, grazie a, a causa di, quindi, perciò, così… che (propunerea lui Bellini, testul Giuliei) | ✅ testat |
|  | 32 | Părerea (secondo me, credo che) + congiuntivo passato (sia stato, abbia fatto) + recapitularea unității (vestea cea mare, Bellini amână Siracusa) | ✅ testat |
| A2 · Povești și finalul A2 | 33 | Expresiile de timp: da, fa, per, tra / fra, in, entro, durante, mentre (prima ecografie, Ion și Doina vin cu trenul) | ✅ testat |
|  | 34 | Prima di + infinitiv, dopo aver / essere + participiu, appena, finché (mutarea, crestăturile lui Aldo pe tocul ușii) | ✅ testat |
|  | 35 | Ipoteza reală (se + prezent / viitor) și condiționalul trecut (avrei voluto, avresti dovuto) (alegerea numelor: Viola și Aldo) | ✅ testat |
|  | 36 | Recunoașterea lui passato remoto + marea recapitulare A2 (Crăciunul, jurnalul lui Ernesto, Aldo și Madona din 1966) | ✅ testat |
| B1 · Viață nouă | 37 | Congiuntivo imperfetto, concordanța timpurilor, come se, magari (nașterea Violei, 17 mai) | ✅ testat |
|  | 38 | Ipoteza posibilă: se + congiuntivo imperfetto + condițional, se fossi in te (nopțile albe, cântecul de leagăn al bunicii Viorica) | ✅ testat |
|  | 39 | Pronumele relative compuse: il quale, del quale, nel quale, cui cu prepoziții, il cui (botezul Violei, cererea lui Radu) | ✅ testat |
|  | 40 | Participiul absolut (Finito il lavoro…) și gerunziul trecut (avendo finito, essendo arrivati) + recapitularea unității (întoarcerea la Siracusa, scrisoarea lui Bellini) | ✅ testat |
| B1 · Ce-ar fi dacă… | 41 | Ipoteza imposibilă: se + congiuntivo trapassato + condițional trecut, ipoteza mixtă (copilul ascuns din tabloul lui Caravaggio, paracliserul Turi) | ✅ testat |
|  | 42 | Viitorul anterior (avrò finito) și viitorul de probabilitate (Saranno le otto. Avrà perso il treno) (Crăciunul la Siracusa, „Totò de la Santa Lucia”) | ✅ testat |
|  | 43 | Concesia: benché, sebbene, nonostante + congiuntivo, anche se, malgrado, pur + gerunziu, eppure (strângerea de fonduri „Un euro per Totò”) | ✅ testat |
|  | 44 | Punerea în evidență: è… che, è stato X a…, quello che, chi, dislocarea + recapitularea unității (oferta de la Roma, alegerea Florenței) | ✅ testat |
| B1 · Lumea largă | 45 | Construcția cauzativă: fare + infinitiv, farsi fare, lasciare + infinitiv (inaugurarea tabloului restaurat, primii pași ai Violei) | ✅ testat |
|  | 46 | Întrebarea indirectă: mi chiedo se, non so chi sia, chissà se (nunta Ilincăi la Sibiu, primul zbor al Graziellei, furatul miresei) | ✅ testat |
|  | 47 | Scopul: per + infinitiv, affinché / perché + congiuntivo, in modo che, pur di (atelierul deschis sâmbăta, ucenicul Davide) | ✅ testat |
|  | 48 | Comparația avansată: più… più, sempre più, più di quanto + congiuntivo, superlativul + congiuntivo + recapitularea unității (crestătura lui Pietro, primul cuvânt al Violei: „guadda”) | ✅ testat |
| B1 · Lumea muncii | 49 | Limbajul formal: scrisoarea formală, CV-ul, interviul, registrul cu „Lei” (angajarea Chiarei, proba celor cinci minute de tăcere) | ✅ testat |
|  | 50 | Nominalizarea și titlurile de presă: l’arrivo, la riapertura, Al via…, Scoperto…, Addio a… (pensionarea lui Bellini, cheia atelierului) | ✅ testat |
|  | 51 | Obligația și necesitatea: bisogna (che), è necessario, occorre, servire, dovere, conviene, è vietato (prima săptămână a noilor directori, plăcuța lui Davide) | ✅ testat |
|  | 52 | Conectorii logici: innanzitutto, inoltre, tuttavia, infatti, cioè, ad esempio, pertanto, in conclusione + recapitularea unității (conferința Giuliei, răspunsul lui Davide) | ✅ testat |
| B1 · Condiții și nuanțe | 53 | Condiția: purché, a condizione che, a patto che, a meno che non, qualora, basta che (contractul pentru cățelușul Lupino) | ✅ testat |
|  | 54 | Conjuncțiile de timp: prima che + congiuntivo, finché non, dopo che + indicativ, non appena, man mano che (îngerul din Prato, Chiara cu febră) | ✅ testat |
|  | 55 | Gradele de certitudine: è probabile / possibile che, può darsi che, dubito che, sono sicuro che, deve essere, potrebbe essere (documentele din 1608: Totò = Salvatore) | ✅ testat |
|  | 56 | Timpurile povestirii: imperfetto, passato prossimo, trapassato, passato remoto la toate persoanele + recapitularea unității (compunerea lui Pietro despre Aldo, pâinea din 1966) | ✅ testat |
| B1 · Media și societate | 57 | pasivul avansat: essere/venire + participiu, andare + participiu, si passivante, agentul cu da | ✅ testat |
|  | 58 | verbele de relatare și condiționalul din presă (sarebbe, avrebbe acquistato), viitorul în trecut | ✅ testat |
|  | 59 | argumentarea: innanzitutto, inoltre, da un lato… dall’altro, tuttavia, dato che, di conseguenza | ✅ testat |
|  | 60 | limbajul titlurilor (participiu singur, fără verb, prezent pentru trecut), jargonul presei + recapitularea unității | ✅ testat |
| B1 · Finalul B1 | 61 | vorbirea indirectă completă: timpuri, repere (domani → il giorno dopo), di + infinitiv, se | ✅ testat |
|  | 62 | registrele limbii: formal (Lei, gradirei, egregio), familiar (dai, boh, mica, figo), florentina (babbo, icché) | ✅ testat |
|  | 63 | concordanța timpurilor la congiuntivo (penso che sia / pensavo che fosse / sarebbe venuto), vorrei che + cong. imperfetto | ✅ testat |
|  | 64 | sufixele alterative: diminutive, augmentative, peiorative, alterații false (mattone, bottone, tacchino) | ✅ testat |
|  | 65 | verbele pronominale: farcela, andarsene, cavarsela, prendersela, metterci / volerci, smetterla | ✅ testat |
|  | 66 | marea recapitulare B1: congiuntivo, perioada ipotetică, pasivul, vorbirea indirectă, conectori, registre, sufixe, verbe pronominale | ✅ testat |
| B2 · Alegeri și ipoteze | 67 | ipoteza cu nuanțe: nel caso in cui, ammesso che, se dovesse + inf., volendo, se + imperfetto colocvial | ✅ testat |
|  | 68 | formele implicite: dopo aver visto, prima di / senza / pur di + inf., gerunziu prezent și trecut, participiul absolut | ✅ testat |
|  | 69 | concesia avansată: per quanto, qualunque, chiunque, dovunque, comunque + cong., per + adj. + che, anche se + cong., a costo di | ✅ testat |
|  | 70 | congiuntivo în relative (cerco qualcuno che sappia, il più bello che abbia mai visto, l’unico che) + recapitularea unității | ✅ testat |
| B2 · Timp și memorie | 71 | aspectul verbal: stare per, stare + gerunziu, essere sul punto di, mettersi a, smettere di, finire per, tornare a | ✅ testat |
|  | 72 | povestirea literară: passato remoto, trapassato remoto (ebbe finito, fu arrivato), alternanța cu imperfetto | ✅ testat |
|  | 73 | limbajul amintirii: ricordarsi di, dimenticarsi di, venire / tornare in mente, mi manca, rimpiangere, solere | ✅ testat |
|  | 74 | expresiile de timp (fare in tempo a, nel frattempo, ormai, d’ora in poi, col tempo) + recapitularea unității | ✅ testat |
| B2 · Opinii și dezbateri | 75 | opinia cu nuanțe: a mio avviso, che io sappia, non è che + cong., non nego che, resta il fatto che | ✅ testat |
|  | 76 | conectorii discursului formal (per giunta, peraltro, del resto, ciononostante, nondimeno, anzi, bensì, ossia, pertanto, ne consegue che) | ✅ testat |
|  | 77 | si impersonal (si dice, ci si abitua, si è stanchi, si è parlato/arrivati), uno, la gente, è risaputo che, zvonuri | ✅ testat |
|  | 78 | limbajul dezbaterii (chiedo la parola, glielo concedo, mi permetta di dissentire, se ho capito bene) + recapitularea unității | ✅ testat |
| B2 · Muncă și economie | 79 | numere și economie (aumentare del 20%, calare di un terzo, raddoppiare, dimezzare, procente, rispetto a, circa, una decina) | ✅ testat |
|  | 80 | verbe cu prepoziție la muncă (occuparsi di, dipendere da, contare su, rinunciare a, pensare a/di, ne/ci) | ✅ testat |
|  | 81 | corespondența formală (con la presente, in riferimento a, in allegato, condiționalul de politețe, participiul prezent) | ✅ testat |
|  | 82 | negocierea (potremmo venirvi incontro, a patto che, purché, a meno che non, affare fatto) + recapitularea unității | ✅ testat |
| B2 · Știință și mediu | 83 | cauză și efect în limbaj științific (causare, dovuto a, in seguito a, per effetto di, ne deriva che, è compatibile con) | ✅ testat |
|  | 84 | mediul, scopul și prevenirea (al fine di, fare sì che, per evitare che, impedire che, avize oficiale) | ✅ testat |
|  | 85 | ipoteză și verificare (supponiamo che, qualora, nel caso in cui, smentire, tutto lascia pensare che) | ✅ testat |
|  | 86 | prezentarea unei cercetări (innanzitutto, passiamo ora a, stando a, la curva raggiunge un picco, mi riservo di verificare) + recapitularea unității | ✅ testat |
| B2 · Cultură și artă | 87 | relativele avansate (il quale, il cui, il che, ciò che, chi/colui che, laddove) și etichetele de muzeu | ✅ testat |
|  | 88 | limbajul recenziei (tutt’altro che, a tratti, piuttosto, decisamente, pur essendo, sebbene + cong.) | ✅ testat |
|  | 89 | comparația avansată (più di quanto + cong., tanto più… quanto più, non tanto… quanto, piuttosto che, superlativ + cong.) | ✅ testat |
|  | 90 | descrierea unei opere de artă (in primo piano, sullo sfondo, la luce proviene da, sembra che, è come se) + recapitularea unității | ✅ testat |
| B2 · Vocabular și stil | 91 | verbe care își schimbă sensul la forma pronominală (trovarsi, sentirsi, prendersela, mettersi a, decidersi a, aspettarsi, sbagliarsi) | ✅ testat |
|  | 92 | concesia „orice ar fi” (qualunque cosa + cong., chiunque, dovunque, comunque, per quanto, vada come vada) | ✅ testat |
|  | 93 | eseul argumentativ (a mio avviso, ritengo che + cong., è pur vero che… tuttavia, si potrebbe obiettare che, alla luce di quanto detto) | ✅ testat |
|  | 94 | vorbirea indirectă cu verbe declarative variate (giurare di, vietare di, negare che + cong., avvertire, rimproverare, insinuare) | ✅ testat |
|  | 95 | formarea cuvintelor (prefixe ri-, in-/im-/ir-, s-/dis-, stra-; sufixe -zione, -mento, -tà, -ezza, -tore, -oso, -bile; verbe -izzare, -ificare, parasintetice; neologismele și Accademia della Crusca) | ✅ testat |
|  | 96 | colocațiile (prendere una decisione, prestare attenzione, correre un rischio, mantenere una promessa, stanco morto, fame da lupi; calcuri de evitat) + recapitularea unității | ✅ testat |
| B2 · Finalul B2 | 97 | conjunctivul independent (che Dio vi benedica, magari + cong. imperfect, che entrino, che sia già partito?, sia come sia, che io sappia, costi quel che costi) | ✅ testat |
|  | 98 | prepozițiile dificile (da cu toate sensurile, di / da, a / in, pensare a / di, dipendere da, fidarsi di, accorgersi di, calcuri din română) | ✅ testat |
|  | 99 | narațiunea literară (passato remoto / imperfetto, trapassato remoto, participiul și gerunziul narativ, stilul indirect liber, prezentul istoric, frazele nominale) | ✅ testat |
|  | 100 | registrul colocvial (dislocări, mica, tipo, boh, un sacco; argoul tinerilor: figo, sgamare, beccare; florentina: babbo, ganzo, mi garba, icché, gorgia) | ✅ testat |
|  | 101 | sentimentele și concordanța timpurilor în trecut (temevo che fosse, speravo che venisse, mi dispiaceva che non l’avesse saputo, pensavo che sarebbe venuto, avrei voluto che; rimpianto, rimorso, sollievo) | ✅ testat |
|  | 102 | marea recapitulare B2 (conjunctivul și concordanța, perioada ipotetică mixtă, formele implicite, conectorii, vorbirea indirectă, registrele, formarea cuvintelor) — finalul poveștii | ✅ testat |

Poveștile italiene: 1: 78 · 2: 100 · 3: 103 · 4: 119 · 5: 130 · 6: 161 · 7: 200 · 8: 212 · 9: 213 · 10: 221 · 11: 237 · 12: 290 · 13: 306 · 14: 332 · 15: 342 · 16: 355 · 17: 356 · 18: 386 · 19: 395 · 20: 421 · 21: 469 · 22: 492 · 23: 510 · 24: 526 · 25: 532 · 26: 546 · 27: 550 · 28: 558 · 29: 570 · 30: 576 · 31: 690 · 32: 714 · 33: 731 · 34: 748 · 35: 754 · 36: 783 · 37: 790 · 38: 806 · 39: 826 · 40: 850 · 41: 860 · 42: 881 · 43: 898 · 44: 916 · 45: 952 · 46: 984 · 47: 1041 · 48: 1066 · 49: 1109 · 50: 1138 · 51: 1141 · 52: 1158 · 53: 1183 · 54: 1203 · 55: 1237 · 56: 1273 · 57: 1511 · 58: 1537 · 59: 1552 · 60: 1564 · 61: 1629 · 62: 1690 · 63: 1713 · 64: 1756 · 65: 1781 · 66: 1828 · 67: 1830 · 68: 1876 · 69: 1884 · 70: 1978 · 71: 2041 · 72: 2111 · 73: 2159 · 74: 2231 · 75: 2291 · 76: 2320 · 77: 2331 · 78: 2344 · 79: 2381 · 80: 2411 · 81: 2417 · 82: 2588 · 83: 2705 · 84: 2827 · 85: 2919 · 86: 3096 · 87: 3254 · 88: 3275 · 89: 3448 · 90: 3620 · 91: 3747 · 92: 3852 · 93: 3934 · 94: 4090 · 95: 4249 · 96: 4319 · 97: 4418 · 98: 4461 · 99: 4544 · 100: 4589 · 101: 4647 · **102: 4906**. Fiecare capitol nou are o poveste mai lungă decât precedentul.

---

## 4b. Franceză 🇫🇷

Curs nou, în formatul capitolelor, cu explicații în română și engleză (celelalte limbi ale interfeței vin mai târziu). Personaje noi: Ioana, arhitectă din Iași, se mută la Lyon; Julien, profesor de muzică; vecina, doamna Bernard, cu motanul Victor.

| Unitate | Cap. | Conținut | Stare |
|---|---|---|---|
| A1 · Primii pași | 1 | Bonjour, être, ne… pas, întrebări, literele mute | ✅ testat |
| | 2 | Avoir, vârsta, articolele, il y a, pas de, numerele 0–20 | ✅ testat |
| | 3 | Verbele în -er, à / en / au, limbile, aimer + articol, au / du | ✅ testat |
| | 4 | Aller, ora, zilele săptămânii, numerele până la 100 | ✅ testat |
| A1 · Viața de zi cu zi | 5 | Restaurantul, partitivul (du, de la), prendre, boire, vouloir | ✅ testat |
| | 6 | Rutina zilnică, verbele reflexive, faire, toujours / jamais | ✅ testat |
| | 7 | Drumul prin oraș, imperativul, venir, prepozițiile de loc | ✅ testat |
| | 8 | Haine, culori, acordul adjectivelor, ce / cette / ces, pouvoir | ✅ testat |
| A1 · Lumea din jur | 9 | Vremea, anotimpurile, lunile, data, viitorul apropiat | ✅ testat |
| | 10 | Passé composé cu avoir, participiile | ✅ testat |
| | 11 | Passé composé cu être, acordul, verbele reflexive la trecut | ✅ testat |
| | 12 | Posesivele, recapitularea A1 (ziua Ioanei) | ✅ testat |
| A2 · Povești din trecut | 13 | Imparfait-ul: descriere și obiceiuri (Crăciunul la Marsilia) | ✅ testat |
| | 14 | Imparfait + passé composé, descrierea fizică (telefonul furat) | ✅ testat |
| | 15 | Pronumele COD le / la / les, connaître / savoir (vizita Elenei) | ✅ testat |
| | 16 | Pronumele lui / leur, imperativul cu pronume, plaire (Sfântul Valentin) | ✅ testat |
| A2 · Oameni, cadouri și locuri | 17 | Comparativul, superlativul, meilleur / mieux (apartamentul nou) | ✅ testat |
| | 18 | Pronumele y și en (ziua mutării, pianul pe fereastră) | ✅ testat |
| | 19 | Viitorul simplu (futur simple), quand + viitor, si + prezent (misterul Hélène) | ✅ testat |
| | 20 | Două pronume împreună (je te le promets) + recapitularea unității (scrisoarea lui Henri) | ✅ testat |
| A2 · Amintiri și planuri | 21 | Pronumele relative qui / que / où / dont, ce qui / ce que (plimbarea cu Hélène) | ✅ testat |
| | 22 | Condiționalul prezent: politețe, sfaturi, si + imparfait (inelul lui Hélène) | ✅ testat |
| | 23 | Plus-que-parfait (Julien la Iași) | ✅ testat |
| | 24 | Gerunziul (en + -ant) + recapitularea unității (cererea în căsătorie sub nuc) | ✅ testat |
| A2 · Emoții și păreri | 25 | Subjonctivul prezent: il faut que, vouloir que (pregătirile de nuntă, primăria) | ✅ testat |
| | 26 | Subjonctivul după sentimente și pour que / bien que / avant que (bunica vine cu autocarul) | ✅ testat |
| | 27 | Pronumele demonstrative și posesive (rochia, costumul lui Henri) | ✅ testat |
| | 28 | Vorbirea indirectă la prezent + recapitularea unității (cele trei bunici, „dor”) | ✅ testat |
| A2 · Nunta și viața nouă | 29 | Vocea pasivă (nunta la primărie, valsul pe Saône) | ✅ testat |
| | 30 | Pronume nehotărâte și negații: personne, rien, aucun, ne… que, ni… ni (luna de miere în Corsica) | ✅ testat |
| | 31 | Cauza și consecința: parce que, comme, grâce à, à cause de, donc (Sala Henri Bernard) | ✅ testat |
| | 32 | Exprimarea părerii (je ne pense pas que + subjonctiv) + recapitularea unității (14 iulie) | ✅ testat |
| A2 · Povești și finalul A2 | 33 | Expresii de timp: depuis, il y a, pendant, en, dans (vestea cea mare) | ✅ testat |
| | 34 | Avant de + infinitiv, après avoir / être (nunta de la biserica din Iași) | ✅ testat |
| | 35 | Cele trei tipuri de „si”, condiționalul trecut (Radu și Lucia) | ✅ testat |
| | 36 | Recunoașterea passé simple + marea recapitulare A2 (Crăciunul, Rose-Hélène) | ✅ testat |
| B1 · Viață nouă | 37 | Subjonctivul trecut (nașterea lui Rose-Hélène, 4 martie) | ✅ testat |
| | 38 | Vorbirea indirectă la trecut, concordanța timpurilor (bunica o cunoaște pe Lucia, examenul Luciei) | ✅ testat |
| | 39 | Pronumele relative compuse: lequel, auquel, duquel, à qui (declararea nașterii, nașii, prima ieșire) | ✅ testat |
| | 40 | Participiul prezent și adjectivul verbal + recapitularea unității (3 mai: Hélène 86 de ani, un an de căsnicie) | ✅ testat |
| B1 · Ce-ar fi dacă… | 41 | Viitorul anterior (creșa, oferta Conservatorului din Paris) | ✅ testat |
| | 42 | Ipoteza și condiția: au cas où, à condition que, à moins que, si jamais (o zi la Paris) | ✅ testat |
| | 43 | Concesia și opoziția: bien que, même si, malgré, pourtant, avoir beau (proiectul „Musique en partage”) | ✅ testat |
| | 44 | Punerea în evidență: c’est… qui / que, ce qui… c’est + recapitularea unității (decizia: rămân la Lyon) | ✅ testat |
| B1 · Lumea largă | 45 | Construcția cauzativă: faire faire, se faire couper, laisser + infinitiv (botezul în România, hora lui Hélène) | ✅ testat |
| | 46 | Întrebarea indirectă: je me demande si, ce qui / ce que (colecta de instrumente, țambalul misterios) | ✅ testat |
| | 47 | Scopul: pour que, afin que, de peur que, de sorte que (inaugurarea Sălii Henri Bernard, Mihaela) | ✅ testat |
| | 48 | Comparația avansată: plus… plus, de plus en plus, d’autant plus que + recapitularea unității (Yanis și tatăl lui, petiția) | ✅ testat |
| B1 · Lumea muncii | 49 | Limbajul formal: scrisoarea de motivație, CV-ul, interviul (stagiul lui Radu, primul cuvânt al lui Rose-Hélène) | ✅ testat |
| | 50 | Nominalizarea și titlurile de presă (votul consiliului regional, 14 decembrie) | ✅ testat |
| | 51 | Obligația și necesitatea: il faut que, être censé, il vaut mieux (prima săptămână de stagiu, numele Ioanei pe ușă) | ✅ testat |
| | 52 | Conectorii logici + recapitularea unității (proiectul sălii, primii pași ai lui Rose-Hélène) | ✅ testat |
| B1 · Condiții și nuanțe | 53 | Condiționalul trecut pentru regret și reproș (cererea în căsătorie de la Sevilla) | ✅ testat |
| | 54 | Conjuncțiile de timp: avant que, jusqu’à ce que + subjonctiv; après que + indicativ (teiul din Tête d’Or) | ✅ testat |
| | 55 | Gradele de certitudine: il se peut que, il est probable que, sans doute (prima piatră) | ✅ testat |
| | 56 | Timpurile povestirii + recapitularea unității (ultimul 3 mai al lui Hélène) | ✅ testat |
| B1 · Media și societate | 57 | Pasivul avansat (laureații bursei) | ✅ testat |
| | 58 | Verbele de raportare și condiționalul presei (zvonul, știrea falsă) | ✅ testat |
| | 59 | Argumentarea: certes… mais, en revanche, bien que (dezbaterea de la radio, inaugurarea Sălii Hélène Morel) | ✅ testat |
| | 60 | Titlurile de presă + recapitularea unității (emisiunea în direct, invitația la Paris) | ✅ testat |
| B1 · Finalul B1 | 61 | Scopul și cauza: afin que, de peur que, grâce à, faute de (ultima autorizație) | ✅ testat |
| | 62 | Viitorul anterior (a doua aniversare, repetiția generală în întuneric) | ✅ testat |
| | 63 | Emoțiile cu subjonctiv / infinitiv (concertul de la Filarmonica din Paris) | ✅ testat |
| | 64 | Întrebările indirecte la trecut (sosirea bunicii la Perrache) | ✅ testat |
| | 65 | Registrele limbii: familiar, curent, elevat (discursul lui Dan) | ✅ testat |
| | 66 | 🎓 Marea recapitulare B1 (nunta lui Radu și a Luciei) | ✅ testat |
| B2 · Alegeri și ipoteze | 67 | Ipotezele cu nuanțe: au cas où, à condition que, à moins que (săptămâna la mare) | ✅ testat |
| | 68 | Construcțiile participiale (primul raport, vara teilor) | ✅ testat |
| | 69 | Concesia avansată: quoique, quoi que, quel que soit, avoir beau (plantarea din mistral) | ✅ testat |
| | 70 | Subjonctivul în relative + recapitularea unității (nașterea lui Henri-Ion) | ✅ testat |
| B2 · Timp și memorie | 71 | Aspectul verbal: être en train de, venir de, tant que (caseta de la Nantes) | ✅ testat |
| | 72 | Passé simple și passé antérieur (carnetele lui Henri) | ✅ testat |
| | 73 | Expresiile cu en și y (primăvara lui Odile, cei doisprezece tei) | ✅ testat |
| | 74 | Punerea în evidență + recapitularea unității (cele opt măsuri) | ✅ testat |
| B2 · Opinii și dezbateri | 75 | Indicativ sau subjonctiv după verbele de opinie (tăcerea lui Odile) | ✅ testat |
| | 76 | Conectorii discursului formal (concursul de elocință, marea de la Marsilia) | ✅ testat |
| | 77 | Faire / laisser / se faire / se voir + infinitiv (șantierul de la Grenoble, nașterea lui Yves) | ✅ testat |
| | 78 | Limbajul dezbaterii + recapitularea unității (primul zbor al bunicii) | ✅ testat |
| B2 · Muncă și economie | 79 | Gerunziul, participiul prezent, adjectivul verbal (cheia biroului) | ✅ testat |
| | 80 | Diateza pasivă (controlorul și vioara) | ✅ testat |
| | 81 | Stilul nominal (casa cu valuri de la București) | ✅ testat |
| | 82 | Interviul de angajare + recapitularea unității (orchestra de joi) | ✅ testat |
| B2 · Știință și mediu | 83 | Exprimarea cauzei (vara în care teilor le-a fost sete) | ✅ testat |
| | 84 | Consecința și scopul (copacul școlii, plecarea Nathaliei) | ✅ testat |
| | 85 | Vorbirea indirectă la trecut (ultima dorință a lui Antoine) | ✅ testat |
| | 86 | Scrisoarea deschisă + recapitularea unității (banca lui Antoine) | ✅ testat |
| B2 · Cultură și artă | 87 | Pronumele relative compuse: lequel, auquel, duquel (nunta Aminei) | ✅ testat |
| | 88 | Pronumele și adjectivele nehotărâte (expoziția „Huit mesures”) | ✅ testat |
| | 89 | Comparația avansată: plus… plus, d’autant plus que, comme si (pianul Vioricăi) | ✅ testat |
| | 90 | Cronica de film + recapitularea unității (documentarul „Répondre”) | ✅ testat |
| B2 · Societate și identitate | 91 | Ipoteza avansată: à supposer que, pour peu que, quand bien même (cetățenia Ioanei) | ✅ testat |
| | 92 | Opoziția: alors que, tandis que, au lieu de, loin de (nașterea lui Awa) | ✅ testat |
| | 93 | Registrele limbii: familiar, verlan, curent, elevat (slamul lui Sami la Academie) | ✅ testat |
| | 94 | Scrisoarea formală de cerere + recapitularea unității (ultimul cart al lui Yves) | ✅ testat |
| B2 · Pregătire DELF B2 | 95 | Înțelegerea orală: strategii, marcatori, fapt și opinie, ironie (Haruka la Lyon) | ✅ testat |
| | 96 | Înțelegerea scrisă: teza, citirea pe diagonală, deducerea din context (mediateca Jeanne-Valmont) | ✅ testat |
| | 97 | Producerea scrisă: eseul argumentativ, planul, relectura (dimineața examenului, sub zăpadă) | ✅ testat |
| | 98 | Producerea orală: monologul și dezbaterea + rezultatele (tăcerea de la fereastră, primul cuvânt al lui Awa) | ✅ testat |
| B2 · Marea recapitulare | 99 | Recapitulare: timpuri și moduri (nunta Sorinei sub teiul din 1946) | ✅ testat |
| | 100 | Recapitulare: argumentarea și conectorii logici (doamna Roux îl găzduiește pe Farid; rabâbul din lemn de dud) | ✅ testat |
| | 101 | Recapitulare: stilul — nominalizarea, pasivul, relativele, registrele (cartea Odilei „Laisse ta porte ouverte”) | ✅ testat |
| | 102 | Recapitularea finală: timpul, pronumele, acordul participiului, punerea în relief, negațiile (Grădina Odile-Bernard, scrisoarea „pentru mai târziu”, epilog 2048) | ✅ testat |

Fiecare capitol are și „Povestea capitolului” (fișierul src/content/fr-povesti-a1.ts), care crește de la ~80 de cuvinte (cap. 1) la ~280 (cap. 12). Firul poveștii: Ioana se adaptează la Lyon, Julien se îndrăgostește de ea; la final (cap. 12) îi dă de ziua ei două bilete spre Marsilia, de Crăciun. A2 începe cu răspunsul Ioanei.

A1 e complet (1–12). Poveștile A2 sunt în src/content/fr-povesti-a2.ts. 🎓 Nivelul A2 e COMPLET (capitolele 13–36, șase unități). Poveștile au crescut de la 311 la 1029 de cuvinte. 🎓 Nivelul B1 e COMPLET (capitolele 37–66, șapte unități). Poveștile B1 au crescut de la 1045 la 2289 de cuvinte. 🎓 Nivelul B2 e COMPLET (capitolele 67–102, nouă unități: „Alegeri și ipoteze”, „Timp și memorie”, „Opinii și dezbateri”, „Muncă și economie”, „Știință și mediu”, „Cultură și artă”, „Societate și identitate”, „Pregătire DELF B2”, „Marea recapitulare”). Poveștile B2 au crescut capitol cu capitol până la 7253 de cuvinte (cap. 102). Franceza e completă până la B2 inclusiv. Obiectivul următor: celelalte limbi până la B2 (spaniola B2, apoi italiana, germana, japoneza).

---

## 4c. Engleză 🇬🇧

Curs nou (engleză britanică, vocea en-GB), în formatul capitolelor, cu explicații în română. Personaje: **Irina**, peisagistă din Brașov (28 de ani), primește un post la Grădina Botanică din Edinburgh și se mută în cartierul Stockbridge; **Mrs Maggie Fraser** (proprietăreasa, învățătoare pensionară, cu motanul **Hamish**) și nepoata ei **Ruby** (8 ani); **Callum**, librar din Inverness, cu librăria la parter; **Priya**, colegă din Leicester; **dr. Alasdair Grant**, șeful serelor, care vorbește cu copacii.

| Unitate | Cap. | Conținut | Stare |
|---|---|---|---|
| A1 · Primii pași | 1 | Hello, TO BE cu formele scurte, pronumele (you = tu / dvs.), not, întrebările cu inversiune, a / an cu meseriile, pronunția (th, w, r britanic) | ✅ testat |
| | 2 | Have got, vârsta cu TO BE (I’m 28), a / an / the, pluralul (children, people), there is / are, numerele 0–20 (familia lui Ruby) | ✅ testat |
| | 3 | Prezentul simplu, -s / -es / -ies la persoana a III-a, limbile (prima zi la Grădina Botanică, dr. Grant vorbește cu copacii) | ✅ testat |
| | 4 | Do / does la întrebări și negații, răspunsuri scurte, ora britanică (half past, quarter to), zilele cu „on”, numerele până la 100, prețurile (librăria lui Callum, săptămâna lui Hamish) | ✅ testat |
| A1 · Viața de zi cu zi | 5 | La ceainărie: I’d like, would you like, can I have, some / any, numărabil / nenumărabil, a cup of, can (regulile ceaiului lui Maggie) | ✅ testat |
|  | 6 | Rutina zilnică, adverbele de frecvență și locul lor, how often, once / twice a week, have breakfast (porridge-ul cu sare al lui Callum, o zi cu Maggie) | ✅ testat |
|  | 7 | Indicații, imperativul (go, turn, don’t), let’s, prepozițiile de loc, ordinalele (Irina se rătăcește în Old Town, Greyfriars Bobby) | ✅ testat |
|  | 8 | Haine, culori, this / that / these / those, adjectivul înaintea substantivului, too / very, la magazin (paltonul verde, kiltul lui Callum) | ✅ testat |
| A1 · Lumea din jur | 9 | Vremea, anotimpurile, lunile, data (the fifth of May), prezentul continuu vs simplu, -ing (apelul lui Vlad, patru anotimpuri pe Arthur’s Seat) | ✅ testat |
|  | 10 | Was / were, trecutul verbelor regulate (-ed, pronunția t / d / id), yesterday / last / ago (weekendul la St Andrews, prima zi de școală a lui Maggie în 1976) | ✅ testat |
|  | 11 | Verbele neregulate la trecut, did / didn’t, răspunsuri scurte, someone / anyone / no one (ceilidh-ul de la Inverness, grădina bunicii Ana de la Bran) | ✅ testat |
|  | 12 | Posesivele (my, ’s, whose, mine / yours), familia extinsă, recapitularea A1 (ziua Irinei, cartea din 1932 a bunicii lui Callum) | ✅ testat |
| A2 · Povești din trecut | 13 | Trecutul continuu (was / were + -ing) vs trecutul simplu, when / while (Hamish a dispărut, salvarea de pe acoperiș) | ✅ testat |
|  | 14 | Descrierea oamenilor (What is he like? / What does he look like?), used to (Maggie și Rab) | ✅ testat |
|  | 15 | Comparativul (-er, more, better / worse), than, as … as, much / a bit (Edinburgh vs Glasgow, scrisoarea Irinei către mama ei) | ✅ testat |
|  | 16 | Superlativul (the -est, the most, the best), in / of, recapitularea unității (seara de quiz la pub) | ✅ testat |
| A2 · Planuri și viitor | 17 | Be going to pentru intenții și predicții după semne, expresiile de viitor (biletele de avion, planul Maggiei) | ✅ testat |
|  | 18 | Will pentru predicții, oferte, promisiuni, decizii pe loc; Shall I…?; will vs going to (ghicitoarea Ruby) | ✅ testat |
|  | 19 | Prezentul continuu pentru aranjamente, prezentul simplu pentru orare, when / as soon as / until + prezent (planul secret cu Vlad, drumul la Bran) | ✅ testat |
|  | 20 | Condiționalul de tip 1, unless, if vs when, recapitularea viitorului (Revelionul la cabană) | ✅ testat |
| A2 · Experiențe | 21 | Present perfect pentru experiențe: ever / never, participiile neregulate, been vs gone (ferma familiei Reid, aurora boreală) | ✅ testat |
|  | 22 | Present perfect vs past simple, When did…?, întrebări de interviu (interviul pentru grădina montană) | ✅ testat |
|  | 23 | Just, already, yet, still; felicitări și reacții (vestea cea mare, semințele lui Alasdair) | ✅ testat |
|  | 24 | For și since, How long…?, present perfect continuous, recapitularea unității (un an la Edinburgh, jurnalul Irinei) | ✅ testat |
| A2 · Reguli, sfaturi, abilități | 25 | Must / mustn’t, have to / don’t have to, had to, reguli scrise (șantierul, Bill alpinistul) | ✅ testat |
|  | 26 | Should, ought to, If I were you, Why don’t you…?, advice (Priya și Kenny) | ✅ testat |
|  | 27 | Can / could / be able to / managed to, cereri politicoase (părinții Irinei, pescuitul lui Mihai și Duncan) | ✅ testat |
|  | 28 | Much / many, a lot of, (a) few / (a) little, too much / enough, recapitularea modalelor (Ziua Muntelui) | ✅ testat |
| A2 · Cuvinte și construcții | 29 | Propozițiile relative: who, which, that, where, whose, omiterea pronumelui (festivalul, mimul tăcut Rory) | ✅ testat |
|  | 30 | Verb + -ing vs verb + to, prepoziție + -ing, stop / remember / try (secretul lui Callum: lecțiile de română) | ✅ testat |
|  | 31 | Phrasal verbs frecvente, separabile și inseparabile (Maggie cade pe scări) | ✅ testat |
|  | 32 | Adverbele de mod, adjectiv vs adverb, recapitularea unității (deschiderea grădinii montane) | ✅ testat |
| A2 · Finalul A2 | 33 | Diateza pasivă la toate timpurile, by + agent (spargerea de la librărie, inelul găsit de Hamish) | ✅ testat |
|  | 34 | Question tags, intonația, so do I / neither do I (Crăciunul la Bran) | ✅ testat |
|  | 35 | Too / enough, so / such, so … that (cererea în căsătorie) | ✅ testat |
|  | 36 | Marea recapitulare A2, formatul A2 Key (petrecerea de logodnă) | ✅ testat |
| B1 · Viață nouă | 37 | Present perfect continuous vs simple, verbele de stare (pregătirile de nuntă, lecțiile secrete de dans) | ✅ testat |
|  | 38 | Past perfect, by the time, already / just / never before (ziua nunții în Grădina Montană) | ✅ testat |
|  | 39 | Timpurile narative, past perfect continuous, while / as soon as / eventually (nunta din Bran, furatul miresei) | ✅ testat |
|  | 40 | Used to / be used to / get used to, would pentru obiceiuri, recapitularea unității (viața în doi) | ✅ testat |
| B1 · Ce-ar fi dacă… | 41 | Condiționalul de tip 2, If I were you, could / might (oferta de la Kew, lista) | ✅ testat |
|  | 42 | Wish + past, wish + could / would, if only, I’d rather, wish vs hope (vizita la Kew, Vlad singur la Londra) | ✅ testat |
|  | 43 | Condiționalul de tip 3, could / might have, wish + past perfect (scrisoarea din Canada, lanțul întâmplărilor) | ✅ testat |
|  | 44 | Condiționalul zero și mixt, unless / as long as / provided that / even if / in case, recapitulare (Proiectul Semințelor Carpatine) | ✅ testat |
| B1 · Lumea largă | 45 | Vorbirea indirectă: afirmații, say / tell, mutarea timpurilor (ciobanul Ilie și briceagul lui Alasdair) | ✅ testat |
|  | 46 | Vorbirea indirectă: întrebări și ordine, asked if / where, told … not to, warn / remind (Duncan și Mihai la pescuit) | ✅ testat |
|  | 47 | Have / get something done, get somebody to do, have somebody do (apartamentul lui Vlad, foștii elevi ai Maggiei) | ✅ testat |
|  | 48 | Future continuous și future perfect, by the time, recapitularea unității (capsula timpului) | ✅ testat |
| B1 · Lumea muncii | 49 | Deducții la prezent: must / can’t / might be (răsadul misterios din tava 47) | ✅ testat |
|  | 50 | Deducții la trecut: must / can’t / might have done (rezultatele ADN, floarea oii, planșa din 1874) | ✅ testat |
|  | 51 | Should have / could have / needn’t have, scuze (articolul din ziar, gardienii stâncilor) | ✅ testat |
|  | 52 | Make / let / allow / be allowed to, recapitularea unității (Saxifraga pastoris) | ✅ testat |
| B1 · Condiții și nuanțe | 53 | Propozițiile relative explicative, which = ceea ce, some of whom (Maggie la 75 de ani, biletul spre Toronto) | ✅ testat |
|  | 54 | Articolele a / an / the / fără articol, nume geografice, expresii fixe (jurnalul lui Ruby din Canada) | ✅ testat |
|  | 55 | Each / every, both / either / neither, all / none, whole (vestea cea mare, numele Erica) | ✅ testat |
|  | 56 | Întrebările indirecte politicoase, recapitularea unității (nașterea Ericăi) | ✅ testat |
| B1 · Media și societate | 57 | Although / despite / however / whereas (interviul de la BBC Radio Scotland) | ✅ testat |
|  | 58 | Propoziții de scop: to, in order to, so as (not) to, so that, for (salvarea librăriei, podcastul „Tea and Books”) | ✅ testat |
|  | 59 | Pasivul de relatare: It is said that…, he is believed to have… (necrologul lui Bill) | ✅ testat |
|  | 60 | Verb + obiect + to (want / ask / persuade somebody to), recapitularea unității (Piatra lui Bill) | ✅ testat |
| B1 · Finalul B1 | 61 | Formarea cuvintelor: prefixe și sufixe (eseul lui Ruby despre Maggie) | ✅ testat |
|  | 62 | Make vs do, have și take în expresii fixe (prima întâlnire a lui Vlad, ciorba) | ✅ testat |
|  | 63 | Phrasal verbs cu sens abstract și cu trei părți (Maggie predă casa, scrisorile lui Rab) | ✅ testat |
|  | 64 | Expresii idiomatice (ziua Ericăi, cererea în căsătorie a lui Vlad) | ✅ testat |
|  | 65 | Registrul formal și informal în scris (scrisoarea către primărie, Grădina lui Bill) | ✅ testat |
|  | 66 | Marea recapitulare B1, formatul B1 Preliminary (nunta lui Vlad) | ✅ testat |
| B2 · Povești și emfază | 67 | Would vs used to, was going to / was about to, narațiune avansată (Maggie și noaptea în care barca a întârziat) | ✅ testat |
|  | 68 | Be due to, be to, on the verge of, viitorul în trecut (nașterea Ilincăi în viscol) | ✅ testat |
|  | 69 | Inversiunea: Never have I, Not only, No sooner, Little did (lansarea cărții despre Maggie) | ✅ testat |
|  | 70 | Cleft sentences: It was… that, What I need is… + recapitulare (Ilie Bucur și oaia Joiana) | ✅ testat |
| B2 · Dorințe și ipoteze | 71 | Condiționale avansate: but for, had I known, should you, provided, in case (Erica pierdută în Highlands) | ✅ testat |
|  | 72 | Wish, if only, it’s time, would rather, as if (șoldul Maggiei, poveștile despre Rab) | ✅ testat |
|  | 73 | Modale avansate: might as well, bound to, needn’t have, must have been -ing (Maggie în România) | ✅ testat |
|  | 74 | Propoziții participiale + recapitulare (pălăria verde, discursul de la Moray House) | ✅ testat |
| B2 · Pasiv, raportare, structuri | 75 | Pasivul avansat: it is said that, is believed to have been, have something done (saxifraga furată, Jamie) | ✅ testat |
|  | 76 | Verbe de raportare: accuse of, deny, insist on, urge, threaten, suggest (ședința publică, grădina salvată) | ✅ testat |
|  | 77 | -ing sau to: remember, stop, try, regret, go on, mean, need (înmormântarea lui Ilie) | ✅ testat |
|  | 78 | Relative reduse + recapitulare (fotografia celor douăzeci de femei) | ✅ testat |
| B2 · Nuanțe în discurs | 79 | Conectori: however, nevertheless, whereas, moreover, actually, after all (absolvirea lui Ruby, pălăria verde) | ✅ testat |
|  | 80 | Hedging: it seems that, tend to, is likely to, arguably (titlul de ziar, Hannah) | ✅ testat |
|  | 81 | Emfaza: do / did, so / such, the very, on earth (ceilidh-ul de Hogmanay, „fiule”) | ✅ testat |
|  | 82 | Elipsă și substituție + recapitulare (Ewan o cere pe Ruby) | ✅ testat |
| B2 · Vocabular avansat | 83 | Colocații: heavy rain, make a decision, bitterly cold (stânca de nord, cele șapte răsaduri) | ✅ testat |
|  | 84 | Phrasal verbs avansate: fall out, make up, put up with (Maggie și Fiona se împacă) | ✅ testat |
|  | 85 | Idiomuri: tie the knot, in the nick of time, steal the show (nunta lui Ruby) | ✅ testat |
|  | 86 | Formarea cuvintelor + recapitulare (eseul Ericăi „Unrelated”) | ✅ testat |
| B2 · Scriere: eseu, recenzie, articol | 87 | Eseul argumentativ (eseul lui Jamie pentru universitate) | ✅ testat |
|  | 88 | Recenzia și raportul (bistroul lui Vlad, raportul Ericăi) | ✅ testat |
|  | 89 | Articolul de revistă (Hannah, „Seven Rosettes”) | ✅ testat |
|  | 90 | Discursul persuasiv + recapitulare (Jamie la Parlamentul Scoțian) | ✅ testat |
| B2 · Structuri avansate | 91 | Determinanți: each, every, both, neither, few / a few (Maggie la 90 de ani) | ✅ testat |
|  | 92 | Comparații avansate: the more… the more, twice as many, by far (42 de rozete) | ✅ testat |
|  | 93 | Grupuri nominale: a seven-pound baby, the decision to (se naște Jean) | ✅ testat |
|  | 94 | Viitorul perfect (continuu) + recapitulare (douăzeci de ani; Irina rămâne) | ✅ testat |
| B2 · Varietăți și stil | 95 | Engleza britanică și americană (echipa de documentar) | ✅ testat |
|  | 96 | Scots și accente regionale (Burns Night) | ✅ testat |
|  | 97 | Registru și politețe (Maggie primește MBE) | ✅ testat |
|  | 98 | Umor și ironie britanică + recapitulare (inundația din librărie) | ✅ testat |
| B2 · Examenul B2 First și finalul | 99 | B2 First: Reading & Use of English (Elena se pregătește la 77 de ani) | ✅ testat |
|  | 100 | B2 First: Writing (Erica primește pixul roșu) | ✅ testat |
|  | 101 | B2 First: Listening & Speaking (ziua examenului la Brașov) | ✅ testat |
|  | 102 | Recapitularea finală B2 (rezultatul, vârful Peleaga, ultima ramă) | ✅ testat |

Poveștile englezești: 1: 84 · 2: 100 · 3: 121 · 4: 145 · 5: 154 · 6: 197 · 7: 218 · 8: 224 · 9: 230 · 10: 236 · 11: 264 · 12: 271 · 13: 272 · 14: 282 · 15: 290 · 16: 357 · 17: 369 · 18: 371 · 19: 473 · 20: 502 · 21: 522 · 22: 536 · 23: 549 · 24: 572 · 25: 600 · 26: 622 · 27: 631 · 28: 658 · 29: 709 · 30: 712 · 31: 718 · 32: 736 · 33: 739 · 34: 749 · 35: 758 · 36: 759 · 37: 775 · 38: 789 · 39: 823 · 40: 841 · 41: 844 · 42: 846 · 43: 852 · 44: 861 · 45: 866 · 46: 868 · 47: 876 · 48: 882 · 49: 883 · 50: 893 · 51: 894 · 52: 895 · 53: 899 · 54: 901 · 55: 924 · 56: 939 · 57: 950 · 58: 952 · 59: 955 · 60: 958 · 61: 960 · 62: 962 · 63: 980 · 64: 989 · 65: 993 · 66: 996 · 67: 1056 · 68: 1108 · 69: 1168 · 70: 1212 · 71: 1342 · 72: 1410 · 73: 1430 · 74: 1431 · 75: 1543 · 76: 1650 · 77: 1741 · 78: 1822 · 79: 1906 · 80: 1968 · 81: 1980 · 82: 1993 · 83: 1999 · 84: 2013 · 85: 2066 · 86: 2069 · 87: 2085 · 88: 2125 · 89: 2147 · 90: 2154 · 91: 2189 · 92: 2197 · 93: 2200 · 94: 2246 · 95: 2251 · 96: 2307 · 97: 2312 · 98: 2366 · 99: 2369 · 100: 2479 · 101: 2584 · **102: 2616**. Fiecare capitol nou are o poveste mai lungă decât precedentul.

---

## 4d. Germană 🇩🇪

Curs nou (germana standard, vocea de-DE), în formatul capitolelor, cu explicații în română. Personaje: **Mara Ionescu**, asistentă medicală din Sibiu (Hermannstadt), 27 de ani, primește un post la un spital din Berlin și se mută în cartierul Prenzlauer Berg; **Herr Ludwig Brandt** (proprietarul, 78 de ani, fost vatman pe linia M1 în Berlinul de Est, cu teckelul **Fritz**); nepoata lui, **Lena**, brutăreasă, cu brutăria la parter; **Jonas Weber**, coleg asistent din Hamburg; **dr. Ayşe Yılmaz**, doctoriță berlineză de origine turcă.

| Unitate | Cap. | Conținut | Stare |
|---|---|---|---|
| A1 · Primii pași | 1 | Hallo, SEIN, du / Sie, meseria fără articol, substantivele cu majusculă, nicht, întrebările, pronunția (ü, ö, ä, ß, ei / ie) | ✅ testat |
|  | 2 | Haben, vârsta cu SEIN (Ich bin 27 Jahre alt), der / die / das, ein / eine, pluralul, numerele 0–20, mein / meine (fotografiile familiei Marei) | ✅ testat |
|  | 3 | Prezentul verbelor regulate, sprechen / sehen / fahren, verbul pe locul 2, limbile, man, cum ceri o repetare (prima zi pe secția 4, berlineza lui Herr Schulz) | ✅ testat |
|  | 4 | Numerele până la 100 (einundzwanzig), prețurile, ora (halb acht = 7:30!), zilele cu am, momentele zilei, doch (brutăria Lenei, Fritz și ceasul) | ✅ testat |
| A1 · Viața de zi cu zi | 5 | La cafenea: ich möchte, acuzativul (den / einen / keinen), kein vs nicht, nehmen / essen, nota și bacșișul (micul dejun de duminică la Herr Brandt, linia M1) | ✅ testat |
|  | 6 | Verbele separabile (ich stehe … auf), prefixele separabile și neseparabile, schlafen / anfangen, zuerst / dann / danach, turele (tura de noapte, Herr Schulz nu poate dormi) | ✅ testat |
|  | 7 | Imperativul (Geh! Nimm! Gehen Sie!), dativul cu aus / bei / mit / nach / seit / von / zu / gegenüber, zum / zur / vom / beim, indicații și transport (Mara se rătăcește până în Kreuzberg) | ✅ testat |
|  | 8 | Locuința și mobila, toate posesivele (sein / ihr / Ihr, euer → eure), posesivele la acuzativ, es gibt, etajele (Frau Hoffmann, pianista de la etajul patru) | ✅ testat |
| A1 · Timp liber, haine, sănătate | 9 | Verbele modale können / wollen (ich kann, er will), paranteza verbală, gern / lieber / am liebsten, propuneri și refuzuri (corul lui Jonas, Ludwig învață să folosească telefonul) | ✅ testat |
|  | 10 | Haine și culori, pronumele la dativ (mir, dir, ihm, ihr), gefallen / passen / stehen, welcher / dieser, la magazin și la talcioc (paltonul verde din Mauerpark, lampa de tramvai a lui Ludwig) | ✅ testat |
|  | 11 | Perfekt: haben / sein + participiu, ge-…-t și ge-…-en, verbe separabile și fără ge-, war / hatte (excursia la Potsdam, povestea lui Ludwig și a lui Ingrid, 9 noiembrie 1989) | ✅ testat |
|  | 12 | Corpul, ce te doare, müssen / dürfen / sollen, muss nicht ≠ darf nicht, la doctor și la farmacie, recapitulare A1 (Ludwig cu ghips, Crăciunul în toată casa, Frau Hoffmann coboară scările) | ✅ testat |
| A2 · Trecutul și amintirile | 13 | War / hatte la toate persoanele, Perfekt recapitulat, expresii de timp trecut (vor einer Woche, letztes Jahr), cum povestești o întâmplare (Revelionul la urgențe, cererea în căsătorie a lui Jonas) | ✅ testat |
|  | 14 | Modalele la Präteritum (konnte, musste, wollte, durfte, sollte, mochte), werden, copilăria (copilăria lui Ludwig printre ruine, pianul din pivniță al doamnei Hoffmann) | ✅ testat |
|  | 15 | Propoziții secundare cu weil și dass (verbul la final), denn, deshalb, păreri cu glauben / wissen / hoffen (Fritz dispare și toată casa îl caută) | ✅ testat |
|  | 16 | Wechselpräpositionen: wo? + dativ, wohin? + acuzativ, stellen / stehen, legen / liegen, hängen, setzen / sitzen (petrecerea din curte, muzica de la etajul patru) | ✅ testat |
| A2 · Descrieri | 17 | Comparativul (größer als, so … wie), superlativul (am größten, der größte), forme neregulate (besser, mehr, lieber) (Andrei vizitează Berlinul de Paște, brezelurile de la patru dimineața) | ✅ testat |
|  | 18 | Declinarea adjectivului după der / dieser / welcher (-e / -en), haine de nuntă, adjective substantivizate (rochia Clarei, costumul de nuntă din 1974 al lui Ludwig) | ✅ testat |
|  | 19 | Adjectivul după ein / kein / mein (-er / -es) și fără articol (frischer Kaffee), zile de naștere și cadouri (discul Eterna din 1964 al doamnei Hoffmann) | ✅ testat |
|  | 20 | Verbele reflexive (mich / dich / sich), dativul reflexiv (ich wasche mir die Hände), reflexive cu prepoziție (sich freuen auf / über) (nunta de la Kiel, costumul dansează) | ✅ testat |
| A2 · Planuri și dorințe | 21 | Viitorul: prezent + expresii de timp, werden + infinitiv, presupuneri cu wohl, vocabularul examenelor (Mara dă examenul Goethe B1) | ✅ testat |
|  | 22 | Als / wenn / wann, secundara pe primul loc, recunoașterea Präteritum (Mara și Lena la Sibiu, rezultatul examenului pe Podul Minciunilor) | ✅ testat |
|  | 23 | Konjunktiv II: würde, hätte, wäre, könnte; cereri politicoase, dorințe, limbaj formal la muncă (contractul nedeterminat, lista de dorințe a casei, tramvaiul 5218) | ✅ testat |
|  | 24 | Sfaturi: sollte, an deiner Stelle würde ich, du könntest, wie wäre es mit; recapitulare A2 (Ludwig conduce din nou linia 46) | ✅ testat |
| A2 · Legături și argumente | 25 | Verbe cu prepoziție fixă (warten auf, denken an), wo(r)- și da(r)-, darauf, dass… (Andrei vine la Berlin, patru dimineața în brutărie) | ✅ testat |
|  | 26 | Întrebări indirecte cu ob și cu cuvinte interogative, ob vs wenn, politețea la telefon (Mara sună la Konzerthaus pentru doamna Hoffmann) | ✅ testat |
|  | 27 | Zu + infinitiv, verbe separabile (anzurufen), um … zu, ohne … zu, fără zu după modale (Kuba adoptă câinele Bruno de la adăpost) | ✅ testat |
|  | 28 | Obwohl / trotzdem, aber / sondern, harta conectorilor (concertul doamnei Hoffmann la Konzerthaus, 91 de ani) | ✅ testat |
| A2 · Lumea din jur | 29 | Genitivul (des / der, -s / -es), nume cu -s, von + dativ, wegen / trotz / während / statt (părinții Marei la Berlin, albinele de pe acoperiș) | ✅ testat |
|  | 30 | Propoziții relative (der / den / dem / denen / dessen), cu prepoziție, wo și was (a 80-a aniversare a lui Ludwig, împăcarea cu Thomas) | ✅ testat |
|  | 31 | Pasivul la prezent (wird gebacken) și Präteritum (wurde gebaut), von + dativ, rețete și procese (Andrei, Erasmus la Berlin, istoria casei din 1905) | ✅ testat |
|  | 32 | Präteritum pentru povestiri: -te și verbele neregulate frecvente, Präteritum vs Perfekt, basme (caietul lui Andrei: Cum a ajuns sora mea la Berlin) | ✅ testat |

Poveștile germane: 1: 80 · 2: 121 · 3: 132 · 4: 186 · 5: 204 · 6: 225 · 7: 252 · 8: 317 · 9: 381 · 10: 410 · 11: 419 · 12: 528 · 13: 662 · 14: 692 · 15: 703 · 16: 746 · 17: 772 · 18: 774 · 19: 801 · 20: 840 · 21: 845 · 22: 850 · 23: 857 · 24: 871 · 25: 876 · 26: 885 · 27: 893 · 28: 917 · 29: 936 · 30: 949 · 31: 959 · **32: 971**. Fiecare capitol nou are o poveste mai lungă decât precedentul.

---

## 5. De făcut mai târziu (opțional)

- O voce mai bună, descărcabilă (Kokoro), și recunoașterea vorbirii fără internet (Whisper).
- Chat cu AI gratuit pentru conversație.
- Găzduire gratuită pe internet (HTTPS), ca aplicația să se instaleze pe telefon. Pentru asta e nevoie de contul tău de GitHub.
- Sincronizare între telefon și laptop.
- O nepotrivire mică între cele două cursuri: cererea în căsătorie e primăvara la Osaka în spaniolă și toamna la Miyajima în japoneză. Se poate potrivi, dacă vrei.
- O nepotrivire mică de vârstă în spaniolă: bunicul Gheorghe are 94 de ani, prea tânăr ca să fi fost soldat în al Doilea Război Mondial. În capitolele noi am evitat anii exacți ai războiului. Se poate corecta în capitolul 49, dacă vrei.

---

## 6. Unde sunt fișierele (pentru Claude)

- Capitole spaniolă: `src/content/es-capNN.ts`. Poveștile A1–A2 sunt în `es-povesti-*.ts`, iar de la B1 în fișierul capitolului.
- Capitole japoneză: `src/content/ja-capNN.ts`. Poveștile 1–12 sunt în `ja-povesti.ts`, iar de la 13 în fișierul capitolului.
- Unitățile și ordinea capitolelor: `src/content/es.ts`, `src/content/ja.ts`.
- După fiecare capitol nou: verificare (`npx tsc --noEmit -p .`), construire (`npm run build`) și test automat.
