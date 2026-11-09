import { useState } from 'react'
import type { DayRow } from '../db'
import { today } from '../util'

const WEEK = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D']

/** Calendarul lunii: fiecare zi în care ai învățat e colorată, mai intens când ai învățat mai mult. */
export function StudyCalendar({ days }: { days: DayRow[] }) {
  const [offset, setOffset] = useState(0)
  const byDate = new Map(days.map((d) => [d.date, d]))
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7 // luni = prima zi a săptămânii
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i + 1))]
  const todayKey = today()
  const active = cells.filter((d) => d && ((byDate.get(today(d))?.lessons ?? 0) + (byDate.get(today(d))?.reviews ?? 0)) > 0).length

  return (
    <article className="card calendar">
      <header className="calendar-head">
        <button className="icon-btn" onClick={() => setOffset((o) => o - 1)} aria-label="Luna trecută">‹</button>
        <b>{first.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}</b>
        <button className="icon-btn" onClick={() => setOffset((o) => Math.min(0, o + 1))} disabled={offset === 0} aria-label="Luna următoare">›</button>
      </header>
      <div className="calendar-grid">
        {WEEK.map((w) => <span key={w} className="calendar-wd">{w}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const key = today(d)
          const row = byDate.get(key)
          const score = (row?.lessons ?? 0) * 10 + (row?.reviews ?? 0)
          const level = score === 0 ? 0 : score < 10 ? 1 : score < 30 ? 2 : score < 60 ? 3 : 4
          return (
            <span key={key} className={`calendar-day lvl${level} ${key === todayKey ? 'today' : ''}`} title={`${key}: ${row?.lessons ?? 0} lecții, ${row?.reviews ?? 0} repetiții`}>
              {d.getDate()}
            </span>
          )
        })}
      </div>
      <p className="muted small">{active} {active === 1 ? 'zi' : 'zile'} de învățat în luna aceasta. Culoarea mai închisă = mai mult studiu.</p>
    </article>
  )
}
