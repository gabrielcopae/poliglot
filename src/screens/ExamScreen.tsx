import { t, tc, uiLocale } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useState } from 'react'
import { TopBar } from '../components/ui'
import { getCourse } from '../content'
import type { Drill, LangCode } from '../content/types'
import { db } from '../db'
import { drillToExercise } from '../exercises'
import { levelChapters } from '../journey'
import { shuffle } from '../util'
import { Practice } from './LessonScreen'

const QUESTIONS = 30
const PASS = 60

/** Întrebările testului: din toate capitolele nivelului, amestecate, cât mai echilibrat între capitole. */
function buildExam(lang: LangCode, level: string) {
  const course = getCourse(lang)
  const perChapter = levelChapters(course, level).map(({ lesson }) => {
    const ch = lesson.chapter!
    const pool: Drill[] = [...ch.quiz, ...ch.drills, ...ch.homework.flatMap((h) => (h.kind === 'drills' ? h.drills : []))]
    return shuffle(pool)
  })
  const picked: Drill[] = []
  for (let round = 0; picked.length < QUESTIONS && round < 20; round++) {
    for (const pool of shuffle(perChapter)) {
      if (pool[round] && picked.length < QUESTIONS) picked.push(pool[round])
    }
  }
  return shuffle(picked).map((d) => ({ ...drillToExercise(d, course), label: `Test ${level} · ${drillToExercise(d, course).label}` }))
}

export function ExamScreen({ lang, level, back }: { lang: LangCode; level: string; back: () => void }) {
  const course = getCourse(lang)
  const plan = course.plan.find((p) => p.level === level)
  const exam = useLiveQuery(() => db.exams.get(`${lang}-${level}`), [lang, level])
  const [phase, setPhase] = useState<'intro' | 'run' | 'done'>('intro')
  const [attempt, setAttempt] = useState(0)
  const [score, setScore] = useState(0)
  const exercises = useMemo(() => buildExam(lang, level), [lang, level, attempt]) // eslint-disable-line react-hooks/exhaustive-deps
  const written = levelChapters(course, level).length

  const finish = async (s: number) => {
    const pct = Math.round(s * 100)
    setScore(pct)
    setPhase('done')
    const prev = await db.exams.get(`${lang}-${level}`)
    const passed = pct >= PASS
    await db.exams.put({
      id: `${lang}-${level}`, lang, level, best: Math.max(prev?.best ?? 0, pct), passed: !!prev?.passed || passed,
      at: Date.now(), passedAt: prev?.passedAt ?? (passed ? Date.now() : undefined),
    })
  }

  if (phase === 'run') {
    return <Practice key={attempt} course={course} exercises={exercises} back={() => setPhase('intro')} onDone={finish} />
  }

  return (
    <div className="screen">
      <TopBar title={`📝 ${t('Test de nivel {level}', { level })}`} onBack={back} />
      {phase === 'intro' ? (
        <article className="card exam-card">
          <div className="exam-badge">{level}</div>
          <h2>{plan ? tc(plan.title) : ''}</h2>
          <p>
            {t('{n} întrebări din cele {ch} capitole ale nivelului {level}, în stilul examenului {exam}.', { n: exercises.length, ch: written, level, exam: course.exam })}{' '}
            {t('Trebuie să răspunzi corect din prima la cel puțin {p}% ca să primești viza {level} în pașaport.', { p: PASS, level })}
          </p>
          {plan && written < plan.chapters && <p className="muted small">{t('Nivelul e încă în lucru ({n} din {all} capitole). Testul conține doar capitolele scrise până acum.', { n: written, all: plan.chapters })}</p>}
          {exam && <p className="muted">{t('Cel mai bun rezultat:')} <b>{exam.best}%</b>{exam.passed ? ` · ${t('viză obținută ✅')}` : ''}</p>}
          <button className="btn primary big" onClick={() => setPhase('run')}>{t('Începe testul')}</button>
        </article>
      ) : (
        <article className="card exam-card">
          <div className="done-emoji">{score >= PASS ? '🛂' : '📚'}</div>
          <h2>{score}%</h2>
          {score >= PASS ? (
            <>
              <p><b>{t('Felicitări! Ai trecut testul de nivel {level}.', { level })}</b></p>
              <div className="visa visa-big">
                <div className="visa-title">{t('VIZĂ {level}', { level })}</div>
                <div className="visa-body">{t(course.name)} · {plan ? tc(plan.title) : ''} · {new Date().toLocaleDateString(uiLocale())}</div>
              </div>
              <p className="muted small">{t('Viza a fost pusă în pașaport.')}</p>
            </>
          ) : (
            <p>{t('Ai nevoie de {p}% ca să treci. Recitește capitolele la care ai greșit și încearcă din nou: întrebările se schimbă la fiecare încercare.', { p: PASS })}</p>
          )}
          <div className="course-actions exam-actions">
            <button className="btn primary" onClick={() => { setAttempt((a) => a + 1); setPhase('run') }}>↻ {t('Încă o încercare')}</button>
            <button className="btn" onClick={back}>{t('Înapoi')}</button>
          </div>
        </article>
      )}
    </div>
  )
}
