import type { Course, Unit } from './types'
import { deCap01 } from './de-cap01'
import { deCap02 } from './de-cap02'
import { deCap03 } from './de-cap03'
import { deCap04 } from './de-cap04'
import { deCap05 } from './de-cap05'
import { deCap06 } from './de-cap06'
import { deCap07 } from './de-cap07'
import { deCap08 } from './de-cap08'

// Germană: Mara Ionescu, asistentă medicală din Sibiu, la un spital din Berlin (Prenzlauer Berg).
const units: Unit[] = [
  { id: 'de-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [deCap01, deCap02, deCap03, deCap04] },
  { id: 'de-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [deCap05, deCap06, deCap07, deCap08] },
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
