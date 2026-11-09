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
  // Safari pe iPhone încarcă vocile treptat și nu anunță mereu „voiceschanged”: mai întrebăm de câteva ori.
  let tries = 0
  const poll = setInterval(() => {
    const before = voices.length
    voices = synth.getVoices()
    if (voices.length !== before) listeners.forEach((l) => l())
    if (++tries >= 20) clearInterval(poll)
  }, 1000)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loadVoices() })
}

export function onVoices(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

// Vocile de calitate (Apple „Îmbunătățită / Premium”, Microsoft „Natural / Neural”) au prioritate.
const QUALITY = /premium|enhanced|mejorada|optimizada|migliorata|高品質|natural|neural|online/i

export function voicesFor(lang: string): SpeechSynthesisVoice[] {
  // listă proaspătă de fiecare dată (pe iPhone pot apărea voci noi după pornire)
  const fresh = synth?.getVoices()
  if (fresh && fresh.length >= voices.length) voices = fresh
  return voices
    .filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(lang))
    .sort((a, b) => Number(QUALITY.test(b.name)) - Number(QUALITY.test(a.name)) || Number(b.localService) - Number(a.localService))
}

export function canSpeak() {
  return !!synth
}

// Numele vocilor nu spun direct genul; ghicim după prenumele folosite de Windows, Android și Apple.
const FEMALE = /elvira|helena|laura|sabina|dalia|ximena|paloma|elsa|isabella|isabela|monica|mónica|paulina|marisol|angélica|angelica|francisca|soledad|lucia|lucía|alice|federica|paola|nanami|haruka|ayumi|mayu|sayaka|kyoko|o-ren|\bflo\b|sandy|shelley|grandma|female|mujer|donna|femenin|女性/i
const MALE = /alvaro|álvaro|pablo|raul|raúl|jorge|juan|diego|jaime|carlos|benigno|cosimo|giuseppe|luca|keita|ichiro|daichi|naoki|otoya|hattori|\beddy\b|\breed\b|rocko|grandpa|\bmale|hombre|uomo|masculin|男性/i

/** Identificator stabil: pe iPhone, mai multe voci pot avea același voiceURI. */
export function voiceId(v: SpeechSynthesisVoice) {
  return `${v.voiceURI}|${v.name}`
}

/** Vocile care pe acest aparat nu pornesc (iOS arată unele voci pe care paginile web nu le pot folosi). */
const silent = new Set<string>()
const IOS = typeof navigator !== 'undefined' && (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

function pickVoice(lang: string, gender?: 'f' | 'm'): SpeechSynthesisVoice | undefined {
  const list = voicesFor(lang).filter((v) => !silent.has(voiceId(v)))
  const pref = getSettings().voices[lang]
  const saved = list.find((v) => voiceId(v) === pref) ?? list.find((v) => v.voiceURI === pref)
  if (gender) {
    const chosen = getSettings().voices[`${lang}:${gender}`]
    const byUser = chosen ? list.find((v) => voiceId(v) === chosen) : undefined
    if (byUser) return byUser
    const re = gender === 'f' ? FEMALE : MALE
    const other = gender === 'f' ? MALE : FEMALE
    if (saved && re.test(saved.name)) return saved
    const match = list.find((v) => re.test(v.name))
    if (match) return match
    // Nicio voce sigură pentru acest gen: luăm măcar o altă voce decât cea a celuilalt gen.
    const otherVoice = (saved && other.test(saved.name) ? saved : undefined) ?? list.find((v) => other.test(v.name))
    const different = list.find((v) => v !== otherVoice && !other.test(v.name)) ?? list.find((v) => v !== otherVoice)
    if (different) return different
  }
  return saved ?? list[0]
}

/** Vocea pe care o folosește aplicația pentru un personaj (pentru testul din Setări). */
export function voiceFor(lang: string, gender: 'f' | 'm') {
  return pickVoice(lang, gender)
}

export interface SpeakOptions {
  gender?: 'f' | 'm'
  onEnd?: () => void
}

export function speak(text: string, lang: string, locale: string, rate?: number, opts: SpeakOptions = {}) {
  if (!synth) { opts.onEnd?.(); return }
  let finished = false
  const end = () => { if (!finished) { finished = true; opts.onEnd?.() } }

  const say = (withVoice: boolean) => {
    const u = new SpeechSynthesisUtterance(text)
    const v = withVoice ? pickVoice(lang, opts.gender) : undefined
    if (v) u.voice = v
    u.lang = v?.lang ?? locale
    u.rate = rate ?? getSettings().rate
    // dacă nu am găsit o voce potrivită genului, schimbăm puțin tonul
    if (opts.gender && !(v && (opts.gender === 'f' ? FEMALE : MALE).test(v.name))) u.pitch = opts.gender === 'f' ? 1.2 : 0.8
    let started = false
    let replaced = false
    u.onstart = () => { started = true }
    u.onend = () => { if (!replaced) end() }
    u.onerror = () => { if (!replaced) end() }
    synth.speak(u)
    // Pe iPhone unele voci tac fără nicio eroare: dacă nu pornește, reîncercăm cu vocea de bază.
    if (IOS && v) {
      setTimeout(() => {
        if (started || finished) return
        silent.add(voiceId(v))
        replaced = true
        synth.cancel()
        say(false)
      }, 1500)
    }
  }

  // Pe iPhone vocea pornește doar dacă „speak” e apelat chiar în momentul atingerii (fără pauze).
  if (synth.speaking || synth.pending) synth.cancel()
  say(true)
  synth.resume()
}

// iPhone: prima atingere din aplicație „deblochează” vorbirea, cu o replică goală.
if (synth && IOS) {
  const unlock = () => {
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    synth.speak(u)
    document.removeEventListener('touchend', unlock)
  }
  document.addEventListener('touchend', unlock)
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

/** Toate vocile pe care browserul le dă aplicației, fără niciun filtru (pentru diagnostic). */
export function allVoices(): SpeechSynthesisVoice[] {
  return synth?.getVoices() ?? []
}
