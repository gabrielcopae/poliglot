import type { Course, Unit } from './types'
import { itCap01 } from './it-cap01'
import { itCap02 } from './it-cap02'
import { itCap03 } from './it-cap03'
import { itCap04 } from './it-cap04'
import { itCap05 } from './it-cap05'
import { itCap06 } from './it-cap06'
import { itCap07 } from './it-cap07'
import { itCap08 } from './it-cap08'
import { itCap09 } from './it-cap09'
import { itCap10 } from './it-cap10'
import { itCap11 } from './it-cap11'
import { itCap12 } from './it-cap12'
import { itCap13 } from './it-cap13'
import { itCap14 } from './it-cap14'
import { itCap15 } from './it-cap15'
import { itCap16 } from './it-cap16'
import { itCap17 } from './it-cap17'
import { itCap18 } from './it-cap18'
import { itCap19 } from './it-cap19'
import { itCap20 } from './it-cap20'
import { itCap21 } from './it-cap21'
import { itCap22 } from './it-cap22'
import { itCap23 } from './it-cap23'
import { itCap24 } from './it-cap24'
import { itCap25 } from './it-cap25'
import { itCap26 } from './it-cap26'
import { itCap27 } from './it-cap27'
import { itCap28 } from './it-cap28'
import { itCap29 } from './it-cap29'
import { itCap30 } from './it-cap30'
import { itCap31 } from './it-cap31'
import { itCap32 } from './it-cap32'
import { itCap33 } from './it-cap33'
import { itCap34 } from './it-cap34'
import { itCap35 } from './it-cap35'
import { itCap36 } from './it-cap36'
import { itCap37 } from './it-cap37'
import { itCap38 } from './it-cap38'
import { itCap39 } from './it-cap39'
import { itCap40 } from './it-cap40'
import { itCap41 } from './it-cap41'

/**
 * Italiană, în formatul capitolelor (ca franceza).
 * Personaje: Matei, restaurator de picturi din Sibiu, se mută la Florența (Oltrarno);
 * signora Graziella (trattoria „Da Graziella” de la parter) și nepotul ei Pietro;
 * Giulia, colegă restauratoare din Napoli; profesorul Bellini, șeful atelierului.
 */
const units: Unit[] = [
  { id: 'it-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [itCap01, itCap02, itCap03, itCap04] },
  { id: 'it-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [itCap05, itCap06, itCap07, itCap08] },
  { id: 'it-a1-3', title: 'A1 · Lumea din jur', level: 'A1', lessons: [itCap09, itCap10, itCap11, itCap12] },
  { id: 'it-a2-1', title: 'A2 · Povești din trecut', level: 'A2', lessons: [itCap13, itCap14, itCap15, itCap16] },
  { id: 'it-a2-2', title: 'A2 · Oameni, cadouri și locuri', level: 'A2', lessons: [itCap17, itCap18, itCap19, itCap20] },
  { id: 'it-a2-3', title: 'A2 · Amintiri și planuri', level: 'A2', lessons: [itCap21, itCap22, itCap23, itCap24] },
  { id: 'it-a2-4', title: 'A2 · Emoții și păreri', level: 'A2', lessons: [itCap25, itCap26, itCap27, itCap28] },
  { id: 'it-a2-5', title: 'A2 · Nunta și viața nouă', level: 'A2', lessons: [itCap29, itCap30, itCap31, itCap32] },
  { id: 'it-a2-6', title: 'A2 · Povești și finalul A2', level: 'A2', lessons: [itCap33, itCap34, itCap35, itCap36] },
  { id: 'it-b1-1', title: 'B1 · Viață nouă', level: 'B1', lessons: [itCap37, itCap38, itCap39, itCap40] },
  { id: 'it-b1-2', title: 'B1 · Ce-ar fi dacă…', level: 'B1', lessons: [itCap41] },
]

export const it: Course = {
  lang: 'it',
  name: 'Italiană',
  native: 'Italiano',
  flag: '🇮🇹',
  locale: 'it-IT',
  hello: 'Ciao',
  exam: 'CILS / CELI',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units,
}
