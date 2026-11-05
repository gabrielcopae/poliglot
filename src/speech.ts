import { getSettings } from './settings'

let voices: SpeechSynthesisVoice[] = []
const listeners = new Set<() => void>()
const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null

function loadVoices() {
  if (!synth) return
  voices = synth.getVoices()
  listeners.forEach((l) => l())
}

if (synth) {
  loadVoices()
  synth.addEventListener?.('voiceschanged', loadVoices)
}

export function onVoices(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

export function voicesFor(lang: string): SpeechSynthesisVoice[] {
  return voices
    .filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(lang))
    .sort((a, b) => Number(b.localService) - Number(a.localService))
}

export function canSpeak() {
  return !!synth
}

// Numele vocilor nu spun direct genul; ghicim după prenumele folosite de Windows, Android și Apple.
const FEMALE = /elvira|helena|laura|sabina|dalia|ximena|paloma|elsa|isabella|monica|mónica|paulina|lucia|lucía|alice|federica|nanami|haruka|ayumi|mayu|sayaka|kyoko|o-ren|female|mujer|donna/i
const MALE = /alvaro|álvaro|pablo|raul|raúl|jorge|diego|jaime|benigno|cosimo|giuseppe|luca|keita|ichiro|daichi|naoki|otoya|hattori|\bmale|hombre|uomo/i

function pickVoice(lang: string, gender?: 'f' | 'm'): SpeechSynthesisVoice | undefined {
  const list = voicesFor(lang)
  const saved = list.find((v) => v.voiceURI === getSettings().voices[lang])
  if (gender) {
    const re = gender === 'f' ? FEMALE : MALE
    const match = list.filter((v) => re.test(v.name))
    if (saved && re.test(saved.name)) return saved
    if (match.length) return match.find((v) => v.localService) ?? match[0]
  }
  return saved ?? list[0]
}

export interface SpeakOptions {
  gender?: 'f' | 'm'
  onEnd?: () => void
}

export function speak(text: string, lang: string, locale: string, rate?: number, opts: SpeakOptions = {}) {
  if (!synth) { opts.onEnd?.(); return }
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const v = pickVoice(lang, opts.gender)
  if (v) u.voice = v
  u.lang = v?.lang ?? locale
  u.rate = rate ?? getSettings().rate
  // dacă nu am găsit o voce potrivită genului, schimbăm puțin tonul
  if (opts.gender && v && !(opts.gender === 'f' ? FEMALE : MALE).test(v.name)) u.pitch = opts.gender === 'f' ? 1.2 : 0.8
  if (opts.onEnd) {
    let fired = false
    const end = () => { if (!fired) { fired = true; opts.onEnd!() } }
    u.onend = end
    u.onerror = end
  }
  synth.speak(u)
}

export function stopSpeaking() {
  synth?.cancel()
}

// Recunoașterea vorbirii: gratuită în Chrome/Edge/Android, dar are nevoie de internet.
type Recognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as Record<string, unknown>
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => Recognition) | null
}

export function canListen() {
  return !!recognitionCtor()
}

export function listen(locale: string): { promise: Promise<string[]>; stop: () => void } {
  const Ctor = recognitionCtor()
  if (!Ctor) return { promise: Promise.reject(new Error('Browserul nu suportă recunoașterea vorbirii.')), stop: () => {} }
  const rec = new Ctor()
  rec.lang = locale
  rec.interimResults = false
  rec.maxAlternatives = 5
  const promise = new Promise<string[]>((resolve, reject) => {
    let done = false
    rec.onresult = (e) => {
      done = true
      resolve(Array.from(e.results[0] ?? []).map((a) => a.transcript))
    }
    rec.onerror = (e) => {
      done = true
      const msg: Record<string, string> = {
        'not-allowed': 'Microfonul nu are permisiune.',
        'no-speech': 'Nu am auzit nimic. Mai încearcă.',
        network: 'Recunoașterea vorbirii are nevoie de internet.',
      }
      reject(new Error(msg[e.error] ?? 'Nu am putut asculta.'))
    }
    rec.onend = () => { if (!done) reject(new Error('Nu am auzit nimic. Mai încearcă.')) }
  })
  rec.start()
  return { promise, stop: () => rec.stop() }
}
