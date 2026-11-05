import Dexie, { type Table } from 'dexie'
import { today } from './util'

export interface CardRow {
  id: string // `${lang}|${wordId}`
  lang: string
  wordId: string
  lessonId: string
  due: number
  stability: number
  difficulty: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: number
  last_review?: number
  added: number
}

export interface LessonRow {
  id: string
  lang: string
  best: number
  times: number
  completedAt: number
}

export interface DayRow {
  date: string
  reviews: number
  lessons: number
  xp: number
}

/** Progresul unui capitol mare: cele două ședințe. */
export interface ChapterRow {
  id: string
  lang: string
  s1?: number
  s2?: number
  /** pasul la care ai rămas într-o ședință neterminată */
  s1Step?: number
  s2Step?: number
}

/** O temă dintr-un capitol: id = `${lessonId}#${index}`. */
export interface HomeworkRow {
  id: string
  lessonId: string
  done: boolean
  score?: number
  text?: string
  at: number
}

class PoliglotDB extends Dexie {
  cards!: Table<CardRow, string>
  lessons!: Table<LessonRow, string>
  days!: Table<DayRow, string>
  chapters!: Table<ChapterRow, string>
  homework!: Table<HomeworkRow, string>

  constructor(name: string) {
    super(name)
    this.version(1).stores({
      cards: 'id, lang, due, [lang+due]',
      lessons: 'id, lang',
      days: 'date',
    })
    this.version(2).stores({
      chapters: 'id, lang',
      homework: 'id, lessonId',
    })
  }
}

/**
 * Baza de date a utilizatorului conectat. Fiecare cont are propria bază,
 * deci progresul unui utilizator nu se amestecă cu al altuia.
 */
export let db: PoliglotDB = new PoliglotDB('poliglot')

export function openUserDb(name: string) {
  if (db.name === name) return
  db.close()
  db = new PoliglotDB(name)
}

/** Șterge tot progresul unui capitol: ședințe, scor, teme și cuvintele lui din repetiție. */
export async function resetChapter(lang: string, lessonId: string) {
  await db.transaction('rw', [db.chapters, db.lessons, db.homework, db.cards], async () => {
    await db.chapters.delete(lessonId)
    await db.lessons.delete(lessonId)
    await db.homework.where('lessonId').equals(lessonId).delete()
    await db.cards.where('lang').equals(lang).filter((c) => c.lessonId === lessonId).delete()
  })
}

export async function bumpDay(patch: Partial<Omit<DayRow, 'date'>>) {
  const date = today()
  await db.transaction('rw', db.days, async () => {
    const row = (await db.days.get(date)) ?? { date, reviews: 0, lessons: 0, xp: 0 }
    row.reviews += patch.reviews ?? 0
    row.lessons += patch.lessons ?? 0
    row.xp += patch.xp ?? 0
    await db.days.put(row)
  })
}

export function streakFrom(days: DayRow[]): number {
  const active = new Set(days.filter((d) => d.reviews + d.lessons > 0).map((d) => d.date))
  const d = new Date()
  if (!active.has(today(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (active.has(today(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export async function exportProgress(): Promise<string> {
  const [cards, lessons, days, chapters, homework] = await Promise.all([
    db.cards.toArray(), db.lessons.toArray(), db.days.toArray(), db.chapters.toArray(), db.homework.toArray(),
  ])
  return JSON.stringify({ app: 'poliglot', version: 2, exportedAt: new Date().toISOString(), cards, lessons, days, chapters, homework })
}

export async function importProgress(json: string) {
  const data = JSON.parse(json)
  if (data?.app !== 'poliglot') throw new Error('Fișierul nu este un backup Poliglot.')
  await db.transaction('rw', [db.cards, db.lessons, db.days, db.chapters, db.homework], async () => {
    await Promise.all([db.cards.clear(), db.lessons.clear(), db.days.clear(), db.chapters.clear(), db.homework.clear()])
    await db.cards.bulkPut(data.cards ?? [])
    await db.lessons.bulkPut(data.lessons ?? [])
    await db.days.bulkPut(data.days ?? [])
    await db.chapters.bulkPut(data.chapters ?? [])
    await db.homework.bulkPut(data.homework ?? [])
  })
}
