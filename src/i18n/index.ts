import { getSettings } from '../settings'
import en from './en'
import es from './es'
import it from './it'
import fr from './fr'
import de from './de'
import ja from './ja'

/** Limbile interfeței. Lecțiile (explicațiile) rămân în română; meniurile, ecranele și colecțiile se traduc. */
export type UiLang = 'ro' | 'en' | 'es' | 'it' | 'fr' | 'de' | 'ja'

export const UI_LANGS: { code: UiLang; name: string }[] = [
  { code: 'ro', name: 'Română' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
]

const DICTS: Record<Exclude<UiLang, 'ro'>, Record<string, string>> = { en, es, it, fr, de, ja }
const LOCALES: Record<UiLang, string> = { ro: 'ro-RO', en: 'en-GB', es: 'es-ES', it: 'it-IT', fr: 'fr-FR', de: 'de-DE', ja: 'ja-JP' }

export const uiLang = (): UiLang => getSettings().ui ?? 'ro'
/** Localizarea pentru date și numere (ex. „10 noiembrie” / „10 November”). */
export const uiLocale = () => LOCALES[uiLang()]

/**
 * Traduce un text al interfeței. Cheia e chiar textul în română; `{n}` se înlocuiește din `vars`.
 * Dacă lipsește traducerea, rămâne româna.
 */
export function t(ro: string, vars?: Record<string, string | number>): string {
  const lang = uiLang()
  let s = lang === 'ro' ? ro : DICTS[lang][ro] ?? ro
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v))
  return s
}

/** Alege forma de singular sau plural (ex. „1 zi” / „5 zile”). */
export const tn = (n: number, one: string, many: string) => t(n === 1 ? one : many, { n })

/** Marchează un text din date (liste, tabele) ca de tradus; traducerea se face la afișare, cu t(). */
export const tk = (ro: string) => ro

/** Numele unei limbi de curs în limba interfeței (ex. „Spaniolă” → „Spanish”). */
export const langName = (ro: string) => t(ro)

/** Numele limbii în mijlocul unei propoziții: cu literă mică acolo unde gramatica o cere (ro, es, it, fr). */
export const langWord = (ro: string) => (['ro', 'es', 'it', 'fr'].includes(uiLang()) ? t(ro).toLowerCase() : t(ro))

// ——— Traducerea conținutului (lecții, cartonașe, ștampile, calendar) ———
// Fișiere src/i18n/content/<limbă>/<parte>.json: { "text în română": "traducere" }, încărcate doar pentru limba aleasă.
const contentFiles = import.meta.glob<{ default: Record<string, string> }>('./content/*/*.json')
const content: Partial<Record<UiLang, Record<string, string>>> = {}
const loading: Partial<Record<UiLang, Promise<void>>> = {}

/** Încarcă traducerile de conținut pentru o limbă (o singură dată). */
export function loadContent(lang: UiLang): Promise<void> {
  if (lang === 'ro') return Promise.resolve()
  return (loading[lang] ??= Promise.all(
    Object.entries(contentFiles).filter(([p]) => p.startsWith(`./content/${lang}/`)).map(([, load]) => load()),
  ).then((mods) => { content[lang] = Object.assign({}, ...mods.map((m) => m.default)) }))
}

/** Traduce un text din conținut (cheia: textul în română). Fără traducere, rămâne româna. */
export function tc(ro: string): string {
  const lang = uiLang()
  return lang === 'ro' ? ro : content[lang]?.[ro] ?? ro
}
