import { useLiveQuery } from 'dexie-react-hooks'
import { useState, type ReactNode } from 'react'
import { Spotlight } from '../components/Spotlight'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES } from '../content'
import type { LangCode } from '../content/types'
import { db } from '../db'
import { levelChapters, placeOf, stamps, tilt } from '../journey'
import type { Go } from '../nav'
import PEOPLE from '../content/people-data.json'
import { isAdmin } from '../components/RewardCard'

/** Personalitatea de pe ștampila unui capitol (city = nume, landmark = locul nașterii). */
interface Person { city: string; landmark: string; country: string; role: string; lang: string; fact: string; img: string; author: string; license: string }
const PALETTE = ['#c2552d', '#2f6f9f', '#3a7d4f', '#8a3fa0', '#b8333f', '#c08a1e', '#1f7a7a', '#5b4a8a']

const fmt = (t: number) => new Date(t).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })

/** Ștampila unui capitol: personalitatea, cu poza, orașul natal și un fun fact pe spate. */
function PersonStamp({ person, color, tiltDeg, chapter, date, onOpen }: { person: Person; color: string; tiltDeg: number; chapter: number; date?: string; onOpen?: () => void }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button className={'pstamp ' + (flipped ? 'flipped' : '')} style={{ '--stamp': color, '--tilt': tiltDeg + 'deg' } as React.CSSProperties} onClick={() => (onOpen ? onOpen() : setFlipped(!flipped))}>
      <div className="pstamp-inner">
        <div className="pstamp-face">
          <div className="pstamp-place">{person.landmark}</div>
          <div className="pstamp-photo" style={{ backgroundImage: 'url(' + import.meta.env.BASE_URL + 'rewards/' + person.img + ')' }} />
          <div className="pstamp-name">{person.city}</div>
          <div className="pstamp-ch">CAP. {chapter}{date ? ' · ' + date : ''}</div>
        </div>
        <div className="pstamp-face pstamp-back">
          <b>{person.city}</b>
          <small>{person.role} · {person.landmark}, {person.country}</small>
          <p>{person.fact}</p>
          <span className="pstamp-credit">Foto: {person.author.slice(0, 30)} · {person.license}</span>
        </div>
      </div>
    </button>
  )
}

export function PassportScreen({ go, back, user }: { go: Go; back: () => void; user: string }) {
  const admin = isAdmin(user)
  const [spot, setSpot] = useState<ReactNode>(null)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const exams = useLiveQuery(() => db.exams.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const course = COURSES.find((c) => c.lang === lang)!
  const mine = stamps(chapters, homework).filter((s) => s.lang === lang)
  const byId = new Map(mine.map((s) => [s.lesson.id, s]))
  const people = (PEOPLE as Person[]).filter((p) => p.lang === lang)
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
                const person = people[lesson.chapter!.number - 1]
                const color = PALETTE[(lesson.chapter!.number - 1) % PALETTE.length]
                const owned = admin || !!s
                if (!owned) return <div key={lesson.id} className="stamp empty" title={lesson.title}><div className="stamp-ch">{lesson.chapter!.number}</div></div>
                if (!person) {
                  return (
                    <div key={lesson.id} className="stamp" style={{ '--stamp': pl.color, transform: `rotate(${tilt(lesson.id)}deg)` } as React.CSSProperties}>
                      <div className="stamp-place">{pl.place}</div>
                      <div className="stamp-emoji">{lesson.emoji}</div>
                      <div className="stamp-ch">CAP. {lesson.chapter!.number}</div>
                      {s && <div className="stamp-date">{fmt(s.at)}</div>}
                    </div>
                  )
                }
                const props = { person, color, tiltDeg: tilt(lesson.id), chapter: lesson.chapter!.number, date: s ? fmt(s.at) : undefined }
                return <PersonStamp key={lesson.id} {...props} onOpen={() => setSpot(<PersonStamp {...props} />)} />
              })}
            </div>
          </article>
        )
      })}
      <p className="muted small center">O ștampilă pentru fiecare capitol terminat (ambele ședințe și toate temele). Viza nivelului o primești când treci testul de nivel.</p>
      {spot && <Spotlight onClose={() => setSpot(null)}>{spot}</Spotlight>}
    </div>
  )
}
