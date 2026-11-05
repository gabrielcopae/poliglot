# Poliglot

Aplicație pentru învățat **spaniolă, italiană și japoneză**. Merge pe telefon și pe laptop, inclusiv offline.

## Pornire pe laptop

Dublu-clic pe **`porneste.bat`**. Se deschide singură în browser la http://localhost:4173.

În Edge sau Chrome poți apăsa iconița „Instalează aplicația” din bara de adrese. Așa primește iconiță proprie și merge și fără internet.

## Ce conține (etapa 1)

- 🌸☀️🍁❄️ Temă care se schimbă singură după anotimp, plus zi/noapte. Se poate alege și manual din Setări.
- 📖 Animația cu cartea la pornire. Apare o dată pe zi; se poate schimba din Setări.
- Lecții A1 cu gramatică explicată în română, cuvinte, propoziții și exerciții:
  - 🇪🇸 Spaniolă: 8 lecții
  - 🇮🇹 Italiană: 6 lecții
  - 🇯🇵 Japoneză: tot alfabetul hiragana (9 lecții), saluturi și numere; tabel hiragana și katakana
- 🔁 Repetiție spațiată cu algoritmul FSRS. Fiecare cuvânt revine exact înainte să-l uiți.
- 🔊 Pronunție cu vocile sistemului (offline, dacă sunt instalate; vezi Setări).
- 🎤 Verificarea pronunției prin microfon (Chrome/Edge, are nevoie de internet).
- 📈 Statistici: zile la rând, cuvinte învățate, activitate.
- 💾 Export/import al progresului, pentru mutarea între dispozitive.

## Structura

| Folder / fișier | Ce conține |
|---|---|
| `src/content/` | lecțiile (`es.ts`, `it.ts`, `ja.ts`); aici se adaugă conținut nou |
| `src/screens/` | ecranele aplicației |
| `src/components/` | scena cu anotimpuri, animația cu cartea |
| `src/styles.css` | culorile celor 8 teme (4 anotimpuri × zi/noapte) |
| `src/srs.ts` | repetiția spațiată |

## Comenzi pentru dezvoltare

```
npm install       # o singură dată
npm run dev       # mod dezvoltare, cu reîncărcare automată
npm run build     # construiește versiunea finală în dist/
```
