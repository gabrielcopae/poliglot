import { t, tc, tn } from '../i18n'
import { useEffect, useMemo, useRef, useState } from 'react'
import { findLesson, getCourse } from '../content'
import type { Course, LangCode, Lesson, Word } from '../content/types'
import { bumpDay, db } from '../db'
import { buildExercises, checkTyped, type CheckResult, type Exercise } from '../exercises'
import { useSettings } from '../settings'
import { canListen, listen, speak } from '../speech'
import { addWords } from '../srs'
import { similarity } from '../util'
import { Progress, SpeakButton, TopBar } from '../components/ui'

type Phase = 'intro' | 'learn' | 'practice' | 'done'

export function LessonScreen({ lang, lessonId, back }: { lang: LangCode; lessonId: string; back: () => void }) {
  const course = getCourse(lang)
  const lesson = findLesson(course, lessonId)
  const [phase, setPhase] = useState<Phase>('intro')
  const [result, setResult] = useState<{ score: number; added: number } | null>(null)
  const settings = useSettings()
  const [round, setRound] = useState(0)
  const exercises = useMemo(
    () => (lesson ? buildExercises(course, lesson, { canListen: canListen(), romaji: settings.romaji }) : []),
    [round, lesson?.id], // eslint-disable-line react-hooks/exhaustive-deps
  )

  if (!lesson) return <div className="screen"><TopBar title={t('Lecție negăsită')} onBack={back} /></div>

  return (
    <div className="screen lesson">
      {phase === 'intro' && <LessonIntro course={course} lesson={lesson} back={back} onStart={() => setPhase('learn')} />}
      {phase === 'learn' && <Learn course={course} lesson={lesson} back={back} onDone={() => setPhase('practice')} />}
      {phase === 'practice' && (
        <Practice
          course={course}
          exercises={exercises}
          back={back}
          onDone={async (score) => {
            const prev = await db.lessons.get(lesson.id)
            await db.lessons.put({
              id: lesson.id,
              lang,
              best: Math.max(prev?.best ?? 0, score),
              times: (prev?.times ?? 0) + 1,
              completedAt: Date.now(),
            })
            const added = await addWords(lang, lesson.id, lesson.words.map((w) => w.id))
            await bumpDay({ lessons: 1, xp: 10 + Math.round(score * 20) })
            setResult({ score, added })
            setPhase('done')
          }}
        />
      )}
      {phase === 'done' && result && <Done lesson={lesson} result={result} back={back} retry={() => { setRound((r) => r + 1); setPhase('practice') }} />}
    </div>
  )
}

function LessonIntro({ course, lesson, back, onStart }: { course: Course; lesson: Lesson; back: () => void; onStart: () => void }) {
  return (
    <>
      <TopBar title={tc(lesson.title)} onBack={back} />
      <div className="card lesson-hero">
        <div className="lesson-emoji">{lesson.emoji}</div>
        <h2>{tc(lesson.title)}</h2>
        <p>{tc(lesson.goal)}</p>
        <p className="muted">{lesson.kind === 'kana' ? t('{n} semne și cuvinte noi', { n: lesson.words.length }) : t('{n} cuvinte noi', { n: lesson.words.length })}{lesson.sentences.length ? ` · ${t('{n} propoziții', { n: lesson.sentences.length })}` : ''}</p>
      </div>
      {lesson.grammar.map((g) => (
        <article key={g.title} className="card grammar">
          <h3>📖 {tc(g.title)}</h3>
          {g.body.map((p, i) => <p key={i}>{tc(p)}</p>)}
          {g.table && (
            <div className="table-wrap">
              <table>
                <thead><tr>{g.table[0].map((c, i) => <th key={i}>{tc(c)}</th>)}</tr></thead>
                <tbody>
                  {g.table.slice(1).map((row, i) => (
                    <tr key={i}>{row.map((c, j) => <td key={j}>{tc(c)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      ))}
      {lesson.sentences.length > 0 && (
        <article className="card">
          <h3>💬 {t('Propoziții din lecție')}</h3>
          <ul className="sentences">
            {lesson.sentences.map((s) => (
              <li key={s.t}>
                <SpeakButton text={s.t} lang={course.lang} small />
                <div><div className="target">{s.t}</div>{s.r && <div className="romaji">{s.r}</div>}<div className="muted">{tc(s.ro)}</div></div>
              </li>
            ))}
          </ul>
        </article>
      )}
      <div className="sticky-actions">
        <button className="btn primary big" onClick={onStart}>{t('Începe lecția →')}</button>
      </div>
    </>
  )
}

export function Learn({ course, lesson, back, onDone }: { course: Course; lesson: Lesson; back: () => void; onDone: () => void }) {
  const [i, setI] = useState(0)
  const settings = useSettings()
  const word = lesson.words[i]

  useEffect(() => {
    if (settings.autoplay) speak(word.t, course.lang, course.locale)
  }, [i]) // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => (i + 1 < lesson.words.length ? setI(i + 1) : onDone())

  return (
    <>
      <TopBar title={<Progress value={(i + 1) / lesson.words.length} />} onBack={back} />
      <div className="learn-label">{t('Cuvânt nou · {n} din {all}', { n: i + 1, all: lesson.words.length })}</div>
      <div className="card flash" key={word.id}>
        <div className={`flash-word ${course.lang === 'ja' ? 'jp' : ''}`}>{word.t}</div>
        {word.r && settings.romaji && <div className="romaji">{word.r}</div>}
        <div className="flash-ro">{tc(word.ro)}</div>
        {word.note && <div className="muted">{tc(word.note)}</div>}
        <div className="flash-audio">
          <SpeakButton text={word.t} lang={course.lang} />
          <SpeakButton text={word.t} lang={course.lang} slow />
          {canListen() && <MicCheck text={word.t} reading={word.r} course={course} compact />}
        </div>
      </div>
      <div className="sticky-actions">
        {i > 0 && <button className="btn" onClick={() => setI(i - 1)}>←</button>}
        <button className="btn primary big" onClick={next}>{i + 1 < lesson.words.length ? t('Următorul') : t('Spre exerciții →')}</button>
      </div>
    </>
  )
}

/** Un pas fără exerciții nu trebuie să blocheze ședința: trece direct mai departe. */
function EmptyPractice({ onDone }: { onDone: () => void }) {
  useEffect(() => { onDone() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function Practice({ course, exercises, back, onDone }: { course: Course; exercises: Exercise[]; back: () => void; onDone: (score: number) => void }) {
  const [queue, setQueue] = useState<Exercise[]>(exercises)
  const [pos, setPos] = useState(0)
  const [firstTry, setFirstTry] = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; note?: string; answer?: string; explain?: string } | null>(null)
  const missed = useRef(new Set<Exercise>())

  const ex = queue[pos]
  const total = exercises.length

  const answer = (res: CheckResult | boolean, correctAnswer?: string, speakText?: string) => {
    const ok = res === true || res === 'correct' || res === 'accent'
    if (ok && !missed.current.has(ex)) setFirstTry((n) => n + 1)
    if (!ok && !missed.current.has(ex)) {
      missed.current.add(ex)
      setQueue((q) => [...q, ex])
    }
    setFeedback({ ok, note: res === 'accent' ? t('Corect! Atenție la accente și articol.') : undefined, answer: ok ? undefined : correctAnswer, explain: ex.explain })
    if (speakText) speak(speakText, course.lang, course.locale)
  }

  const next = () => {
    setFeedback(null)
    if (pos + 1 >= queue.length) onDone(firstTry / total)
    else setPos(pos + 1)
  }

  const skip = () => { setFeedback(null); setQueue((q) => q.filter((e) => e !== ex)); if (pos >= queue.length - 1) onDone(firstTry / Math.max(1, total - 1)) }

  if (!ex) return <EmptyPractice onDone={() => onDone(1)} />

  return (
    <>
      <TopBar title={<Progress value={Math.min(pos, total) / total} />} onBack={back} />
      <div className="exercise" key={pos}>
        <div className="ex-label">{ex.label}</div>
        {ex.kind === 'choice' && <ChoiceEx ex={ex} course={course} locked={!!feedback} onAnswer={(opt) => answer(opt === ex.answer, ex.answer, ex.optionsTarget ? ex.answer : ex.speak)} />}
        {ex.kind === 'listen' && <ListenEx ex={ex} course={course} locked={!!feedback} onAnswer={(opt) => answer(opt === ex.answer, ex.answer)} />}
        {ex.kind === 'type' && <TypeEx ex={ex} course={course} locked={!!feedback} onAnswer={(v) => answer(checkTyped(v, ex.accepted), ex.answer, ex.speak)} />}
        {ex.kind === 'dictation' && <DictationEx ex={ex} course={course} locked={!!feedback} onAnswer={(v) => answer(checkTyped(v, ex.accepted), ex.answer)} />}
        {ex.kind === 'fill' && <FillEx ex={ex} course={course} locked={!!feedback} onAnswer={(v) => answer(checkTyped(v, ex.accepted), ex.answer, ex.speak)} />}
        {ex.kind === 'order' && <OrderEx ex={ex} locked={!!feedback} onAnswer={(parts) => answer(parts.join('|') === ex.answer.join('|'), ex.answer.join(ex.joiner), ex.speak)} />}
        {ex.kind === 'speak' && <SpeakEx ex={ex} course={course} locked={!!feedback} onAnswer={(ok) => answer(ok, ex.text)} onSkip={skip} />}
      </div>
      {feedback && (
        <div className={`feedback ${feedback.ok ? 'ok' : 'bad'}`}>
          <div>
            <b>{feedback.ok ? `✔ ${t('Excelent!')}` : `✘ ${t('Nu chiar')}`}</b>
            {feedback.note && <div>{feedback.note}</div>}
            {feedback.answer && <div>{t('Răspuns corect:')} <b>{feedback.answer}</b></div>}
            {feedback.explain && <div className="feedback-explain">💡 {feedback.explain}</div>}
          </div>
          <button className="btn primary" onClick={next} autoFocus>{t('Continuă')}</button>
        </div>
      )}
    </>
  )
}

function ChoiceEx({ ex, course, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'choice' }>; course: Course; locked: boolean; onAnswer: (o: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null)
  useEffect(() => { if (ex.speak) speak(ex.speak, course.lang, course.locale) }, [ex]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="ex-prompt">
        <span className={!ex.optionsTarget && course.lang === 'ja' ? 'jp big-jp' : ''}>{ex.prompt}</span>
        {ex.speak && <SpeakButton text={ex.speak} lang={course.lang} small />}
      </div>
      {ex.sub && <div className="romaji center">{ex.sub}</div>}
      <div className="options">
        {ex.options.map((o) => (
          <button
            key={o}
            disabled={locked}
            className={`option ${ex.optionsTarget && course.lang === 'ja' ? 'jp' : ''} ${locked && o === ex.answer ? 'right' : ''} ${locked && picked === o && o !== ex.answer ? 'wrong' : ''}`}
            onClick={() => { setPicked(o); onAnswer(o) }}
          >
            {o}
          </button>
        ))}
      </div>
    </>
  )
}

function ListenEx({ ex, course, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'listen' }>; course: Course; locked: boolean; onAnswer: (o: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null)
  useEffect(() => { speak(ex.speak, course.lang, course.locale) }, [ex]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="ex-listen">
        <button className="listen-big" onClick={() => speak(ex.speak, course.lang, course.locale)}>🔊</button>
        <button className="listen-slow" onClick={() => speak(ex.speak, course.lang, course.locale, 0.6)}>🐢</button>
      </div>
      <div className="options">
        {ex.options.map((o) => (
          <button
            key={o}
            disabled={locked}
            className={`option ${course.lang === 'ja' ? 'jp' : ''} ${locked && o === ex.answer ? 'right' : ''} ${locked && picked === o && o !== ex.answer ? 'wrong' : ''}`}
            onClick={() => { setPicked(o); onAnswer(o) }}
          >
            {o}
          </button>
        ))}
      </div>
    </>
  )
}

const SPECIAL: Record<string, string[]> = {
  es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
  it: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
  fr: ['é', 'è', 'ê', 'à', 'â', 'ç', 'ô', 'î', 'û', 'ù', 'ë', 'œ', '’'],
  ja: [],
}

function TypeEx({ ex, course, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'type' }>; course: Course; locked: boolean; onAnswer: (v: string) => void }) {
  const [v, setV] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { input.current?.focus() }, [])
  return (
    <form className="type-ex" onSubmit={(e) => { e.preventDefault(); if (v.trim() && !locked) onAnswer(v) }}>
      <div className={`ex-prompt ${course.lang === 'ja' && /[぀-ヿ]/.test(ex.prompt) ? 'jp big-jp' : ''}`}>{ex.prompt}</div>
      <input
        ref={input}
        value={v}
        onChange={(e) => setV(e.target.value)}
        disabled={locked}
        lang={course.lang}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('Scrie aici…')}
      />
      {SPECIAL[course.lang].length > 0 && (
        <div className="special">
          {SPECIAL[course.lang].map((c) => (
            <button type="button" key={c} onClick={() => { setV((x) => x + c); input.current?.focus() }}>{c}</button>
          ))}
        </div>
      )}
      <button className="btn primary big" disabled={locked || !v.trim()}>{t('Verifică')}</button>
    </form>
  )
}

function DictationEx({ ex, course, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'dictation' }>; course: Course; locked: boolean; onAnswer: (v: string) => void }) {
  const [v, setV] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { speak(ex.speak, course.lang, course.locale); input.current?.focus() }, [ex]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <form className="type-ex" onSubmit={(e) => { e.preventDefault(); if (v.trim() && !locked) onAnswer(v) }}>
      <div className="ex-listen">
        <button type="button" className="listen-big" onClick={() => speak(ex.speak, course.lang, course.locale)}>🔊</button>
        <button type="button" className="listen-slow" onClick={() => speak(ex.speak, course.lang, course.locale, 0.55)}>🐢</button>
      </div>
      <input
        ref={input}
        value={v}
        onChange={(e) => setV(e.target.value)}
        disabled={locked}
        lang={course.lang}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={t('Scrie ce auzi…')}
      />
      {SPECIAL[course.lang].length > 0 && (
        <div className="special">
          {SPECIAL[course.lang].map((c) => (
            <button type="button" key={c} onClick={() => { setV((x) => x + c); input.current?.focus() }}>{c}</button>
          ))}
        </div>
      )}
      <p className="muted small center">{t('Ascultă de câte ori ai nevoie. Punctuația nu contează.')}</p>
      <button className="btn primary big" disabled={locked || !v.trim()}>{t('Verifică')}</button>
    </form>
  )
}

function FillEx({ ex, course, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'fill' }>; course: Course; locked: boolean; onAnswer: (v: string) => void }) {
  const [v, setV] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { input.current?.focus() }, [])
  return (
    <form className="type-ex" onSubmit={(e) => { e.preventDefault(); if (v.trim() && !locked) onAnswer(v) }}>
      <div className="fill-line">
        <span>{ex.before}</span>
        <input
          ref={input}
          className="fill-input"
          value={v}
          onChange={(e) => setV(e.target.value)}
          disabled={locked}
          lang={course.lang}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          size={Math.max(4, ex.answer.length + 1)}
        />
        <span>{ex.after}</span>
      </div>
      {ex.ro && <div className="muted center">{ex.ro}</div>}
      {ex.hint && <div className="hint">{t('Indiciu:')} {ex.hint}</div>}
      {SPECIAL[course.lang].length > 0 && (
        <div className="special">
          {SPECIAL[course.lang].map((c) => (
            <button type="button" key={c} onClick={() => { setV((x) => x + c); input.current?.focus() }}>{c}</button>
          ))}
        </div>
      )}
      <button className="btn primary big" disabled={locked || !v.trim()}>{t('Verifică')}</button>
    </form>
  )
}

function OrderEx({ ex, locked, onAnswer }: { ex: Extract<Exercise, { kind: 'order' }>; locked: boolean; onAnswer: (p: string[]) => void }) {
  const [chosen, setChosen] = useState<number[]>([])
  const jp = ex.joiner === ''
  return (
    <>
      <div className="ex-prompt">{ex.prompt}</div>
      <div className={`order-line ${jp ? 'jp' : ''}`}>
        {chosen.map((ti) => (
          <button key={ti} className="token" disabled={locked} onClick={() => setChosen((c) => c.filter((x) => x !== ti))}>{ex.tokens[ti]}</button>
        ))}
        {!chosen.length && <span className="muted">{t('Atinge cuvintele în ordinea corectă')}</span>}
      </div>
      <div className={`order-bank ${jp ? 'jp' : ''}`}>
        {ex.tokens.map((tok, ti) => (
          <button key={ti} className={`token ${chosen.includes(ti) ? 'used' : ''}`} disabled={locked || chosen.includes(ti)} onClick={() => setChosen((c) => [...c, ti])}>{tok}</button>
        ))}
      </div>
      <button className="btn primary big" disabled={locked || chosen.length !== ex.tokens.length} onClick={() => onAnswer(chosen.map((i) => ex.tokens[i]))}>{t('Verifică')}</button>
    </>
  )
}

function SpeakEx({ ex, course, locked, onAnswer, onSkip }: { ex: Extract<Exercise, { kind: 'speak' }>; course: Course; locked: boolean; onAnswer: (ok: boolean) => void; onSkip: () => void }) {
  return (
    <>
      <div className="ex-prompt">
        <span className={course.lang === 'ja' ? 'jp' : ''}>{ex.text}</span>
        <SpeakButton text={ex.text} lang={course.lang} small />
      </div>
      {ex.sub && <div className="romaji center">{ex.sub}</div>}
      <div className="muted center">{ex.ro}</div>
      <MicCheck text={ex.text} reading={ex.sub} course={course} disabled={locked} onResult={(score) => onAnswer(score >= 0.7)} />
      {!locked && <button className="btn ghost" onClick={onSkip}>{t('Nu pot vorbi acum')}</button>}
    </>
  )
}

/** Ascultă utilizatorul și compară cu textul corect. */
export function MicCheck({ text, reading, course, compact, disabled, onResult }: {
  text: string; reading?: string; course: Course; compact?: boolean; disabled?: boolean; onResult?: (score: number) => void
}) {
  const [state, setState] = useState<'idle' | 'listening' | 'result' | 'error'>('idle')
  const [heard, setHeard] = useState('')
  const [score, setScore] = useState(0)
  const [err, setErr] = useState('')

  const start = async () => {
    setState('listening')
    try {
      const alts = await listen(course.locale).promise
      const scored = alts.map((a) => ({ a, s: Math.max(similarity(a, text), reading ? similarity(a, reading) : 0) }))
      const bestAlt = scored.sort((x, y) => y.s - x.s)[0] ?? { a: '', s: 0 }
      setHeard(bestAlt.a)
      setScore(bestAlt.s)
      setState('result')
      onResult?.(bestAlt.s)
    } catch (e) {
      setErr((e as Error).message)
      setState('error')
    }
  }

  const verdict = score >= 0.9 ? `🌟 ${t('Perfect!')}` : score >= 0.7 ? `👍 ${t('Foarte bine!')}` : score >= 0.45 ? `🙂 ${t('Aproape, mai încearcă')}` : `🔁 ${t('Mai încearcă')}`

  return (
    <div className={`mic ${compact ? 'compact' : ''}`}>
      <button className={`mic-btn ${state === 'listening' ? 'on' : ''}`} onClick={start} disabled={disabled || state === 'listening'} aria-label={t('Vorbește')}>
        🎤
      </button>
      {!compact && state === 'idle' && <div className="muted">{t('Apasă și spune propoziția')}</div>}
      {state === 'listening' && <div className="muted">{t('Te ascult…')}</div>}
      {state === 'result' && (
        <div className="mic-result">
          <b>{verdict}</b> <span className="muted">({Math.round(score * 100)}%)</span>
          <div className="muted">{t('Am auzit:')} „{heard}”</div>
        </div>
      )}
      {state === 'error' && <div className="mic-result bad">{err}</div>}
    </div>
  )
}

function Done({ lesson, result, back, retry }: { lesson: Lesson; result: { score: number; added: number }; back: () => void; retry: () => void }) {
  const pct = Math.round(result.score * 100)
  return (
    <div className="done">
      <div className="done-emoji">{pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '💪'}</div>
      <h2>{t('Lecție terminată!')}</h2>
      <p className="done-score">{t('{p}% corect din prima', { p: pct })}</p>
      <p className="muted">
        {result.added > 0 ? tn(result.added, '{n} cuvânt nou a intrat în repetiția ta.', '{n} cuvinte noi au intrat în repetiția ta.') : t('Cuvintele acestei lecții sunt deja în repetiție.')}
        {' '}{t('Le vei revedea exact când ești pe cale să le uiți.')}
      </p>
      <WordList words={lesson.words} />
      <div className="sticky-actions">
        <button className="btn" onClick={retry}>{t('Încă o dată')}</button>
        <button className="btn primary big" onClick={back}>{t('Gata →')}</button>
      </div>
    </div>
  )
}

function WordList({ words }: { words: Word[] }) {
  return (
    <div className="chips">
      {words.map((w) => <span key={w.id} className="chip">{w.t} · {tc(w.ro)}</span>)}
    </div>
  )
}
