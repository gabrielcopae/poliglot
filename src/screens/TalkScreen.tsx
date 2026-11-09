import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES, getCourse } from '../content'
import { TALKS, type Talk, type TalkLine } from '../content/talks'
import type { LangCode } from '../content/types'
import { db } from '../db'
import type { Go } from '../nav'
import { useSettings } from '../settings'
import { speak, stopSpeaking } from '../speech'

const stars = (score: number) => (score >= 90 ? '⭐⭐⭐' : score >= 60 ? '⭐⭐' : '⭐')

/** Lista conversațiilor, pe limbi. */
export function TalksScreen({ go, back }: { go: Go; back: () => void }) {
  const done = useLiveQuery(() => db.talks.toArray(), [], [])
  const best = new Map(done.map((d) => [d.id, d.best]))
  const langs = COURSES.filter((c) => TALKS.some((t) => t.lang === c.lang))
  const [lang, setLang] = useState<LangCode>(langs[0]?.lang ?? 'es')
  return (
    <div className="screen">
      <TopBar title="💬 Conversează cu personajele" onBack={back} />
      <div className="segmented">
        {langs.map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => setLang(c.lang)}><Flag lang={c.lang} size={16} /> {c.name}</button>
        ))}
      </div>
      <p className="muted small">Personajul îți vorbește, tu alegi răspunsul potrivit. Dacă greșești, personajul reacționează și îți explică. Încearcă să termini fără greșeli pentru trei stele.</p>
      {TALKS.filter((t) => t.lang === lang).map((t) => (
        <button key={t.id} className="card talk-card" onClick={() => go({ name: 'talk', id: t.id })}>
          <span className="talk-emoji">{t.emoji}</span>
          <span className="session-body">
            <b>{t.title}</b>
            <small>{t.npc.emoji} {t.npc.name} · recomandat după {t.afterLabel}</small>
          </span>
          <span className="talk-best">{best.has(t.id) ? stars(best.get(t.id)!) : '▶'}</span>
        </button>
      ))}
    </div>
  )
}

interface Msg { from: 'npc' | 'me' | 'wrong'; line: TalkLine; tip?: string }

/** O conversație: replici în bule, alegeri jos. */
export function TalkScreen({ id, back }: { id: string; back: () => void }) {
  const talk = TALKS.find((t) => t.id === id) as Talk
  const course = getCourse(talk.lang)
  const settings = useSettings()
  const [node, setNode] = useState(talk.start)
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'npc', line: talk.nodes[talk.start].npc }])
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [finished, setFinished] = useState<number | null>(null)
  const [showRo, setShowRo] = useState<Set<number>>(new Set())
  const [tried, setTried] = useState<Set<string>>(new Set())
  const end = useRef<HTMLDivElement>(null)

  const say = (line: TalkLine, who: 'npc' | 'me') => speak(line.t, talk.lang, course.locale, undefined, who === 'npc' ? { gender: talk.npc.gender } : {})

  useEffect(() => {
    if (settings.autoplay) say(talk.nodes[talk.start].npc, 'npc')
    return () => stopSpeaking()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs, finished])

  // Ordinea variantelor e amestecată, dar stabilă pentru fiecare pas
  const choices = useMemo(() => {
    const cs = [...talk.nodes[node].choices]
    let h = 0
    for (const ch of node + talk.id) h = (h * 31 + ch.charCodeAt(0)) | 0
    return cs.sort((a, b) => ((a.t.length * 7 + h) % 5) - ((b.t.length * 7 + h) % 5))
  }, [node, talk])

  const pick = async (i: number) => {
    const c = choices[i]
    if (!c.ok) {
      setMissed((m) => new Set(m).add(node))
      setTried((t) => new Set(t).add(node + '|' + c.t))
      setMsgs((m) => [...m, { from: 'wrong', line: c }, { from: 'npc', line: c.react ?? { t: '…', ro: '…' }, tip: c.tip }])
      if (c.react) say(c.react, 'npc')
      return
    }
    if (c.next) {
      const nx = talk.nodes[c.next]
      setMsgs((m) => [...m, { from: 'me', line: c }, { from: 'npc', line: nx.npc }])
      setNode(c.next)
      say(nx.npc, 'npc')
      return
    }
    setMsgs((m) => [...m, { from: 'me', line: c }, { from: 'npc', line: talk.end }])
    say(talk.end, 'npc')
    const total = Object.keys(talk.nodes).length
    const score = Math.round(((total - missed.size) / total) * 100)
    setFinished(score)
    const prev = await db.talks.get(talk.id)
    await db.talks.put({ id: talk.id, lang: talk.lang, best: Math.max(prev?.best ?? 0, score), times: (prev?.times ?? 0) + 1, at: Date.now() })
  }

  const restart = () => {
    setNode(talk.start); setMissed(new Set()); setFinished(null); setShowRo(new Set()); setTried(new Set())
    setMsgs([{ from: 'npc', line: talk.nodes[talk.start].npc }])
    say(talk.nodes[talk.start].npc, 'npc')
  }

  const jp = talk.lang === 'ja'
  return (
    <div className="screen talk-screen">
      <TopBar title={<>{talk.emoji} {talk.title}</>} onBack={back} />
      <p className="muted small talk-intro">{talk.intro}</p>
      <div className="chat">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble-row ${m.from}`}>
            {m.from === 'npc' && <span className="bubble-avatar">{talk.npc.emoji}</span>}
            <div className="bubble-wrap">
              <button className={`bubble ${m.from}`} onClick={() => say(m.line, m.from === 'npc' ? 'npc' : 'me')}>
                <span className={jp ? 'jp' : ''}>{m.line.t}</span>
                {jp && settings.romaji && m.line.r && <small className="bubble-r">{m.line.r}</small>}
                {showRo.has(i) && <small className="bubble-ro">{m.line.ro}</small>}
              </button>
              <div className="bubble-tools">
                <button onClick={() => setShowRo((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })}>RO</button>
                {m.tip && <span className="bubble-tip">💡 {m.tip}</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={end} />
      </div>

      {finished === null ? (
        <div className="talk-choices">
          <div className="muted small">Ce răspunzi?</div>
          {choices.map((c, i) => (
            <div key={node + i} className="talk-choice">
              <button className={`option ${tried.has(node + '|' + c.t) ? 'tried' : ''}`} disabled={tried.has(node + '|' + c.t)} onClick={() => pick(i)}>
                <span className={jp ? 'jp' : ''}>{c.t}</span>
                {jp && settings.romaji && c.r && <small className="bubble-r">{c.r}</small>}
              </button>
              <button className="icon-btn" onClick={() => say(c, 'me')} aria-label="Ascultă">🔊</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card talk-done">
          <div className="done-emoji">{stars(finished)}</div>
          <b>{finished === 100 ? 'Perfect, fără nicio greșeală!' : `Ai terminat conversația: ${finished}%`}</b>
          <small className="muted">{missed.size ? `Ai greșit la ${missed.size} ${missed.size === 1 ? 'pas' : 'pași'}. Încearcă din nou pentru trei stele.` : 'Ai vorbit ca un localnic.'}</small>
          <div className="course-actions">
            <button className="btn primary" onClick={restart}>↻ Încă o dată</button>
            <button className="btn" onClick={back}>Înapoi</button>
          </div>
        </div>
      )}
    </div>
  )
}
