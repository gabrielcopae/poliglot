import { t, tc } from '../i18n'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Course, Reading } from '../content/types'
import { allLessons } from '../content'
import { useSettings } from '../settings'
import { speak, stopSpeaking } from '../speech'
import { SpeakButton } from './ui'

/** Dicționarul cursului: cuvânt (litere mici) → traducere. */
function courseDictionary(course: Course): Map<string, string> {
  const m = new Map<string, string>()
  for (const l of allLessons(course)) for (const w of l.words) m.set(w.t.toLowerCase().replace(/[¿?¡!…]/g, '').trim(), w.ro)
  return m
}

const WORD = /([\p{L}\p{M}’']+)/u

/** Grupează propozițiile unei povești în paragrafe (un paragraf nou începe la `br`). */
function paragraphs(reading: Reading) {
  const out: { line: Reading['lines'][number]; i: number }[][] = []
  reading.lines.forEach((line, i) => {
    if (!out.length || line.br) out.push([])
    out[out.length - 1].push({ line, i })
  })
  return out
}

export function countWords(reading: Reading) {
  return reading.lines.reduce((n, l) => n + l.t.split(/\s+/).filter(Boolean).length, 0)
}

/**
 * Textul unui capitol „ca pe CD”: redare replică cu replică, cu evidențiere,
 * traducere la cerere și traducerea oricărui cuvânt atins.
 */
export function Reader({ reading, course }: { reading: Reading; course: Course }) {
  const settings = useSettings()
  const dict = useMemo(() => courseDictionary(course), [course])
  const [showAllRo, setShowAllRo] = useState(false)
  const [openRo, setOpenRo] = useState<Set<number>>(new Set())
  const [playing, setPlaying] = useState<number | null>(null)
  const [slow, setSlow] = useState(false)
  const [gloss, setGloss] = useState<{ word: string; meaning?: string } | null>(null)
  const run = useRef(0)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => () => { run.current++; stopSpeaking() }, [])

  const play = (from: number, all: boolean) => {
    const id = ++run.current
    const step = (k: number) => {
      if (id !== run.current) return
      if (k >= reading.lines.length) { setPlaying(null); return }
      const line = reading.lines[k]
      setPlaying(k)
      lineRefs.current[k]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      speak(line.t, course.lang, course.locale, slow ? 0.65 : undefined, {
        gender: line.who ? reading.cast?.[line.who] : reading.cast ? Object.values(reading.cast)[0] : undefined,
        onEnd: () => {
          if (id !== run.current) return
          if (!all) { setPlaying(null); return }
          setTimeout(() => step(k + 1), 450)
        },
      })
    }
    step(from)
  }

  const stop = () => { run.current++; stopSpeaking(); setPlaying(null) }

  const lookup = (word: string) => {
    const key = word.toLowerCase()
    setGloss({ word, meaning: reading.gloss?.[key] ?? dict.get(key) })
  }

  const toggleRo = (i: number) =>
    setOpenRo((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })

  const speakers = Object.keys(reading.cast ?? {})

  return (
    <div className="reader">
      <div className="reader-controls">
        {playing === null ? (
          <button className="btn primary" onClick={() => play(0, true)}>▶ {t('Ascultă tot')}</button>
        ) : (
          <button className="btn primary" onClick={stop}>■ {t('Oprește')}</button>
        )}
        <button className={`btn ${slow ? 'on' : ''}`} onClick={() => setSlow((x) => !x)}>🐢 {slow ? t('Rar') : t('Normal')}</button>
        <button className={`btn ${showAllRo ? 'on' : ''}`} onClick={() => setShowAllRo((x) => !x)}>🌐 {showAllRo ? t('Ascunde') : t('Traducere')}</button>
      </div>
      {reading.kind === 'story' ? (
        <>
          <p className="muted small">{t('~{n} de cuvinte. Atinge o propoziție ca s-o asculți, sau un cuvânt ca să vezi ce înseamnă.', { n: countWords(reading) })}</p>
          <div className={`story ${course.lang === 'ja' ? 'jp' : ''}`}>
            {paragraphs(reading).map((para, pi) => (
              <div key={pi} className="story-para">
                <p>
                  {para.map(({ line, i }) => (
                    <span
                      key={i}
                      ref={(el) => { lineRefs.current[i] = el as unknown as HTMLDivElement }}
                      className={`sline ${playing === i ? 'playing' : ''}`}
                      onClick={() => play(i, false)}
                    >
                      {line.t.split(WORD).map((p, j) =>
                        WORD.test(p) ? (
                          <span key={j} className="rword" onClick={(e) => { e.stopPropagation(); lookup(p) }}>{p}</span>
                        ) : (
                          <span key={j}>{p}</span>
                        ),
                      )}{' '}
                    </span>
                  ))}
                </p>
                {settings.romaji && para.some(({ line }) => line.r) && <p className="romaji">{para.map(({ line }) => line.r).join(' ')}</p>}
                {showAllRo && <p className="story-ro">{para.map(({ line }) => tc(line.ro)).join(' ')}</p>}
              </div>
            ))}
          </div>
        </>
      ) : (
      <>
      <p className="muted small">{t('Atinge o replică ca s-o asculți. Atinge un cuvânt ca să vezi ce înseamnă.')}</p>
      <div className="reader-lines">
        {reading.lines.map((line, i) => {
          const parts = line.t.split(WORD)
          const side = line.who && speakers.indexOf(line.who) % 2 === 1 ? 'right' : 'left'
          return (
            <div
              key={i}
              ref={(el) => { lineRefs.current[i] = el }}
              className={`rline ${line.who ? 'bubble ' + side : ''} ${playing === i ? 'playing' : ''}`}
              onClick={() => play(i, false)}
            >
              {line.who && <div className="who">{line.who}</div>}
              <div className={`rtext ${course.lang === 'ja' ? 'jp' : ''}`}>
                {parts.map((p, j) =>
                  WORD.test(p) ? (
                    <span key={j} className="rword" onClick={(e) => { e.stopPropagation(); lookup(p) }}>{p}</span>
                  ) : (
                    <span key={j}>{p}</span>
                  ),
                )}
              </div>
              {line.r && settings.romaji && <div className="romaji">{line.r}</div>}
              {showAllRo || openRo.has(i) ? (
                <div className="rro">{tc(line.ro)}</div>
              ) : (
                <button className="rro-btn" onClick={(e) => { e.stopPropagation(); toggleRo(i) }}>{t('traducere')}</button>
              )}
            </div>
          )
        })}
      </div>
      </>
      )}
      {gloss && (
        <div className="gloss" onClick={() => setGloss(null)}>
          <SpeakButton text={gloss.word} lang={course.lang} small />
          <div>
            <b>{gloss.word}</b>
            <div>{gloss.meaning ? tc(gloss.meaning) : t('Cuvânt nou. Vezi traducerea replicii.')}</div>
          </div>
          <span className="gloss-x">✕</span>
        </div>
      )}
    </div>
  )
}
