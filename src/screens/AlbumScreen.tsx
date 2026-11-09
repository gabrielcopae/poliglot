import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES, getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db } from '../db'
import { KEEPSAKES, stamps } from '../journey'
import { speak } from '../speech'
import { ALL_REWARDS, RewardCard, RewardLocked, isAdmin, studyDays } from '../components/RewardCard'

/** Fraza de pe spatele cartonașului: obiectul special sau prima replică din dialogul capitolului. */
function backOf(lesson: Lesson) {
  const k = KEEPSAKES[lesson.id]
  if (k) return { t: k.t, ro: k.ro, gender: undefined }
  const d = lesson.chapter?.dialogue
  const line = d?.lines[0]
  return { t: line?.t ?? lesson.title, ro: line?.ro ?? '', gender: line?.who ? d?.cast?.[line.who] : undefined }
}

export function AlbumScreen({ back, user }: { back: () => void; user: string }) {
  const admin = isAdmin(user)
  const [cityLang, setCityLang] = useState<string>('all')
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const [open, setOpen] = useState<string | null>(null)
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const earned = studyDays(days)
  const course = getCourse(lang)
  const got = new Set(stamps(chapters, homework).map((s) => s.lesson.id))
  if (admin) course.units.forEach((u) => u.lessons.forEach((l) => got.add(l.id)))
  const all = course.units.flatMap((u) => u.lessons.filter((l) => l.chapter))
  const gold = all.filter((l) => KEEPSAKES[l.id])

  return (
    <div className="screen">
      <TopBar title="🃏 Albumul cu amintiri" onBack={back} />
      <section className="reward-preview">
        {admin && <div className="admin-banner">👑 Mod admin: toate cartonașele sunt deblocate</div>}
        <h3>🏙️ Locurile tale <span className="muted small">({admin ? ALL_REWARDS.length : Math.min(earned.length, ALL_REWARDS.length)} din {ALL_REWARDS.length})</span></h3>
        <p className="muted small">În fiecare zi în care înveți câștigi un cartonaș nou: un loc unde se vorbește limba pe care o înveți, cu ceva special din el și un fun fact despre limbă (atinge cartonașul). La fiecare a 7-a zi, rama e aurie.</p>
        {admin && (
          <div className="segmented wrap">
            {[['all', 'Toate'], ['es', '🇪🇸 Spaniolă'], ['ja', '🇯🇵 Japoneză'], ['it', '🇮🇹 Italiană'], ['ro', '🇷🇴 România']].map(([k, t]) => (
              <button key={k} className={cityLang === k ? 'on' : ''} onClick={() => setCityLang(k)}>{t}</button>
            ))}
          </div>
        )}
        <div className="reward-grid">
          {admin
            ? ALL_REWARDS.map((r, i) => ({ r, i })).filter(({ r }) => cityLang === 'all' || r.lang === cityLang).map(({ r, i }) => <RewardCard key={r.img} reward={r} day={i + 1} />)
            : <>
              {earned.length === 0 && <RewardCard reward={ALL_REWARDS[0]} day={1} preview />}
              {earned.slice(0, ALL_REWARDS.length).map((date, i) => <RewardCard key={date} reward={ALL_REWARDS[i]} day={i + 1} date={date} />)}
              {earned.length < ALL_REWARDS.length && earned.length > 0 && <RewardLocked day={earned.length + 1} />}
            </>}
        </div>
      </section>
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
