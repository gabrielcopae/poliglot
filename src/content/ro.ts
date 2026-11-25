import type { Course, Unit } from './types'
import { roCap01 } from './ro-cap01'
import { roCap02 } from './ro-cap02'
import { roCap03 } from './ro-cap03'
import { roCap04 } from './ro-cap04'
import { roCap05 } from './ro-cap05'
import { roCap06 } from './ro-cap06'
import { roCap07 } from './ro-cap07'
import { roCap08 } from './ro-cap08'
import { roCap09 } from './ro-cap09'
import { roCap10 } from './ro-cap10'
import { roCap11 } from './ro-cap11'

// Română: Nora Lindqvist, arhitectă din Göteborg, la Cluj-Napoca (strada Horea), în casa doamnei Elisabeta Pop.
const units: Unit[] = [
  { id: 'ro-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [roCap01, roCap02, roCap03, roCap04] },
  { id: 'ro-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [roCap05, roCap06, roCap07, roCap08] },
  { id: 'ro-a1-3', title: 'A1 · Timp liber și sănătate', level: 'A1', lessons: [roCap09, roCap10, roCap11] },
]

export const ro: Course = {
  lang: 'ro',
  name: 'Română',
  native: 'Română',
  flag: '🇷🇴',
  locale: 'ro-RO',
  hello: 'Bună',
  exam: 'Certificat de competență lingvistică B2 (Institutul Limbii Române)',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units,
}
