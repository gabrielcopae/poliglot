import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState } from 'react'
import { TopBar } from '../components/ui'
import KANJI from '../content/kanji-data.json'
import { db } from '../db'
import type { Go } from '../nav'
import { speak } from '../speech'

export interface KanjiEntry { char: string; meaning: string; on: string; kun: string; ex: string; exRo: string; group: string; strokes: string[] }
const LIST = KANJI as KanjiEntry[]
const GROUPS = [...new Set(LIST.map((k) => k.group))]

/** Grila cu toate kanji, pe teme. */
export function KanjiListScreen({ go, back }: { go: Go; back: () => void }) {
  const rows = useLiveQuery(() => db.kanji.toArray(), [], [])
  const done = new Map(rows.map((r) => [r.id, r]))
  return (
    <div className="screen">
      <TopBar title="🖌️ Kanji cu degetul" onBack={back} />
      <p className="muted small">{done.size} din {LIST.length} kanji exersate. Atinge un kanji ca să vezi ordinea liniilor și să-l scrii cu degetul.</p>
      {GROUPS.map((g) => (
        <section key={g} className="kanji-group">
          <h3>{g}</h3>
          <div className="kanji-grid">
            {LIST.filter((k) => k.group === g).map((k) => {
              const r = done.get(k.char)
              return (
                <button key={k.char} className={`kanji-cell ${r ? (r.memory ? 'mastered' : 'practiced') : ''}`} onClick={() => go({ name: 'kanjiOne', char: k.char })}>
                  <span className="jp">{k.char}</span>
                  <small>{k.meaning.split(';')[0]}</small>
                </button>
              )
            })}
          </div>
        </section>
      ))}
      <p className="muted small center">Verde = exersat cu contur · auriu = scris din memorie. Liniile kanji: KanjiVG (Ulrich Apel și colaboratorii), licență CC BY-SA 3.0.</p>
    </div>
  )
}

type Pt = { x: number; y: number }
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y)

/** Un kanji: informații, animația ordinii liniilor și scrisul cu degetul. */
export function KanjiOneScreen({ char, go, back }: { char: string; go: Go; back: () => void }) {
  const idx = LIST.findIndex((k) => k.char === char)
  const k = LIST[idx]
  const [mode, setMode] = useState<'demo' | 'trace' | 'memory'>('demo')
  const [demoRun, setDemoRun] = useState(0)
  const [done, setDone] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [hint, setHint] = useState<number | null>(null)
  const [drawing, setDrawing] = useState<Pt[] | null>(null)
  const [finished, setFinished] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const guide = useRef<(SVGPathElement | null)[]>([])

  const reset = (m: typeof mode) => { setMode(m); setDone(0); setMistakes(0); setHint(null); setDrawing(null); setFinished(false); setDemoRun((r) => r + 1) }
  useEffect(() => { reset('demo') }, [char]) // eslint-disable-line react-hooks/exhaustive-deps

  const toSvg = (e: React.PointerEvent): Pt => {
    const r = svgRef.current!.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * 109, y: ((e.clientY - r.top) / r.height) * 109 }
  }

  const check = async (pts: Pt[]) => {
    const path = guide.current[done]
    if (!path || pts.length < 2) return
    const len = path.getTotalLength()
    const s = path.getPointAtLength(0), m = path.getPointAtLength(len / 2), e = path.getPointAtLength(len)
    let drawn = 0
    for (let i = 1; i < pts.length; i++) drawn += dist(pts[i - 1], pts[i])
    const mid = pts[Math.floor(pts.length / 2)]
    const tol = Math.max(16, Math.min(26, len * 0.35))
    const ok = dist(pts[0], s) < tol && dist(pts[pts.length - 1], e) < tol && dist(mid, m) < tol + 6 && drawn > len * 0.35
    if (!ok) {
      setMistakes((x) => x + 1)
      setHint(done)
      setTimeout(() => setHint(null), 1200)
      return
    }
    const n = done + 1
    setDone(n)
    if (n === k.strokes.length) {
      setFinished(true)
      const prev = await db.kanji.get(k.char)
      await db.kanji.put({
        id: k.char, times: (prev?.times ?? 0) + 1, best: Math.min(prev?.best ?? 99, mistakes),
        memory: !!prev?.memory || (mode === 'memory' && mistakes <= 1), at: Date.now(),
      })
    }
  }

  const onDown = (e: React.PointerEvent) => {
    if (mode === 'demo' || finished) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setDrawing([toSvg(e)])
  }
  const onMove = (e: React.PointerEvent) => { if (drawing) setDrawing([...drawing, toSvg(e)]) }
  const onUp = () => { if (drawing) { check(drawing); setDrawing(null) } }

  const showGuide = mode === 'trace' || mode === 'demo'
  return (
    <div className="screen">
      <TopBar title={<span className="jp">{k.char} · {k.meaning}</span>} onBack={back} />
      <div className="kanji-info card">
        <div className="kanji-readings">
          <div><small className="muted">ON (citire chineză)</small><b className="jp">{k.on}</b></div>
          {k.kun && <div><small className="muted">KUN (citire japoneză)</small><b className="jp">{k.kun}</b></div>}
          <div><small className="muted">{k.strokes.length} linii</small></div>
        </div>
        <button className="kanji-example" onClick={() => speak(k.ex, 'ja', 'ja-JP')}>🔊 <span className="jp">{k.ex}</span> · {k.exRo}</button>
      </div>

      <div className="segmented kanji-modes">
        <button className={mode === 'demo' ? 'on' : ''} onClick={() => reset('demo')}>▶ Ordinea liniilor</button>
        <button className={mode === 'trace' ? 'on' : ''} onClick={() => reset('trace')}>✍️ Cu contur</button>
        <button className={mode === 'memory' ? 'on' : ''} onClick={() => reset('memory')}>🧠 Din memorie</button>
      </div>

      <div className="kanji-pad">
        <svg ref={svgRef} viewBox="0 0 109 109" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <line x1="54.5" y1="0" x2="54.5" y2="109" className="kanji-cross" />
          <line x1="0" y1="54.5" x2="109" y2="54.5" className="kanji-cross" />
          {k.strokes.map((d, i) => (
            <path key={`g${i}`} ref={(el) => { guide.current[i] = el }} d={d} className={`kanji-guide ${showGuide ? '' : 'hidden'}`} />
          ))}
          {mode === 'demo' && k.strokes.map((d, i) => (
            <path key={`d${demoRun}-${i}`} d={d} pathLength={1} className="kanji-demo" style={{ animationDelay: `${i * 0.7}s` }} />
          ))}
          {mode !== 'demo' && k.strokes.slice(0, done).map((d, i) => <path key={`ok${i}`} d={d} className="kanji-done" />)}
          {hint !== null && <path key={`h${hint}-${mistakes}`} d={k.strokes[hint]} pathLength={1} className="kanji-hint" />}
          {mode === 'trace' && !finished && guide.current[done] && (() => {
            const p = guide.current[done]!.getPointAtLength(0)
            return <circle cx={p.x} cy={p.y} r="3.2" className="kanji-start" />
          })()}
          {drawing && <polyline points={drawing.map((p) => `${p.x},${p.y}`).join(' ')} className="kanji-ink" />}
        </svg>
      </div>

      {mode === 'demo' ? (
        <div className="course-actions kanji-actions">
          <button className="btn" onClick={() => setDemoRun((r) => r + 1)}>↻ Încă o dată</button>
          <button className="btn primary" onClick={() => reset('trace')}>✍️ Acum scrie tu</button>
        </div>
      ) : finished ? (
        <div className="card kanji-result">
          <b>{mistakes === 0 ? 'Perfect! 🎉' : `Gata! ${mistakes} ${mistakes === 1 ? 'greșeală' : 'greșeli'}.`}</b>
          <small className="muted">{mode === 'trace' ? 'Încearcă acum din memorie, fără contur.' : 'L-ai scris din memorie. Bravo!'}</small>
          <div className="course-actions kanji-actions">
            <button className="btn" onClick={() => reset(mode)}>↻ Încă o dată</button>
            {mode === 'trace' && <button className="btn primary" onClick={() => reset('memory')}>🧠 Din memorie</button>}
            {LIST[idx + 1] && <button className="btn primary" onClick={() => go({ name: 'kanjiOne', char: LIST[idx + 1].char })}>Următorul: <span className="jp">{LIST[idx + 1].char}</span> →</button>}
          </div>
        </div>
      ) : (
        <p className="muted small center">Linia {done + 1} din {k.strokes.length}{mode === 'trace' ? ' · începe de la punctul colorat' : ''}. Greșeli: {mistakes}.</p>
      )}
    </div>
  )
}
