import { useLiveQuery } from 'dexie-react-hooks'
import { TopBar } from '../components/ui'
import { isAdmin, studyDays } from '../components/RewardCard'
import { db, streakFrom } from '../db'
import { stamps } from '../journey'

// Locurile fixe de pe insulă (coordonate în desenul de 360 × 260), ca insula să crească mereu la fel de frumos.
const HOUSES = [[150, 150], [178, 158], [124, 162], [205, 150], [100, 150], [160, 178], [232, 162], [135, 186], [188, 186], [212, 178], [88, 172], [250, 180], [114, 196], [168, 202], [228, 198], [145, 128], [196, 128], [80, 192], [262, 160], [240, 208]]
const TREES = [[70, 160], [272, 176], [96, 128], [250, 132], [62, 182], [286, 194], [118, 118], [226, 120], [76, 204], [276, 212], [104, 214], [244, 222], [56, 168], [292, 168], [132, 222], [214, 222], [172, 116], [86, 116], [264, 116], [150, 224]]
const PEOPLE = [[158, 168], [192, 170], [140, 176], [220, 172], [112, 182], [176, 192], [204, 196], [128, 204], [244, 190], [96, 188], [264, 198], [150, 210], [184, 212], [228, 212], [118, 168]]
const BOATS = [[40, 232], [312, 226], [32, 132], [326, 128]]
const ROOF = ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#9b59b6', '#e67e22', '#3498db', '#e84393']

/** Insula ta: crește din progresul real la toate limbile. */
export function IslandScreen({ back, user }: { back: () => void; user: string }) {
  const admin = isAdmin(user)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const cardCount = useLiveQuery(() => db.cards.count(), [], 0)
  const exams = useLiveQuery(() => db.exams.toArray(), [], [])
  const talks = useLiveQuery(() => db.talks.toArray(), [], [])
  const kanji = useLiveQuery(() => db.kanji.toArray(), [], [])

  const houses = admin ? HOUSES.length : Math.min(HOUSES.length, stamps(chapters, homework).length)
  const trees = admin ? TREES.length : Math.min(TREES.length, Math.floor(cardCount / 25))
  const people = admin ? PEOPLE.length : Math.min(PEOPLE.length, Math.floor(studyDays(days).length / 2))
  const boats = admin ? BOATS.length : Math.min(BOATS.length, talks.length)
  const lighthouse = admin || exams.some((e) => e.passed)
  const windmill = admin || kanji.length >= 10
  const langs = admin ? ['es', 'ja', 'it'] : [...new Set(chapters.map((c) => c.lang))]
  const streak = streakFrom(days)
  const sunny = admin || streak >= 3

  const goals = [
    { icon: '🏠', text: `Case: ${houses} din ${HOUSES.length}`, next: houses < HOUSES.length ? 'termină încă un capitol' : 'complet' },
    { icon: '🌳', text: `Copaci: ${trees} din ${TREES.length}`, next: trees < TREES.length ? `${25 - (cardCount % 25)} cuvinte până la următorul` : 'complet' },
    { icon: '🧍', text: `Locuitori: ${people} din ${PEOPLE.length}`, next: people < PEOPLE.length ? 'unul la fiecare 2 zile de învățat' : 'complet' },
    { icon: '⛵', text: `Bărci: ${boats} din ${BOATS.length}`, next: boats < BOATS.length ? 'termină încă o conversație cu personajele' : 'complet' },
    { icon: '🗼', text: lighthouse ? 'Farul luminează' : 'Farul e stins', next: lighthouse ? 'complet' : 'trece primul test de nivel' },
    { icon: '🌬️', text: windmill ? 'Moara de vânt se învârte' : 'Moara nu e construită', next: windmill ? 'complet' : `exersează ${10 - kanji.length} kanji` },
    { icon: '☀️', text: sunny ? `Soare strălucitor (${streak} zile la rând)` : 'Cer cu nori', next: sunny ? 'ține seria!' : 'învață 3 zile la rând' },
  ]

  return (
    <div className="screen">
      <TopBar title="🏝️ Insula ta" onBack={back} />
      <p className="muted small">Insula crește odată cu tine: fiecare capitol construiește o casă, cuvintele învățate fac să răsară copaci, zilele de învățat aduc locuitori.</p>
      <div className="island-wrap">
        <svg viewBox="0 0 360 260" className="island">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sunny ? '#8fd3ff' : '#b8c6d6'} /><stop offset="1" stopColor={sunny ? '#e6f7ff' : '#e3e8ee'} /></linearGradient>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3fb5e6" /><stop offset="1" stopColor="#1c7fb8" /></linearGradient>
          </defs>
          <rect width="360" height="260" fill="url(#sky)" />
          {/* soarele sau norii */}
          {sunny ? (
            <g className="island-sun"><circle cx="300" cy="40" r="20" fill="#ffd54a" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="298" y="8" width="4" height="10" rx="2" fill="#ffd54a" transform={`rotate(${a} 300 40)`} />)}</g>
          ) : (
            <g fill="#fff" opacity="0.9"><ellipse cx="290" cy="40" rx="24" ry="11" /><ellipse cx="306" cy="34" rx="16" ry="11" /></g>
          )}
          <g fill="#fff" opacity="0.8" className="island-clouds"><ellipse cx="80" cy="36" rx="22" ry="9" /><ellipse cx="96" cy="31" rx="14" ry="9" /></g>
          <rect y="110" width="360" height="150" fill="url(#sea)" />
          <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" className="island-waves">
            <path d="M20 130 q6 -4 12 0 t12 0" /><path d="M300 140 q6 -4 12 0 t12 0" /><path d="M40 245 q6 -4 12 0 t12 0" /><path d="M280 250 q6 -4 12 0 t12 0" />
          </g>
          {/* insula */}
          <ellipse cx="178" cy="176" rx="146" ry="62" fill="#f3dc9b" />
          <ellipse cx="178" cy="170" rx="132" ry="54" fill="#7cc46b" />
          <ellipse cx="170" cy="160" rx="96" ry="34" fill="#8fd17c" />
          {/* farul */}
          <g transform="translate(312 150)">
            <polygon points="-7,30 7,30 4,-8 -4,-8" fill="#fff" stroke="#c0392b" strokeWidth="1.5" />
            <rect x="-4.5" y="2" width="9" height="5" fill="#c0392b" /><rect x="-5.5" y="16" width="11" height="5" fill="#c0392b" />
            <rect x="-5" y="-14" width="10" height="7" fill={lighthouse ? '#ffe066' : '#888'} />
            {lighthouse && <polygon points="5,-11 40,-22 40,0" fill="#ffe066" opacity="0.5" className="island-beam" />}
            <polygon points="-6,-14 6,-14 0,-21" fill="#c0392b" />
          </g>
          {/* moara de vânt */}
          {windmill && (
            <g transform="translate(62 138)">
              <polygon points="-6,26 6,26 4,0 -4,0" fill="#e8d5b5" stroke="#8a6a3a" strokeWidth="1" />
              <g className="island-mill">{[0, 90, 180, 270].map((a) => <rect key={a} x="-1.5" y="-18" width="3" height="18" fill="#fff" stroke="#8a6a3a" strokeWidth="0.6" transform={`rotate(${a})`} />)}</g>
              <circle r="2" fill="#8a6a3a" />
            </g>
          )}
          {/* copacii */}
          {TREES.slice(0, trees).map(([x, y], i) => (
            <g key={`t${i}`} transform={`translate(${x} ${y})`}><rect x="-1.5" y="0" width="3" height="7" fill="#7a5230" /><circle cy="-3" r="7" fill={i % 3 ? '#3e9b4f' : '#2f8a44'} /></g>
          ))}
          {/* casele */}
          {HOUSES.slice(0, houses).map(([x, y], i) => (
            <g key={`h${i}`} transform={`translate(${x} ${y})`}>
              <g className="island-house">
                <rect x="-8" y="-4" width="16" height="12" fill="#fff6e5" stroke="#b89a6a" strokeWidth="0.8" />
                <polygon points="-10,-4 10,-4 0,-13" fill={ROOF[i % ROOF.length]} />
                <rect x="-2.5" y="2" width="5" height="6" fill="#8a5a2a" />
              </g>
            </g>
          ))}
          {/* steagurile limbilor */}
          {langs.map((l, i) => (
            <g key={l} transform={`translate(${176 + i * 14} 112)`}>
              <rect x="0" y="0" width="1.5" height="20" fill="#5a4630" />
              {l === 'es' && <g><rect x="1.5" y="0" width="12" height="8" fill="#c60b1e" /><rect x="1.5" y="2" width="12" height="4" fill="#ffc400" /></g>}
              {l === 'ja' && <g><rect x="1.5" y="0" width="12" height="8" fill="#fff" stroke="#ddd" strokeWidth="0.4" /><circle cx="7.5" cy="4" r="2.2" fill="#bc002d" /></g>}
              {l === 'it' && <g><rect x="1.5" y="0" width="4" height="8" fill="#009246" /><rect x="5.5" y="0" width="4" height="8" fill="#fff" /><rect x="9.5" y="0" width="4" height="8" fill="#ce2b37" /></g>}
            </g>
          ))}
          {/* locuitorii */}
          {PEOPLE.slice(0, people).map(([x, y], i) => (
            <g key={`p${i}`} transform={`translate(${x} ${y})`}><circle cy="-6" r="2.2" fill="#f1c27d" /><rect x="-2" y="-4" width="4" height="6" rx="1.5" fill={ROOF[(i + 3) % ROOF.length]} /></g>
          ))}
          {/* bărcile */}
          {BOATS.slice(0, boats).map(([x, y], i) => (
            <g key={`b${i}`} transform={`translate(${x} ${y})`}>
              <g className="island-boat">
                <path d="M-12 0 L12 0 L8 6 L-8 6 Z" fill="#8a5a2a" /><rect x="-0.8" y="-16" width="1.6" height="16" fill="#5a3a1a" />
                <polygon points="1,-15 1,-2 11,-2" fill="#fff" />
              </g>
            </g>
          ))}
        </svg>
      </div>
      <article className="card island-goals">
        {goals.map((g) => (
          <div key={g.icon} className="island-goal">
            <span>{g.icon}</span>
            <b>{g.text}</b>
            <small>{g.next}</small>
          </div>
        ))}
      </article>
    </div>
  )
}
