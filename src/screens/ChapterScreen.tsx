import { t, tc, langWord } from '../i18n'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { allLessons, findLesson, getCourse } from '../content'
import type { Block, ChapterData, Course, Explain, Homework, LangCode, Lesson, Line, Reading } from '../content/types'
import { bumpDay, db, resetChapter, type HomeworkRow } from '../db'
import { drillToExercise, type Exercise } from '../exercises'
import type { Go } from '../nav'
import { canListen } from '../speech'
import { addWords } from '../srs'
import { shuffle } from '../util'
import { Reader } from '../components/Reader'
import { Progress, SpeakButton, TopBar } from '../components/ui'
import { Learn, MicCheck, Practice } from './LessonScreen'

function useChapter(lang: LangCode, lessonId: string) {
  const course = getCourse(lang)
  const lesson = findLesson(course, lessonId)
  return { course, lesson, ch: lesson?.chapter }
}

// ——— Pașii unei ședințe (folosiți și pentru cuprinsul capitolului) ———

type Step = { title: string; icon: string; own?: boolean; render: (next: () => void) => ReactNode }

function makeSteps(
  course: Course, lesson: Lesson, ch: ChapterData, session: 1 | 2, back: () => void, finishQuiz: (score: number) => void,
): Step[] {
  const earlier = previousChapters(course, lesson)
  const warmup: Step[] = []
  if (earlier.length) {
    const review = session === 1 ? buildWordReview(course, earlier) : buildGrammarReview(course, earlier)
    warmup.push({
      title: session === 1 ? t('Încălzire: cuvinte din capitolele trecute') : t('Încălzire: gramatica din capitolele trecute'),
      icon: '🔄', own: true,
      render: (next) => <Practice course={course} exercises={review} back={back} onDone={() => next()} />,
    })
  }
  if (session === 1) {
    const wordEx = buildWordExercises(course, lesson)
    const dictation = buildDictation(ch)
    return [
      { title: t('Ce vei învăța'), icon: '🎯', render: (next) => <Goals ch={ch} session={1} next={next} /> },
      ...warmup,
      { title: t('Dialogul capitolului'), icon: '💬', render: (next) => <DialogueStep ch={ch} course={course} next={next} /> },
      { title: t('Cuvinte noi'), icon: '📚', own: true, render: (next) => <Learn course={course} lesson={lesson} back={back} onDone={next} /> },
      { title: t('Exerciții cu cuvintele'), icon: '✏️', own: true, render: (next) => <Practice course={course} exercises={wordEx} back={back} onDone={() => next()} /> },
      { title: t('Pronunție'), icon: '👄', render: (next) => <PronStep ch={ch} course={course} next={next} /> },
      { title: t('Dictare din dialog'), icon: '🎧', own: true, render: (next) => <Practice course={course} exercises={dictation} back={back} onDone={() => next()} /> },
      ...storySteps(course, ch, back),
      { title: t('Dialogul, în rolul tău'), icon: '🎭', render: (next) => <DialogueReplay ch={ch} course={course} next={next} /> },
    ]
  }
  const drills = ch.drills.map((d) => drillToExercise(d, course))
  const dialogueEx = buildDialogueTranslation(course, ch)
  const quiz = ch.quiz.map((d) => drillToExercise(d, course))
  const reading: Step[] = ch.reading
    ? [
        { title: `${t('Lectură')}: ${tc(ch.reading.reading.title)}`, icon: '📰', render: (next) => <ReadingStep reading={ch.reading!.reading} course={course} next={next} /> },
        {
          title: t('Întrebări la lectură'), icon: '❓', own: true,
          render: (next) => <Practice course={course} exercises={ch.reading!.questions.map((d) => drillToExercise(d, course))} back={back} onDone={() => next()} />,
        },
      ]
    : []
  return [
    { title: t('Ce vei învăța'), icon: '🎯', render: (next) => <Goals ch={ch} session={2} next={next} /> },
    ...warmup,
    ...ch.explain.map((ex): Step => ({ title: tc(ex.title), icon: '📖', render: (next) => <ExplainStep ex={ex} course={course} next={next} /> })),
    { title: t('Exerciții de gramatică'), icon: '✏️', own: true, render: (next) => <Practice course={course} exercises={drills} back={back} onDone={() => next()} /> },
    ...reading,
    { title: t('Tradu replicile din dialog'), icon: '💬', own: true, render: (next) => <Practice course={course} exercises={dialogueEx} back={back} onDone={() => next()} /> },
    { title: t('Mini-test'), icon: '📝', render: (next) => <QuizIntro next={next} /> },
    { title: t('Mini-test: întrebările'), icon: '📝', own: true, render: () => <Practice course={course} exercises={quiz} back={back} onDone={finishQuiz} /> },
  ]
}

// ——— Prezentarea capitolului ———

export function ChapterOverview({ lang, lessonId, go, back }: { lang: LangCode; lessonId: string; go: Go; back: () => void }) {
  const { course, lesson, ch } = useChapter(lang, lessonId)
  const state = useLiveQuery(() => db.chapters.get(lessonId), [lessonId])
  const hw = useLiveQuery(() => db.homework.where('lessonId').equals(lessonId).toArray(), [lessonId], [])
  const lessonRow = useLiveQuery(() => db.lessons.get(lessonId), [lessonId])
  const toc = useMemo(
    () => (lesson && ch ? ([1, 2] as const).map((s) => makeSteps(course, lesson, ch, s, () => {}, () => {}).map((st) => ({ title: st.title, icon: st.icon }))) : [[], []]),
    [lessonId], // eslint-disable-line react-hooks/exhaustive-deps
  )
  if (!lesson || !ch) return null
  const hwDone = hw.filter((h) => h.done).length
  const started = !!(state?.s1 || state?.s2 || hwDone || lessonRow)

  const reset = async () => {
    const ok = window.confirm(
      t('Sigur iei Capitolul {n} de la capăt?\n\nSe șterg: ședințele bifate, scorul mini-testului, temele (inclusiv compunerile) și cuvintele acestui capitol din repetiție.', { n: ch.number }),
    )
    if (ok) await resetChapter(lang, lessonId)
  }

  return (
    <div className="screen">
      <TopBar title={t('Capitolul {n}', { n: ch.number })} onBack={back} />
      <div className="card lesson-hero">
        <div className="lesson-emoji">{lesson.emoji}</div>
        <h2>{tc(lesson.title)}</h2>
        <p>{tc(lesson.goal)}</p>
        <p className="muted small">{t('≈ 1 oră și 20 de minute: două ședințe de câte ~40 de minute, plus teme (~30 min)')}</p>
      </div>

      <article className="card">
        <h3>🎯 {t('La finalul capitolului vei ști:')}</h3>
        <ul className="goals">{ch.goals.map((g) => <li key={g}>{tc(g)}</li>)}</ul>
      </article>

      <div className="session-list">
        <SessionCard
          n="1" title={t('Ședința {n}', { n: 1 })} detail={t('Dialog cu audio · cuvinte noi · exerciții · pronunție · dictare · joc de rol')} minutes={40}
          done={!!state?.s1}
          onClick={() => go({ name: 'session', lang, lessonId, session: 1, fromChapter: true })}
        />
        <SessionCard
          n="2" title={t('Ședința {n}', { n: 2 })} detail={t('Gramatica pe înțelesul tuturor · exerciții · traduceri din dialog · mini-test')} minutes={40}
          done={!!state?.s2}
          extra={lessonRow ? `${t('Mini-test')}: ${Math.round(lessonRow.best * 100)}%` : undefined}
          onClick={() => go({ name: 'session', lang, lessonId, session: 2, fromChapter: true })}
        />
        <SessionCard
          n="✎" title={t('Teme pentru acasă')} detail={t('{n} teme · exerciții, traduceri, text de citit cu audio, compunere', { n: ch.homework.length })} minutes={30}
          done={hwDone === ch.homework.length}
          extra={t('{n} / {all} făcute', { n: hwDone, all: ch.homework.length })}
          onClick={() => go({ name: 'homework', lang, lessonId })}
        />
      </div>

      <article className="card toc">
        <h3>📑 {t('Cuprins')}</h3>
        <p className="muted small">{t('După ce termini o ședință, poți sări direct la orice parte a ei.')}</p>
        {([1, 2] as const).map((s) => {
          const done = s === 1 ? !!state?.s1 : !!state?.s2
          return (
            <div key={s} className="toc-group">
              <div className="toc-head">{t('Ședința {n}', { n: s })} {done ? '✓' : `· ${t('se deblochează după ce o termini')}`}</div>
              {toc[s - 1].map((st, k) =>
                k === 0 || st.title === t('Mini-test') ? null : (
                  <button key={k} className="toc-item" disabled={!done} onClick={() => go({ name: 'session', lang, lessonId, session: s, step: k, fromChapter: true })}>
                    <span>{done ? st.icon : '🔒'}</span>
                    <span className="toc-title">{st.title}</span>
                    <span className="toc-go">→</span>
                  </button>
                ),
              )}
            </div>
          )
        })}
      </article>

      {started && (
        <button className="btn danger" onClick={reset}>↺ {t('Ia capitolul de la capăt (șterge progresul)')}</button>
      )}
      <p className="muted small center">{t('Recomandat: Ședința 1 → Ședința 2 → Teme, în 2–3 zile.')}</p>
    </div>
  )
}

function SessionCard({ n, title, detail, minutes, done, extra, onClick }: {
  n: string; title: string; detail: string; minutes: number; done: boolean; extra?: string; onClick: () => void
}) {
  return (
    <button className={`card session-card ${done ? 'done' : ''}`} onClick={onClick}>
      <span className="session-n">{done ? '✓' : n}</span>
      <span className="session-body">
        <b>{title}</b>
        <small>{detail}</small>
        {extra && <small className="session-extra">{extra}</small>}
      </span>
      <span className="session-min">~{minutes} min</span>
    </button>
  )
}

// ——— O ședință: pași succesivi ———

export function SessionScreen({ lang, lessonId, session, startStep, back, toChapter }: {
  lang: LangCode; lessonId: string; session: 1 | 2; startStep?: number; back: () => void; toChapter: () => void
}) {
  const { course, lesson, ch } = useChapter(lang, lessonId)
  const [i, setI] = useState(startStep ?? 0)
  // fără pas cerut explicit, ședința continuă de unde ai rămas
  const [ready, setReady] = useState(startStep !== undefined)
  const [finished, setFinished] = useState<{ score?: number } | null>(null)
  const stepKey = session === 1 ? 's1Step' : 's2Step'

  const steps = useMemo<Step[]>(
    () => (lesson && ch ? makeSteps(course, lesson, ch, session, back, (score) => finish(score)) : []),
    [lessonId, session], // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    if (ready) return
    db.chapters.get(lessonId).then((row) => {
      const saved = row?.[stepKey]
      const doneBefore = session === 1 ? row?.s1 : row?.s2
      if (!doneBefore && saved && saved < steps.length) setI(saved)
      setReady(true)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ready || finished) return
    db.chapters.get(lessonId).then((row) => db.chapters.put({ id: lessonId, lang, ...row, [stepKey]: i }))
  }, [i, ready]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson || !ch || !ready) return null

  async function finish(score?: number) {
    const prev = await db.chapters.get(lessonId)
    const already = session === 1 ? !!prev?.s1 : !!prev?.s2
    if (session === 1) {
      await db.chapters.put({ id: lessonId, lang, ...prev, s1: prev?.s1 ?? Date.now(), s1Step: 0 })
      await addWords(lang, lessonId, lesson!.words.map((w) => w.id))
      if (!already) await bumpDay({ lessons: 1, xp: 25 })
    } else {
      await db.chapters.put({ id: lessonId, lang, ...prev, s2: prev?.s2 ?? Date.now(), s2Step: 0 })
      if (score !== undefined) {
        const row = await db.lessons.get(lessonId)
        await db.lessons.put({ id: lessonId, lang, best: Math.max(row?.best ?? 0, score), times: (row?.times ?? 0) + 1, completedAt: Date.now() })
      }
      if (!already) await bumpDay({ lessons: 1, xp: 25 + Math.round((score ?? 0) * 20) })
    }
    setFinished({ score })
  }

  const next = () => (i + 1 < steps.length ? (setI(i + 1), window.scrollTo(0, 0)) : finish())

  if (finished) {
    return (
      <div className="screen done">
        <div className="done-emoji">{session === 1 ? '🎧' : (finished.score ?? 0) >= 0.75 ? '🏆' : '💪'}</div>
        <h2>{t('Ședința {n} terminată!', { n: session })}</h2>
        {session === 1 ? (
          <p>{t('Cele {n} cuvinte noi sunt în repetiție. Mâine (sau după o pauză) continuă cu Ședința 2: gramatica.', { n: lesson.words.length })}</p>
        ) : finished.score !== undefined ? (
          <>
            <p className="done-score">{t('Mini-test')}: {Math.round(finished.score * 100)}%</p>
            <p className="muted">{finished.score >= 0.75 ? t('Foarte bine! Acum fă temele, apoi treci la capitolul următor.') : t('E în regulă! Recitește gramatica și fă temele. Le poți relua oricând.')}</p>
          </>
        ) : null}
        <div className="sticky-actions">
          <button className="btn primary big" onClick={toChapter}>{t('Înapoi la capitol →')}</button>
        </div>
      </div>
    )
  }

  const step = steps[Math.min(i, steps.length - 1)]
  return (
    <div className="screen session" key={i}>
      {!step.own && <TopBar title={<Progress value={(i + 1) / steps.length} />} onBack={back} />}
      {!step.own && <div className="learn-label">{t('Ședința {n}', { n: session })} · {t('pasul {n} din {all}', { n: i + 1, all: steps.length })} · {step.title}</div>}
      {step.render(next)}
    </div>
  )
}

/** „Povestea capitolului”: textul narativ lung + întrebări. */
function storySteps(course: Course, ch: ChapterData, back: () => void): Step[] {
  if (!ch.story) return []
  const story = ch.story
  return [
    { title: `${t('Povestea capitolului')}: ${tc(story.reading.title)}`, icon: '📖', render: (next) => <ReadingStep reading={story.reading} course={course} next={next} /> },
    { title: t('Întrebări la poveste'), icon: '❓', own: true, render: (next) => <Practice course={course} exercises={story.questions.map((d) => drillToExercise(d, course))} back={back} onDone={() => next()} /> },
  ]
}

function previousChapters(course: Course, lesson: Lesson): Lesson[] {
  const all = allLessons(course)
  return all.slice(0, all.findIndex((l) => l.id === lesson.id)).filter((l) => l.chapter)
}

/** Recapitulare de cuvinte: mai multe din capitolul imediat anterior, câteva din cele mai vechi. */
function buildWordReview(course: Course, earlier: Lesson[]): Exercise[] {
  const recent = earlier[earlier.length - 1].words
  const older = earlier.slice(0, -1).flatMap((l) => l.words)
  const picked = [...shuffle(recent).slice(0, 5), ...shuffle(older).slice(0, 5)]
  const pool = earlier.flatMap((l) => l.words)
  return shuffle(picked).map((w, k) => {
    const others = shuffle(pool.filter((x) => x.ro !== w.ro)).slice(0, 3)
    return k % 3 === 2
      ? { kind: 'type', label: t('Îți amintești? Scrie în {lang}', { lang: langWord(course.name) }), prompt: tc(w.ro), accepted: [w.t, ...(w.alt ?? [])], answer: w.t, speak: w.t }
      : { kind: 'choice', label: t('Îți amintești? Ce înseamnă?'), prompt: w.t, speak: w.t, options: shuffle([w.ro, ...others.map((o) => o.ro)].map(tc)), answer: tc(w.ro), optionsTarget: false }
  })
}

/** Recapitulare de gramatică: exerciții alese din capitolele trecute. */
function buildGrammarReview(course: Course, earlier: Lesson[]): Exercise[] {
  const recent = earlier[earlier.length - 1].chapter!
  const older = earlier.slice(0, -1).flatMap((l) => [...l.chapter!.drills, ...l.chapter!.quiz])
  return [...shuffle(recent.drills).slice(0, 3), ...shuffle(older).slice(0, 4)].map((d) => ({ ...drillToExercise(d, course), label: `${t('Recapitulare')} · ${drillToExercise(d, course).label}` }))
}

function ReadingStep({ reading, course, next }: { reading: Reading; course: Course; next: () => void }) {
  return (
    <>
      <article className="card">
        <h3>{reading.kind === 'story' ? '📖' : '📰'} {tc(reading.title)}</h3>
        {reading.intro && <p className="muted">{tc(reading.intro)}</p>}
        <p className="small"><b>{t('Cum lucrezi:')}</b> {t('1) ascultă tot textul fără traducere; 2) citește-l cu voce tare; 3) atinge cuvintele necunoscute; 4) abia apoi verifică traducerea. Urmează întrebări despre text.')}</p>
      </article>
      <Reader reading={reading} course={course} />
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Am citit → Întrebări')}</button></div>
    </>
  )
}

/** Toate cuvintele capitolului, plus scriere și ordonare de propoziții. */
function buildWordExercises(course: Course, lesson: Lesson): Exercise[] {
  const ex: Exercise[] = shuffle(lesson.words).map((w, k) => {
    const others = shuffle(lesson.words.filter((x) => x.id !== w.id)).slice(0, 3)
    if (k % 3 === 0) return { kind: 'listen', label: t('Ce ai auzit?'), speak: w.t, options: shuffle([w.t, ...others.map((o) => o.t)]), answer: w.t }
    if (k % 3 === 1) return { kind: 'choice', label: t('Ce înseamnă?'), prompt: w.t, speak: w.t, options: shuffle([w.ro, ...others.map((o) => o.ro)].map(tc)), answer: tc(w.ro), optionsTarget: false }
    return { kind: 'choice', label: t('Cum se spune în {lang}?', { lang: langWord(course.name) }), prompt: tc(w.ro), options: shuffle([w.t, ...others.map((o) => o.t)]), answer: w.t, optionsTarget: true }
  })
  for (const w of shuffle(lesson.words).slice(0, 5)) {
    ex.push({ kind: 'type', label: t('Scrie în {lang}', { lang: langWord(course.name) }), prompt: tc(w.ro), accepted: [w.t, ...(w.r ? [w.r] : []), ...(w.alt ?? [])], answer: w.t, speak: w.t })
  }
  for (const sn of shuffle(lesson.sentences).slice(0, 3)) {
    ex.push({ kind: 'order', label: t('Formează propoziția'), prompt: tc(sn.ro), tokens: shuffle(sn.t.split(' ')), answer: sn.t.split(' '), joiner: ' ', speak: sn.t })
  }
  return ex
}

/** Replicile scurte din dialog; dacă sunt prea puține, cele mai scurte disponibile. */
const shortLines = (ch: ChapterData, max: number) => {
  const words = (t: string) => t.split(' ').length
  const short = ch.dialogue.lines.filter((l) => words(l.t) <= max)
  if (short.length >= 5) return short
  return [...ch.dialogue.lines].sort((a, b) => words(a.t) - words(b.t)).slice(0, 8)
}

/** Dictare: asculți o replică din dialog și o scrii. */
function buildDictation(ch: ChapterData): Exercise[] {
  return shuffle(shortLines(ch, 7)).slice(0, 5).map((l) => ({
    kind: 'dictation', label: t('Dictare: scrie ce auzi'), speak: l.t, accepted: [l.t, ...(l.r ? [l.r] : [])], answer: l.r ? `${l.t} (${l.r})` : l.t, ro: tc(l.ro),
    explain: `${t('Traducere')}: ${tc(l.ro)}`,
  }))
}

/** Traduceri și ordonări cu replicile din dialog. */
function buildDialogueTranslation(course: Course, ch: ChapterData): Exercise[] {
  const lines = shuffle(shortLines(ch, 7))
  const ex: Exercise[] = lines.slice(0, 5).map((l) => ({
    kind: 'type', label: t('Tradu replica din dialog'), prompt: tc(l.ro), accepted: [l.t, ...(l.r ? [l.r] : [])], answer: l.r ? `${l.t} (${l.r})` : l.t, speak: l.t,
  }))
  for (const l of lines.slice(5, 8)) {
    const parts = l.t.split(' ')
    if (parts.length > 2) ex.push({ kind: 'order', label: t('Refă replica din dialog'), prompt: tc(l.ro), tokens: shuffle(parts), answer: parts, joiner: ' ', speak: l.t })
  }
  const line = shuffle(shortLines(ch, 6))[0]
  if (line && canListen()) ex.push({ kind: 'speak', label: t('Spune replica cu voce tare'), text: line.t, ro: tc(line.ro) })
  return course.lang === 'ja' ? ex.filter((e) => e.kind !== 'order') : ex
}

function DialogueReplay({ ch, course, next }: { ch: ChapterData; course: Course; next: () => void }) {
  const roles = Object.keys(ch.dialogue.cast ?? {})
  return (
    <>
      <article className="card">
        <h3>🎭 {t('Joc de rol')}</h3>
        <p>{t('Acum dialogul e al tău. Alege un personaj și citește-i replicile cu voce tare, imitând intonația. Atinge replica celuilalt personaj ca s-o auzi și răspunde-i.')}{roles.length ? ` (${roles.join(' / ')})` : ''}</p>
        <p className="muted small">{t('Fă exercițiul de două ori, câte o dată cu fiecare rol. Încearcă să nu te mai uiți la traducere.')}</p>
      </article>
      <Reader reading={ch.dialogue} course={course} />
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Am terminat ședința ✓')}</button></div>
    </>
  )
}

function Goals({ ch, session, next }: { ch: ChapterData; session: 1 | 2; next: () => void }) {
  return (
    <>
      <article className="card">
        <h3>{session === 1 ? '🎧' : '📖'} {t('Ședința {n}', { n: session })} (~40 min)</h3>
        {session === 1 ? (
          <ol className="steps-list">
            <li>{t('Dialogul: îl asculți și îl citești, ca pe un CD. Nu trebuie să înțelegi totul din prima.')}</li>
            <li>{t('Cuvintele noi din dialog, fiecare cu sunet.')}</li>
            <li>{t('Exerciții cu toate cuvintele: ascultare, traducere, scriere.')}</li>
            <li>{t('Pronunția: sunetele noi, explicate pentru un vorbitor de română.')}</li>
            <li>{t('Dictare: asculți replici din dialog și le scrii.')}</li>
            {ch.story && <li>{t('Povestea capitolului: un text narativ mai lung, cu audio și întrebări.')}</li>}
            <li>{t('Joc de rol: citești dialogul cu voce tare, în rolul personajelor.')}</li>
          </ol>
        ) : (
          <ol className="steps-list">
            <li>{t('Gramatica în {n} pași mici, explicată de la zero și comparată cu româna.', { n: ch.explain.length })}</li>
            <li>{t('Exerciții pe fiecare regulă, cu explicație la fiecare răspuns.')}</li>
            <li>{t('Traduceri: refaci replicile dialogului din română.')}</li>
            <li>{t('Mini-test de {n} întrebări.', { n: ch.quiz.length })}</li>
          </ol>
        )}
        <p className="muted small">{t('Sfat: ia-ți un caiet. Ce scrii de mână reții mult mai bine.')}</p>
      </article>
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Începe →')}</button></div>
    </>
  )
}

function DialogueStep({ ch, course, next }: { ch: ChapterData; course: Course; next: () => void }) {
  return (
    <>
      <article className="card">
        <h3>💬 {tc(ch.dialogue.title)}</h3>
        {ch.dialogue.intro && <p className="muted">{tc(ch.dialogue.intro)}</p>}
        <p className="small"><b>{t('Cum lucrezi:')}</b> {t('1) ascultă tot o dată, fără traducere; 2) ascultă din nou și atinge cuvintele pe care nu le știi; 3) abia apoi uită-te la traducere.')}</p>
      </article>
      <Reader reading={ch.dialogue} course={course} />
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Am ascultat → Cuvinte noi')}</button></div>
    </>
  )
}

function PronStep({ ch, course, next }: { ch: ChapterData; course: Course; next: () => void }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <>
      {ch.pron.map((p) => (
        <article className="card pron" key={p.sound}>
          <h3><span className="pron-sound">{p.sound}</span></h3>
          <p>{tc(p.how)}</p>
          <div className="pron-words">
            {p.words.map((w) => (
              <button key={w} className={`token ${sel === w ? 'on' : ''}`} onClick={() => setSel(w)}>
                {w}
              </button>
            ))}
          </div>
          {p.words.includes(sel ?? '') && sel && (
            <div className="pron-practice">
              <SpeakButton text={sel} lang={course.lang} small />
              <SpeakButton text={sel} lang={course.lang} small slow />
              {canListen() && <MicCheck text={sel} course={course} compact />}
            </div>
          )}
        </article>
      ))}
      <p className="muted small center">{canListen() ? t('Atinge un cuvânt, ascultă-l, apoi repetă-l cu voce tare sau apasă 🎤 ca să fii verificat.') : t('Atinge un cuvânt, ascultă-l, apoi repetă-l cu voce tare.')}</p>
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Continuă → Exerciții')}</button></div>
    </>
  )
}

function ExplainStep({ ex, course, next }: { ex: Explain; course: Course; next: () => void }) {
  return (
    <>
      <article className="card grammar">
        <h3>{tc(ex.title)}</h3>
        {ex.blocks.map((b, i) => <BlockView key={i} b={b} course={course} />)}
      </article>
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Am înțeles →')}</button></div>
    </>
  )
}

function BlockView({ b, course }: { b: Block; course: Course }) {
  if ('p' in b) return <p>{tc(b.p)}</p>
  if ('tip' in b) return <div className="callout tip">💡 {tc(b.tip)}</div>
  if ('warn' in b) return <div className="callout warn">⚠️ {tc(b.warn)}</div>
  if ('table' in b) {
    return (
      <div className="table-wrap">
        <table>
          <thead><tr>{b.table[0].map((c, i) => <th key={i}>{tc(c)}</th>)}</tr></thead>
          <tbody>{b.table.slice(1).map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j}>{tc(c)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    )
  }
  return <ExampleList lines={b.ex} course={course} />
}

function ExampleList({ lines, course }: { lines: Line[]; course: Course }) {
  return (
    <ul className="sentences">
      {lines.map((l) => (
        <li key={l.t}>
          <SpeakButton text={l.t} lang={course.lang} small />
          <div><div className="target">{l.t}</div>{l.r && <div className="romaji">{l.r}</div>}<div className="muted">{tc(l.ro)}</div></div>
        </li>
      ))}
    </ul>
  )
}

function QuizIntro({ next }: { next: () => void }) {
  return (
    <>
      <div className="card lesson-hero">
        <div className="lesson-emoji">📝</div>
        <h2>{t('Mini-test')}</h2>
        <p>{t('Câteva întrebări despre dialog și despre gramatică. Fără grabă: nu e notă, e doar ca să vezi ce ai reținut.')}</p>
      </div>
      <div className="sticky-actions"><button className="btn primary big" onClick={next}>{t('Începe testul →')}</button></div>
    </>
  )
}

// ——— Teme ———

export function HomeworkScreen({ lang, lessonId, back }: { lang: LangCode; lessonId: string; back: () => void }) {
  const { course, lesson, ch } = useChapter(lang, lessonId)
  const rows = useLiveQuery(() => db.homework.where('lessonId').equals(lessonId).toArray(), [lessonId], [])
  const [open, setOpen] = useState<number | null>(null)
  if (!lesson || !ch) return null
  const byId = new Map(rows.map((r) => [r.id, r]))
  const id = (k: number) => `${lessonId}#${k}`

  const save = async (k: number, patch: Partial<HomeworkRow>) => {
    const prev = byId.get(id(k))
    const row: HomeworkRow = { id: id(k), lessonId, done: false, at: Date.now(), ...prev, ...patch }
    if (patch.done && !prev?.done) await bumpDay({ lessons: 0, xp: 10, reviews: 0 })
    await db.homework.put(row)
  }

  if (open !== null) {
    const task = ch.homework[open]
    const close = () => { setOpen(null); window.scrollTo(0, 0) }
    return <HomeworkTask task={task} course={course} ch={ch} row={byId.get(id(open))} save={(p) => save(open, p)} close={close} />
  }

  const icons: Record<Homework['kind'], string> = { drills: '✏️', reading: '📖', writing: '📝', task: '🎧' }
  return (
    <div className="screen">
      <TopBar title={`${t('Teme')} · ${t('Capitolul {n}', { n: ch.number })}`} onBack={back} />
      <p className="muted">{t('Fă-le în ordine, ideal a doua zi după ședințe: așa le fixezi în memoria de lungă durată.')}</p>
      {ch.homework.map((task, k) => {
        const r = byId.get(id(k))
        return (
          <button key={k} className={`card session-card ${r?.done ? 'done' : ''}`} onClick={() => setOpen(k)}>
            <span className="session-n">{r?.done ? '✓' : icons[task.kind]}</span>
            <span className="session-body">
              <b>{tc(task.title)}</b>
              <small>{tc(task.instructions).slice(0, 90)}{tc(task.instructions).length > 90 ? '…' : ''}</small>
              {r?.score !== undefined && <small className="session-extra">{t('Scor')}: {Math.round(r.score * 100)}%</small>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function HomeworkTask({ task, course, ch, row, save, close }: {
  task: Homework; course: Course; ch: ChapterData; row?: HomeworkRow; save: (p: Partial<HomeworkRow>) => Promise<void>; close: () => void
}) {
  const [stage, setStage] = useState<'intro' | 'practice' | 'done'>('intro')
  const [score, setScore] = useState<number | null>(null)
  const exercises = useMemo(() => {
    if (task.kind === 'drills') return task.drills.map((d) => drillToExercise(d, course))
    if (task.kind === 'reading') return task.questions.map((d) => drillToExercise(d, course))
    return []
  }, [task, course, stage]) // eslint-disable-line react-hooks/exhaustive-deps

  if (stage === 'practice') {
    return (
      <div className="screen">
        <Practice course={course} exercises={exercises} back={() => setStage('intro')} onDone={async (s) => { setScore(s); await save({ done: true, score: Math.max(row?.score ?? 0, s) }); setStage('done') }} />
      </div>
    )
  }

  if (stage === 'done') {
    return (
      <div className="screen done">
        <div className="done-emoji">{(score ?? 0) >= 0.75 ? '🌟' : '👍'}</div>
        <h2>{t('Temă terminată!')}</h2>
        <p className="done-score">{t('{p}% corect din prima', { p: Math.round((score ?? 0) * 100) })}</p>
        <div className="sticky-actions">
          <button className="btn" onClick={() => setStage('practice')}>{t('Încă o dată')}</button>
          <button className="btn primary big" onClick={close}>{t('Înapoi la teme')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <TopBar title={tc(task.title)} onBack={close} />
      <article className="card">
        <p>{tc(task.instructions)}</p>
      </article>
      {task.kind === 'drills' && (
        <div className="sticky-actions"><button className="btn primary big" onClick={() => setStage('practice')}>{t('Începe ({n} exerciții) →', { n: task.drills.length })}</button></div>
      )}
      {task.kind === 'reading' && (
        <>
          <article className="card"><h3>📖 {tc(task.reading.title)}</h3></article>
          <Reader reading={task.reading} course={course} />
          <div className="sticky-actions"><button className="btn primary big" onClick={() => setStage('practice')}>{t('Răspunde la întrebări →')}</button></div>
        </>
      )}
      {task.kind === 'writing' && <WritingTask task={task} course={course} row={row} save={save} close={close} />}
      {task.kind === 'task' && (
        <>
          <ChecklistTask steps={task.steps} />
          <Reader reading={ch.dialogue} course={course} />
          <div className="sticky-actions"><button className="btn primary big" onClick={async () => { await save({ done: true }); close() }}>✓ {t('Am făcut tema')}</button></div>
        </>
      )}
    </div>
  )
}

function ChecklistTask({ steps }: { steps: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  return (
    <article className="card">
      {steps.map((s, i) => (
        <label key={i} className="toggle">
          <input type="checkbox" checked={checked.has(i)} onChange={() => setChecked((c) => { const n = new Set(c); if (n.has(i)) n.delete(i); else n.add(i); return n })} />
          {tc(s)}
        </label>
      ))}
    </article>
  )
}

const SPECIAL_CHARS: Record<string, string[]> = { es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡'], it: ['à', 'è', 'é', 'ì', 'ò', 'ù'], ja: [] }

function WritingTask({ task, course, row, save, close }: {
  task: Extract<Homework, { kind: 'writing' }>; course: Course; row?: HomeworkRow; save: (p: Partial<HomeworkRow>) => Promise<void>; close: () => void
}) {
  const [text, setText] = useState(row?.text ?? '')
  const [showModel, setShowModel] = useState(false)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const enough = words >= task.minWords
  return (
    <>
      <article className="card">
        <textarea
          className="writing"
          value={text}
          lang={course.lang}
          onChange={(e) => setText(e.target.value)}
          placeholder="¡Hola! Me llamo…"
          rows={8}
          spellCheck={false}
        />
        <div className="special">
          {SPECIAL_CHARS[course.lang].map((c) => <button type="button" key={c} onClick={() => setText((x) => x + c)}>{c}</button>)}
        </div>
        <p className={`small ${enough ? '' : 'muted'}`}>{t('{n} cuvinte', { n: words })} {enough ? '✓' : `(${t('minim {n}', { n: task.minWords })})`}</p>
      </article>
      <article className="card">
        <h3>✅ {t('Verifică-te singur')}</h3>
        <ChecklistTask steps={task.tips} />
        <button className="btn" onClick={() => setShowModel((x) => !x)}>{showModel ? t('Ascunde modelul') : t('Arată un model de răspuns')}</button>
        {showModel && <ExampleList lines={task.model} course={course} />}
        <p className="muted small">{t('Textul tău rămâne salvat aici.')}</p>
      </article>
      <div className="sticky-actions">
        <button className="btn" onClick={() => save({ text })}>{t('Salvează')}</button>
        <button className="btn primary big" disabled={!enough} onClick={async () => { await save({ text, done: true }); close() }}>✓ {t('Gata')}</button>
      </div>
    </>
  )
}
