import { COURSES } from './content'
import type { Course, LangCode, Lesson } from './content/types'
import type { ChapterRow, HomeworkRow } from './db'

/** Locul din poveste pentru fiecare unitate: apare pe ștampila din pașaport. */
export const PLACES: Record<string, { place: string; emoji: string; color: string }> = {
  'es-a1-1': { place: 'Madrid', emoji: '🐻', color: '#c2552d' },
  'es-a1-2': { place: 'Madrid', emoji: '☕', color: '#b0452a' },
  'es-a1-3': { place: 'Madrid', emoji: '🏛️', color: '#9c3d26' },
  'es-a2-1': { place: 'Madrid', emoji: '📜', color: '#2f6f9f' },
  'es-a2-2': { place: 'Madrid', emoji: '🎁', color: '#2a6390' },
  'es-a2-3': { place: 'Madrid', emoji: '🥘', color: '#3a7d4f' },
  'es-a2-4': { place: 'Madrid', emoji: '🏥', color: '#356f8a' },
  'es-a2-5': { place: 'Madrid', emoji: '💬', color: '#7a4b9c' },
  'es-a2-6': { place: 'Osaka', emoji: '🗼', color: '#b8333f' },
  'es-b1-1': { place: 'Madrid', emoji: '💒', color: '#a33d6a' },
  'es-b1-2': { place: 'Carpați', emoji: '⛰️', color: '#3f6b3a' },
  'es-b1-3': { place: 'București', emoji: '🏠', color: '#1f5c8a' },
  'es-b1-4': { place: 'București', emoji: '👶', color: '#2b6f8f' },
  'es-b1-5': { place: 'București', emoji: '🏫', color: '#8a5a1f' },
  'es-b1-6': { place: 'Bucegi · Valencia', emoji: '🚚', color: '#a8462b' },
  'es-b1-7': { place: 'Kyoto · București', emoji: '⛩️', color: '#b02f2f' },
  'es-b1-8': { place: 'Porto · București', emoji: '📷', color: '#5b4a8a' },
  'ja-u1': { place: 'Tokyo · あ', emoji: '🌸', color: '#c2456a' },
  'ja-u2': { place: 'Tokyo · ア', emoji: '🗻', color: '#3d6fb0' },
  'ja-u3': { place: 'Tokyo', emoji: '🗼', color: '#b8333f' },
  'ja-u4': { place: 'Kyoto · Hiroshima', emoji: '⛩️', color: '#a2342a' },
  'ja-u5': { place: 'Madrid', emoji: '🏮', color: '#c0392b' },
}

export function placeOf(unitId: string, lang: LangCode) {
  return PLACES[unitId] ?? { place: lang === 'it' ? 'Roma' : lang === 'fr' ? 'Franța' : lang === 'ja' ? 'Japonia' : 'Spania', emoji: '📍', color: '#666' }
}

/** Cartonașe speciale (aurii): obiectele importante din povești. */
export const KEEPSAKES: Record<string, { emoji: string; name: string; t: string; ro: string }> = {
  'es-cap36': { emoji: '💍', name: 'Inelul de logodnă', t: '¿Quieres casarte conmigo?', ro: 'Vrei să te căsătorești cu mine?' },
  'es-cap38': { emoji: '💙', name: 'Floarea albastră de pe rochie', t: 'Una pequeña flor azul cosida a mano.', ro: 'O floricică albastră cusută de mână.' },
  'es-cap46': { emoji: '💍', name: 'Inelul bunicului Vasile', t: 'Para Ileana, que me esperó.', ro: 'Pentru Ileana, care m-a așteptat.' },
  'es-cap49': { emoji: '🖼️', name: 'Fotografia celor doi soldați', t: 'Para que estén juntos otra vez.', ro: 'Ca să fie iar împreună.' },
  'es-cap59': { emoji: '🚚', name: 'Camionul roșu de jucărie', t: 'Te iubesc, abuelo.', ro: 'Te iubesc, bunicule.' },
  'es-cap60': { emoji: '🕊️', name: 'Cei o mie de cocori', t: 'Mil grullas traen mil años de felicidad.', ro: 'O mie de cocori aduc o mie de ani de fericire.' },
  'es-cap61': { emoji: '❤️', name: 'Cocorul roșu nr. 1000', t: 'Ella tiene la número mil.', ro: 'Ea îl are pe al o miilea.' },
  'es-cap62': { emoji: '🌳', name: 'Nucul bunicului Vasile', t: 'Quiero que de la tierra salga algo bueno.', ro: 'Vreau să iasă din pământ ceva bun.' },
  'es-cap63': { emoji: '🍞', name: 'Cozonacul fără zahăr', t: 'Si no me lo dice, no me doy cuenta.', ro: 'Dacă nu-mi spuneați, nu-mi dădeam seama.' },
  'es-cap64': { emoji: '📱', name: 'Clipul care a găsit un prieten', t: 'Lo que la tierra devuelve.', ro: 'Ce dă înapoi pământul.' },
  'es-cap65': { emoji: '📷', name: 'Aparatul Leica al lui Ion', t: 'La cámara tenía que volver a Rumanía.', ro: 'Aparatul trebuia să se întoarcă în România.' },
  'es-cap66': { emoji: '🎓', name: 'Diploma DELE a lui Costel', t: '¡Apto! ¡He aprobado!', ro: 'Admis! Am luat examenul!' },
  'ja-cap20': { emoji: '💍', name: 'Inelul albastru de la Miyajima', t: 'はい。よろこんで。', ro: 'Da. Cu toată bucuria.' },
  'ja-cap21': { emoji: '⛰️', name: 'Primul kanji: 山', t: 'やま は うごきません。', ro: 'Muntele nu se mișcă.' },
  'ja-cap22': { emoji: '🥘', name: 'Sarmalele și paella', t: 'りょうほう つくったら どう です か。', ro: 'Ce-ar fi să le faceți pe amândouă?' },
  'ja-cap23': { emoji: '🌼', name: 'Acul de păr al mamei', t: 'もらって ください。', ro: 'Te rog să-l primești.' },
  'ja-cap24': { emoji: '🏮', name: 'Felinarul roșu al lui Kenji', t: 'かぞく が いれば、どこ でも うち だ。', ro: 'Dacă e familia aici, oriunde e acasă.' },
  'ja-cap25': { emoji: '📸', name: 'Poza Sakurei de la nuntă', t: 'いっしょう、この かお で いて ね。', ro: 'Să aveți fețele astea toată viața.' },
}

export interface Stamp {
  lang: LangCode
  level: string
  unitId: string
  lesson: Lesson
  at: number
}

/** Capitolele terminate (ambele ședințe + toate temele), cu data ultimei părți terminate. */
export function stamps(chapters: ChapterRow[], homework: HomeworkRow[]): Stamp[] {
  const ch = new Map(chapters.map((c) => [c.id, c]))
  const out: Stamp[] = []
  for (const course of COURSES) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (!lesson.chapter) continue
        const row = ch.get(lesson.id)
        const hw = homework.filter((h) => h.lessonId === lesson.id && h.done)
        if (!row?.s1 || !row?.s2 || hw.length < lesson.chapter.homework.length) continue
        out.push({ lang: course.lang, level: unit.level, unitId: unit.id, lesson, at: Math.max(row.s1, row.s2, ...hw.map((h) => h.at)) })
      }
    }
  }
  return out
}

/** Capitolele (cu poveste) dintr-un nivel, pentru a ști câte ștampile are pagina. */
export function levelChapters(course: Course, level: string) {
  return course.units.filter((u) => u.level === level).flatMap((u) => u.lessons.filter((l) => l.chapter).map((l) => ({ unitId: u.id, lesson: l })))
}

/** O mică rotație „întâmplătoare”, dar mereu aceeași pentru același capitol. */
export function tilt(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return ((h % 15) + 15) % 15 - 7
}
