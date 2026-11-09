import { Flag } from '../components/Flag'
import { useLiveQuery } from 'dexie-react-hooks'
import { COURSES, getCourse } from '../content'
import type { LangCode } from '../content/types'
import { db, streakFrom } from '../db'
import type { Go } from '../nav'
import { SEASONS, partOfDay, type Season } from '../season'
import { Progress } from '../components/ui'
import { buildSyllabus } from './CourseScreen'
import { stamps } from '../journey'
import { useState } from 'react'
import { localGet, localSet } from '../settings'
import { ALL_REWARDS, RewardCard, studyDays } from '../components/RewardCard'
import { MILESTONES, StreakCard, longestStreak } from '../components/StreakCard'
import { holidayToday } from './HolidaysScreen'

/** Limbile din planul zilnic. Italiana se adaugă după spaniola A2. */
const PLAN_LANGS: LangCode[] = ['es', 'ja']

export function Home({ go, season, user }: { go: Go; season: Season; user: string }) {
  const lessons = useLiveQuery(() => db.lessons.toArray(), [], [])
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const now = Date.now()
  const dueByLang = useLiveQuery(async () => {
    const rows = await db.cards.where('due').belowOrEqual(now).toArray()
    const m: Record<string, number> = {}
    rows.forEach((r) => { m[r.lang] = (m[r.lang] ?? 0) + 1 })
    return m
  }, [], {} as Record<string, number>)
  const cardCount = useLiveQuery(() => db.cards.count(), [], 0)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])

  const done = new Set(lessons.map((l) => l.id))
  const streak = streakFrom(days)
  const totalDue = Object.values(dueByLang).reduce((a, b) => a + b, 0)
  const info = SEASONS[season]
  const stampCount = stamps(chapters, homework).length
  const today = holidayToday()
  const earned = studyDays(days)
  const seenKey = `poliglot.rewardSeen.${user}`
  const [seen, setSeen] = useState(() => Number(localGet(seenKey) ?? 0))
  const fresh = earned.length > seen && earned.length <= ALL_REWARDS.length ? earned.length : 0
  const closeFresh = () => { localSet(seenKey, String(earned.length)); setSeen(earned.length) }
  // zilele speciale ale seriei: cartonaș holografic
  const msKey = `poliglot.milestoneSeen.${user}`
  const [msSeen, setMsSeen] = useState(() => Number(localGet(msKey) ?? 0))
  const reached = MILESTONES.filter((n) => n <= longestStreak(days)).pop() ?? 0
  const freshMs = reached > msSeen ? reached : 0
  const closeMs = () => { localSet(msKey, String(reached)); setMsSeen(reached) }

  return (
    <div className="screen home">
      {freshMs > 0 && (
        <div className="reward-pop" onClick={closeMs}>
          <div className="reward-pop-box" onClick={(e) => e.stopPropagation()}>
            <div className="reward-pop-title">✨ Cartonaș special!</div>
            <StreakCard n={freshMs} />
            <p className="muted small">Ai învățat {freshMs} zile la rând. Continuă tot așa!</p>
            <button className="btn primary" onClick={closeMs}>Super!</button>
          </div>
        </div>
      )}
      {!freshMs && fresh > 0 && (
        <div className="reward-pop" onClick={closeFresh}>
          <div className="reward-pop-box" onClick={(e) => e.stopPropagation()}>
            <div className="reward-pop-title">🎉 Cartonaș nou!</div>
            <RewardCard reward={ALL_REWARDS[fresh - 1]} day={fresh} date={earned[fresh - 1]} />
            <p className="muted small">Ai învățat azi și ai câștigat un oraș nou pentru colecție. Îl găsești în Album.</p>
            <button className="btn primary" onClick={closeFresh}>Super!</button>
          </div>
        </div>
      )}
      <section className="hero">
        <div className="hero-season">{info.emoji} {info.name} · {info.greeting}</div>
        <h1 className="hero-title">{partOfDay()}, {user}!</h1>
        <div className="hero-stats">
          <div className="pill"><span>🔥</span><b>{streak}</b> {streak === 1 ? 'zi' : 'zile'} la rând</div>
          <div className="pill"><span>📚</span><b>{cardCount}</b> cuvinte</div>
        </div>
      </section>

      <button className={`card review-strip ${totalDue ? '' : 'ok'}`} onClick={() => go({ name: 'review' })} disabled={!totalDue}>
        <span className="plan-icon">🔁</span>
        <span className="plan-body">
          <b>Repetiție</b>
          <small>{totalDue ? `${totalDue} ${totalDue === 1 ? 'cuvânt' : 'cuvinte'} de repetat azi` : 'Nimic de repetat acum ✓'}</small>
        </span>
        {totalDue ? <span className="due-go">▶</span> : null}
      </button>

      {today && (
        <button className="card holiday-banner" onClick={() => go({ name: 'holidays' })}>
          <span>{today.emoji}</span>
          <span className="session-body"><b>Azi: {today.name}</b><small>{today.where} · atinge ca să afli obiceiurile</small></span>
        </button>
      )}

      <h2 className="section-title">Explorează</h2>
      <div className="journey-tiles">
        {([
          ['passport', '🛂', 'Pașaport', `${stampCount} ștampile`],
          ['album', '🃏', 'Album', 'cartonașe'],
          ['island', '🏝️', 'Insula ta', 'crește cu tine'],
          ['train', '🚂', 'Trenul', 'gară cu gară'],
          ['talks', '💬', 'Conversații', 'cu personajele'],
          ['pairs', '🧩', 'Perechi', 'joc de memorie'],
          ['museum', '🏛️', 'Muzeul', 'personalităților'],
          ['holidays', '🎎', 'Sărbători', 'calendar'],
        ] as const).map(([name, emoji, title, sub]) => (
          <button key={name} className="card journey-tile" onClick={() => go({ name })}>
            <span className="journey-emoji">{emoji}</span>
            <b>{title}</b>
            <small>{sub}</small>
          </button>
        ))}
      </div>

      <h2 className="section-title">Limbile tale</h2>
      <div className="lang-grid">
        {COURSES.map((c) => {
          const all = buildSyllabus(c.lang, chapters.filter((x) => x.lang === c.lang), homework, done)
            .flatMap((u) => u.lessons.flatMap((l) => l.items))
          const n = all.filter((x) => x.status === 'done').length
          const next = all.find((x) => x.status === 'progress') ?? all.find((x) => x.status === 'todo')
          const started = all.some((x) => x.status !== 'todo')
          const course = getCourse(c.lang)
          return (
            <button key={c.lang} className={`card lang-card lang-${c.lang}`} onClick={() => go({ name: 'course', lang: c.lang })}>
              <div className="lang-head">
                <span className="lang-flag"><Flag lang={c.lang} size={44} /></span>
                <div>
                  <div className="lang-name">{c.name}</div>
                  <div className="lang-native">{c.native} · {c.hello}</div>
                </div>
                {dueByLang[c.lang] ? <span className="chip">{dueByLang[c.lang]} de repetat</span> : null}
                {!PLAN_LANGS.includes(c.lang) && !dueByLang[c.lang] ? <span className="chip later">după spaniolă A2</span> : null}
              </div>
              <Progress value={all.length ? n / all.length : 0} />
              <div className="lang-foot">
                <span className="muted">{n} / {all.length} ședințe</span>
                <span className="lang-next">
                  {next
                    ? `${started ? '▶ ' : ''}${next.lesson.chapter ? `Cap. ${next.lesson.chapter.number}` : next.lesson.title} · Ședința ${next.n}`
                    : `${course.name}: totul e gata 🎉`}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
