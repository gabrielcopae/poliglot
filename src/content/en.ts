import type { Course, Unit } from './types'
import { enCap01 } from './en-cap01'
import { enCap02 } from './en-cap02'
import { enCap03 } from './en-cap03'
import { enCap04 } from './en-cap04'
import { enCap05 } from './en-cap05'
import { enCap06 } from './en-cap06'
import { enCap07 } from './en-cap07'
import { enCap08 } from './en-cap08'
import { enCap09 } from './en-cap09'
import { enCap10 } from './en-cap10'
import { enCap11 } from './en-cap11'
import { enCap12 } from './en-cap12'
import { enCap13 } from './en-cap13'
import { enCap14 } from './en-cap14'
import { enCap15 } from './en-cap15'
import { enCap16 } from './en-cap16'
import { enCap17 } from './en-cap17'
import { enCap18 } from './en-cap18'
import { enCap19 } from './en-cap19'
import { enCap20 } from './en-cap20'

/**
 * Engleză (britanică), în formatul capitolelor (ca italiana și franceza).
 * Personaje: Irina, peisagistă din Brașov, se mută la Edinburgh (Stockbridge) și lucrează la Grădina Botanică;
 * Mrs Margaret „Maggie” Fraser, proprietăreasa, învățătoare pensionară, cu pisica Hamish, și nepoata ei Ruby (8 ani);
 * Callum Reid, librar din Inverness, cu librăria la parter.
 */
const units: Unit[] = [
  { id: 'en-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [enCap01, enCap02, enCap03, enCap04] },
  { id: 'en-a1-2', title: 'A1 · Viața de zi cu zi', level: 'A1', lessons: [enCap05, enCap06, enCap07, enCap08] },
  { id: 'en-a1-3', title: 'A1 · Lumea din jur', level: 'A1', lessons: [enCap09, enCap10, enCap11, enCap12] },
  { id: 'en-a2-1', title: 'A2 · Povești din trecut', level: 'A2', lessons: [enCap13, enCap14, enCap15, enCap16] },
  { id: 'en-a2-2', title: 'A2 · Planuri și viitor', level: 'A2', lessons: [enCap17, enCap18, enCap19, enCap20] },
]

export const en: Course = {
  lang: 'en',
  name: 'Engleză',
  native: 'English',
  flag: '🇬🇧',
  locale: 'en-GB',
  hello: 'Hello',
  exam: 'Cambridge (B2 First)',
  plan: [
    { level: 'A1', title: 'Începător', chapters: 12 },
    { level: 'A2', title: 'Elementar', chapters: 24 },
    { level: 'B1', title: 'Intermediar', chapters: 30 },
    { level: 'B2', title: 'Intermediar avansat', chapters: 36 },
    { level: 'C1', title: 'Avansat (profesionist)', chapters: 44 },
  ],
  units,
}
