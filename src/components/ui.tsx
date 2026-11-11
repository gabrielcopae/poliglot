import type { ReactNode } from 'react'
import { speak } from '../speech'
import { getCourse } from '../content'
import type { Go, Route } from '../nav'
import { t, tk } from '../i18n'

export function SpeakButton({ text, lang, small, slow }: { text: string; lang: string; small?: boolean; slow?: boolean }) {
  const course = getCourse(lang)
  return (
    <button
      type="button"
      className={`speak ${small ? 'small' : ''}`}
      aria-label={slow ? t('Ascultă rar') : t('Ascultă')}
      onClick={(e) => { e.stopPropagation(); speak(text, lang, course.locale, slow ? 0.6 : undefined) }}
    >
      {slow ? '🐢' : '🔊'}
    </button>
  )
}

export function TopBar({ title, onBack, right }: { title: ReactNode; onBack?: () => void; right?: ReactNode }) {
  return (
    <header className="topbar">
      {onBack ? <button className="icon-btn" onClick={onBack} aria-label={t('Înapoi')}>←</button> : <span className="icon-spacer" />}
      <h1 className="topbar-title">{title}</h1>
      {right ?? <span className="icon-spacer" />}
    </header>
  )
}

const TABS: { route: Route; icon: string; label: string }[] = [
  { route: { name: 'home' }, icon: '🏠', label: tk('Acasă') },
  { route: { name: 'review' }, icon: '🔁', label: tk('Repetă') },
  { route: { name: 'stats' }, icon: '📈', label: tk('Progres') },
  { route: { name: 'settings' }, icon: '⚙️', label: tk('Setări') },
]

export function BottomNav({ current, go, due }: { current: Route['name']; go: Go; due: number }) {
  return (
    <nav className="bottomnav">
      {TABS.map((tab) => (
        <button key={tab.label} className={`tab ${current === tab.route.name ? 'active' : ''}`} onClick={() => go(tab.route)}>
          <span className="tab-icon">
            {tab.icon}
            {tab.route.name === 'review' && due > 0 && <span className="badge">{due > 99 ? '99+' : due}</span>}
          </span>
          <span className="tab-label">{t(tab.label)}</span>
        </button>
      ))}
    </nav>
  )
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }} />
    </div>
  )
}
