import { tk } from './i18n'
import { createEmptyCard, fsrs, Rating, type Card } from 'ts-fsrs'
import { db, type CardRow } from './db'

const scheduler = fsrs({ request_retention: 0.9, enable_fuzz: true, maximum_interval: 3650 })

export const GRADES = [
  { rating: Rating.Again, label: tk('Din nou'), cls: 'again' },
  { rating: Rating.Hard, label: tk('Greu'), cls: 'hard' },
  { rating: Rating.Good, label: tk('Bine'), cls: 'good' },
  { rating: Rating.Easy, label: tk('Ușor'), cls: 'easy' },
] as const

export type GradeValue = (typeof GRADES)[number]['rating']

function toCard(r: CardRow): Card {
  return {
    due: new Date(r.due),
    stability: r.stability,
    difficulty: r.difficulty,
    scheduled_days: r.scheduled_days,
    learning_steps: r.learning_steps,
    reps: r.reps,
    lapses: r.lapses,
    state: r.state,
    last_review: r.last_review ? new Date(r.last_review) : undefined,
  } as Card
}

function fromCard(base: CardRow, c: Card): CardRow {
  return {
    ...base,
    due: new Date(c.due).getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state as number,
    last_review: c.last_review ? new Date(c.last_review).getTime() : undefined,
  }
}

export async function addWords(lang: string, lessonId: string, wordIds: string[]) {
  const now = new Date()
  const ids = wordIds.map((w) => `${lang}|${w}`)
  const existing = new Set((await db.cards.bulkGet(ids)).filter(Boolean).map((c) => c!.id))
  const rows: CardRow[] = []
  wordIds.forEach((wordId, i) => {
    if (existing.has(ids[i])) return
    const base = { id: ids[i], lang, wordId, lessonId, added: now.getTime() } as CardRow
    rows.push(fromCard(base, createEmptyCard(now)))
  })
  if (rows.length) await db.cards.bulkPut(rows)
  return rows.length
}

export function preview(row: CardRow, rating: GradeValue, now = new Date()): number {
  const next = scheduler.next(toCard(row), now, rating)
  return new Date(next.card.due).getTime() - now.getTime()
}

export async function grade(row: CardRow, rating: GradeValue): Promise<CardRow> {
  const next = scheduler.next(toCard(row), new Date(), rating)
  const updated = fromCard(row, next.card)
  await db.cards.put(updated)
  return updated
}

/** Cuvânt „învățat bine”: interval de cel puțin 21 de zile. */
export function isMature(r: CardRow) {
  return r.scheduled_days >= 21
}
