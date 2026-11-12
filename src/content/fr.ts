import { withStory, type Course, type Lesson, type Unit } from './types'
import { FR_POVESTI_A1 } from './fr-povesti-a1'
import { FR_POVESTI_A2 } from './fr-povesti-a2'
import { frCap01 } from './fr-cap01'
import { frCap02 } from './fr-cap02'
import { frCap03 } from './fr-cap03'
import { frCap04 } from './fr-cap04'
import { frCap05 } from './fr-cap05'
import { frCap06 } from './fr-cap06'
import { frCap07 } from './fr-cap07'
import { frCap08 } from './fr-cap08'
import { frCap09 } from './fr-cap09'
import { frCap10 } from './fr-cap10'
import { frCap11 } from './fr-cap11'
import { frCap12 } from './fr-cap12'
import { frCap13 } from './fr-cap13'
import { frCap14 } from './fr-cap14'
import { frCap15 } from './fr-cap15'
import { frCap16 } from './fr-cap16'
import { frCap17 } from './fr-cap17'
import { frCap18 } from './fr-cap18'
import { frCap19 } from './fr-cap19'
import { frCap20 } from './fr-cap20'
import { frCap21 } from './fr-cap21'
import { frCap22 } from './fr-cap22'
import { frCap23 } from './fr-cap23'
import { frCap24 } from './fr-cap24'
import { frCap25 } from './fr-cap25'
import { frCap26 } from './fr-cap26'
import { frCap27 } from './fr-cap27'
import { frCap28 } from './fr-cap28'
import { frCap29 } from './fr-cap29'

/** Atașează „Povestea capitolului”. */
const POVESTI = { ...FR_POVESTI_A1, ...FR_POVESTI_A2 }
const R = (l: Lesson) => (POVESTI[l.id] ? withStory(l, POVESTI[l.id]) : l)
const units: Unit[] = [
  { id: 'fr-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [frCap01, frCap02, frCap03, frCap04] },
  { id: 'fr-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [frCap05, frCap06, frCap07, frCap08] },
  { id: 'fr-a1-3', title: 'A1 · Lumea din jur', level: 'A1', lessons: [frCap09, frCap10, frCap11, frCap12] },
  { id: 'fr-a2-1', title: 'A2 · Povești din trecut', level: 'A2', lessons: [frCap13, frCap14, frCap15, frCap16] },
  { id: 'fr-a2-2', title: 'A2 · Oameni, cadouri și locuri', level: 'A2', lessons: [frCap17, frCap18, frCap19, frCap20] },
  { id: 'fr-a2-3', title: 'A2 · Amintiri și planuri', level: 'A2', lessons: [frCap21, frCap22, frCap23, frCap24] },
  { id: 'fr-a2-4', title: 'A2 · Emoții și păreri', level: 'A2', lessons: [frCap25, frCap26, frCap27, frCap28] },
  { id: 'fr-a2-5', title: 'A2 · Nunta și viața nouă', level: 'A2', lessons: [frCap29] },
]

export const fr: Course = {
  lang: 'fr',
  name: 'Franceză',
  native: 'Français',
  flag: '🇫🇷',
  locale: 'fr-FR',
  hello: 'Bonjour',
  exam: 'DELF / DALF',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units: units.map((u) => ({ ...u, lessons: u.lessons.map(R) })),
}
