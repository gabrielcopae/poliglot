import { norm } from './util'

export type CheckResult = 'correct' | 'accent' | 'wrong'

const stripArticle = (x: string) => x.replace(/^(el|la|los|las|il|lo|l|i|gli|le|les|un|una|uno|une|der|die|das|den|dem|ein|eine) /, '')

export function checkTyped(input: string, accepted: string[]): CheckResult {
  return matchTyped(input, accepted).res
}

/** Ca checkTyped, dar întoarce și forma acceptată cu care s-a potrivit răspunsul (ca s-o arătăm scrisă corect). */
export function matchTyped(input: string, accepted: string[]): { res: CheckResult; match?: string } {
  const exact = accepted.find((a) => norm(a, true) === norm(input, true))
  if (exact !== undefined) return { res: 'correct', match: exact }
  // japoneza se scrie fără spații: comparăm și fără ele
  const japanese = /[぀-ヿ一-龯]/
  if (accepted.some((a) => japanese.test(a + input) && norm(a, true).replace(/ /g, '') === norm(input, true).replace(/ /g, ''))) return { res: 'correct' }
  // fără accente / caractere speciale sau articol lipsă
  const lz = (x: string) => norm(x).replace(/ß/g, 'ss')
  const loose = accepted.find((a) => lz(a) === lz(input) || stripArticle(lz(a)) === lz(input))
  return loose !== undefined ? { res: 'accent', match: loose } : { res: 'wrong' }
}

export type AccentDiff = {
  /** forma corectă, cuvânt cu cuvânt; `bad` = cuvânt scris fără accent sau lipsă */
  parts: { text: string; bad: boolean }[]
  accents: boolean
  article: boolean
  /** cuvintele cu accent uitat, cu literele exacte: „cómo (ó)”, „niño (ñ)”, „für (ü)” */
  words: string[]
  missingArticle: string[]
}

/** Compară răspunsul cu forma corectă și spune exact la ce cuvinte lipsesc accentele, caracterele speciale sau articolul. */
export function accentDiff(correct: string, input: string): AccentDiff {
  const inTok = norm(input, true).split(' ').filter(Boolean)
  const raw = correct.split(/(\s+)/)
  // un cuvânt scris poate avea mai multe bucăți după normalizare („l’école” → „l école”)
  const size = (x: string) => { const n = norm(x, true); return n ? n.split(' ').length : 0 }
  const count = raw.reduce((sum, x) => sum + size(x), 0)
  const offset = Math.max(0, count - inTok.length)
  const clean = (x: string) => x.replace(/^[¿¡"«“‘(]+|[?!.,;:»”’")…]+$/g, '')
  let k = 0
  const words: string[] = []
  const missingArticle: string[] = []
  const parts = raw.map((text) => {
    const n = norm(text, true)
    if (n === '') return { text, bad: false }
    const len = size(text)
    const j = k - offset
    k += len
    // articolul lipsă poate fi un cuvânt întreg („la casa”) sau doar începutul lui („l’école”)
    const skip = Math.max(0, -j)
    if (skip >= len) { missingArticle.push(clean(text)); return { text, bad: true } }
    if (skip > 0) missingArticle.push(n.split(' ').slice(0, skip).join(' '))
    const want = n.split(' ').slice(skip).join(' ')
    const got = inTok.slice(j + skip, j + len).join(' ')
    if (want === got) return { text, bad: skip > 0 }
    const a = [...want]
    const b = [...got]
    const letters = a.length === b.length ? [...new Set(a.filter((ch, i) => ch !== b[i]))] : [...new Set(a.filter((ch) => /[^\x00-\x7f]/.test(ch) && !b.includes(ch)))]
    words.push(letters.length ? `${clean(text)} (${letters.join(', ')})` : clean(text))
    return { text, bad: true }
  })
  return { parts, accents: words.length > 0, article: missingArticle.length > 0, words, missingArticle }
}
