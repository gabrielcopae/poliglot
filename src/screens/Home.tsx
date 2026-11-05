import { Flag } from '../components/Flag'
import { useLiveQuery } from 'dexie-react-hooks'
import { COURSES, allLessons, getCourse } from '../content'
import type { LangCode } from '../content/types'
import { nextStep } from '../progress'
import { db, streakFrom } from '../db'
import type { Go } from '../nav'
import { SEASONS, partOfDay, type Season } from '../season'
import { Progress } from '../components/ui'

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

  return (
    <div className="screen home">
      <section className="hero">
        <div className="hero-season">{info.emoji} {info.name} · {info.greeting}</div>
        <h1 className="hero-title">{partOfDay()}, {user}!</h1>
        <div className="hero-stats">
          <div className="pill"><span>🔥</span><b>{streak}</b> {streak === 1 ? 'zi' : 'zile'} la rând</div>
          <div className="pill"><span>📚</span><b>{cardCount}</b> cuvinte</div>
        </div>
      </section>

      <article className="card plan">
        <h2 className="plan-title">📋 Planul de azi <span className="muted small">(~1 oră și jumătate)</span></h2>
        <button className={`plan-row ${totalDue ? '' : 'ok'}`} onClick={() => go({ name: 'review' })} disabled={!totalDue}>
          <span className="plan-icon">🔁</span>
          <span className="plan-body">
            <b>Repetiție</b>
            <small>{totalDue ? `${totalDue} ${totalDue === 1 ? 'cuvânt' : 'cuvinte'} de repetat` : 'Nimic de repetat acum ✓'}</small>
          </span>
          <span className="plan-min">~10 min</span>
        </button>
        {PLAN_LANGS.map((lang) => {
          const course = getCourse(lang)
          const step = nextStep(course, { lessons, chapters, homework })
          return (
            <button key={lang} className="plan-row" disabled={!step} onClick={() => step && go(step.route)}>
              <span className="plan-icon"><Flag lang={lang} size={28} /></span>
              <span className="plan-body">
                <b>{step ? step.label : `${course.name}: ai terminat tot ce există acum 🎉`}</b>
                <small>{step?.detail}</small>
              </span>
              {step && <span className="plan-min">~{step.minutes} min</span>}
            </button>
          )
        })}
        <p className="muted small">Ritmul recomandat: un capitol în 2–3 zile pentru fiecare limbă. Italiana începe după ce termini spaniola A2.</p>
      </article>

      <h2 className="section-title">Limbile tale</h2>
      <div className="lang-grid">
        {COURSES.map((c) => {
          const ls = allLessons(c)
          const n = ls.filter((l) => done.has(l.id)).length
          const next = ls.find((l) => !done.has(l.id))
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
              <Progress value={n / ls.length} />
              <div className="lang-foot">
                <span className="muted">{n} / {ls.length} lecții</span>
                <span className="lang-next">{next ? `Următoarea: ${next.title}` : 'Toate lecțiile terminate 🎉'}</span>
              </div>
            </button>
          )
        })}
      </div>

      <button className="card kana-link" onClick={() => go({ name: 'kana' })}>
        <span className="kana-glyph">あ</span>
        <div>
          <div className="lang-name">Tabelul hiragana și katakana</div>
          <div className="muted">Atinge orice semn ca să-l auzi</div>
        </div>
      </button>
    </div>
  )
}
