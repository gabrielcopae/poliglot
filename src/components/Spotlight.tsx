import { t } from '../i18n'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Cartonașul sau ștampila atinsă, mărită în mijlocul ecranului, cu ramă animată strălucitoare. */
export function Spotlight({ children, onClose, hint }: { children: ReactNode; onClose: () => void; hint?: string }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])
  // direct în <body>, ca să stea mereu în mijlocul ecranului, oricât de lungă e pagina
  return createPortal(
    <div className="spot" onClick={onClose}>
      <button className="spot-close" onClick={onClose} aria-label={t('Închide')}>✕</button>
      <div className="spot-frame" onClick={(e) => e.stopPropagation()}>
        <div className="spot-glow" />
        <div className="spot-content">{children}</div>
      </div>
      <div className="spot-hint">{hint ?? t('Atinge cartonașul ca să-l întorci · atinge în afară ca să închizi')}</div>
    </div>,
    document.body,
  )
}
