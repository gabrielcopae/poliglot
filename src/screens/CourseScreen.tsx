import { useLiveQuery } from 'dexie-react-hooks'
import { Flag } from '../components/Flag'
import { getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db, type ChapterRow, type HomeworkRow } from '../db'
import type { Go, Route, ZoomGo } from '../nav'
import { Progress, TopBar } from '../components/ui'
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

/** Culoarea fiecărui nivel (cercul sticlos și iconițele capitolelor lui). */
const LEVEL_HUE: Record<string, number> = { A1: 145, A2: 180, B1: 212, B2: 268, C1: 24, C2: 340, N5: 145, N4: 180, N3: 212, N2: 268, N1: 24 }
/** Numele scurt pe iconiță: la titlurile „original — traducere” rămâne traducerea. */
const shortName = (s: string) => (s.includes(' — ') ? s.split(' — ').pop()! : s)

export function CourseScreen({ lang, level, go, zoomGo, back }: { lang: LangCode; level?: string; go: Go; zoomGo: ZoomGo; back: () => void }) {
  const course = getCourse(lang)
  const lessons = useLiveQuery(() => db.lessons.where('lang').equals(lang).toArray(), [lang], [])
  const chapters = useLiveQuery(() => db.chapters.where('lang').equals(lang).toArray(), [lang], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const due = useLiveQuery(() => db.cards.where('[lang+due]').between([lang, 0], [lang, Date.now()]).count(), [lang], 0)

  const syllabus = buildSyllabus(lang, chapters, homework, new Set(lessons.map((l) => l.id)))
  const all = syllabus.flatMap((u) => u.lessons.flatMap((l) => l.items))
  const next = all.find((x) => x.status === 'progress') ?? all.find((x) => x.status === 'todo')
  const doneCount = all.filter((x) => x.status === 'done').length
  const nextLevel = next ? syllabus.find((u) => u.lessons.some((l) => l.lesson.id === next.lesson.id))?.unit.level : undefined

  const continueCard = next && (
    <button className="card continue-home" onClick={() => go(next.route)}>
      <span className="continue-n">{next.n}</span>
      <span className="continue-home-body">
        <small>{next.status === 'progress' ? t('Continuă de unde ai rămas') : t('Următoarea ședință')}</small>
        <b>{next.title}</b>
        <span className="continue-sub">{next.lesson.chapter ? `${t('Capitolul {n}', { n: next.lesson.chapter.number })}: ${tc(next.lesson.title)}` : tc(next.lesson.title)}</span>
      </span>
      <span className="continue-home-go">▶</span>
    </button>
  )

  // ——— un nivel deschis: grila de iconițe a capitolelor ———
  const plan = level ? course.plan.find((p) => p.level === level) : undefined
  if (level && plan) {
    const units = syllabus.filter((u) => u.unit.level === level)
    const items = units.flatMap((u) => u.lessons.flatMap((l) => l.items))
    const written = units.reduce((k, u) => k + u.lessons.filter((l) => l.lesson.chapter).length, 0)
    const total = Math.max(plan.chapters * 3, items.length)
    const levelDone = items.filter((x) => x.status === 'done').length
    const hue = LEVEL_HUE[level] ?? 200
    return (
      <div className="screen course-calm level-screen" style={{ ['--lv-h' as string]: hue }}>
        <TopBar title={<><span className="lv-badge">{level}</span> {tc(plan.title)}</>} onBack={back} />
        <div className="course-summary">
          <Progress value={total ? levelDone / total : 0} />
          <small>{t('{n} / {all} ședințe', { n: levelDone, all: total })}</small>
        </div>
        {nextLevel === level && continueCard}
        {units.map(({ unit, lessons: ls }, ui) => (
          <section key={unit.id} className="icon-unit" style={{ ['--lv-h' as string]: hue + ui * 38 }}>
            <h3 className="icon-unit-title">{tc(unit.title).replace(/^([A-C][12]|N[1-5])\s*·\s*/, '')}</h3>
            <div className="icon-grid">
              {ls.map(({ lesson, items: its }) => {
                const allDone = its.every((x) => x.status === 'done')
                const any = its.some((x) => x.status !== 'todo')
                const isCurrent = next?.lesson.id === lesson.id
                const st = allDone ? 'done' : isCurrent ? 'current' : any ? 'progress' : 'todo'
                const doneN = its.filter((x) => x.status === 'done').length
                const route: Route = lesson.chapter ? { name: 'lesson', lang, lessonId: lesson.id } : its[0].route
                const label = lesson.chapter ? t('Capitolul {n}', { n: lesson.chapter.number }) : tc(lesson.title)
                return (
                  <button
                    key={lesson.id}
                    className={`app-icon st-${st}`}
                    onClick={(e) => zoomGo(route, e.currentTarget.querySelector('.app-icon-tile'))}
                    aria-label={`${label}: ${tc(lesson.title)}`}
                  >
                    <span className="app-icon-tile">
                      <span className="app-icon-emoji" aria-hidden="true">{lesson.emoji}</span>
                      {lesson.chapter && <span className="app-icon-num">{lesson.chapter.number}</span>}
                      {allDone && <span className="app-icon-badge ok" aria-hidden="true">✓</span>}
                      {!allDone && any && <span className="app-icon-badge part" aria-hidden="true">{doneN}/{its.length}</span>}
                    </span>
                    <span className="app-icon-name">{shortName(tc(lesson.title))}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
        {written > 0 && (
          <button className="exam-link" onClick={() => go({ name: 'exam', lang, level })}>📝 {t('Test de nivel {level}', { level })} <span>({t('30 de întrebări · viză în pașaport')})</span></button>
        )}
        {written < plan.chapters && (
          <div className="syl-planned">
            🔒 {written ? t('Capitolele {a}–{b} ale nivelului {level} ({n} ședințe) sunt în pregătire și se adaugă pe parcurs.', { a: written + 1, b: plan.chapters, level, n: (plan.chapters - written) * 3 }) : t('Cele {b} capitole ale nivelului {level} ({n} ședințe) sunt în pregătire și se adaugă pe parcurs.', { b: plan.chapters, level, n: (plan.chapters - written) * 3 })}
          </div>
        )}
      </div>
    )
  }

  // ——— ecranul cursului: nivelurile ca cercuri sticloase ———
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

      {continueCard}

      <div className="orb-grid">
        {course.plan.map((p) => {
          const its = syllabus.filter((u) => u.unit.level === p.level).flatMap((u) => u.lessons.flatMap((l) => l.items))
          const total = Math.max(p.chapters * 3, its.length)
          const d = its.filter((x) => x.status === 'done').length
          const frac = total ? d / total : 0
          const r = 47
          const c = 2 * Math.PI * r
          return (
            <button
              key={p.level}
              className={`orb ${nextLevel === p.level ? 'current' : ''} ${its.length ? '' : 'soon'}`}
              style={{ ['--lv-h' as string]: LEVEL_HUE[p.level] ?? 200 }}
              onClick={(e) => zoomGo({ name: 'course', lang, level: p.level }, e.currentTarget.querySelector('.orb-ball'))}
            >
              <span className="orb-wrap">
                <svg className="orb-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r={r} className="orb-ring-track" />
                  <circle cx="50" cy="50" r={r} className="orb-ring-fill" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} transform="rotate(-90 50 50)" />
                </svg>
                <span className="orb-ball"><b>{p.level}</b></span>
              </span>
              <span className="orb-name">{tc(p.title)}</span>
              <small className="orb-count">{its.length ? t('{n} / {all} ședințe', { n: d, all: total }) : t('în pregătire')}</small>
            </button>
          )
        })}
      </div>
    </div>
  )
}
