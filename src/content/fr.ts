import type { Course } from './types'
import { frCap01 } from './fr-cap01'
import { frCap02 } from './fr-cap02'
import { frCap03 } from './fr-cap03'
import { frCap04 } from './fr-cap04'
import { frCap05 } from './fr-cap05'
import { frCap06 } from './fr-cap06'
import { frCap07 } from './fr-cap07'
import { frCap08 } from './fr-cap08'

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
  units: [
    { id: 'fr-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [frCap01, frCap02, frCap03, frCap04] },
    { id: 'fr-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [frCap05, frCap06, frCap07, frCap08] },
  ],
}
