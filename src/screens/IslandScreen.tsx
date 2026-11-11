import { t, tk, tn } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState, type ReactNode } from 'react'
import { TopBar } from '../components/ui'
import { isAdmin, studyDays } from '../components/RewardCard'
import { Spotlight } from '../components/Spotlight'
import { db, streakFrom } from '../db'
import { stamps } from '../journey'
import type { Go, Route } from '../nav'

/** Orașul de pe insulă: clădiri care se deblochează învățând și care te duc în părțile aplicației. */
interface Building {
  id: string
  name: string
  emoji: string
  x: number
  y: number
  desc: string
  need: string
  route: Route
  open: boolean
  draw: (night: boolean) => ReactNode
}

const win = (night: boolean) => (night ? '#ffd86b' : '#bfe3ff')
const smoke = (x: number, y: number) => (
  <g className="town-smoke">
    <circle cx={x} cy={y} r="2.5" /><circle cx={x + 1} cy={y - 4} r="3" /><circle cx={x - 1} cy={y - 9} r="3.5" />
  </g>
)

// ——— Desenele clădirilor (în jurul punctului 0,0 = baza clădirii) ———
const SCHOOL = (n: boolean) => (<g>
  <rect x="-26" y="-30" width="52" height="30" fill="#f4e1c1" stroke="#9c7a4a" />
  <polygon points="-30,-30 30,-30 0,-48" fill="#c0392b" />
  <rect x="-5" y="-48" width="10" height="10" fill="#f4e1c1" stroke="#9c7a4a" /><circle cy="-43" r="3" fill="#fff" stroke="#555" />
  {[-18, -6, 6, 18].map((x) => <rect key={x} x={x - 3} y="-24" width="6" height="7" fill={win(n)} />)}
  <rect x="-5" y="-11" width="10" height="11" fill="#7a4a1a" />
</g>)
const HOUSE = (roof: string) => (n: boolean) => (<g>
  <rect x="-10" y="-14" width="20" height="14" fill="#fff6e5" stroke="#b89a6a" strokeWidth="0.8" />
  <polygon points="-12,-14 12,-14 0,-25" fill={roof} />
  <rect x="5" y="-24" width="3" height="6" fill="#8a6a4a" />
  <rect x="-6" y="-10" width="5" height="5" fill={win(n)} /><rect x="2" y="-7" width="4" height="7" fill="#8a5a2a" />
</g>)
const LIBRARY = (n: boolean) => (<g>
  <rect x="-24" y="-28" width="48" height="28" fill="#e8dcc8" stroke="#8a7a5a" />
  <polygon points="-28,-28 28,-28 0,-40" fill="#6b8f71" />
  {[-16, -6, 4, 14].map((x) => <rect key={x} x={x} y="-24" width="3" height="22" fill="#fff" />)}
  <rect x="-20" y="-20" width="40" height="5" fill={win(n)} opacity="0.7" />
  <text x="0" y="-31" fontSize="6" textAnchor="middle" fill="#fff">本</text>
</g>)
const RAMEN = (n: boolean) => (<g>
  <rect x="-20" y="-22" width="40" height="22" fill="#fff1d6" stroke="#9c6a3a" />
  <path d="M-24 -22 L24 -22 L20 -30 L-20 -30 Z" fill="#c0392b" />
  <rect x="-20" y="-20" width="40" height="5" fill="#2b2b2b" /><text x="0" y="-16" fontSize="4.5" textAnchor="middle" fill="#fff">ラーメン</text>
  <rect x="-14" y="-12" width="10" height="9" fill={win(n)} /><rect x="2" y="-12" width="10" height="12" fill="#7a4a1a" />
  <g className="town-lantern"><ellipse cx="-22" cy="-14" rx="3" ry="4" fill="#e74c3c" /><ellipse cx="22" cy="-14" rx="3" ry="4" fill="#e74c3c" /></g>
</g>)
const POST = (n: boolean) => (<g>
  <rect x="-18" y="-22" width="36" height="22" fill="#fdf3e1" stroke="#a5824e" />
  <polygon points="-21,-22 21,-22 0,-33" fill="#e67e22" />
  <rect x="-12" y="-16" width="8" height="7" fill={win(n)} /><rect x="3" y="-14" width="7" height="14" fill="#7a4a1a" />
  <rect x="14" y="-9" width="6" height="9" fill="#e74c3c" /><rect x="15" y="-7" width="4" height="1.5" fill="#222" />
</g>)
const HALL = (n: boolean) => (<g>
  <rect x="-28" y="-32" width="56" height="32" fill="#f1e6d0" stroke="#8a7350" />
  <polygon points="-32,-32 32,-32 0,-46" fill="#5d6d7e" />
  <rect x="-4" y="-56" width="8" height="12" fill="#f1e6d0" stroke="#8a7350" /><polygon points="-6,-56 6,-56 0,-63" fill="#5d6d7e" />
  <line x1="0" y1="-63" x2="0" y2="-70" stroke="#555" /><polygon points="0,-70 9,-67 0,-64" fill="#e74c3c" className="town-flag" />
  {[-20, -10, 4, 14].map((x) => <rect key={x} x={x} y="-26" width="6" height="9" fill={win(n)} />)}
  <rect x="-5" y="-13" width="10" height="13" fill="#7a4a1a" />
</g>)
const STATION = (n: boolean) => (<g>
  <rect x="-30" y="-20" width="60" height="20" fill="#f5e6d3" stroke="#8a6a4a" />
  <path d="M-34 -20 L34 -20 L28 -30 L-28 -30 Z" fill="#2e86c1" />
  <rect x="-6" y="-38" width="12" height="9" fill="#f5e6d3" stroke="#8a6a4a" /><circle cy="-33.5" r="3" fill="#fff" stroke="#333" />
  {[-22, -12, 6, 16].map((x) => <rect key={x} x={x} y="-15" width="6" height="7" fill={win(n)} />)}
  <text x="0" y="-22" fontSize="4.5" textAnchor="middle" fill="#fff">GARA · 駅</text>
</g>)
const MUSEUM = (n: boolean) => (<g>
  <rect x="-26" y="-26" width="52" height="26" fill="#efe6d6" stroke="#8a7a5a" />
  <polygon points="-30,-26 30,-26 0,-40" fill="#d4ac0d" />
  {[-20, -10, 0, 10, 20].map((x) => <rect key={x} x={x - 2} y="-24" width="4" height="22" fill="#fff" stroke="#ccc" strokeWidth="0.4" />)}
  <rect x="-26" y="-4" width="52" height="4" fill="#d5c8b0" />
  {n && <rect x="-22" y="-20" width="44" height="3" fill="#ffd86b" opacity="0.6" />}
</g>)
const TEMPLE = (n: boolean) => (<g>
  <path d="M-26 -16 q26 -6 52 0 l-3 5 q-23 -5 -46 0 Z" fill="#c0392b" />
  <rect x="-20" y="-12" width="4" height="12" fill="#c0392b" /><rect x="16" y="-12" width="4" height="12" fill="#c0392b" />
  <rect x="-22" y="-9" width="44" height="3" fill="#c0392b" />
  <rect x="-10" y="-30" width="20" height="14" fill="#f6e7cc" stroke="#8a5a3a" />
  <path d="M-16 -30 L16 -30 L10 -38 L-10 -38 Z" fill="#3b3b3b" />
  <rect x="-4" y="-26" width="8" height="10" fill={win(n)} />
</g>)
const MARKET = () => (<g>
  <circle r="14" fill="#d9c7a7" stroke="#b39a6a" />
  <circle r="7" fill="#7fc8ef" stroke="#5a9ec2" />
  <g className="town-fountain"><circle cy="-6" r="1.6" fill="#bfe8ff" /><circle cx="3" cy="-4" r="1.2" fill="#bfe8ff" /><circle cx="-3" cy="-4" r="1.2" fill="#bfe8ff" /></g>
  {[[-24, -6, '#e74c3c'], [22, -8, '#3498db'], [-18, 16, '#f1c40f'], [18, 16, '#9b59b6']].map(([x, y, c]) => (
    <g key={String(x)} transform={`translate(${x} ${y})`}><rect x="-6" y="-3" width="12" height="7" fill="#fff8e7" /><path d="M-8 -3 L8 -3 L6 -8 L-6 -8 Z" fill={String(c)} /></g>
  ))}
</g>)
const LIGHTHOUSE = (n: boolean) => (<g>
  <polygon points="-7,0 7,0 4,-38 -4,-38" fill="#fff" stroke="#c0392b" strokeWidth="1.2" />
  <rect x="-4.5" y="-30" width="9" height="5" fill="#c0392b" /><rect x="-5.5" y="-14" width="11" height="5" fill="#c0392b" />
  <rect x="-5" y="-45" width="10" height="7" fill={n ? '#ffe066' : '#fff3b0'} />
  <polygon points="-6,-45 6,-45 0,-52" fill="#c0392b" />
  <g className="town-beam"><polygon points="0,-41 60,-56 60,-26" fill="#ffe066" opacity="0.35" /></g>
</g>)
const WINDMILL = () => (<g>
  <polygon points="-7,0 7,0 4,-26 -4,-26" fill="#e8d5b5" stroke="#8a6a3a" />
  <g transform="translate(0 -26)"><g className="town-mill">{[0, 90, 180, 270].map((a) => <rect key={a} x="-1.5" y="-20" width="3" height="20" fill="#fff" stroke="#8a6a3a" strokeWidth="0.6" transform={`rotate(${a})`} />)}</g><circle r="2" fill="#8a6a3a" /></g>
</g>)
const SCAFFOLD = () => (<g>
  <rect x="-18" y="-22" width="36" height="22" fill="none" stroke="#c9a26b" strokeWidth="1.5" strokeDasharray="3 2" />
  <path d="M-18 0 L18 -22 M-18 -22 L18 0" stroke="#c9a26b" strokeWidth="1" />
  <rect x="-9" y="-30" width="18" height="9" rx="2" fill="#f4d03f" stroke="#a07c12" /><text x="0" y="-23.5" fontSize="6" textAnchor="middle">🔒</text>
</g>)

const ROOFS = ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#9b59b6', '#e67e22', '#3498db', '#e84393']
const HOUSE_SLOTS = [[64, 292], [92, 300], [300, 300], [328, 292], [70, 360], [334, 362], [120, 410], [280, 412], [160, 440], [240, 442], [56, 420], [346, 420], [200, 452], [104, 252], [298, 252], [200, 236]]
const TREE_SLOTS = [[44, 330], [356, 330], [86, 222], [316, 222], [40, 390], [362, 392], [140, 470], [262, 470], [76, 448], [326, 448], [122, 210], [280, 210], [200, 478], [52, 260], [350, 262], [170, 214], [232, 214], [96, 470], [306, 472], [200, 206]]
const ROAD = 'M200 330 L200 260 M200 330 L120 330 L120 380 M200 330 L280 330 L280 380 M200 330 L200 410 M120 330 L90 330 M280 330 L310 330'
const WALKS = ['M200 330 L200 262 L200 330 L120 330 L120 378 L120 330 Z', 'M200 330 L280 330 L280 378 L280 330 L200 330 L200 408 Z', 'M120 330 L92 330 L120 330 L200 330 L200 262 L200 330 Z', 'M280 330 L308 330 L280 330 L200 330 L200 408 L200 330 Z']
const COAST = 'M200 168 C 330 168, 390 250, 386 340 C 382 440, 300 498, 200 498 C 100 498, 18 440, 14 340 C 10 250, 70 168, 200 168 Z'

export function IslandScreen({ back, go, user }: { back: () => void; go: Go; user: string }) {
  const admin = isAdmin(user)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const cardCount = useLiveQuery(() => db.cards.count(), [], 0)
  const exams = useLiveQuery(() => db.exams.toArray(), [], [])
  const talks = useLiveQuery(() => db.talks.toArray(), [], [])
  const kanji = useLiveQuery(() => db.kanji.toArray(), [], [])
  const [spot, setSpot] = useState<ReactNode>(null)
  const [hour, setHour] = useState(new Date().getHours())
  useEffect(() => { const t = setInterval(() => setHour(new Date().getHours()), 60000); return () => clearInterval(t) }, [])
  const night = hour < 7 || hour >= 20

  const nStamps = stamps(chapters, homework).length
  const sessionsDone = chapters.reduce((n, c) => n + (c.s1 ? 1 : 0) + (c.s2 ? 1 : 0), 0) + homework.filter((h) => h.done).length
  const nDays = studyDays(days).length
  const startedJa = chapters.some((c) => c.lang === 'ja')
  const streak = streakFrom(days)
  const ok = (cond: boolean) => admin || cond

  const buildings: Building[] = [
    { id: 'school', name: tk('Școala'), emoji: '🏫', x: 200, y: 256, desc: tk('Aici înveți: lecțiile, ședințele și temele tuturor limbilor.'), need: tk('deschisă de la început'), route: { name: 'course', lang: 'es' }, open: true, draw: SCHOOL },
    { id: 'market', name: tk('Piața cu fântână'), emoji: '🎎', x: 200, y: 330, desc: tk('Inima orașului. Aici afli ce sărbătoare e azi în lumea limbilor tale.'), need: tk('deschisă de la început'), route: { name: 'holidays' }, open: true, draw: MARKET },
    { id: 'post', name: tk('Poșta'), emoji: '📮', x: 120, y: 392, desc: tk('Aici sosesc cartonașele tale: locurile câștigate zi de zi și cele ale ședințelor.'), need: tk('învață o zi'), route: { name: 'album' }, open: ok(nDays >= 1), draw: POST },
    { id: 'hall', name: tk('Primăria'), emoji: '🛂', x: 280, y: 392, desc: tk('Aici îți ștampilezi pașaportul cu personalitățile fiecărui capitol.'), need: tk('termină primul capitol'), route: { name: 'passport' }, open: ok(nStamps >= 1), draw: HALL },
    { id: 'ramen', name: tk('Restaurantul lui Kenji'), emoji: '🍜', x: 96, y: 330, desc: tk('Kenji te așteaptă cu un ramen și o conversație. Aici vorbești cu personajele.'), need: tk('termină 3 ședințe'), route: { name: 'talks' }, open: ok(sessionsDone >= 3), draw: RAMEN },
    { id: 'library', name: tk('Biblioteca doamnei Suzuki'), emoji: '📚', x: 306, y: 330, desc: tk('Doamna Suzuki (și pisica Tama) te provoacă la jocul de Perechi.'), need: tk('învață 30 de cuvinte'), route: { name: 'pairs' }, open: ok(cardCount >= 30), draw: LIBRARY },
    { id: 'station', name: tk('Gara'), emoji: '🚉', x: 200, y: 424, desc: tk('De aici pleacă Trenul limbilor, gară cu gară, ședință cu ședință.'), need: tk('termină 6 ședințe'), route: { name: 'train' }, open: ok(sessionsDone >= 6), draw: STATION },
    { id: 'museum', name: tk('Muzeul'), emoji: '🏛️', x: 128, y: 266, desc: tk('Portretele personalităților de pe ștampilele tale.'), need: tk('câștigă 3 ștampile'), route: { name: 'museum' }, open: ok(nStamps >= 3), draw: MUSEUM },
    { id: 'temple', name: tk('Templul'), emoji: '⛩️', x: 274, y: 268, desc: tk('Un loc liniștit unde exersezi kanji cu degetul.'), need: tk('începe japoneza'), route: { name: 'kanjiList' }, open: ok(startedJa), draw: TEMPLE },
    { id: 'lighthouse', name: tk('Farul'), emoji: '🗼', x: 364, y: 410, desc: tk('Farul se aprinde când treci primul test de nivel și primești o viză.'), need: tk('trece un test de nivel'), route: { name: 'passport' }, open: ok(exams.some((e) => e.passed)), draw: LIGHTHOUSE },
    { id: 'windmill', name: tk('Moara de vânt'), emoji: '🌬️', x: 40, y: 300, desc: tk('Moara se învârte de fiecare dată când exersezi kanji.'), need: tk('exersează 10 kanji'), route: { name: 'kanjiList' }, open: ok(kanji.length >= 10), draw: () => WINDMILL() },
  ]

  const houses = admin ? HOUSE_SLOTS.length : Math.min(HOUSE_SLOTS.length, nStamps)
  // câțiva copaci și doi locuitori de la început, ca orașul să nu fie pustiu
  const trees = admin ? TREE_SLOTS.length : Math.min(TREE_SLOTS.length, 4 + Math.floor(cardCount / 20))
  const walkers = admin ? 10 : Math.min(10, 2 + Math.ceil(nDays / 2))
  const boats = admin ? 3 : Math.min(3, talks.length)
  const trainOn = admin || sessionsDone >= 6

  const tap = (b: Building) => setSpot(
    <div className="town-info">
      <div className="town-info-emoji">{b.emoji}</div>
      <b>{t(b.name)}</b>
      <p>{t(b.desc)}</p>
      {b.open ? (
        <button className="btn primary" onClick={() => { setSpot(null); go(b.route) }}>{t('Intră →')}</button>
      ) : (
        <div className="town-locked">🔒 {t('În construcție · se deschide când:')} <b>{t(b.need)}</b></div>
      )}
    </div>,
  )

  const openCount = buildings.filter((b) => b.open).length
  return (
    <div className="screen">
      <TopBar title={`🏝️ ${t('Orașul tău')}`} onBack={back} />
      <p className="muted small">{t('Atinge clădirile ca să intri. Orașul crește când înveți: {open} din {all} clădiri deschise, {houses} case, {trees} copaci, {walkers} locuitori.', { open: openCount, all: buildings.length, houses, trees, walkers })}</p>
      <div className={`town-wrap ${night ? 'night' : ''}`}>
        <svg viewBox="0 0 400 520" className="town">
          <defs>
            <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={night ? '#0b1a3a' : '#7cc8f5'} /><stop offset="1" stopColor={night ? '#2a3d6b' : '#d8f1ff'} />
            </linearGradient>
            <linearGradient id="tsea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={night ? '#16365e' : '#3fb5e6'} /><stop offset="1" stopColor={night ? '#0d2440' : '#1c7fb8'} />
            </linearGradient>
            <path id="coast" d={COAST} />
            {WALKS.map((d, i) => <path key={i} id={`walk${i}`} d={d} />)}
          </defs>
          <rect width="400" height="520" fill="url(#tsky)" />
          {night ? (
            <g>
              {[[40, 30], [90, 60], [150, 24], [230, 50], [300, 20], [350, 70], [70, 110], [260, 100], [180, 90]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.3" fill="#fff" className="town-star" style={{ animationDelay: `${i * 0.4}s` }} />)}
              <circle cx="330" cy="50" r="16" fill="#f4f1de" /><circle cx="337" cy="45" r="14" fill="#0b1a3a" />
            </g>
          ) : (
            <g className="town-sun"><circle cx="330" cy="52" r="20" fill="#ffd54a" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="328" y="18" width="4" height="10" rx="2" fill="#ffd54a" transform={`rotate(${a} 330 52)`} />)}</g>
          )}
          <g className="town-cloud" fill="#fff" opacity={night ? 0.25 : 0.9}><ellipse cx="70" cy="70" rx="26" ry="10" /><ellipse cx="88" cy="63" rx="16" ry="10" /></g>
          <g className="town-cloud slow" fill="#fff" opacity={night ? 0.2 : 0.8}><ellipse cx="220" cy="110" rx="22" ry="8" /><ellipse cx="236" cy="104" rx="13" ry="8" /></g>
          {!night && <g className="town-birds" stroke="#334" strokeWidth="1.2" fill="none"><path d="M0 0 q3 -3 6 0 q3 -3 6 0" /><path d="M14 8 q3 -3 6 0 q3 -3 6 0" /></g>}
          {/* marea */}
          <rect y="150" width="400" height="370" fill="url(#tsea)" />
          <g stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" fill="none" className="town-waves">
            <path d="M20 180 q6 -4 12 0 t12 0" /><path d="M350 200 q6 -4 12 0 t12 0" /><path d="M30 505 q6 -4 12 0 t12 0" /><path d="M330 510 q6 -4 12 0 t12 0" />
          </g>
          {/* insula */}
          <path d={COAST} fill="#f3dc9b" transform="translate(0 4)" />
          <path d={COAST} fill="#f3dc9b" />
          <path d="M200 184 C 316 184, 368 256, 364 340 C 360 430, 290 478, 200 478 C 110 478, 40 430, 36 340 C 32 256, 84 184, 200 184 Z" fill={night ? '#3d7a4a' : '#7cc46b'} />
          {/* trenul de pe țărm */}
          {trainOn && (
            <g>
              <path d={COAST} fill="none" stroke="#7a5a3a" strokeWidth="2" strokeDasharray="2 3" opacity="0.6" />
              <g><text fontSize="14">🚂<animateMotion dur="26s" repeatCount="indefinite" rotate="auto"><mpath href="#coast" /></animateMotion></text></g>
            </g>
          )}
          {/* străzile */}
          <path d={ROAD} stroke={night ? '#8a7a66' : '#d9c7a7'} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d={ROAD} stroke={night ? '#6a5c4c' : '#c9b48e'} strokeWidth="1" strokeDasharray="3 4" fill="none" />
          {/* copacii */}
          {TREE_SLOTS.slice(0, trees).map(([x, y], i) => (
            <g key={`t${i}`} transform={`translate(${x} ${y})`}><g className="town-tree" style={{ animationDelay: `${(i % 5) * 0.5}s` }}><rect x="-1.5" y="-2" width="3" height="8" fill="#7a5230" /><circle cy="-6" r="8" fill={i % 3 ? '#3e9b4f' : '#2f8a44'} /></g></g>
          ))}
          {/* casele */}
          {HOUSE_SLOTS.slice(0, houses).map(([x, y], i) => (
            <g key={`h${i}`} transform={`translate(${x} ${y})`}><g className="town-pop">{HOUSE(ROOFS[i % ROOFS.length])(night)}{i % 2 === 0 && smoke(6, -28)}</g></g>
          ))}
          {/* clădirile importante */}
          {buildings.map((b) => (
            <g key={b.id} transform={`translate(${b.x} ${b.y})`} className={`town-building ${b.open ? 'open' : 'locked'}`} onClick={() => tap(b)} role="button">
              <ellipse cx="0" cy="1" rx="30" ry="5" fill="#000" opacity="0.12" />
              {b.open ? b.draw(night) : SCAFFOLD()}
              <g className="town-label" transform="translate(0 12)">
                <rect x={-t(b.name).length * 2.2 - 6} y="-6" width={t(b.name).length * 4.4 + 12} height="11" rx="5.5" fill={b.open ? 'rgba(255,255,255,0.88)' : 'rgba(80,60,30,0.75)'} />
                <text y="2" fontSize="6.5" textAnchor="middle" fill={b.open ? '#3b2f22' : '#fff'}>{b.emoji} {t(b.name)}</text>
              </g>
              {b.id === 'school' && b.open && smoke(-20, -44)}
            </g>
          ))}
          {/* locuitorii care se plimbă */}
          {Array.from({ length: walkers }, (_, i) => (
            <g key={`w${i}`}>
              <circle r="2.6" fill="#f1c27d" cy="-7" /><rect x="-2.2" y="-5" width="4.4" height="6" rx="2" fill={ROOFS[(i + 2) % ROOFS.length]} />
              <animateMotion dur={`${14 + i * 3}s`} begin={`${-i * 2.3}s`} repeatCount="indefinite"><mpath href={`#walk${i % WALKS.length}`} /></animateMotion>
            </g>
          ))}
          {/* bărcile */}
          {[[46, 200], [352, 470], [60, 486]].slice(0, boats).map(([x, y], i) => (
            <g key={`b${i}`} transform={`translate(${x} ${y})`}><g className="town-boat" style={{ animationDelay: `${i}s` }}>
              <path d="M-12 0 L12 0 L8 6 L-8 6 Z" fill="#8a5a2a" /><rect x="-0.8" y="-16" width="1.6" height="16" fill="#5a3a1a" /><polygon points="1,-15 1,-2 11,-2" fill="#fff" />
            </g></g>
          ))}
        </svg>
      </div>
      <article className="card town-legend">
        <div className="muted small">{night ? `🌙 ${t('E noapte în oraș: luminile sunt aprinse.')}` : `☀️ ${t('E zi în oraș.')}`} {t('Serie:')} {streak} {tn(streak, 'zi la rând', 'zile la rând')}.</div>
        {buildings.map((b) => (
          <button key={b.id} className={`town-row ${b.open ? '' : 'locked'}`} onClick={() => tap(b)}>
            <span>{b.emoji}</span><b>{t(b.name)}</b><small>{b.open ? t('deschis · atinge ca să intri') : `🔒 ${t(b.need)}`}</small>
          </button>
        ))}
      </article>
      {spot && <Spotlight onClose={() => setSpot(null)} hint={t('Atinge în afară ca să închizi')}>{spot}</Spotlight>}
    </div>
  )
}
