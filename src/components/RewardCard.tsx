import { useState } from 'react'
import REWARDS from '../content/rewards-data.json'
import type { DayRow } from '../db'
import { Flag } from './Flag'

/** Cartonașele pentru seria de zile: locuri unde se vorbește limba, fotografie reală (Wikimedia Commons, licență liberă) și un fun fact. */
export interface Reward { city: string; country: string; landmark: string; lang: string; fact: string; img: string; author: string; license: string; source: string }
export const ALL_REWARDS = REWARDS as Reward[]

/** Contul de admin vede toate cartonașele deblocate (doar afișare, pe acest dispozitiv). */
export const isAdmin = (user: string) => user.trim().toLowerCase() === 'admin'

/** Zilele în care ai învățat (măcar o lecție sau o repetiție). Fiecare zi îți aduce următorul cartonaș. */
export function studyDays(days: DayRow[]) {
  return days.filter((d) => d.reviews + d.lessons > 0).map((d) => d.date).sort()
}

/** La fiecare a 7-a zi, cartonașul are ramă aurie. */
export const isGold = (n: number) => n % 7 === 0

const LANG_NAME: Record<string, string> = { es: 'spaniolă', ja: 'japoneză', it: 'italiană', ro: 'română' }
const shortAuthor = (a: string) => (a.length > 34 ? a.slice(0, 32) + '…' : a)

export function RewardCard({ reward, day, date, preview, label, gold: goldProp, onOpen }: { reward: Reward; day: number; date?: string; preview?: boolean; label?: string; gold?: boolean; onOpen?: () => void }) {
  const gold = goldProp ?? isGold(day)
  const [back, setBack] = useState(false)
  // în grilă, atingerea deschide prim-planul; în prim-plan, întoarce cartonașul
  return (
    <button className={`city-card ${gold ? 'gold' : ''} ${back ? 'flipped' : ''}`} onClick={() => (onOpen ? onOpen() : setBack(!back))}>
      <div className="city-inner">
        <div className="city-frame city-front">
          <div className="city-photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}rewards/${reward.img})` }} />
          <div className="city-text">
            <b>{reward.city}</b>
            <small>{reward.landmark} · {reward.country}</small>
          </div>
          <div className="city-label">{label ?? (preview ? 'Previzualizare' : `Ziua ${day}${date ? ' · ' + new Date(date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' }) : ''}`)}</div>
          <div className="city-credit">atinge pentru fun fact ↻</div>
        </div>
        <div className="city-frame city-back">
          <div className="city-fact-head">{reward.lang !== 'ro' ? <Flag lang={reward.lang} size={18} /> : '🇷🇴'} <b>Știai că…?</b></div>
          <p className="city-fact">{reward.fact}</p>
          <div className="city-fact-lang">despre limba {LANG_NAME[reward.lang] ?? reward.lang}</div>
          <div className="city-credit">Foto: {shortAuthor(reward.author)} · {reward.license} · Wikimedia Commons</div>
        </div>
      </div>
    </button>
  )
}

/** Locul gol pentru următorul cartonaș, încă necâștigat. */
export function RewardLocked({ day, label, title }: { day: number; label?: string; title?: string }) {
  return (
    <div className={`city-card locked ${!label && isGold(day) ? 'gold' : ''}`}>
      <div className="city-frame">
        <div className="city-photo city-q">?</div>
        <div className="city-text"><b>{title ?? 'Următorul loc'}</b><small>se câștigă învățând</small></div>
        <div className="city-label">{label ?? `Ziua ${day}`}</div>
      </div>
    </div>
  )
}
