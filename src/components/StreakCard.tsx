import { t } from '../i18n'
import type { DayRow } from '../db'
import { today } from '../util'

/** Zilele speciale ale seriei: la fiecare primești un cartonaș holografic. */
export const MILESTONES = [3, 7, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 180, 200, 250, 300, 365]

/** Cea mai lungă serie de zile consecutive de învățat, din tot istoricul. */
export function longestStreak(days: DayRow[]): number {
  const dates = days.filter((d) => d.reviews + d.lessons > 0).map((d) => d.date).sort()
  let best = 0, run = 0, prev = ''
  for (const d of dates) {
    const next = prev ? today(new Date(new Date(prev + 'T12:00:00').getTime() + 86400000)) : ''
    run = d === next ? run + 1 : 1
    best = Math.max(best, run)
    prev = d
  }
  return best
}

const phrase = (n: number) => [`¡${n} días seguidos!`, `${n}日連続！`, `${n} giorni di fila!`, `${n} jours d’affilée !`, `${n} Tage in Folge!`]

/** Cartonașul holografic, multicolor și strălucitor, pentru o zi specială a seriei. */
export function StreakCard({ n, locked }: { n: number; locked?: boolean }) {
  if (locked) {
    return (
      <div className="holo-card locked">
        <div className="holo-inner">
          <div className="holo-num">{n}</div>
          <div className="holo-sub">{t('zile la rând')}</div>
          <div className="holo-lock">🔒</div>
        </div>
      </div>
    )
  }
  return (
    <div className="holo-card">
      <div className="holo-inner">
        <div className="holo-shine" />
        <div className="holo-fire">🔥</div>
        <div className="holo-num">{n}</div>
        <div className="holo-sub">{t('zile la rând')}</div>
        <div className="holo-phrases">
          {phrase(n).map((p) => <span key={p}>{p}</span>)}
        </div>
      </div>
    </div>
  )
}
