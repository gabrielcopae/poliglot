import type { Course, Unit } from './types'
import { enCap01 } from './en-cap01'
import { enCap02 } from './en-cap02'
import { enCap03 } from './en-cap03'
import { enCap04 } from './en-cap04'

/**
 * Engleză (britanică), în formatul capitolelor (ca italiana și franceza).
 * Personaje: Irina, peisagistă din Brașov, se mută la Edinburgh (Stockbridge) și lucrează la Grădina Botanică;
 * Mrs Margaret „Maggie” Fraser, proprietăreasa, învățătoare pensionară, cu pisica Hamish, și nepoata ei Ruby (8 ani);
 * Callum Reid, librar din Inverness, cu librăria la parter.
 */
const units: Unit[] = [
  { id: 'en-a1-1', title: 'A1 · Primii pași', level: 'A1', lessons: [enCap01, enCap02, enCap03, enCap04] },
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
