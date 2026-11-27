import { flushSync } from 'react-dom'

/**
 * Tranziția „ca pe Mac”: ecranul nou crește din iconița apăsată, iar la Înapoi se strânge la loc în ea.
 * Folosește View Transitions (Chrome, Edge, Safari recent); unde nu există, schimbarea e instantanee.
 */
export interface ZoomOrigin { x: number; y: number }

type DocVT = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }

function reduced() {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

export function originOf(el: Element | null | undefined): ZoomOrigin {
  if (!el) return { x: 50, y: 50 }
  const r = el.getBoundingClientRect()
  return { x: ((r.left + r.width / 2) / window.innerWidth) * 100, y: ((r.top + r.height / 2) / window.innerHeight) * 100 }
}

/** Rulează `update` într-o tranziție: 'in' = crește din origine, 'out' = se strânge în origine. */
export function zoomTransition(dir: 'in' | 'out', origin: ZoomOrigin, update: () => void) {
  const doc = document as DocVT
  if (!doc.startViewTransition || reduced()) { update(); return }
  const html = document.documentElement
  html.style.setProperty('--vt-x', `${origin.x}%`)
  html.style.setProperty('--vt-y', `${origin.y}%`)
  html.dataset.vt = dir
  try {
    const t = doc.startViewTransition(() => { flushSync(update) })
    t.finished.finally(() => { delete html.dataset.vt })
  } catch {
    delete html.dataset.vt
    update()
  }
}
