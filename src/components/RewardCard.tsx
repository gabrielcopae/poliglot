import REWARDS from '../content/rewards-data.json'
import type { DayRow } from '../db'

/** Cartonașele pentru seria de zile: orașe cu ceva special, fotografie reală (Wikimedia Commons, licență liberă). */
export interface Reward { city: string; country: string; landmark: string; img: string; author: string; license: string; source: string }
export const ALL_REWARDS = REWARDS as Reward[]

/** Zilele în care ai învățat (măcar o lecție sau o repetiție). Fiecare zi îți aduce următorul cartonaș. */
export function studyDays(days: DayRow[]) {
  return days.filter((d) => d.reviews + d.lessons > 0).map((d) => d.date).sort()
}

/** La fiecare a 7-a zi, cartonașul are ramă aurie. */
export const isGold = (n: number) => n % 7 === 0

const shortAuthor = (a: string) => (a.length > 34 ? a.slice(0, 32) + '…' : a)

export function RewardCard({ reward, day, date, preview }: { reward: Reward; day: number; date?: string; preview?: boolean }) {
  const gold = isGold(day)
  return (
    <div className={`city-card ${gold ? 'gold' : ''}`}>
      <div className="city-frame">
        <div className="city-photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}rewards/${reward.img})` }} />
        <div className="city-text">
          <b>{reward.city}</b>
          <small>{reward.landmark} · {reward.country}</small>
        </div>
        <div className="city-label">{preview ? 'Previzualizare' : `Ziua ${day}${date ? ' · ' + new Date(date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' }) : ''}`}</div>
        <div className="city-credit">Foto: {shortAuthor(reward.author)} · {reward.license}</div>
      </div>
    </div>
  )
}

/** Locul gol pentru următorul cartonaș, încă necâștigat. */
export function RewardLocked({ day }: { day: number }) {
  return (
    <div className={`city-card locked ${isGold(day) ? 'gold' : ''}`}>
      <div className="city-frame">
        <div className="city-photo city-q">?</div>
        <div className="city-text"><b>Următorul oraș</b><small>se câștigă învățând</small></div>
        <div className="city-label">Ziua {day}</div>
      </div>
    </div>
  )
}
