import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Flag } from '../components/Flag'
import { getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db, type ChapterRow, type HomeworkRow } from '../db'
import type { Go, Route } from '../nav'
import { Progress, TopBar } from '../components/ui'
import { localGet, localSet } from '../settings'
import { t, tc } from '../i18n'

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
  const started = syllabus.flatMap((u) => u.lessons).filter(({ items }) => items.some((x) => x.status !== 'todo') && items.some((x) => x.status !== 'done'))
  const tabKey = `poliglot.courseTab.${lang}`
  const [tab, setTabState] = useState<'now' | 'all'>(() => (localGet(tabKey) === 'all' ? 'all' : 'now'))
  const setTab = (v: 'now' | 'all') => { setTabState(v); localSet(tabKey, v) }

  return (
    <div className="screen">
      <TopBar title={<><Flag lang={lang} size={30} /> {t(course.name)}</>} onBack={back} />
      <div className="course-actions">
        <button className="btn primary" disabled={!due} onClick={() => go({ name: 'review', lang })}>🔁 {t('Repetă')} {due ? `(${due})` : ''}</button>
        <button className="btn" onClick={() => go({ name: 'dictionary', lang })}>📖 {t('Dicționar')}</button>
        {lang === 'ja' && <button className="btn" onClick={() => go({ name: 'kana' })}>あ Kana</button>}
        {lang === 'ja' && <button className="btn" onClick={() => go({ name: 'kanjiList' })}>🖌️ Kanji</button>}
      </div>

      <div className="segmented course-tabs">
        <button className={tab === 'now' ? 'on' : ''} onClick={() => setTab('now')}>▶ {t('În desfășurare')}</button>
        <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>📚 {t('Lecții')}</button>
      </div>

      {tab === 'now' && next && (
        <button className="card continue-card" onClick={() => go(next.route)}>
          <span className="continue-n">{next.n}</span>
          <span className="session-body">
            <small className="continue-kicker">{next.status === 'progress' ? t('Continuă de unde ai rămas') : t('Următoarea ședință')}</small>
            <b>{t('Ședința {n}', { n: next.n })} · {next.title}</b>
            <small>{next.lesson.chapter ? `${t('Capitolul {n}', { n: next.lesson.chapter.number })}: ${tc(next.lesson.title)}` : tc(next.lesson.title)}{next.note ? ` · ${next.note}` : ''}</small>
          </span>
          <span className="due-go">▶</span>
        </button>
      )}

      {tab === 'now' && (
        <>
          <h2 className="section-title">{t('Capitole începute')}</h2>
          {started.length ? started.map(({ lesson, items: its }) => (
            <article key={lesson.id} className="card syl-chapter now-chapter">
              <button className="syl-ch-head" onClick={() => go({ name: 'lesson', lang, lessonId: lesson.id })}>
                <span>{lesson.emoji}</span>
                <b>{lesson.chapter ? `${t('Capitolul {n}', { n: lesson.chapter.number })}: ` : ''}{tc(lesson.title)}</b>
                <span className="toc-go">{t('cuprins →')}</span>
              </button>
              {its.map((it) => (
                <button key={it.n} className={`syl-row st-${it.status}`} onClick={() => go(it.route)}>
                  <span className="syl-n">{it.status === 'done' ? '✓' : it.n}</span>
                  <span className="session-body">
                    <b>{t('Ședința {n}', { n: it.n })} · {it.title}</b>
                    <small>{it.note ?? it.detail}</small>
                  </span>
                  <span className="syl-state">{it.status === 'done' ? t('gata') : it.status === 'progress' ? t('în curs') : ''}</span>
                </button>
              ))}
            </article>
          )) : (
            <p className="muted syl-intro">
              {doneCount ? t('Niciun capitol început și neterminat. Apasă mai sus ca să treci la următoarea ședință.') : t('Încă n-ai început nimic. Apasă mai sus pe prima ședință sau deschide fila „Lecții”.')}
            </p>
          )}
          <p className="muted small syl-intro">{t('{n} din {all} ședințe terminate în total.', { n: doneCount, all: all.length })}</p>
        </>
      )}

      {tab === 'all' && <>
      <h2 className="section-title">📋 {t('Desfășurătorul cursului')}</h2>
      <p className="muted small syl-intro">
        {t('{n} din {all} ședințe terminate. Poți deschide oricare ședință, oricând. Drumul complet: {path} (examen {exam}).', { n: doneCount, all: all.length, path: course.plan.map((p) => p.level).join(' → '), exam: course.exam })}
      </p>

      {course.plan.map((p) => {
        const units = syllabus.filter((u) => u.unit.level === p.level)
        const items = units.flatMap((u) => u.lessons.flatMap((l) => l.items))
        const written = units.reduce((k, u) => k + u.lessons.filter((l) => l.lesson.chapter).length, 0)
        const total = Math.max(p.chapters * 3, items.length)
        const levelDone = items.filter((x) => x.status === 'done').length
        const open = next ? items.includes(next) : p === course.plan[0]
        return (
          <details key={p.level} className="card level-card" open={open}>
            <summary>
              <span className="level">{p.level}</span>
              <span className="level-title">
                <b>{tc(p.title)}</b>
                <small>{t('{n} / {all} ședințe', { n: levelDone, all: total })}{items.length ? '' : ` · ${t('în pregătire')}`}</small>
              </span>
            </summary>
            <Progress value={levelDone / total} />
            {units.map(({ unit, lessons: ls }) => {
              const unitItems = ls.flatMap((l) => l.items)
              const chDone = ls.filter((l) => l.items.every((x) => x.status === 'done')).length
              const isCurrentUnit = !!next && ls.some((l) => l.lesson.id === next.lesson.id)
              return (
                <details key={unit.id} className="syl-unit" open={isCurrentUnit}>
                  <summary>
                    <span className="syl-unit-title">{tc(unit.title)}</span>
                    <span className="syl-unit-count">{chDone} / {ls.length} {ls[0]?.lesson.chapter ? t('capitole') : t('lecții')}</span>
                  </summary>
                  {ls.map(({ lesson, items: its }) => {
                    const allDone = its.every((x) => x.status === 'done')
                    const isCurrent = next?.lesson.id === lesson.id
                    if (!lesson.chapter) {
                      const it = its[0]
                      return (
                        <button key={lesson.id} className={`syl-row syl-short st-${it.status}`} onClick={() => go(it.route)}>
                          <span className="syl-n">{it.status === 'done' ? '✓' : lesson.emoji}</span>
                          <span className="session-body"><b>{tc(lesson.title)}</b><small>{it.detail}</small></span>
                        </button>
                      )
                    }
                    return (
                      <details key={lesson.id} className={`syl-chapter ${allDone ? 'ch-done' : ''} ${isCurrent ? 'ch-current' : ''}`} open={isCurrent}>
                        <summary>
                          <span className="ch-emoji">{allDone ? '✅' : lesson.emoji}</span>
                          <span className="ch-title"><b>{t('Cap. {n}', { n: lesson.chapter.number })} · {tc(lesson.title)}</b></span>
                          <span className="ch-dots">{its.map((it) => <i key={it.n} className={`dot st-${it.status}`} />)}</span>
                        </summary>
                        {its.map((it) => (
                          <button key={it.n} className={`syl-row st-${it.status}`} onClick={() => go(it.route)}>
                            <span className="syl-n">{it.status === 'done' ? '✓' : it.n}</span>
                            <span className="session-body">
                              <b>{t('Ședința {n}', { n: it.n })} · {it.title}</b>
                              <small>{it.note ?? it.detail}</small>
                            </span>
                            <span className="syl-state">{it.status === 'done' ? t('gata') : it.status === 'progress' ? t('în curs') : ''}</span>
                          </button>
                        ))}
                        <button className="syl-toc" onClick={() => go({ name: 'lesson', lang, lessonId: lesson.id })}>{t('Cuprinsul capitolului →')}</button>
                      </details>
                    )
                  })}
                  {unitItems.length === 0 && <p className="muted small">{t('În pregătire.')}</p>}
                </details>
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
          </details>
        )
      })}
      </>}
    </div>
  )
}
