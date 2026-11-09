// Adună toate textele care se rostesc în aplicație, cu vocea potrivită (f / m / n), lecție cu lecție.
import { COURSES, allLessons } from '../src/content'
import type { Drill, Reading } from '../src/content/types'
import { audioKey } from '../src/audioKey'
import { TALKS } from '../src/content/talks'

export interface Item { lesson: string; lang: string; gender: 'f' | 'm' | 'n'; text: string; key: string }

export function collect(): Item[] {
  const out: Item[] = []
  const seen = new Set<string>()
  for (const course of COURSES) {
    const lang = course.lang
    for (const lesson of allLessons(course)) {
      const add = (text: string | undefined, gender: 'f' | 'm' | 'n') => {
        if (!text || !text.trim()) return
        const key = audioKey(lang, gender, text)
        if (seen.has(key)) return
        seen.add(key)
        out.push({ lesson: lesson.id, lang, gender, text: text.trim(), key })
      }
      // Ca în Reader: vorbitorul din „cast”, altfel primul personaj din „cast”
      const reading = (r?: Reading) => {
        if (!r) return
        const first = r.cast ? Object.values(r.cast)[0] : undefined
        for (const l of r.lines) add(l.t, (l.who ? r.cast?.[l.who] : first) ?? 'n')
      }
      const drills = (ds?: Drill[]) => ds?.forEach((d) => { if (d.kind === 'choice') add(d.speak, 'n') })
      lesson.words.forEach((w) => add(w.t, 'n'))
      lesson.sentences.forEach((s) => add(s.t, 'n'))
      const ch = lesson.chapter
      if (!ch) continue
      reading(ch.dialogue)
      reading(ch.reading?.reading)
      reading(ch.story?.reading)
      ch.explain.forEach((e) => e.blocks.forEach((b) => { if ('ex' in b) b.ex.forEach((l) => add(l.t, 'n')) }))
      ch.pron.forEach((p) => p.words.forEach((w) => add(w, 'n')))
      drills(ch.drills)
      drills(ch.quiz)
      ch.homework.forEach((h) => {
        if (h.kind === 'reading') reading(h.reading)
        if (h.kind === 'writing') h.model.forEach((l) => add(l.t, 'n'))
        if (h.kind === 'drills') drills(h.drills)
      })
    }
  }
  // Conversațiile cu personajele: replicile personajului cu vocea lui, ale tale cu vocea neutră
  for (const talk of TALKS) {
    const add = (text: string | undefined, gender: 'f' | 'm' | 'n') => {
      if (!text) return
      const key = audioKey(talk.lang, gender, text)
      if (seen.has(key)) return
      seen.add(key)
      out.push({ lesson: talk.id, lang: talk.lang, gender, text: text.trim(), key })
    }
    const g = talk.npc.gender
    for (const node of Object.values(talk.nodes)) {
      add(node.npc.t, g)
      node.choices.forEach((c) => { add(c.t, 'n'); add(c.react?.t, g) })
    }
    add(talk.end.t, g)
  }
  return out
}
