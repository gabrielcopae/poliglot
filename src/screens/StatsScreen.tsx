import { Flag } from '../components/Flag'
import { useLiveQuery } from 'dexie-react-hooks'
import { COURSES, allLessons, wordCount } from '../content'
import { db, streakFrom } from '../db'
import { isMature } from '../srs'
import { today } from '../util'
import { TopBar } from '../components/ui'
import { StudyCalendar } from '../components/StudyCalendar'

export function StatsScreen() {
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const cards = useLiveQuery(() => db.cards.toArray(), [], [])
  const lessons = useLiveQuery(() => db.lessons.toArray(), [], [])

  const byDate = new Map(days.map((d) => [d.date, d]))
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    const key = today(d)
    const row = byDate.get(key)
    return { key, label: d.toLocaleDateString('ro-RO', { weekday: 'narrow' }), value: (row?.reviews ?? 0) + (row?.lessons ?? 0) * 10 }
  })
  const max = Math.max(10, ...last14.map((d) => d.value))
  const totalXp = days.reduce((n, d) => n + d.xp, 0)

  return (
    <div className="screen">
      <TopBar title="Progresul tău" />
      <StudyCalendar days={days} />
      <div className="stat-grid">
        <div className="card stat"><span>🔥</span><b>{streakFrom(days)}</b><small>zile la rând</small></div>
        <div className="card stat"><span>⭐</span><b>{totalXp}</b><small>puncte XP</small></div>
        <div className="card stat"><span>📚</span><b>{cards.length}</b><small>cuvinte învățate</small></div>
        <div className="card stat"><span>🧠</span><b>{cards.filter(isMature).length}</b><small>bine memorate</small></div>
      </div>

      <article className="card">
        <h3>Ultimele 14 zile</h3>
        <div className="bars">
          {last14.map((d) => (
            <div key={d.key} className="bar-col" title={`${d.key}: ${d.value}`}>
              <div className="bar" style={{ height: `${(d.value / max) * 100}%` }} />
              <small>{d.label}</small>
            </div>
          ))}
        </div>
        <p className="muted small">Repetări + lecții (o lecție = 10).</p>
      </article>

      {COURSES.map((c) => {
        const ls = allLessons(c)
        const done = lessons.filter((l) => l.lang === c.lang).length
        const words = cards.filter((x) => x.lang === c.lang)
        return (
          <article key={c.lang} className="card lang-stat">
            <h3><Flag lang={c.lang} size={24} /> {c.name}</h3>
            <div className="lang-stat-row">
              <div><b>{done}</b>/{ls.length}<small>lecții</small></div>
              <div><b>{words.length}</b>/{wordCount(c)}<small>cuvinte</small></div>
              <div><b>{words.filter(isMature).length}</b><small>memorate</small></div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
