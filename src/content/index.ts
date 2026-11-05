import { es } from './es'
import { it } from './it'
import { ja } from './ja'
import type { Course, LangCode, Lesson, Word } from './types'

// Ordinea de studiu: spaniola și japoneza întâi, italiana după spaniola A2.
export const COURSES: Course[] = [es, ja, it]

export function getCourse(lang: string): Course {
  return COURSES.find((c) => c.lang === lang) ?? es
}

export function allLessons(course: Course): Lesson[] {
  return course.units.flatMap((u) => u.lessons)
}

export function findLesson(course: Course, id: string): Lesson | undefined {
  return allLessons(course).find((l) => l.id === id)
}

const wordIndex = new Map<string, { word: Word; lesson: Lesson; course: Course }>()
for (const course of COURSES) {
  for (const lesson of allLessons(course)) {
    for (const word of lesson.words) wordIndex.set(`${course.lang}|${word.id}`, { word, lesson, course })
  }
}

export function lookupWord(lang: LangCode | string, wordId: string) {
  return wordIndex.get(`${lang}|${wordId}`)
}

export function wordCount(course: Course) {
  return allLessons(course).reduce((n, l) => n + l.words.length, 0)
}
