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
import { dayInfo } from './HolidaysScreen'
import { t, tc, tk, tn } from '../i18n'

/** Limbile din planul zilnic. Italiana se adaugă după spaniola A2. */
const PLAN_LANGS: LangCode[] = ['es', 'ja', 'fr']

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
  const today = dayInfo(new Date())
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
            <div className="reward-pop-title">✨ {t('Cartonaș special!')}</div>
            <StreakCard n={freshMs} />
            <p className="muted small">{t('Ai învățat {n} zile la rând. Continuă tot așa!', { n: freshMs })}</p>
            <button className="btn primary" onClick={closeMs}>{t('Super!')}</button>
          </div>
        </div>
      )}
      {!freshMs && fresh > 0 && (
        <div className="reward-pop" onClick={closeFresh}>
          <div className="reward-pop-box" onClick={(e) => e.stopPropagation()}>
            <div className="reward-pop-title">🎉 {t('Cartonaș nou!')}</div>
            <RewardCard reward={ALL_REWARDS[fresh - 1]} day={fresh} date={earned[fresh - 1]} />
            <p className="muted small">{t('Ai învățat azi și ai câștigat un oraș nou pentru colecție. Îl găsești în Album.')}</p>
            <button className="btn primary" onClick={closeFresh}>{t('Super!')}</button>
          </div>
        </div>
      )}
      <section className="hero">
        <div className="hero-season">{info.emoji} {t(info.name)} · {t(info.greeting)}</div>
        <h1 className="hero-title">{partOfDay()}, {user}!</h1>
        <div className="hero-stats">
          <div className="pill"><span>🔥</span><b>{streak}</b> {tn(streak, 'zi la rând', 'zile la rând')}</div>
          <div className="pill"><span>📚</span><b>{cardCount}</b> {t('cuvinte')}</div>
        </div>
      </section>

      <button className={`card review-strip ${totalDue ? '' : 'ok'}`} onClick={() => go({ name: 'review' })} disabled={!totalDue}>
        <span className="plan-icon">🔁</span>
        <span className="plan-body">
          <b>{t('Repetiție')}</b>
          <small>{totalDue ? tn(totalDue, '{n} cuvânt de repetat azi', '{n} cuvinte de repetat azi') : t('Nimic de repetat acum ✓')}</small>
        </span>
        {totalDue ? <span className="due-go">▶</span> : null}
      </button>

      <button className="card holiday-banner" onClick={() => go({ name: 'holidays' })}>
        <span>{today.holiday?.emoji ?? (today.born.length ? '🎂' : '📅')}</span>
        <span className="session-body">
          <small className="today-label">{t('Azi în lumea limbilor tale')}</small>
          <b>{today.holiday ? tc(today.holiday.name) : tc(today.esRo)}</b>
          <small>{today.holiday ? tc(today.esRo) : `${t('Japonia')}: ${tc(today.jaRo)}`}{today.born.length ? ` · 🎂 ${today.born[0].city}` : ''}</small>
        </span>
      </button>

      <h2 className="section-title">{t('Explorează')}</h2>
      <div className="journey-tiles">
        {([
          ['passport', '🛂', tk('Pașaport'), tn(stampCount, '{n} ștampilă', '{n} ștampile')],
          ['album', '🃏', tk('Album'), t('cartonașe')],
          ['island', '🏝️', tk('Orașul tău'), t('crește cu tine')],
          ['train', '🚂', tk('Trenul'), t('gară cu gară')],
          ['talks', '💬', tk('Conversații'), t('cu personajele')],
          ['pairs', '🧩', tk('Perechi'), t('joc de memorie')],
          ['museum', '🏛️', tk('Muzeul'), t('personalităților')],
          ['holidays', '🎎', tk('Sărbători'), t('calendar')],
        ] as const).map(([name, emoji, title, sub]) => (
          <button key={name} className="card journey-tile" onClick={() => go({ name })}>
            <span className="journey-emoji">{emoji}</span>
            <b>{t(title)}</b>
            <small>{sub}</small>
          </button>
        ))}
      </div>

      <h2 className="section-title">{t('Limbile tale')}</h2>
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
                  <div className="lang-name">{t(c.name)}</div>
                  <div className="lang-native">{c.native} · {c.hello}</div>
                </div>
                {dueByLang[c.lang] ? <span className="chip">{t('{n} de repetat', { n: dueByLang[c.lang] })}</span> : null}
                {!PLAN_LANGS.includes(c.lang) && !dueByLang[c.lang] ? <span className="chip later">{t('după spaniolă A2')}</span> : null}
              </div>
              <Progress value={all.length ? n / all.length : 0} />
              <div className="lang-foot">
                <span className="muted">{t('{n} / {all} ședințe', { n, all: all.length })}</span>
                <span className="lang-next">
                  {next
                    ? `${started ? '▶ ' : ''}${next.lesson.chapter ? t('Cap. {n}', { n: next.lesson.chapter.number }) : tc(next.lesson.title)} · ${t('Ședința {n}', { n: next.n })}`
                    : `${t(course.name)}: ${t('totul e gata 🎉')}`}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
