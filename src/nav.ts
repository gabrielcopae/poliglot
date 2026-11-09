import type { LangCode } from './content/types'

export type Route =
  | { name: 'home' }
  | { name: 'course'; lang: LangCode }
  | { name: 'lesson'; lang: LangCode; lessonId: string }
  | { name: 'session'; lang: LangCode; lessonId: string; session: 1 | 2; step?: number; fromChapter?: boolean }
  | { name: 'homework'; lang: LangCode; lessonId: string }
  | { name: 'review'; lang?: LangCode }
  | { name: 'dictionary'; lang: LangCode }
  | { name: 'kana' }
  | { name: 'stats' }
  | { name: 'settings' }
  | { name: 'passport' }
  | { name: 'album' }
  | { name: 'talks' }
  | { name: 'talk'; id: string }
  | { name: 'exam'; lang: LangCode; level: string }
  | { name: 'kanjiList' }
  | { name: 'kanjiOne'; char: string }

export type Go = (r: Route) => void
