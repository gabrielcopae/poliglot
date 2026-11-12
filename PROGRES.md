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

**Urmează: B2** (36 de capitole, de la capitolul 67), apoi C1 (44 de capitole).

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

Momentan are doar 6 lecții scurte, în formatul vechi. Va fi refăcută în formatul capitolelor, după ce avansează spaniola.

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

Fiecare capitol are și „Povestea capitolului” (fișierul src/content/fr-povesti-a1.ts), care crește de la ~80 de cuvinte (cap. 1) la ~280 (cap. 12). Firul poveștii: Ioana se adaptează la Lyon, Julien se îndrăgostește de ea; la final (cap. 12) îi dă de ziua ei două bilete spre Marsilia, de Crăciun. A2 începe cu răspunsul Ioanei.

A1 e complet (1–12). Poveștile A2 sunt în src/content/fr-povesti-a2.ts. Urmează capitolul 19 (viitorul simplu; misterul Hélène), apoi 20 (recapitularea unității). Testul: scratchpad pw/fr-range.mjs (ședința = (cap-1)·3 + 1).

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
