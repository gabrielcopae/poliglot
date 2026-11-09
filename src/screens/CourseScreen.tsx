import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Flag } from '../components/Flag'
import { getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db, type ChapterRow, type HomeworkRow } from '../db'
import type { Go, Route } from '../nav'
import { Progress, TopBar } from '../components/ui'
import { localGet, localSet } from '../settings'

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
          n: ++n, lesson, title: lesson.title, detail: 'Lecție scurtă', status: doneLessons.has(lesson.id) ? 'done' : 'todo',
          route: { name: 'lesson', lang, lessonId: lesson.id },
        }
        return { lesson, items: [item] }
      }
      const st = chState.get(lesson.id)
      const hwDone = homework.filter((h) => h.lessonId === lesson.id && h.done).length
      const sess = (k: 1 | 2): Status => (st?.[k === 1 ? 's1' : 's2'] ? 'done' : st?.[k === 1 ? 's1Step' : 's2Step'] ? 'progress' : 'todo')
      const items: SessionItem[] = [
        {
          n: ++n, lesson, title: 'Dialog, cuvinte, pronunție', detail: 'încălzire · dialog · cuvinte · exerciții · dictare · joc de rol',
          status: sess(1), note: sess(1) === 'progress' ? `ai rămas la pasul ${(st?.s1Step ?? 0) + 1}` : undefined,
          route: { name: 'session', lang, lessonId: lesson.id, session: 1, fromChapter: true },
        },
        {
          n: ++n, lesson, title: 'Gramatică, lectură, mini-test', detail: 'încălzire · gramatică · exerciții · text lung · traduceri · test',
          status: sess(2), note: sess(2) === 'progress' ? `ai rămas la pasul ${(st?.s2Step ?? 0) + 1}` : undefined,
          route: { name: 'session', lang, lessonId: lesson.id, session: 2, fromChapter: true },
        },
        {
          n: ++n, lesson, title: 'Teme pentru acasă', detail: `${ch.homework.length} teme · text cu audio · compunere`,
          status: hwDone === ch.homework.length ? 'done' : hwDone ? 'progress' : 'todo', note: hwDone ? `${hwDone} din ${ch.homework.length} făcute` : undefined,
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
  const setTab = (t: 'now' | 'all') => { setTabState(t); localSet(tabKey, t) }

  return (
    <div className="screen">
      <TopBar title={<><Flag lang={lang} size={30} /> {course.name}</>} onBack={back} />
      <div className="course-actions">
        <button className="btn primary" disabled={!due} onClick={() => go({ name: 'review', lang })}>🔁 Repetă {due ? `(${due})` : ''}</button>
        <button className="btn" onClick={() => go({ name: 'dictionary', lang })}>📖 Dicționar</button>
        {lang === 'ja' && <button className="btn" onClick={() => go({ name: 'kana' })}>あ Kana</button>}
        {lang === 'ja' && <button className="btn" onClick={() => go({ name: 'kanjiList' })}>🖌️ Kanji</button>}
      </div>

      <div className="segmented course-tabs">
        <button className={tab === 'now' ? 'on' : ''} onClick={() => setTab('now')}>▶ În desfășurare</button>
        <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>📚 Lecții</button>
      </div>

      {tab === 'now' && next && (
        <button className="card continue-card" onClick={() => go(next.route)}>
          <span className="continue-n">{next.n}</span>
          <span className="session-body">
            <small className="continue-kicker">{next.status === 'progress' ? 'Continuă de unde ai rămas' : 'Următoarea ședință'}</small>
            <b>Ședința {next.n} · {next.title}</b>
            <small>{next.lesson.chapter ? `Capitolul ${next.lesson.chapter.number}: ${next.lesson.title}` : next.lesson.title}{next.note ? ` · ${next.note}` : ''}</small>
          </span>
          <span className="due-go">▶</span>
        </button>
      )}

      {tab === 'now' && (
        <>
          <h2 className="section-title">Capitole începute</h2>
          {started.length ? started.map(({ lesson, items: its }) => (
            <article key={lesson.id} className="card syl-chapter now-chapter">
              <button className="syl-ch-head" onClick={() => go({ name: 'lesson', lang, lessonId: lesson.id })}>
                <span>{lesson.emoji}</span>
                <b>{lesson.chapter ? `Capitolul ${lesson.chapter.number}: ` : ''}{lesson.title}</b>
                <span className="toc-go">cuprins →</span>
              </button>
              {its.map((it) => (
                <button key={it.n} className={`syl-row st-${it.status}`} onClick={() => go(it.route)}>
                  <span className="syl-n">{it.status === 'done' ? '✓' : it.n}</span>
                  <span className="session-body">
                    <b>Ședința {it.n} · {it.title}</b>
                    <small>{it.note ?? it.detail}</small>
                  </span>
                  <span className="syl-state">{it.status === 'done' ? 'gata' : it.status === 'progress' ? 'în curs' : ''}</span>
                </button>
              ))}
            </article>
          )) : (
            <p className="muted syl-intro">
              {doneCount ? 'Niciun capitol început și neterminat. Apasă mai sus ca să treci la următoarea ședință.' : 'Încă n-ai început nimic. Apasă mai sus pe prima ședință sau deschide fila „Lecții”.'}
            </p>
          )}
          <p className="muted small syl-intro">{doneCount} din {all.length} ședințe terminate în total.</p>
        </>
      )}

      {tab === 'all' && <>
      <h2 className="section-title">📋 Desfășurătorul cursului</h2>
      <p className="muted small syl-intro">
        {doneCount} din {all.length} ședințe terminate. Poți deschide oricare ședință, oricând. Drumul complet: {course.plan.map((p) => p.level).join(' → ')} (examen {course.exam}).
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
                <b>{p.title}</b>
                <small>{levelDone} / {total} ședințe{items.length ? '' : ' · în pregătire'}</small>
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
                    <span className="syl-unit-title">{unit.title}</span>
                    <span className="syl-unit-count">{chDone} / {ls.length} {ls[0]?.lesson.chapter ? 'capitole' : 'lecții'}</span>
                  </summary>
                  {ls.map(({ lesson, items: its }) => {
                    const allDone = its.every((x) => x.status === 'done')
                    const isCurrent = next?.lesson.id === lesson.id
                    if (!lesson.chapter) {
                      const it = its[0]
                      return (
                        <button key={lesson.id} className={`syl-row syl-short st-${it.status}`} onClick={() => go(it.route)}>
                          <span className="syl-n">{it.status === 'done' ? '✓' : lesson.emoji}</span>
                          <span className="session-body"><b>{lesson.title}</b><small>{it.detail}</small></span>
                        </button>
                      )
                    }
                    return (
                      <details key={lesson.id} className={`syl-chapter ${allDone ? 'ch-done' : ''} ${isCurrent ? 'ch-current' : ''}`} open={isCurrent}>
                        <summary>
                          <span className="ch-emoji">{allDone ? '✅' : lesson.emoji}</span>
                          <span className="ch-title"><b>Cap. {lesson.chapter.number} · {lesson.title}</b></span>
                          <span className="ch-dots">{its.map((it) => <i key={it.n} className={`dot st-${it.status}`} />)}</span>
                        </summary>
                        {its.map((it) => (
                          <button key={it.n} className={`syl-row st-${it.status}`} onClick={() => go(it.route)}>
                            <span className="syl-n">{it.status === 'done' ? '✓' : it.n}</span>
                            <span className="session-body">
                              <b>Ședința {it.n} · {it.title}</b>
                              <small>{it.note ?? it.detail}</small>
                            </span>
                            <span className="syl-state">{it.status === 'done' ? 'gata' : it.status === 'progress' ? 'în curs' : ''}</span>
                          </button>
                        ))}
                        <button className="syl-toc" onClick={() => go({ name: 'lesson', lang, lessonId: lesson.id })}>Cuprinsul capitolului →</button>
                      </details>
                    )
                  })}
                  {unitItems.length === 0 && <p className="muted small">În pregătire.</p>}
                </details>
              )
            })}
            {written > 0 && (
              <button className="exam-link" onClick={() => go({ name: 'exam', lang, level: p.level })}>📝 Test de nivel {p.level} <span>(30 de întrebări · viză în pașaport)</span></button>
            )}
            {written < p.chapters && (
              <div className="syl-planned">
                🔒 {written ? `Capitolele ${written + 1}–${p.chapters}` : `Cele ${p.chapters} capitole`} ale nivelului {p.level} ({(p.chapters - written) * 3} ședințe) sunt în pregătire și se adaugă pe parcurs.
              </div>
            )}
          </details>
        )
      })}
      </>}
    </div>
  )
}
