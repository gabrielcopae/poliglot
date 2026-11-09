import { useState, type ReactNode } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { Spotlight } from '../components/Spotlight'
import { getCourse } from '../content'
import { HOLIDAYS, daysUntil, nextDate, type Holiday } from '../content/holidays'
import { speak } from '../speech'

const fmt = (d: Date) => d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })
const when = (n: number) => (n === 0 ? 'AZI 🎉' : n === 1 ? 'mâine' : `peste ${n} zile`)

/** Fișa unei sărbători: obiceiuri și câteva cuvinte cu pronunție. */
function HolidayCard({ h }: { h: Holiday }) {
  const course = getCourse(h.lang)
  const d = nextDate(h)
  return (
    <div className="holiday-card">
      <div className="holiday-emoji">{h.emoji}</div>
      <b className={h.lang === 'ja' ? 'jp' : ''}>{h.local}</b>
      <small>{h.name} · {h.where}</small>
      <div className="holiday-date">{fmt(d)} · {when(daysUntil(d))}</div>
      <p>{h.fact}</p>
      <div className="holiday-words">
        {h.words.map((w) => (
          <button key={w.t} onClick={() => speak(w.t, h.lang, course.locale)}>
            🔊 <span className={h.lang === 'ja' ? 'jp' : ''}>{w.t}</span> <small>{w.ro}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Sărbătoarea de azi (pentru ecranul de start), dacă există. */
export function holidayToday(): Holiday | undefined {
  return HOLIDAYS.find((h) => daysUntil(nextDate(h)) === 0)
}

/** Calendarul sărbătorilor din lumea limbilor tale, de azi înainte. */
export function HolidaysScreen({ back }: { back: () => void }) {
  const [lang, setLang] = useState<'all' | 'es' | 'ja' | 'it'>('all')
  const [spot, setSpot] = useState<ReactNode>(null)
  const list = HOLIDAYS.filter((h) => lang === 'all' || h.lang === lang)
    .map((h) => ({ h, d: nextDate(h) }))
    .sort((a, b) => a.d.getTime() - b.d.getTime())

  return (
    <div className="screen">
      <TopBar title="🎎 Calendarul sărbătorilor" onBack={back} />
      <div className="segmented">
        <button className={lang === 'all' ? 'on' : ''} onClick={() => setLang('all')}>Toate</button>
        {(['es', 'ja', 'it'] as const).map((l) => (
          <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}><Flag lang={l} size={16} /> {getCourse(l).name}</button>
        ))}
      </div>
      <p className="muted small">Sărbătorile din țările limbilor tale, în ordinea în care urmează. Atinge una ca să afli obiceiurile și cuvintele ei.</p>
      {list.map(({ h, d }) => {
        const n = daysUntil(d)
        return (
          <button key={h.id} className={`card holiday-row ${n === 0 ? 'today' : ''}`} onClick={() => setSpot(<HolidayCard h={h} />)}>
            <span className="holiday-row-emoji">{h.emoji}</span>
            <span className="session-body">
              <b>{h.name}</b>
              <small><Flag lang={h.lang} size={14} /> <span className={h.lang === 'ja' ? 'jp' : ''}>{h.local}</span> · {h.where}</small>
            </span>
            <span className="holiday-when">
              <b>{fmt(d)}</b>
              <small>{when(n)}</small>
            </span>
          </button>
        )
      })}
      {spot && <Spotlight onClose={() => setSpot(null)}>{spot}</Spotlight>}
    </div>
  )
}
