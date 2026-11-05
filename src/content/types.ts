export type LangCode = 'es' | 'it' | 'ja'

export interface Word {
  id: string
  /** textul în limba străină */
  t: string
  /** traducerea în română (la kana: citirea) */
  ro: string
  /** citire în romaji (japoneză) */
  r?: string
  /** alte răspunsuri acceptate la scriere */
  alt?: string[]
  note?: string
}

export interface Sentence {
  t: string
  ro: string
  r?: string
  /** bucățile pentru exercițiul de ordonare (implicit: cuvintele separate prin spațiu) */
  parts?: string[]
}

export interface GrammarNote {
  title: string
  body: string[]
  table?: string[][]
}

export interface Lesson {
  id: string
  title: string
  emoji: string
  goal: string
  kind: 'vocab' | 'kana'
  words: Word[]
  sentences: Sentence[]
  grammar: GrammarNote[]
  /** prezent doar la capitolele în formatul mare (≈1 oră + teme) */
  chapter?: ChapterData
}

// ——— Capitole în formatul „manual cu CD” ———

/** O replică dintr-un text sau dialog. */
export interface Line {
  who?: string
  t: string
  ro: string
  r?: string
  /** în povești: începe un paragraf nou */
  br?: boolean
}

export interface Reading {
  title: string
  /** „story” = text narativ afișat ca paragrafe de carte */
  kind?: 'story'
  intro?: string
  /** personaj → voce: f (feminin) sau m (masculin) */
  cast?: Record<string, 'f' | 'm'>
  lines: Line[]
  /** forme flexionate → traducere, pentru atingerea unui cuvânt din text */
  gloss?: Record<string, string>
}

export type Block =
  | { p: string }
  | { tip: string }
  | { warn: string }
  | { table: string[][] }
  | { ex: Line[] }

export interface Explain {
  title: string
  blocks: Block[]
}

export type Drill =
  | { kind: 'choice'; q: string; options: string[]; answer: string; explain?: string; speak?: string }
  | { kind: 'fill'; before: string; after: string; answers: string[]; ro?: string; hint?: string; explain?: string }
  | { kind: 'translate'; ro: string; answers: string[]; explain?: string }
  | { kind: 'order'; ro: string; parts: string[]; explain?: string }

export interface PronItem {
  sound: string
  how: string
  words: string[]
}

export type Homework =
  | { kind: 'drills'; title: string; instructions: string; drills: Drill[] }
  | { kind: 'reading'; title: string; instructions: string; reading: Reading; questions: Drill[] }
  | { kind: 'writing'; title: string; instructions: string; tips: string[]; model: Line[]; minWords: number }
  | { kind: 'task'; title: string; instructions: string; steps: string[] }

export interface ChapterData {
  number: number
  goals: string[]
  dialogue: Reading
  pron: PronItem[]
  explain: Explain[]
  drills: Drill[]
  quiz: Drill[]
  homework: Homework[]
  /** text de lectură mai lung, citit în Ședința 2, cu întrebări */
  reading?: { reading: Reading; questions: Drill[] }
  /** „Povestea capitolului”: text narativ lung, din ce în ce mai lung de la un capitol la altul */
  story?: { reading: Reading; questions: Drill[] }
}

export interface Unit {
  id: string
  title: string
  level: string
  lessons: Lesson[]
}

export interface Course {
  lang: LangCode
  name: string
  native: string
  flag: string
  locale: string
  hello: string
  exam: string
  units: Unit[]
  /** planul complet al cursului: câte capitole are fiecare nivel */
  plan: { level: string; title: string; chapters: number }[]
}

// ——— ajutoare pentru scrierea conținutului ———

type WordInput = Omit<Word, 'id'>
type LessonInput = Omit<Lesson, 'words' | 'kind' | 'grammar' | 'sentences' | 'chapter'> & {
  chapter?: ChapterData
  kind?: Lesson['kind']
  words: WordInput[]
  sentences?: Sentence[]
  grammar?: GrammarNote[]
}

export const w = (t: string, ro: string, extra: Partial<WordInput> = {}): WordInput => ({ t, ro, ...extra })
export const s = (t: string, ro: string, extra: Partial<Sentence> = {}): Sentence => ({ t, ro, ...extra })

function slug(x: string) {
  return x.toLowerCase().normalize('NFC').replace(/[\s¿?¡!.,、。]+/g, '-').replace(/^-|-$/g, '')
}

/** Adaugă unui capitol un text de lectură și cuvintele noi din el. */
export function withReading(base: Lesson, extra: { words: WordInput[]; reading: Reading; questions: Drill[] }): Lesson {
  if (!base.chapter) return base
  const known = new Set(base.words.map((x) => x.id))
  const words = extra.words.map((x) => ({ ...x, id: `${base.id}.${slug(x.t)}` })).filter((x) => !known.has(x.id))
  return { ...base, words: [...base.words, ...words], chapter: { ...base.chapter, reading: { reading: extra.reading, questions: extra.questions } } }
}

/** Adaugă unui capitol „Povestea capitolului”. */
export function withStory(base: Lesson, story: { reading: Reading; questions: Drill[] }): Lesson {
  if (!base.chapter) return base
  return { ...base, chapter: { ...base.chapter, story: { reading: { ...story.reading, kind: 'story' }, questions: story.questions } } }
}

export function lesson(input: LessonInput): Lesson {
  return {
    kind: 'vocab',
    sentences: [],
    grammar: [],
    ...input,
    words: input.words.map((x) => ({ ...x, id: `${input.id}.${slug(x.t)}` })),
  }
}
