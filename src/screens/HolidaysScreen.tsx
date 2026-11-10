import { useState, type ReactNode } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { Spotlight } from '../components/Spotlight'
import { getCourse } from '../content'
import { HOLIDAYS, daysUntil, nextDate, type Holiday } from '../content/holidays'
import { DAYS } from '../content/days'
import PEOPLE from '../content/people-data.json'
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

interface Person { city: string; landmark: string; lang: string; role: string; born?: string }
const dayKey = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Ce se întâmplă într-o zi în lumea limbilor tale: sărbătoarea mare, ziua spaniolă, ziua japoneză, aniversările. */
export function dayInfo(d: Date) {
  const key = dayKey(d)
  const day = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const holiday = HOLIDAYS.find((h) => daysUntil(nextDate(h, day), day) === 0)
  const [es, esRo, ja, jaRo] = DAYS[key]
  const born = (PEOPLE as Person[]).filter((p) => p.born?.slice(5) === key)
  return { key, holiday, es, esRo, ja, jaRo, born }
}

/** O zi: ziua spaniolă, ziua japoneză și cine s-a născut atunci. */
function DayPanel({ d, onHoliday }: { d: Date; onHoliday: (h: Holiday) => void }) {
  const info = dayInfo(d)
  return (
    <div className="day-panel">
      {info.holiday && (
        <button className="day-line big" onClick={() => onHoliday(info.holiday!)}>
          <span>{info.holiday.emoji}</span><span><b>{info.holiday.name}</b><small>{info.holiday.where} · atinge pentru obiceiuri și cuvinte</small></span>
        </button>
      )}
      <button className="day-line" onClick={() => speak(info.es, 'es', getCourse('es').locale)}>
        <Flag lang="es" size={20} /><span><b>{info.es} 🔊</b><small>{info.esRo}</small></span>
      </button>
      <button className="day-line" onClick={() => speak(info.ja, 'ja', getCourse('ja').locale)}>
        <Flag lang="ja" size={20} /><span><b className="jp">{info.ja} 🔊</b><small>{info.jaRo}</small></span>
      </button>
      {info.born.map((p) => (
        <div key={p.city} className="day-line">
          <span>🎂</span><span><b>{p.city}</b><small>s-a născut azi, în {p.born!.slice(0, 4)}, la {p.landmark} · {p.role}</small></span>
        </div>
      ))}
    </div>
  )
}

/** Calendarul sărbătorilor din lumea limbilor tale, de azi înainte. */
export function HolidaysScreen({ back }: { back: () => void }) {
  const [lang, setLang] = useState<'all' | 'es' | 'ja' | 'it'>('all')
  const [spot, setSpot] = useState<ReactNode>(null)
  const [offset, setOffset] = useState(0)
  const now = new Date()
  const shown = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset)
  const list = HOLIDAYS.filter((h) => lang === 'all' || h.lang === lang)
    .map((h) => ({ h, d: nextDate(h) }))
    .sort((a, b) => a.d.getTime() - b.d.getTime())

  return (
    <div className="screen">
      <TopBar title="🎎 Calendarul sărbătorilor" onBack={back} />
      <article className="card day-card">
        <div className="day-nav">
          <button className="btn small" onClick={() => setOffset(offset - 1)} aria-label="Ziua de dinainte">‹</button>
          <b>{offset === 0 ? 'Azi, ' : ''}{fmt(shown)}</b>
          <button className="btn small" onClick={() => setOffset(offset + 1)} aria-label="Ziua următoare">›</button>
        </div>
        <DayPanel d={shown} onHoliday={(h) => setSpot(<HolidayCard h={h} />)} />
        {offset !== 0 && <button className="btn small day-today" onClick={() => setOffset(0)}>↺ Înapoi la azi</button>}
      </article>
      <h2 className="section-title">Sărbătorile mari</h2>
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
