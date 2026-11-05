import { useSyncExternalStore } from 'react'
import type { Season } from './season'

export interface Settings {
  season: 'auto' | Season
  time: 'auto' | 'day' | 'night'
  particles: boolean
  intro: 'daily' | 'always' | 'never'
  rate: number
  voices: Partial<Record<string, string>>
  romaji: boolean
  autoplay: boolean
}

const DEFAULTS: Settings = {
  season: 'auto',
  time: 'auto',
  particles: true,
  intro: 'daily',
  rate: 0.9,
  voices: {},
  romaji: true,
  autoplay: true,
}

// Setările globale (înainte de conectare) și apoi cele ale fiecărui utilizator.
const GLOBAL_KEY = 'poliglot.settings'
let KEY = GLOBAL_KEY
let current: Settings = load()
const listeners = new Set<() => void>()

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(GLOBAL_KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { /* stocare indisponibilă */ }
  return { ...DEFAULTS }
}

/** Trece la setările unui utilizator (sau la cele globale, cu `null`). */
export function switchSettingsUser(userKey: string | null) {
  KEY = userKey ? `${GLOBAL_KEY}.${userKey}` : GLOBAL_KEY
  current = load()
  listeners.forEach((l) => l())
}

export function getSettings() {
  return current
}

export function setSettings(patch: Partial<Settings>) {
  current = { ...current, ...patch }
  try { localStorage.setItem(KEY, JSON.stringify(current)) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

export function useSettings(): Settings {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb) } },
    () => current,
  )
}

export function localGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

export function localSet(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* ignore */ }
}
