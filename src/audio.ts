import { audioKey } from './audioKey'

/**
 * Voci înregistrate dinainte (generate pe laptop) pentru textele din curs.
 * Indexul fiecărei limbi spune ce replici au înregistrare: audio/<lang>.json = { lessons: { id: [chei] } }.
 * Fișierele se salvează pe dispozitiv la prima redare (sau la „Descarcă vocile”) și merg apoi offline.
 */
const BASE = `${import.meta.env.BASE_URL}audio/`
export const AUDIO_CACHE = 'poliglot-audio'

interface LangIndex { lessons: Record<string, string[]> }
const keys: Record<string, Set<string>> = {}
const indexes: Record<string, LangIndex> = {}
const loading: Record<string, Promise<void> | undefined> = {}

export function loadAudioIndex(lang: string): Promise<void> {
  return (loading[lang] ??= fetch(`${BASE}${lang}.json`)
    .then((r) => (r.ok ? r.json() : { lessons: {} }))
    .then((ix: LangIndex) => {
      indexes[lang] = ix
      keys[lang] = new Set(Object.values(ix.lessons).flat())
    })
    .catch(() => { loading[lang] = undefined }))
}

export function audioUrl(lang: string, gender: 'f' | 'm' | 'n', text: string): string | undefined {
  const k = audioKey(lang, gender, text)
  return keys[lang]?.has(k) ? `${BASE}${lang}/${k}.mp3` : undefined
}

export function audioLessons(lang: string): Record<string, string[]> {
  return indexes[lang]?.lessons ?? {}
}

// Un singur element audio refolosit: pe iPhone, după prima atingere, poate reda și replicile următoare.
let el: HTMLAudioElement | null = null
let current: { done: boolean; onEnd?: () => void } | null = null

export function playRecorded(url: string, rate: number, onEnd: () => void, onFail: () => void) {
  stopRecorded()
  el ??= new Audio()
  const me = { done: false, onEnd }
  current = me
  const finish = () => { if (!me.done) { me.done = true; onEnd() } }
  el.onended = finish
  el.onerror = () => { if (!me.done) { me.done = true; onFail() } }
  el.src = url
  el.playbackRate = rate
  el.play().catch(() => { if (!me.done) { me.done = true; onFail() } })
  // descărcare completă în fundal, ca să rămână salvată pentru offline
  fetch(url).catch(() => {})
}

export function stopRecorded() {
  if (current && !current.done) current.done = true
  current = null
  if (el && !el.paused) el.pause()
}

/** Câte replici din limba dată sunt deja salvate pe dispozitiv. */
export async function downloadedCount(lang: string): Promise<number> {
  if (!('caches' in window)) return 0
  const cache = await caches.open(AUDIO_CACHE)
  const reqs = await cache.keys()
  return reqs.filter((r) => r.url.includes(`/audio/${lang}/`)).length
}

/** Descarcă (și salvează) toate înregistrările unei limbi. */
export async function downloadLang(lang: string, onProgress: (done: number, total: number) => void) {
  await loadAudioIndex(lang)
  const all = [...(keys[lang] ?? [])]
  const cache = await caches.open(AUDIO_CACHE)
  let done = 0
  const queue = [...all]
  const worker = async () => {
    while (queue.length) {
      const k = queue.shift()!
      const url = new URL(`${BASE}${lang}/${k}.mp3`, location.href).href
      if (!(await cache.match(url))) {
        try { const r = await fetch(url); if (r.ok) await cache.put(url, r) } catch { /* reîncearcă data viitoare */ }
      }
      onProgress(++done, all.length)
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()])
}
