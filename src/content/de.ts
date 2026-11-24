import type { Course, Unit } from './types'
import { deCap01 } from './de-cap01'
import { deCap02 } from './de-cap02'
import { deCap03 } from './de-cap03'
import { deCap04 } from './de-cap04'
import { deCap05 } from './de-cap05'
import { deCap06 } from './de-cap06'
import { deCap07 } from './de-cap07'
import { deCap08 } from './de-cap08'
import { deCap09 } from './de-cap09'
import { deCap10 } from './de-cap10'
import { deCap11 } from './de-cap11'
import { deCap12 } from './de-cap12'
import { deCap13 } from './de-cap13'
import { deCap14 } from './de-cap14'
import { deCap15 } from './de-cap15'
import { deCap16 } from './de-cap16'
import { deCap17 } from './de-cap17'
import { deCap18 } from './de-cap18'
import { deCap19 } from './de-cap19'
import { deCap20 } from './de-cap20'
import { deCap21 } from './de-cap21'
import { deCap22 } from './de-cap22'
import { deCap23 } from './de-cap23'
import { deCap24 } from './de-cap24'
import { deCap25 } from './de-cap25'
import { deCap26 } from './de-cap26'
import { deCap27 } from './de-cap27'
import { deCap28 } from './de-cap28'
import { deCap29 } from './de-cap29'
import { deCap30 } from './de-cap30'
import { deCap31 } from './de-cap31'
import { deCap32 } from './de-cap32'
import { deCap33 } from './de-cap33'
import { deCap34 } from './de-cap34'
import { deCap35 } from './de-cap35'
import { deCap36 } from './de-cap36'

// Germană: Mara Ionescu, asistentă medicală din Sibiu, la un spital din Berlin (Prenzlauer Berg).
const units: Unit[] = [
  { id: 'de-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [deCap01, deCap02, deCap03, deCap04] },
  { id: 'de-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [deCap05, deCap06, deCap07, deCap08] },
  { id: 'de-a1-3', title: 'A1 · Timp liber, haine, sănătate', level: 'A1', lessons: [deCap09, deCap10, deCap11, deCap12] },
  { id: 'de-a2-1', title: 'A2 · Trecutul și amintirile', level: 'A2', lessons: [deCap13, deCap14, deCap15, deCap16] },
  { id: 'de-a2-2', title: 'A2 · Descrieri', level: 'A2', lessons: [deCap17, deCap18, deCap19, deCap20] },
  { id: 'de-a2-3', title: 'A2 · Planuri și dorințe', level: 'A2', lessons: [deCap21, deCap22, deCap23, deCap24] },
  { id: 'de-a2-4', title: 'A2 · Legături și argumente', level: 'A2', lessons: [deCap25, deCap26, deCap27, deCap28] },
  { id: 'de-a2-5', title: 'A2 · Lumea din jur', level: 'A2', lessons: [deCap29, deCap30, deCap31, deCap32] },
  { id: 'de-a2-6', title: 'A2 · Finalul A2', level: 'A2', lessons: [deCap33, deCap34, deCap35, deCap36] },
]

export const de: Course = {
  lang: 'de',
  name: 'Germană',
  native: 'Deutsch',
  flag: '🇩🇪',
  locale: 'de-DE',
  hello: 'Hallo',
  exam: 'Goethe-Zertifikat B2',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units,
}
