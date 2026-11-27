/**
 * Mr. Poli: cartea din animația de la pornire (coperta vișinie, rama și globul aurii), făcută personaj.
 * Desen vectorial (SVG) animat din CSS. Stări: idle (clipește, respiră, foile foșnesc), happy (sare ușor),
 * cheer (sare sus, mâinile sus, foile zboară, steluțe), sleepy (doarme, „Zzz”), sad (încurajează), wave (salută).
 */
export type Mood = 'idle' | 'happy' | 'cheer' | 'sleepy' | 'sad' | 'wave'

const GOLD = '#f3cf7a'
const INK = '#2a1410'

export function Mascot({ mood = 'idle', size = 120, className = '' }: { mood?: Mood; size?: number; className?: string }) {
  const closed = mood === 'sleepy'
  const smiley = mood === 'happy' || mood === 'cheer'
  return (
    <span className={`mascot mascot--${mood} ${className}`} style={{ width: size, height: size }} aria-hidden="true" title="Mr. Poli">
      <svg viewBox="0 0 140 140" width={size} height={size}>
        <defs>
          <linearGradient id="mp-cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a8452c" />
            <stop offset="0.55" stopColor="#8a3420" />
            <stop offset="1" stopColor="#5c1f12" />
          </linearGradient>
          <linearGradient id="mp-page" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e9dcc0" />
            <stop offset="1" stopColor="#fffaf0" />
          </linearGradient>
          <radialGradient id="mp-shine" cx="0.3" cy="0.2" r="0.7">
            <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* umbra de pe jos */}
        <ellipse className="m-shadow" cx="70" cy="132" rx="30" ry="4.5" fill="#000" opacity="0.14" />

        <g className="m-jump">
          <g className="m-squash">
            {/* picioarele cu pantofi */}
            <g className="m-legs">
              <path d="M58 116 L57 126" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M82 116 L83 126" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="54" cy="128" rx="8" ry="4" fill={INK} />
              <ellipse cx="86" cy="128" rx="8" ry="4" fill={INK} />
            </g>

            {/* foile care ies din carte (foșnesc; la sărbătoare zboară) */}
            <g className="m-pages">
              <path className="m-page p1" d="M104 26 L118 30 L118 108 L104 112 Z" fill="url(#mp-page)" stroke="#d9c7a2" strokeWidth="0.8" />
              <path className="m-page p2" d="M104 26 L115 28 L115 110 L104 112 Z" fill="url(#mp-page)" stroke="#d9c7a2" strokeWidth="0.8" />
              <path className="m-page p3" d="M104 26 L112 27 L112 111 L104 112 Z" fill="url(#mp-page)" stroke="#d9c7a2" strokeWidth="0.8" />
            </g>

            {/* mâinile */}
            <g className="m-arm m-arm-l">
              <path d="M36 72 Q24 78 22 90" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="22" cy="91" r="5" fill="#fff6e4" stroke={INK} strokeWidth="1.5" />
            </g>
            <g className="m-arm m-arm-r">
              <path d="M104 72 Q116 78 118 90" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="118" cy="91" r="5" fill="#fff6e4" stroke={INK} strokeWidth="1.5" />
            </g>

            {/* corpul: cartea */}
            <g className="m-body">
              {/* marginea foilor, în spatele copertei */}
              <rect x="40" y="22" width="68" height="94" rx="6" fill="#e6d7b8" />
              <rect x="38" y="20" width="68" height="94" rx="6" fill="#d9c7a2" />
              {/* coperta */}
              <rect x="32" y="16" width="72" height="100" rx="7" fill="url(#mp-cover)" />
              {/* cotorul */}
              <rect x="32" y="16" width="9" height="100" rx="4" fill="#000" opacity="0.28" />
              <rect x="41" y="16" width="1.5" height="100" fill="#fff" opacity="0.1" />
              {/* rama aurie */}
              <rect x="46" y="23" width="52" height="86" rx="5" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.8" />
              <rect x="49.5" y="26.5" width="45" height="79" rx="3.5" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.45" />
              <rect x="32" y="16" width="72" height="100" rx="7" fill="url(#mp-shine)" />
            </g>

            {/* fața */}
            <g className="m-head">
              {/* sprâncenele */}
              <g className="m-brows" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round">
                {mood === 'sad' ? (
                  <>
                    <path d="M54 40 Q59 37 64 35" fill="none" />
                    <path d="M90 40 Q85 37 80 35" fill="none" />
                  </>
                ) : (
                  <>
                    <path d="M54 39 Q59 35 64 38" fill="none" />
                    <path d="M80 38 Q85 35 90 39" fill="none" />
                  </>
                )}
              </g>
              {/* ochii */}
              <g className="m-eyes">
                {closed ? (
                  <>
                    <path d="M53 50 Q59 55 65 50" stroke={GOLD} strokeWidth="2.8" fill="none" strokeLinecap="round" />
                    <path d="M79 50 Q85 55 91 50" stroke={GOLD} strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  </>
                ) : smiley ? (
                  <>
                    <path d="M53 52 Q59 43 65 52" stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                    <path d="M79 52 Q85 43 91 52" stroke={GOLD} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                  </>
                ) : (
                  <g className="m-blink">
                    <ellipse cx="59" cy="49" rx="7" ry="8" fill="#fffaf0" />
                    <ellipse cx="85" cy="49" rx="7" ry="8" fill="#fffaf0" />
                    <g className="m-pupils">
                      <ellipse cx={mood === 'sad' ? 59 : 60} cy={mood === 'sad' ? 52 : 50} rx="3.6" ry="4.4" fill={INK} />
                      <ellipse cx={mood === 'sad' ? 85 : 86} cy={mood === 'sad' ? 52 : 50} rx="3.6" ry="4.4" fill={INK} />
                      <circle cx="61.5" cy="48" r="1.4" fill="#fff" />
                      <circle cx="87.5" cy="48" r="1.4" fill="#fff" />
                    </g>
                  </g>
                )}
              </g>
              {/* obrajii */}
              <ellipse cx="52" cy="61" rx="4.5" ry="2.6" fill="#ff8a7a" opacity="0.4" />
              <ellipse cx="92" cy="61" rx="4.5" ry="2.6" fill="#ff8a7a" opacity="0.4" />
              {/* gura */}
              {smiley ? (
                <path d="M63 62 Q72 73 81 62 Q72 66 63 62 Z" fill="#3a0e08" stroke={GOLD} strokeWidth="1.4" strokeLinejoin="round" />
              ) : mood === 'sad' ? (
                <path d="M65 67 Q72 62 79 67" stroke={GOLD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
              ) : mood === 'sleepy' ? (
                <ellipse cx="72" cy="65" rx="2.4" ry="2" fill={GOLD} opacity="0.8" />
              ) : (
                <path d="M65 63 Q72 69 79 63" stroke={GOLD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
              )}
              {/* papionul auriu: e „Mr.” */}
              <g className="m-bow">
                <path d="M72 78 L61 72 L61 84 Z" fill={GOLD} />
                <path d="M72 78 L83 72 L83 84 Z" fill={GOLD} />
                <circle cx="72" cy="78" r="3" fill="#d9a94a" />
              </g>
              {/* globul de pe copertă, ca o insignă */}
              <g className="m-globe" stroke={GOLD} fill="none" opacity="0.9">
                <circle cx="72" cy="97" r="8.5" strokeWidth="1.6" />
                <ellipse cx="72" cy="97" rx="3.8" ry="8.5" strokeWidth="1.2" />
                <path d="M63.5 97 h17 M65 92.5 h14 M65 101.5 h14" strokeWidth="1.1" />
              </g>
            </g>
          </g>
        </g>

        {/* efecte: steluțe la sărbătoare, „Zzz” la somn */}
        {mood === 'cheer' && (
          <g className="m-fx">
            <path className="m-star s1" d="M14 30 l3 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1 z" fill="#ffd34d" />
            <path className="m-star s2" d="M122 16 l2.5 5 5 .8 -4 3.4 1 5 -4.5 -2.5 -4.5 2.5 1 -5 -4 -3.4 5 -.8 z" fill="#ffd34d" />
            <circle className="m-star s3" cx="128" cy="54" r="3.5" fill="#5fd3c6" />
            <circle className="m-star s4" cx="10" cy="62" r="3" fill="#ff8fb1" />
          </g>
        )}
        {mood === 'sleepy' && (
          <g className="m-fx" fill="#7a8fb3" fontFamily="system-ui, sans-serif" fontWeight="800">
            <text className="m-z z1" x="106" y="22" fontSize="13">z</text>
            <text className="m-z z2" x="116" y="10" fontSize="17">Z</text>
          </g>
        )}
      </svg>
    </span>
  )
}

/** Starea potrivită pentru ecranul principal, după cum ai învățat azi. */
export function homeMood({ goalDone, learnedToday, restYesterday, streak }: { goalDone: boolean; learnedToday: boolean; restYesterday: boolean; streak: number }): Mood {
  if (goalDone) return 'cheer'
  if (learnedToday) return 'happy'
  if (restYesterday) return 'sad'
  if (streak === 0) return 'wave'
  const h = new Date().getHours()
  if (h >= 22 || h < 6) return 'sleepy'
  return 'idle'
}
