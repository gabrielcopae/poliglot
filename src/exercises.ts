import type { Course, Drill, Lesson, Word } from './content/types'
import { allLessons } from './content'
import { norm, sample, shuffle } from './util'
import { t, tc, langWord } from './i18n'

type Base = { label: string; explain?: string }

export type Exercise = Base & (
  | { kind: 'choice'; prompt: string; sub?: string; speak?: string; options: string[]; answer: string; optionsTarget: boolean }
  | { kind: 'listen'; speak: string; options: string[]; answer: string }
  | { kind: 'type'; prompt: string; accepted: string[]; answer: string; speak: string }
  | { kind: 'dictation'; speak: string; accepted: string[]; answer: string; ro?: string }
  | { kind: 'fill'; before: string; after: string; ro?: string; hint?: string; accepted: string[]; answer: string; speak: string }
  | { kind: 'order'; prompt: string; tokens: string[]; answer: string[]; joiner: string; speak: string }
  | { kind: 'speak'; text: string; sub?: string; ro: string }
)

/** Transformă un exercițiu scris în conținut într-unul afișabil. */
export function drillToExercise(d: Drill, course: Course): Exercise {
  switch (d.kind) {
    case 'choice':
      return { kind: 'choice', label: t('Alege răspunsul corect'), prompt: tc(d.q), speak: d.speak, options: shuffle(d.options.map(tc)), answer: tc(d.answer), optionsTarget: false, explain: d.explain && tc(d.explain) }
    case 'fill':
      return {
        kind: 'fill', label: t('Completează'), before: d.before, after: d.after, ro: d.ro && tc(d.ro), hint: d.hint && tc(d.hint),
        accepted: d.answers, answer: d.answers[0], speak: `${d.before} ${d.answers[0]} ${d.after}`.replace(/\s+([?!.,])/g, '$1').replace('¿ ', '¿'), explain: d.explain && tc(d.explain),
      }
    case 'translate':
      return { kind: 'type', label: t('Tradu în {lang}', { lang: langWord(course.name) }), prompt: tc(d.ro), accepted: d.answers, answer: d.answers[0], speak: d.answers[0], explain: d.explain && tc(d.explain) }
    case 'order':
      return { kind: 'order', label: t('Formează propoziția'), prompt: tc(d.ro), tokens: shuffle(d.parts), answer: d.parts, joiner: course.lang === 'ja' ? '' : ' ', speak: d.parts.join(course.lang === 'ja' ? '' : ' '), explain: d.explain && tc(d.explain) }
  }
}

const isKanaChar = (l: Lesson, w: Word) => l.kind === 'kana' && !w.r

function distractors(pool: Word[], word: Word, key: 't' | 'ro', n = 3): string[] {
  const seen = new Set([word[key]])
  const out: string[] = []
  for (const w of shuffle(pool)) {
    if (seen.has(w[key])) continue
    seen.add(w[key])
    out.push(w[key])
    if (out.length === n) break
  }
  return out
}

export function buildExercises(course: Course, lesson: Lesson, opts: { canListen: boolean; romaji: boolean }): Exercise[] {
  const lessons = allLessons(course)
  const idx = lessons.findIndex((l) => l.id === lesson.id)
  // distractorii vin din lecție, apoi din lecțiile anterioare de același tip
  const same = lesson.words
  const near = lessons.slice(0, idx + 1).filter((l) => l.kind === lesson.kind).flatMap((l) => l.words)

  const wordEx: Exercise[] = []
  for (const word of sample(lesson.words, Math.min(10, lesson.words.length))) {
    const kanaChar = isKanaChar(lesson, word)
    const pool = (kanaChar ? near.filter((w) => !w.r) : same.length >= 4 ? same : near).filter((w) => isKanaChar(lesson, w) === kanaChar)
    const sub = opts.romaji && word.r ? word.r : undefined
    const kinds = ['toRo', 'toTarget', 'listen'] as const
    const pick = kinds[Math.floor(Math.random() * kinds.length)]
    if (pick === 'toRo') {
      wordEx.push({
        kind: 'choice',
        label: kanaChar ? t('Cum se citește?') : t('Ce înseamnă?'),
        prompt: word.t,
        sub,
        speak: word.t,
        answer: tc(word.ro),
        options: shuffle([word.ro, ...distractors(pool, word, 'ro')].map(tc)),
        optionsTarget: false,
      })
    } else if (pick === 'toTarget') {
      wordEx.push({
        kind: 'choice',
        label: kanaChar ? t('Care semn se citește așa?') : t('Cum se spune în {lang}?', { lang: langWord(course.name) }),
        prompt: tc(word.ro),
        answer: word.t,
        options: shuffle([word.t, ...distractors(pool, word, 't')]),
        optionsTarget: true,
      })
    } else {
      wordEx.push({
        kind: 'listen',
        label: t('Ce ai auzit?'),
        speak: word.t,
        answer: word.t,
        options: shuffle([word.t, ...distractors(pool, word, 't')]),
      })
    }
  }

  const typeEx: Exercise[] = sample(lesson.words, 3).map((word) =>
    isKanaChar(lesson, word)
      ? { kind: 'type', label: t('Scrie citirea în litere latine'), prompt: word.t, accepted: [word.ro], answer: word.ro, speak: word.t }
      : {
          kind: 'type',
          label: course.lang === 'ja' ? t('Scrie în japoneză (kana sau romaji)') : t('Scrie în {lang}', { lang: langWord(course.name) }),
          prompt: tc(word.ro),
          accepted: [word.t, ...(word.r ? [word.r] : []), ...(word.alt ?? [])],
          answer: word.r ? `${word.t} (${word.r})` : word.t,
          speak: word.t,
        },
  )

  const orderEx: Exercise[] = sample(lesson.sentences, 3).map((sn) => {
    const parts = sn.parts ?? sn.t.split(' ')
    return {
      kind: 'order',
      label: t('Formează propoziția'),
      prompt: tc(sn.ro),
      tokens: shuffle(parts),
      answer: parts,
      joiner: sn.parts ? '' : ' ',
      speak: sn.t,
    }
  })

  const speakEx: Exercise[] = []
  if (opts.canListen) {
    const src = lesson.sentences.length ? lesson.sentences : lesson.words.filter((w) => !isKanaChar(lesson, w))
    const item = sample(src, 1)[0]
    if (item) speakEx.push({ kind: 'speak', label: t('Spune cu voce tare'), text: item.t, sub: opts.romaji ? item.r : undefined, ro: tc(item.ro) })
  }

  return [...shuffle(wordEx), ...typeEx, ...orderEx, ...speakEx]
}

export type CheckResult = 'correct' | 'accent' | 'wrong'

export function checkTyped(input: string, accepted: string[]): CheckResult {
  const exact = accepted.some((a) => norm(a, true) === norm(input, true))
  if (exact) return 'correct'
  // japoneza se scrie fără spații: comparăm și fără ele
  const japanese = /[぀-ヿ一-龯]/
  if (accepted.some((a) => japanese.test(a + input) && norm(a, true).replace(/ /g, '') === norm(input, true).replace(/ /g, ''))) return 'correct'
  // fără accente sau articol lipsă
  const stripArticle = (x: string) => x.replace(/^(el|la|los|las|il|lo|l|i|gli|le|un|una|uno) /, '')
  const loose = accepted.some((a) => norm(a) === norm(input) || stripArticle(norm(a)) === norm(input))
  return loose ? 'accent' : 'wrong'
}
