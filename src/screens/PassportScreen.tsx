import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES } from '../content'
import type { LangCode } from '../content/types'
import { db } from '../db'
import { levelChapters, placeOf, stamps, tilt } from '../journey'
import type { Go } from '../nav'

const fmt = (t: number) => new Date(t).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })

export function PassportScreen({ go, back }: { go: Go; back: () => void }) {
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const exams = useLiveQuery(() => db.exams.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const course = COURSES.find((c) => c.lang === lang)!
  const mine = stamps(chapters, homework).filter((s) => s.lang === lang)
  const byId = new Map(mine.map((s) => [s.lesson.id, s]))
  const levels = course.plan.filter((p) => levelChapters(course, p.level).length > 0)

  return (
    <div className="screen">
      <TopBar title="🛂 Pașaportul călătorului" onBack={back} />
      <div className="segmented">
        {COURSES.filter((c) => c.units.some((u) => u.lessons.some((l) => l.chapter))).map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => setLang(c.lang)}><Flag lang={c.lang} size={16} /> {c.name}</button>
        ))}
      </div>

      <article className="passport-cover">
        <div className="passport-emblem">🌍</div>
        <div className="passport-title">PAȘAPORT</div>
        <div className="passport-sub">{course.name} · {course.native}</div>
        <div className="passport-count"><b>{mine.length}</b> {mine.length === 1 ? 'ștampilă' : 'ștampile'} · <b>{exams.filter((e) => e.lang === lang && e.passed).length}</b> vize</div>
      </article>

      {levels.map((p) => {
        const list = levelChapters(course, p.level)
        const exam = exams.find((e) => e.id === `${lang}-${p.level}`)
        return (
          <article key={p.level} className="passport-page">
            <header className="passport-page-head">
              <span className="level">{p.level}</span>
              <b>{p.title}</b>
              <span className="muted small">{list.filter((x) => byId.has(x.lesson.id)).length} / {list.length}</span>
            </header>
            {exam?.passed && (
              <div className="visa">
                <div className="visa-title">VIZĂ {p.level}</div>
                <div className="visa-body">Test de nivel trecut cu <b>{exam.best}%</b> · {fmt(exam.passedAt ?? exam.at)}</div>
              </div>
            )}
            {!exam?.passed && <button className="exam-link" onClick={() => go({ name: 'exam', lang, level: p.level })}>📝 Dă testul de nivel {p.level} pentru viză</button>}
            <div className="stamp-grid">
              {list.map(({ unitId, lesson }) => {
                const s = byId.get(lesson.id)
                const pl = placeOf(unitId, lang)
                return s ? (
                  <div key={lesson.id} className="stamp" style={{ '--stamp': pl.color, transform: `rotate(${tilt(lesson.id)}deg)` } as React.CSSProperties}>
                    <div className="stamp-place">{pl.place}</div>
                    <div className="stamp-emoji">{lesson.emoji}</div>
                    <div className="stamp-ch">CAP. {lesson.chapter!.number}</div>
                    <div className="stamp-date">{fmt(s.at)}</div>
                  </div>
                ) : (
                  <div key={lesson.id} className="stamp empty" title={lesson.title}>
                    <div className="stamp-ch">{lesson.chapter!.number}</div>
                  </div>
                )
              })}
            </div>
          </article>
        )
      })}
      <p className="muted small center">O ștampilă pentru fiecare capitol terminat (ambele ședințe și toate temele). Viza nivelului o primești când treci testul de nivel.</p>
    </div>
  )
}
