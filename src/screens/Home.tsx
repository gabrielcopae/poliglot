import { Flag } from '../components/Flag'
import { useLiveQuery } from 'dexie-react-hooks'
import { COURSES, getCourse } from '../content'
import { db, streakFrom } from '../db'
import type { Go } from '../nav'
import { partOfDay, type Season } from '../season'
import { Progress } from '../components/ui'
import { buildSyllabus } from './CourseScreen'
import { useState } from 'react'
import { localGet, localSet } from '../settings'
import { ALL_REWARDS, RewardCard, studyDays } from '../components/RewardCard'
import { MILESTONES, StreakCard, longestStreak } from '../components/StreakCard'
import { t, tc, tk, tn } from '../i18n'
import { BackupStrip, SaveButton } from '../components/BackupStrip'


/** Ecranul principal, varianta simplă: salut, „Continuă”, repetiție (doar când e ceva), limbi, explorare. */
export function Home({ go, user }: { go: Go; season: Season; user: string }) {
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

  // progresul fiecărei limbi
  const langs = COURSES.map((c) => {
    const all = buildSyllabus(c.lang, chapters.filter((x) => x.lang === c.lang), homework, done)
      .flatMap((u) => u.lessons.flatMap((l) => l.items))
    const n = all.filter((x) => x.status === 'done').length
    const next = all.find((x) => x.status === 'progress') ?? all.find((x) => x.status === 'todo')
    const started = all.some((x) => x.status !== 'todo')
    return { c, all, n, next, started }
  })

  // limba la care ai lucrat ultima dată → butonul mare „Continuă”
  const last: Record<string, number> = {}
  lessons.forEach((l) => { last[l.lang] = Math.max(last[l.lang] ?? 0, l.completedAt ?? 0) })
  homework.forEach((h) => { const lang = h.lessonId.split('-')[0]; last[lang] = Math.max(last[lang] ?? 0, h.at ?? 0) })
  const cont = langs
    .filter((x) => x.started && x.next)
    .sort((a, b) => (last[b.c.lang] ?? 0) - (last[a.c.lang] ?? 0))[0]

  const nextLabel = (x: (typeof langs)[number]) => x.next
    ? `${x.next.lesson.chapter ? t('Cap. {n}', { n: x.next.lesson.chapter.number }) : tc(x.next.lesson.title)} · ${t('Ședința {n}', { n: x.next.n })}`
    : t('totul e gata 🎉')

  return (
    <div className="screen home home-calm">
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
        <h1 className="hero-title">{partOfDay()}, {user}!</h1>
        <p className="hero-line">
          🔥 <b>{streak}</b> {tn(streak, 'zi la rând', 'zile la rând')} <span className="sep">·</span> 📚 <b>{cardCount}</b> {t('cuvinte')}
        </p>
      </section>

      {cont && cont.next && (
        <button className="card continue-home" onClick={() => go(cont.next!.route)}>
          <Flag lang={cont.c.lang} size={36} />
          <span className="continue-home-body">
            <small>{t('Continuă')} · {t(cont.c.name)}</small>
            <b>{nextLabel(cont)}</b>
          </span>
          <span className="continue-home-go">▶</span>
        </button>
      )}

      {totalDue > 0 && (
        <button className="card review-strip" onClick={() => go({ name: 'review' })}>
          <span className="plan-icon">🔁</span>
          <span className="plan-body">
            <b>{t('Repetiție')}</b>
            <small>{tn(totalDue, '{n} cuvânt de repetat azi', '{n} cuvinte de repetat azi')}</small>
          </span>
          <span className="due-go">▶</span>
        </button>
      )}

      <BackupStrip user={user} hasProgress={lessons.length > 0 || chapters.length > 0 || homework.length > 0 || cardCount > 0} />

      <h2 className="section-title">{t('Limbile tale')}</h2>
      <div className="lang-list">
        {langs.map((x) => {
          const { c } = x
          const course = getCourse(c.lang)
          return (
            <button key={c.lang} className={`card lang-card lang-row lang-${c.lang}`} onClick={() => go({ name: 'course', lang: c.lang })}>
              <span className="lang-flag"><Flag lang={c.lang} size={32} /></span>
              <span className="lang-row-body">
                <span className="lang-row-top">
                  <b className="lang-name">{t(c.name)}</b>
                  {dueByLang[c.lang] ? <span className="chip">{t('{n} de repetat', { n: dueByLang[c.lang] })}</span> : null}
                </span>
                <Progress value={x.all.length ? x.n / x.all.length : 0} />
                <small className="muted">{x.next ? nextLabel(x) : `${t(course.name)}: ${t('totul e gata 🎉')}`}</small>
              </span>
            </button>
          )
        })}
      </div>

      <h2 className="section-title">{t('Explorează')}</h2>
      <div className="explore-row">
        {([
          ['album', '🃏', tk('Album')],
          ['passport', '🛂', tk('Pașaport')],
          ['talks', '💬', tk('Conversații')],
          ['pairs', '🧩', tk('Perechi')],
          ['island', '🏝️', tk('Orașul tău')],
          ['train', '🚂', tk('Trenul')],
          ['museum', '🏛️', tk('Muzeul')],
          ['holidays', '🎎', tk('Sărbători')],
        ] as const).map(([name, emoji, title]) => (
          <button key={name} className="explore-tile" onClick={() => go({ name })}>
            <span className="explore-emoji">{emoji}</span>
            <span>{t(title)}</span>
          </button>
        ))}
      </div>
      <SaveButton user={user} />
    </div>
  )
}
