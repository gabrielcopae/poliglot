import { withReading, withStory, type Course, type Lesson } from './types'
import { ES_LECTURAS } from './es-lecturas'
import { ES_POVESTI } from './es-povesti'
import { esCap01 } from './es-cap01'
import { esCap02 } from './es-cap02'
import { esCap03 } from './es-cap03'
import { esCap04 } from './es-cap04'
import { esCap05 } from './es-cap05'
import { esCap06 } from './es-cap06'
import { esCap07 } from './es-cap07'
import { esCap08 } from './es-cap08'
import { esCap09 } from './es-cap09'
import { esCap10 } from './es-cap10'
import { esCap11 } from './es-cap11'
import { esCap12 } from './es-cap12'
import { esCap13 } from './es-cap13'
import { esCap14 } from './es-cap14'
import { esCap15 } from './es-cap15'
import { esCap16 } from './es-cap16'
import { esCap17 } from './es-cap17'
import { esCap18 } from './es-cap18'
import { esCap19 } from './es-cap19'
import { esCap20 } from './es-cap20'
import { esCap21 } from './es-cap21'
import { esCap22 } from './es-cap22'
import { esCap23 } from './es-cap23'
import { esCap24 } from './es-cap24'
import { esCap25 } from './es-cap25'
import { esCap26 } from './es-cap26'
import { esCap27 } from './es-cap27'
import { esCap28 } from './es-cap28'
import { esCap29 } from './es-cap29'
import { esCap30 } from './es-cap30'
import { esCap31 } from './es-cap31'
import { esCap32 } from './es-cap32'
import { esCap33 } from './es-cap33'
import { esCap34 } from './es-cap34'
import { esCap35 } from './es-cap35'
import { esCap36 } from './es-cap36'
import { esCap37 } from './es-cap37'
import { esCap38 } from './es-cap38'
import { esCap39 } from './es-cap39'
import { esCap40 } from './es-cap40'
import { esCap41 } from './es-cap41'
import { esCap42 } from './es-cap42'
import { esCap43 } from './es-cap43'
import { esCap44 } from './es-cap44'
import { esCap45 } from './es-cap45'
import { esCap46 } from './es-cap46'
import { esCap47 } from './es-cap47'
import { esCap48 } from './es-cap48'
import { esCap49 } from './es-cap49'
import { esCap50 } from './es-cap50'
import { esCap51 } from './es-cap51'
import { esCap52 } from './es-cap52'
import { esCap53 } from './es-cap53'
import { esCap54 } from './es-cap54'
import { esCap55 } from './es-cap55'
import { esCap56 } from './es-cap56'
import { esCap57 } from './es-cap57'
import { esCap58 } from './es-cap58'
import { esCap59 } from './es-cap59'
import { esCap60 } from './es-cap60'
import { esCap61 } from './es-cap61'
import { esCap62 } from './es-cap62'
import { esCap63 } from './es-cap63'
import { esCap64 } from './es-cap64'
import { esCap65 } from './es-cap65'
import { esCap66 } from './es-cap66'

/** Atașează textele lungi de lectură și „Povestea capitolului”. */
const R = (l: Lesson) => {
  let out = ES_LECTURAS[l.id] ? withReading(l, ES_LECTURAS[l.id]) : l
  if (ES_POVESTI[l.id]) out = withStory(out, ES_POVESTI[l.id])
  return out
}

export const es: Course = {
  lang: 'es',
  name: 'Spaniolă',
  native: 'Español',
  flag: '🇪🇸',
  locale: 'es-ES',
  hello: 'Hola',
  exam: 'DELE',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units: [
    { id: 'es-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [esCap01, esCap02, esCap03, esCap04].map(R) },
    { id: 'es-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [esCap05, esCap06, esCap07, esCap08].map(R) },
    { id: 'es-a1-3', title: 'A1 · Lumea din jur', level: 'A1', lessons: [esCap09, esCap10, esCap11, esCap12].map(R) },
    { id: 'es-a2-1', title: 'A2 · Povești din trecut', level: 'A2', lessons: [esCap13, esCap14, esCap15, esCap16].map(R) },
    { id: 'es-a2-2', title: 'A2 · Oameni, cadouri și locuri', level: 'A2', lessons: [esCap17, esCap18, esCap19, esCap20].map(R) },
    { id: 'es-a2-3', title: 'A2 · Viitor, rețete și sfaturi', level: 'A2', lessons: [esCap21, esCap22, esCap23, esCap24].map(R) },
    { id: 'es-a2-4', title: 'A2 · Muncă și viață practică', level: 'A2', lessons: [esCap25, esCap26, esCap27, esCap28].map(R) },
    { id: 'es-a2-5', title: 'A2 · Emoții și păreri', level: 'A2', lessons: [esCap29, esCap30, esCap31, esCap32].map(R) },
    { id: 'es-a2-6', title: 'A2 · Povești și finalul A2', level: 'A2', lessons: [esCap33, esCap34, esCap35, esCap36].map(R) },
    { id: 'es-b1-1', title: 'B1 · Dorințe și emoții', level: 'B1', lessons: [esCap37, esCap38, esCap39, esCap40].map(R) },
    { id: 'es-b1-2', title: 'B1 · Ce-ar fi dacă…', level: 'B1', lessons: [esCap41, esCap42, esCap43, esCap44].map(R) },
    { id: 'es-b1-3', title: 'B1 · Lumea largă', level: 'B1', lessons: [esCap45, esCap46, esCap47, esCap48].map(R) },
    { id: 'es-b1-4', title: 'B1 · Viață nouă', level: 'B1', lessons: [esCap49, esCap50, esCap51, esCap52].map(R) },
    { id: 'es-b1-5', title: 'B1 · Lumea muncii', level: 'B1', lessons: [esCap53, esCap54, esCap55, esCap56].map(R) },
    { id: 'es-b1-6', title: 'B1 · Condiții și nuanțe', level: 'B1', lessons: [esCap57, esCap58, esCap59, esCap60].map(R) },
    { id: 'es-b1-7', title: 'B1 · Media și societate', level: 'B1', lessons: [esCap61, esCap62, esCap63, esCap64].map(R) },
    { id: 'es-b1-8', title: 'B1 · Finalul B1', level: 'B1', lessons: [esCap65, esCap66].map(R) },
  ],
}
