import { t, tk } from './i18n'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const SEASONS: Record<Season, { name: string; emoji: string; greeting: string }> = {
  spring: { name: tk('Primăvara'), emoji: '🌸', greeting: tk('Cireșii au înflorit') },
  summer: { name: tk('Vara'), emoji: '☀️', greeting: tk('Zile lungi, multe cuvinte') },
  autumn: { name: tk('Toamna'), emoji: '🍁', greeting: tk('Frunzele cad, cuvintele rămân') },
  winter: { name: tk('Iarna'), emoji: '❄️', greeting: tk('Seri liniștite de studiu') },
}

// Anotimpuri meteorologice, emisfera nordică (România)
export function seasonFor(d = new Date()): Season {
  const m = d.getMonth()
  if (m >= 2 && m <= 4) return 'spring'
  if (m >= 5 && m <= 7) return 'summer'
  if (m >= 8 && m <= 10) return 'autumn'
  return 'winter'
}

export function isNight(d = new Date()): boolean {
  const h = d.getHours()
  return h < 7 || h >= 20
}

export function partOfDay(d = new Date()): string {
  const h = d.getHours()
  if (h < 5) return t('Noapte bună')
  if (h < 11) return t('Bună dimineața')
  if (h < 18) return t('Bună ziua')
  return t('Bună seara')
}
