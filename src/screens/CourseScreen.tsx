import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Flag } from '../components/Flag'
import { getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db, type ChapterRow, type HomeworkRow } from '../db'
import type { Go, Route } from '../nav'
import { Progress, TopBar } from '../components/ui'
import { localGet, localSet } from '../settings'
import { t, tc, tn } from '../i18n'

type Status = 'done' | 'progress' | 'todo'

interface SessionItem {
  n: number
  lesson: Lesson
  title: string
  detail: string
  status: Status
  note?: string
  route: Route
}

/** Toate ședințele unui curs, numerotate de la 1, cu starea fiecăreia. */
export function buildSyllabus(lang: LangCode, chapters: ChapterRow[], homework: HomeworkRow[], doneLessons: Set<string>) {
  const course = getCourse(lang)
  const chState = new Map(chapters.map((c) => [c.id, c]))
  let n = 0
  return course.units.map((unit) => ({
    unit,
    lessons: unit.lessons.map((lesson) => {
      const ch = lesson.chapter
      if (!ch) {
        const item: SessionItem = {
          n: ++n, lesson, title: tc(lesson.title), detail: t('Lecție scurtă'), status: doneLessons.has(lesson.id) ? 'done' : 'todo',
          route: { name: 'lesson', lang, lessonId: lesson.id },
        }
        return { lesson, items: [item] }
      }
      const st = chState.get(lesson.id)
      const hwDone = homework.filter((h) => h.lessonId === lesson.id && h.done).length
      const sess = (k: 1 | 2): Status => (st?.[k === 1 ? 's1' : 's2'] ? 'done' : st?.[k === 1 ? 's1Step' : 's2Step'] ? 'progress' : 'todo')
      const items: SessionItem[] = [
        {
          n: ++n, lesson, title: t('Dialog, cuvinte, pronunție'), detail: t('încălzire · dialog · cuvinte · exerciții · dictare · joc de rol'),
          status: sess(1), note: sess(1) === 'progress' ? t('ai rămas la pasul {n}', { n: (st?.s1Step ?? 0) + 1 }) : undefined,
          route: { name: 'session', lang, lessonId: lesson.id, session: 1, fromChapter: true },
        },
        {
          n: ++n, lesson, title: t('Gramatică, lectură, mini-test'), detail: t('încălzire · gramatică · exerciții · text lung · traduceri · test'),
          status: sess(2), note: sess(2) === 'progress' ? t('ai rămas la pasul {n}', { n: (st?.s2Step ?? 0) + 1 }) : undefined,
          route: { name: 'session', lang, lessonId: lesson.id, session: 2, fromChapter: true },
        },
        {
          n: ++n, lesson, title: t('Teme pentru acasă'), detail: t('{n} teme · text cu audio · compunere', { n: ch.homework.length }),
          status: hwDone === ch.homework.length ? 'done' : hwDone ? 'progress' : 'todo', note: hwDone ? t('{n} din {all} făcute', { n: hwDone, all: ch.homework.length }) : undefined,
          route: { name: 'homework', lang, lessonId: lesson.id },
        },
      ]
      return { lesson, items }
    }),
  }))
}

export function CourseScreen({ lang, go, back }: { lang: LangCode; go: Go; back: () => void }) {
  const course = getCourse(lang)
  const lessons = useLiveQuery(() => db.lessons.where('lang').equals(lang).toArray(), [lang], [])
  const chapters = useLiveQuery(() => db.chapters.where('lang').equals(lang).toArray(), [lang], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const due = useLiveQuery(() => db.cards.where('[lang+due]').between([lang, 0], [lang, Date.now()]).count(), [lang], 0)

  const syllabus = buildSyllabus(lang, chapters, homework, new Set(lessons.map((l) => l.id)))
  const all = syllabus.flatMap((u) => u.lessons.flatMap((l) => l.items))
  const next = all.find((x) => x.status === 'progress') ?? all.find((x) => x.status === 'todo')
  const doneCount = all.filter((x) => x.status === 'done').length
  // nivelul afișat: cel ales ultima dată sau cel la care ești acum
  const levelKey = `poliglot.courseLevel.${lang}`
  const nextLevel = next ? syllabus.find((u) => u.lessons.some((l) => l.lesson.id === next.lesson.id))?.unit.level : undefined
  const [levelPick, setLevelPick] = useState<string | null>(() => localGet(levelKey))
  const level = course.plan.some((p) => p.level === levelPick) ? levelPick! : (nextLevel ?? course.plan[0]?.level)
  const chooseLevel = (lv: string) => { setLevelPick(lv); localSet(levelKey, lv) }
  // un singur capitol deschis odată; implicit cel la care ești
  const [openId, setOpenId] = useState<string | null | undefined>(undefined)
  const openChapter = openId === undefined ? next?.lesson.id ?? null : openId

  return (
    <div className="screen course-calm">
      <TopBar
        title={<><Flag lang={lang} size={30} /> {t(course.name)}</>}
        onBack={back}
        right={<button className="icon-btn" onClick={() => go({ name: 'dictionary', lang })} aria-label={t('Dicționar')} title={t('Dicționar')}>📖</button>}
      />
      <div className="course-summary">
        <Progress value={all.length ? doneCount / all.length : 0} />
        <small>{t('{n} din {all} ședințe terminate în total.', { n: doneCount, all: all.length })}</small>
      </div>
      {lang === 'ja' && (
        <div className="course-actions">
          <button className="btn" onClick={() => go({ name: 'kana' })}>あ Kana</button>
          <button className="btn" onClick={() => go({ name: 'kanjiList' })}>🖌️ Kanji</button>
        </div>
      )}

      {due > 0 && (
        <button className="card review-strip" onClick={() => go({ name: 'review', lang })}>
          <span className="plan-icon">🔁</span>
          <span className="plan-body">
            <b>{t('Repetă')}</b>
            <small>{tn(due, '{n} cuvânt de repetat azi', '{n} cuvinte de repetat azi')}</small>
          </span>
          <span className="due-go">▶</span>
        </button>
      )}

      {next && (
        <button className="card continue-home" onClick={() => go(next.route)}>
          <span className="continue-n">{next.n}</span>
          <span className="continue-home-body">
            <small>{next.status === 'progress' ? t('Continuă de unde ai rămas') : t('Următoarea ședință')}</small>
            <b>{next.title}</b>
            <span className="continue-sub">{next.lesson.chapter ? `${t('Capitolul {n}', { n: next.lesson.chapter.number })}: ${tc(next.lesson.title)}` : tc(next.lesson.title)}</span>
          </span>
          <span className="continue-home-go">▶</span>
        </button>
      )}

      <div className="level-chips" role="tablist" aria-label={t('Nivel')}>
        {course.plan.map((p) => {
          const its = syllabus.filter((u) => u.unit.level === p.level).flatMap((u) => u.lessons.flatMap((l) => l.items))
          const total = Math.max(p.chapters * 3, its.length)
          const d = its.filter((x) => x.status === 'done').length
          return (
            <button key={p.level} role="tab" aria-selected={level === p.level} className={`level-chip ${level === p.level ? 'on' : ''}`} onClick={() => chooseLevel(p.level)}>
              <b>{p.level}</b>
              <i style={{ width: `${total ? (d / total) * 100 : 0}%` }} />
            </button>
          )
        })}
      </div>

      {course.plan.filter((p) => p.level === level).map((p) => {
        const units = syllabus.filter((u) => u.unit.level === p.level)
        const items = units.flatMap((u) => u.lessons.flatMap((l) => l.items))
        const written = units.reduce((k, u) => k + u.lessons.filter((l) => l.lesson.chapter).length, 0)
        const total = Math.max(p.chapters * 3, items.length)
        const levelDone = items.filter((x) => x.status === 'done').length
        return (
          <section key={p.level} className="path-level">
            <header className="path-level-head">
              <h2>{tc(p.title)}</h2>
              <small>{t('{n} / {all} ședințe', { n: levelDone, all: total })}</small>
            </header>
            {units.map(({ unit, lessons: ls }) => {
              const chDone = ls.filter((l) => l.items.every((x) => x.status === 'done')).length
              return (
                <div key={unit.id} className="path-unit">
                  <h3 className="path-unit-title">
                    <span>{tc(unit.title).replace(/^[A-C][12]\s*·\s*/, '')}</span>
                    <small>{chDone} / {ls.length}</small>
                  </h3>
                  <ol className="path">
                    {ls.map(({ lesson, items: its }) => {
                      const allDone = its.every((x) => x.status === 'done')
                      const any = its.some((x) => x.status !== 'todo')
                      const isCurrent = next?.lesson.id === lesson.id
                      const st = allDone ? 'done' : isCurrent ? 'current' : any ? 'progress' : 'todo'
                      const doneN = its.filter((x) => x.status === 'done').length
                      if (!lesson.chapter) {
                        const it = its[0]
                        return (
                          <li key={lesson.id} className={`path-node st-${st}`}>
                            <button className="path-head" onClick={() => go(it.route)}>
                              <span className="path-dot">{allDone ? '✓' : lesson.emoji}</span>
                              <span className="path-body"><b>{tc(lesson.title)}</b><small>{it.detail}</small></span>
                            </button>
                          </li>
                        )
                      }
                      const isOpen = openChapter === lesson.id
                      return (
                        <li key={lesson.id} className={`path-node st-${st} ${isOpen ? 'open' : ''}`}>
                          <button className="path-head" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : lesson.id)}>
                            <span className="path-dot">{allDone ? '✓' : lesson.chapter.number}</span>
                            <span className="path-body">
                              <small className="path-kicker">{lesson.emoji} {t('Capitolul {n}', { n: lesson.chapter.number })}</small>
                              <b>{tc(lesson.title)}</b>
                              <span className="path-meter">{its.map((it) => <i key={it.n} className={`st-${it.status}`} />)}<em>{t('{n} din {all}', { n: doneN, all: its.length })}</em></span>
                            </span>
                            <span className="path-chev" aria-hidden="true">›</span>
                          </button>
                          {isOpen && (
                            <div className="path-sessions">
                              {its.map((it) => (
                                <button key={it.n} className={`path-session st-${it.status}`} onClick={() => go(it.route)}>
                                  <span className="path-session-n">{it.status === 'done' ? '✓' : it.n}</span>
                                  <span className="path-session-body">
                                    <b>{it.title}</b>
                                    <small>{it.note ?? it.detail}</small>
                                  </span>
                                  <span className="path-session-go" aria-hidden="true">{it.status === 'done' ? '' : '▶'}</span>
                                </button>
                              ))}
                              <button className="path-toc" onClick={() => go({ name: 'lesson', lang, lessonId: lesson.id })}>{t('Cuprinsul capitolului →')}</button>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )
            })}
            {written > 0 && (
              <button className="exam-link" onClick={() => go({ name: 'exam', lang, level: p.level })}>📝 {t('Test de nivel {level}', { level: p.level })} <span>({t('30 de întrebări · viză în pașaport')})</span></button>
            )}
            {written < p.chapters && (
              <div className="syl-planned">
                🔒 {written ? t('Capitolele {a}–{b} ale nivelului {level} ({n} ședințe) sunt în pregătire și se adaugă pe parcurs.', { a: written + 1, b: p.chapters, level: p.level, n: (p.chapters - written) * 3 }) : t('Cele {b} capitole ale nivelului {level} ({n} ședințe) sunt în pregătire și se adaugă pe parcurs.', { b: p.chapters, level: p.level, n: (p.chapters - written) * 3 })}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
