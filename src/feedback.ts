import { getSettings } from './settings'

/**
 * Răspuns discret la fiecare exercițiu: un ton scurt și blând + o vibrație scurtă pe telefon.
 * Fără fișiere audio: tonurile se generează pe loc (WebAudio), deci nu adaugă nimic la descărcare.
 */
let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

function tone(ac: AudioContext, freq: number, start: number, dur: number, vol: number) {
  const o = ac.createOscillator()
  const g = ac.createGain()
  o.type = 'sine'
  o.frequency.value = freq
  g.gain.setValueAtTime(0, start)
  g.gain.linearRampToValueAtTime(vol, start + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  o.connect(g).connect(ac.destination)
  o.start(start)
  o.stop(start + dur + 0.02)
}

/** ok = răspuns corect (două note urcătoare); altfel o notă joasă, scurtă, deloc stridentă. */
export function playFeedback(ok: boolean) {
  const s = getSettings()
  if (s.sounds !== false) {
    const ac = audio()
    if (ac) {
      const t0 = ac.currentTime + 0.01
      if (ok) {
        tone(ac, 660, t0, 0.14, 0.12)
        tone(ac, 880, t0 + 0.09, 0.2, 0.1)
      } else {
        tone(ac, 220, t0, 0.22, 0.1)
      }
    }
  }
  if (s.haptics !== false) {
    try { navigator.vibrate?.(ok ? 15 : [30, 40, 30]) } catch { /* nu toate dispozitivele vibrează */ }
  }
}

/** Sunetul de final de ședință: trei note scurte. */
export function playFinish() {
  if (getSettings().sounds === false) return
  const ac = audio()
  if (!ac) return
  const t0 = ac.currentTime + 0.01
  ;[523, 659, 784].forEach((f, i) => tone(ac, f, t0 + i * 0.11, 0.22, 0.09))
}

/** Tastele 1–9 → indexul variantei (pentru tastatură, pe calculator). */
export function digitIndex(e: KeyboardEvent): number {
  if (e.ctrlKey || e.metaKey || e.altKey) return -1
  const tag = (e.target as HTMLElement | null)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return -1
  const n = Number(e.key)
  return Number.isInteger(n) && n >= 1 && n <= 9 ? n - 1 : -1
}
