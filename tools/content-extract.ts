// Adună toate textele în română din conținut (lecții, cartonașe, ștampile, calendar…), grupate pe părți,
// exact cum le trece aplicația prin tc(). Ieșire: tools/out/content-ro.json  { parte: [texte] }
// Rulare:
//   npx rolldown tools/content-extract.ts --format esm --file tools/out/content-extract.mjs
//   node -e "import('./tools/out/content-extract.mjs').then(m=>require('fs').writeFileSync('tools/out/content-ro.json',JSON.stringify(m.collect(),null,1)))"
import { COURSES, allLessons } from '../src/content'
import type { Drill, Reading } from '../src/content/types'
import { TALKS } from '../src/content/talks'
import { HOLIDAYS } from '../src/content/holidays'
import { DAYS } from '../src/content/days'
import { KEEPSAKES, PLACES } from '../src/journey'
import REWARDS from '../src/content/rewards-data.json'
import SESSION_PLACES from '../src/content/session-places.json'
import PEOPLE from '../src/content/people-data.json'
import KANJI from '../src/content/kanji-data.json'

type Groups = Record<string, string[]>

export function collect(): Groups {
  const groups: Groups = {}
  const seen = new Set<string>()
  const add = (group: string, s?: string) => {
    if (!s || !s.trim() || seen.has(s)) return
    // textele fără nicio literă latină (numai japoneză, cifre, semne) nu au ce traduce
    if (!/[a-zA-ZăâîșțĂÂÎȘȚ]/.test(s)) return
    seen.add(s)
    ;(groups[group] ??= []).push(s)
  }
  const drills = (g: string, ds?: Drill[]) => ds?.forEach((d) => {
    if (d.kind === 'choice') { add(g, d.q); d.options.forEach((o) => add(g, o)); add(g, d.answer) }
    if (d.kind === 'fill') { add(g, d.ro); add(g, d.hint) }
    if (d.kind === 'translate' || d.kind === 'order') add(g, d.ro)
    add(g, d.explain)
  })
  const reading = (g: string, r?: Reading) => {
    if (!r) return
    add(g, r.title); add(g, r.intro)
    r.lines.forEach((l) => add(g, l.ro))
    Object.values(r.gloss ?? {}).forEach((x) => add(g, x))
  }

  for (const course of COURSES) {
    course.plan.forEach((p) => add(`${course.lang}-plan`, p.title))
    course.units.forEach((u) => add(`${course.lang}-plan`, u.title))
    for (const lesson of allLessons(course)) {
      const g = lesson.id
      add(g, lesson.title); add(g, lesson.goal)
      lesson.words.forEach((w) => { add(g, w.ro); add(g, w.note) })
      lesson.sentences.forEach((s) => add(g, s.ro))
      lesson.grammar.forEach((gr) => { add(g, gr.title); gr.body.forEach((b) => add(g, b)); gr.table?.flat().forEach((c) => add(g, c)) })
      const ch = lesson.chapter
      if (!ch) continue
      ch.goals.forEach((x) => add(g, x))
      reading(g, ch.dialogue)
      ch.pron.forEach((p) => add(g, p.how))
      ch.explain.forEach((e) => {
        add(g, e.title)
        e.blocks.forEach((b) => {
          if ('p' in b) add(g, b.p)
          else if ('tip' in b) add(g, b.tip)
          else if ('warn' in b) add(g, b.warn)
          else if ('table' in b) b.table.flat().forEach((c) => add(g, c))
          else b.ex.forEach((l) => add(g, l.ro))
        })
      })
      drills(g, ch.drills); drills(g, ch.quiz)
      if (ch.reading) { reading(g, ch.reading.reading); drills(g, ch.reading.questions) }
      if (ch.story) { reading(g, ch.story.reading); drills(g, ch.story.questions) }
      ch.homework.forEach((h) => {
        add(g, h.title); add(g, h.instructions)
        if (h.kind === 'drills') drills(g, h.drills)
        if (h.kind === 'reading') { reading(g, h.reading); drills(g, h.questions) }
        if (h.kind === 'writing') { h.tips.forEach((x) => add(g, x)); h.model.forEach((l) => add(g, l.ro)) }
        if (h.kind === 'task') h.steps.forEach((x) => add(g, x))
      })
    }
  }
  for (const t of TALKS) {
    const g = 'talks'
    add(g, t.title); add(g, t.intro); add(g, t.afterLabel); add(g, t.end.ro)
    for (const n of Object.values(t.nodes)) {
      add(g, n.npc.ro)
      n.choices.forEach((c) => { add(g, c.ro); add(g, c.tip); add(g, c.react?.ro) })
    }
  }
  for (const h of HOLIDAYS) { add('holidays', h.name); add('holidays', h.where); add('holidays', h.fact); h.words.forEach((w) => add('holidays', w.ro)) }
  for (const [, esRo, , jaRo] of Object.values(DAYS)) { add('days', esRo); add('days', jaRo) }
  for (const r of [...(REWARDS as { city: string; landmark: string; country: string; fact: string }[]), ...(SESSION_PLACES as { city: string; landmark: string; country: string; fact: string }[])]) {
    add('places', r.city); add('places', r.landmark); add('places', r.country); add('places', r.fact)
  }
  for (const p of PEOPLE as { city: string; landmark: string; country: string; role: string; fact: string }[]) {
    add('people', p.city); add('people', p.landmark); add('people', p.country); add('people', p.role); add('people', p.fact)
  }
  for (const k of KANJI as { meaning: string; exRo: string; group: string }[]) { add('kanji', k.meaning); add('kanji', k.meaning.split(';')[0]); add('kanji', k.exRo); add('kanji', k.group) }
  for (const p of Object.values(PLACES)) add('journey', p.place)
  for (const k of Object.values(KEEPSAKES)) { add('journey', k.name); add('journey', k.ro) }
  return groups
}
