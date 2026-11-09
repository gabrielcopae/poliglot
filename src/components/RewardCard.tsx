import type { ReactNode } from 'react'

/** Cartonașele de recompensă pentru seria de zile: pisici drăguțe și orașe cu clădirea lor. */

export interface CatSpec { kind: 'cat'; name: string; fur: string; belly: string; eyes: string; pattern: 'none' | 'stripes' | 'patch' | 'socks'; accessory: 'bow' | 'scarf' | 'flower' | 'glasses' | 'crown' | 'none'; bg: [string, string] }
export interface CitySpec { kind: 'city'; city: string; country: string; building: string; draw: string; bg: [string, string] }
export type RewardSpec = CatSpec | CitySpec

/** O pisică desenată din forme simple; culorile și accesoriile o fac unică. */
export function CatArt({ c }: { c: CatSpec }) {
  return (
    <svg viewBox="0 0 100 100" className="reward-art">
      {/* coada */}
      <path d="M72 78 C 92 74, 94 52, 82 48" fill="none" stroke={c.fur} strokeWidth="7" strokeLinecap="round" />
      {/* corpul */}
      <ellipse cx="50" cy="76" rx="24" ry="18" fill={c.fur} />
      <ellipse cx="50" cy="80" rx="13" ry="12" fill={c.belly} />
      {c.pattern === 'stripes' && <g stroke="rgba(0,0,0,0.18)" strokeWidth="3" strokeLinecap="round"><path d="M30 70 l7 3" /><path d="M29 78 l7 2" /><path d="M70 70 l-7 3" /><path d="M71 78 l-7 2" /></g>}
      {c.pattern === 'socks' && <g fill="#fff"><ellipse cx="38" cy="92" rx="7" ry="4" /><ellipse cx="62" cy="92" rx="7" ry="4" /></g>}
      {c.pattern !== 'socks' && <g fill={c.fur}><ellipse cx="38" cy="92" rx="7" ry="4" /><ellipse cx="62" cy="92" rx="7" ry="4" /></g>}
      {/* urechile */}
      <path d="M27 36 L31 12 L46 28 Z" fill={c.fur} />
      <path d="M73 36 L69 12 L54 28 Z" fill={c.fur} />
      <path d="M31 31 L33 18 L41 27 Z" fill="#f7b6c2" />
      <path d="M69 31 L67 18 L59 27 Z" fill="#f7b6c2" />
      {/* capul */}
      <ellipse cx="50" cy="42" rx="26" ry="22" fill={c.fur} />
      {c.pattern === 'patch' && <path d="M50 21 C 62 21, 74 30, 75 42 C 66 40, 58 34, 50 21 Z" fill="rgba(0,0,0,0.22)" />}
      {c.pattern === 'stripes' && <g stroke="rgba(0,0,0,0.18)" strokeWidth="2.6" strokeLinecap="round"><path d="M50 22 v7" /><path d="M43 23 l2 6" /><path d="M57 23 l-2 6" /></g>}
      <ellipse cx="50" cy="50" rx="12" ry="8" fill={c.belly} />
      {/* ochii */}
      <ellipse cx="40" cy="41" rx="5" ry="6" fill={c.eyes} />
      <ellipse cx="60" cy="41" rx="5" ry="6" fill={c.eyes} />
      <ellipse cx="40" cy="42" rx="2.4" ry="4" fill="#1d1d1f" />
      <ellipse cx="60" cy="42" rx="2.4" ry="4" fill="#1d1d1f" />
      <circle cx="41.5" cy="39.5" r="1.4" fill="#fff" />
      <circle cx="61.5" cy="39.5" r="1.4" fill="#fff" />
      {/* nasul, gura, obrajii */}
      <path d="M47 48 h6 l-3 3 Z" fill="#f08aa0" />
      <path d="M50 51 q -3 4 -6 2 M50 51 q 3 4 6 2" fill="none" stroke="#5b4636" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="33" cy="50" rx="4" ry="2.5" fill="#f7a8b8" opacity="0.6" />
      <ellipse cx="67" cy="50" rx="4" ry="2.5" fill="#f7a8b8" opacity="0.6" />
      {/* mustățile */}
      <g stroke="#5b4636" strokeWidth="0.9" strokeLinecap="round" opacity="0.7">
        <path d="M30 48 l-10 -2" /><path d="M30 51 l-10 1" /><path d="M70 48 l10 -2" /><path d="M70 51 l10 1" />
      </g>
      {/* accesoriul */}
      {c.accessory === 'bow' && <g fill="#e2435f"><path d="M58 20 l10 -6 l1 12 Z" /><path d="M58 20 l-6 -9 l-4 11 Z" /><circle cx="58" cy="20" r="3" fill="#c22f4a" /></g>}
      {c.accessory === 'scarf' && <g><path d="M30 60 q 20 10 40 0 l0 7 q -20 9 -40 0 Z" fill="#3c8dde" /><path d="M62 64 l6 14 l-7 1 l-4 -13 Z" fill="#2f74bd" /></g>}
      {c.accessory === 'flower' && <g transform="translate(66 22)">{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-4.5" rx="3" ry="4.5" fill="#ffd1e0" transform={`rotate(${a})`} />)}<circle r="2.6" fill="#ffc83d" /></g>}
      {c.accessory === 'glasses' && <g fill="none" stroke="#2b2b2b" strokeWidth="1.8"><circle cx="40" cy="41" r="7.5" /><circle cx="60" cy="41" r="7.5" /><path d="M47.5 41 h5" /></g>}
      {c.accessory === 'crown' && <path d="M38 22 l3 -10 l5 7 l4 -9 l4 9 l5 -7 l3 10 Z" fill="#f4c430" stroke="#d29b0f" strokeWidth="1" />}
    </svg>
  )
}

/** Clădirile orașelor: siluete simple, colorate. */
export const BUILDINGS: Record<string, ReactNode> = {
  // Madrid · Puerta de Alcalá: poartă cu cinci deschideri și fronton
  alcala: (
    <g>
      <rect x="8" y="34" width="84" height="40" fill="#f4e6c8" stroke="#c9b48a" />
      <rect x="6" y="30" width="88" height="6" fill="#e9d6ad" stroke="#c9b48a" />
      <path d="M36 30 L50 18 L64 30 Z" fill="#e9d6ad" stroke="#c9b48a" />
      {[16, 28, 44, 60, 72].map((x, i) => (
        <path key={x} d={i === 2 ? `M${x - 1} 74 v-22 a7 7 0 0 1 14 0 v22 Z` : i % 2 ? `M${x} 74 v-18 a6 6 0 0 1 12 0 v18 Z` : `M${x} 74 v-16 h10 v16 Z`} fill="#7a5c3a" opacity="0.85" />
      ))}
      <rect x="44" y="22" width="12" height="7" fill="#d9b864" />
    </g>
  ),
  // Kyoto · poarta torii
  torii: (
    <g>
      <path d="M6 22 q 44 -10 88 0 l -3 7 q -41 -8 -82 0 Z" fill="#d23a2b" />
      <rect x="14" y="33" width="72" height="6" fill="#d23a2b" />
      <rect x="22" y="24" width="7" height="52" fill="#d23a2b" />
      <rect x="71" y="24" width="7" height="52" fill="#d23a2b" />
      <rect x="47" y="28" width="6" height="11" fill="#2b2b2b" />
      <rect x="20" y="72" width="11" height="4" fill="#2b2b2b" />
      <rect x="69" y="72" width="11" height="4" fill="#2b2b2b" />
    </g>
  ),
}

export function CityArt({ c }: { c: CitySpec }) {
  return (
    <svg viewBox="0 0 100 80" className="reward-art">
      <circle cx="80" cy="16" r="9" fill="#fff6c9" opacity="0.9" />
      <path d="M0 74 Q 50 66 100 74 V80 H0 Z" fill="rgba(0,0,0,0.12)" />
      {BUILDINGS[c.draw]}
    </svg>
  )
}

/** Cartonașul întreg: desenul sus, numele jos. */
export function RewardCard({ spec, label, gold }: { spec: RewardSpec; label: string; gold?: boolean }) {
  return (
    <div className={`reward-card ${gold ? 'gold' : ''}`}>
      <div className="reward-pic" style={{ background: `linear-gradient(160deg, ${spec.bg[0]}, ${spec.bg[1]})` }}>
        {spec.kind === 'cat' ? <CatArt c={spec} /> : <CityArt c={spec} />}
      </div>
      <div className="reward-name">
        <b>{spec.kind === 'cat' ? spec.name : spec.city}</b>
        <small>{spec.kind === 'cat' ? '🐾 pisică' : `${spec.building} · ${spec.country}`}</small>
      </div>
      <div className="reward-label">{label}</div>
    </div>
  )
}

/** Cele patru cartonașe de probă. */
export const SAMPLE_REWARDS: { spec: RewardSpec; label: string; gold?: boolean }[] = [
  { spec: { kind: 'cat', name: 'Mochi', fur: '#f2a65a', belly: '#fde7cf', eyes: '#7cc576', pattern: 'stripes', accessory: 'bow', bg: ['#ffe8ef', '#ffd3df'] }, label: 'Ziua 1' },
  { spec: { kind: 'city', city: 'Madrid', country: 'Spania', building: 'Puerta de Alcalá', draw: 'alcala', bg: ['#bfe3ff', '#ffe9c2'] }, label: 'Ziua 2' },
  { spec: { kind: 'cat', name: 'Luna', fur: '#5b5f6b', belly: '#e9e9ef', eyes: '#f6c945', pattern: 'socks', accessory: 'flower', bg: ['#e6e1ff', '#cfe8ff'] }, label: 'Ziua 3' },
  { spec: { kind: 'city', city: 'Kyoto', country: 'Japonia', building: 'Poarta torii', draw: 'torii', bg: ['#ffd9c7', '#fff1d6'] }, label: '7 zile la rând', gold: true },
]
