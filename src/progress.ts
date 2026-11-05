import type { Course } from './content/types'
import type { ChapterRow, HomeworkRow, LessonRow } from './db'
import type { Route } from './nav'
import { buildSyllabus } from './screens/CourseScreen'

export interface ProgressData {
  lessons: LessonRow[]
  chapters: ChapterRow[]
  homework: HomeworkRow[]
}

/** Ședința următoare din desfășurător: întâi cea începută și neterminată, apoi prima neîncepută. */
export function nextStep(course: Course, p: ProgressData): { label: string; detail: string; minutes: number; route: Route } | null {
  const syl = buildSyllabus(course.lang, p.chapters.filter((c) => c.lang === course.lang), p.homework, new Set(p.lessons.map((l) => l.id)))
  const all = syl.flatMap((u) => u.lessons.flatMap((l) => l.items))
  const it = all.find((x) => x.status === 'progress') ?? all.find((x) => x.status === 'todo')
  if (!it) return null
  const where = it.lesson.chapter ? `Capitolul ${it.lesson.chapter.number}: ${it.lesson.title}` : it.lesson.title
  return {
    label: `Ședința ${it.n} · ${it.title}`,
    detail: it.note ? `${where} · ${it.note}` : where,
    minutes: it.lesson.chapter ? (it.route.name === 'homework' ? 30 : 40) : 15,
    route: it.route,
  }
}
