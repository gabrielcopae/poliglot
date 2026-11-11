import { t, tc } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES, getCourse } from '../content'
import KANJI from '../content/kanji-data.json'
import type { LangCode } from '../content/types'
import { db } from '../db'
import { localGet, localSet } from '../settings'
import { speak } from '../speech'
import { shuffle } from '../util'

const PAIRS = 6

interface Tile { id: number; pair: number; text: string; side: 'word' | 'ro'; say?: string }

/** Perechile: cuvintele din capitolele începute (sau primele lecții), ori kanji ↔ sens la japoneză. */
function pool(lang: LangCode, mode: 'words' | 'kanji', started: Set<string>) {
  if (mode === 'kanji') return (KANJI as { char: string; meaning: string; ex: string }[]).map((k) => ({ t: k.char, ro: tc(k.meaning.split(';')[0]), say: k.ex }))
  const lessons = getCourse(lang).units.flatMap((u) => u.lessons)
  const seen = lessons.filter((l) => started.has(l.id))
  const use = seen.length ? seen : lessons.slice(0, 2)
  return use.flatMap((l) => l.words).filter((w) => w.t.length <= 22 && w.ro.length <= 26).map((w) => ({ t: w.t, ro: tc(w.ro), say: w.t }))
}

function deal(lang: LangCode, mode: 'words' | 'kanji', started: Set<string>): Tile[] {
  const picked = shuffle(pool(lang, mode, started)).filter((x, i, a) => a.findIndex((y) => y.ro === x.ro || y.t === x.t) === i).slice(0, PAIRS)
  return shuffle(picked.flatMap((p, i) => [
    { id: i * 2, pair: i, text: p.t, side: 'word' as const, say: p.say },
    { id: i * 2 + 1, pair: i, text: p.ro, side: 'ro' as const },
  ]))
}

export function PairsScreen({ back }: { back: () => void }) {
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const lessons = useLiveQuery(() => db.lessons.toArray(), [], [])
  const started = useMemo(() => new Set([...chapters.map((c) => c.id), ...lessons.map((l) => l.id)]), [chapters, lessons])
  const [lang, setLang] = useState<LangCode>('es')
  const [mode, setMode] = useState<'words' | 'kanji'>('words')
  const [round, setRound] = useState(0)
  const tiles = useMemo(() => deal(lang, mode, started), [lang, mode, round, started.size]) // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState<number[]>([])
  const [done, setDone] = useState<Set<number>>(new Set())
  const [moves, setMoves] = useState(0)
  const [t0, setT0] = useState(Date.now())
  const [secs, setSecs] = useState(0)
  const key = `poliglot.pairsBest.${lang}.${mode}`
  const best = Number(localGet(key) ?? 0)
  const won = done.size === PAIRS

  useEffect(() => { setOpen([]); setDone(new Set()); setMoves(0); setT0(Date.now()); setSecs(0) }, [lang, mode, round])
  useEffect(() => {
    if (won) return
    const timer = setInterval(() => setSecs(Math.round((Date.now() - t0) / 1000)), 500)
    return () => clearInterval(timer)
  }, [t0, won])
  useEffect(() => {
    if (won && (!best || moves < best)) localSet(key, String(moves))
  }, [won]) // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (tile: Tile) => {
    if (open.length === 2 || open.includes(tile.id) || done.has(tile.pair)) return
    if (tile.side === 'word' && tile.say) speak(tile.say, mode === 'kanji' ? 'ja' : lang, mode === 'kanji' ? 'ja-JP' : getCourse(lang).locale)
    const next = [...open, tile.id]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next.map((id) => tiles.find((x) => x.id === id)!)
      if (a.pair === b.pair) {
        setTimeout(() => { setDone((d) => new Set(d).add(a.pair)); setOpen([]) }, 350)
      } else {
        setTimeout(() => setOpen([]), 900)
      }
    }
  }

  const jp = lang === 'ja' || mode === 'kanji'
  return (
    <div className="screen">
      <TopBar title={`🧩 ${t('Perechi')}`} onBack={back} />
      <div className="segmented">
        {COURSES.map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => { setLang(c.lang); if (c.lang !== 'ja') setMode('words') }}><Flag lang={c.lang} size={16} /> {t(c.name)}</button>
        ))}
      </div>
      {lang === 'ja' && (
        <div className="segmented">
          <button className={mode === 'words' ? 'on' : ''} onClick={() => setMode('words')}>{t('Cuvinte')}</button>
          <button className={mode === 'kanji' ? 'on' : ''} onClick={() => setMode('kanji')}>{t('Kanji ↔ sens')}</button>
        </div>
      )}
      <div className="pairs-stats">
        <span>🔁 {t('{n} mutări', { n: moves })}</span><span>⏱️ {secs} s</span><span>🏆 {t('record')}: {best || '—'}</span>
      </div>
      <div className="pairs-grid">
        {tiles.map((tile) => {
          const shown = open.includes(tile.id) || done.has(tile.pair)
          return (
            <button key={tile.id} className={`pair-tile ${shown ? 'shown' : ''} ${done.has(tile.pair) ? 'matched' : ''}`} onClick={() => tap(tile)}>
              <span className="pair-back">?</span>
              <span className={`pair-front ${tile.side === 'word' && jp ? 'jp' : ''} ${tile.side}`}>{tile.text}</span>
            </button>
          )
        })}
      </div>
      {won && (
        <div className="card pairs-won">
          <b>🎉 {t('Bravo! Ai găsit toate perechile în {n} mutări și {s} secunde.', { n: moves, s: secs })}</b>
          {(!best || moves < best) && <small>{t('Record nou!')}</small>}
          <button className="btn primary" onClick={() => setRound((r) => r + 1)}>↻ {t('Încă o rundă')}</button>
        </div>
      )}
      <p className="muted small center">{t('Cuvintele vin din capitolele pe care le-ai început. Atinge două cartonașe: cuvântul și traducerea lui.')}</p>
    </div>
  )
}
