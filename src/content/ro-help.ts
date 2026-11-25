import { s, w } from './types'
import type { Line, Sentence } from './types'

// Ajutoare pentru cursul de română. Aici limba studiată e chiar româna, așa că „traducerea” (câmpul ro)
// e textul românesc însuși; aplicația îl traduce apoi în limba interfeței (engleză, spaniolă…) prin tc().
// Un text care începe cu „=” rămâne în română în orice limbă a interfeței (forme de exersat, răspunsuri).

/** O replică sau o propoziție dintr-un text: traducerea vine din fișierele de traducere. */
export const L = (t: string, o: { who?: string; br?: boolean } = {}): Line => ({ ...o, t, ro: t })

/** Exemplu: textul românesc și (opțional) o explicație în română, care se traduce. */
export const E = (t: string, ro?: string): Line => ({ t, ro: ro ?? t })

/** Cuvânt: forma românească și sensul ei (în română, tradus apoi în limba interfeței). */
export const W = (t: string, ro?: string, extra: { note?: string; alt?: string[] } = {}) => w(t, ro ?? t, extra)

/** Propoziție de exersat. */
export const S = (t: string): Sentence => s(t, t)

/** Marchează forme românești care nu se traduc (opțiuni, răspunsuri, celule de tabel). */
export const K = (x: string) => `=${x}`
