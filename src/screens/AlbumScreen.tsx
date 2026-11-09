import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES, getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db } from '../db'
import { KEEPSAKES, stamps } from '../journey'
import { speak } from '../speech'

/** Fraza de pe spatele cartonașului: obiectul special sau prima replică din dialogul capitolului. */
function backOf(lesson: Lesson) {
  const k = KEEPSAKES[lesson.id]
  if (k) return { t: k.t, ro: k.ro, gender: undefined }
  const d = lesson.chapter?.dialogue
  const line = d?.lines[0]
  return { t: line?.t ?? lesson.title, ro: line?.ro ?? '', gender: line?.who ? d?.cast?.[line.who] : undefined }
}

export function AlbumScreen({ back }: { back: () => void }) {
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const [open, setOpen] = useState<string | null>(null)
  const course = getCourse(lang)
  const got = new Set(stamps(chapters, homework).map((s) => s.lesson.id))
  const all = course.units.flatMap((u) => u.lessons.filter((l) => l.chapter))
  const gold = all.filter((l) => KEEPSAKES[l.id])

  return (
    <div className="screen">
      <TopBar title="🃏 Albumul cu amintiri" onBack={back} />
      <div className="segmented">
        {COURSES.filter((c) => c.units.some((u) => u.lessons.some((l) => l.chapter))).map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => { setLang(c.lang); setOpen(null) }}><Flag lang={c.lang} size={16} /> {c.name}</button>
        ))}
      </div>
      <p className="muted small">
        {all.filter((l) => got.has(l.id)).length} din {all.length} cartonașe · {gold.filter((l) => got.has(l.id)).length} din {gold.length} aurii. Primești cartonașul când termini capitolul. Atinge-l ca să-l întorci.
      </p>
      <div className="album-grid">
        {all.map((lesson) => {
          const has = got.has(lesson.id)
          const k = KEEPSAKES[lesson.id]
          const flipped = open === lesson.id
          const b = backOf(lesson)
          if (!has) {
            return (
              <div key={lesson.id} className={`album-card locked ${k ? 'gold' : ''}`}>
                <div className="album-face"><span className="album-q">?</span><small>Cap. {lesson.chapter!.number}</small></div>
              </div>
            )
          }
          return (
            <button key={lesson.id} className={`album-card ${k ? 'gold' : ''} ${flipped ? 'flipped' : ''}`} onClick={() => setOpen(flipped ? null : lesson.id)}>
              <div className="album-inner">
                <div className="album-face">
                  <span className="album-emoji">{k?.emoji ?? lesson.emoji}</span>
                  <b>{k?.name ?? lesson.title}</b>
                  <small>Cap. {lesson.chapter!.number}</small>
                </div>
                <div className="album-face album-back">
                  <span className={lang === 'ja' ? 'jp' : ''}>{b.t}</span>
                  <small>{b.ro}</small>
                  <span className="album-play" onClick={(e) => { e.stopPropagation(); speak(b.t, lang, course.locale, undefined, b.gender ? { gender: b.gender } : {}) }}>🔊</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
