import { t, tc } from '../i18n'
import { useMemo, useState } from 'react'
import { Flag } from '../components/Flag'
import { allLessons, getCourse } from '../content'
import type { Course, LangCode, Reading } from '../content/types'
import { norm } from '../util'
import { SpeakButton, TopBar } from '../components/ui'

interface Entry {
  t: string
  ro: string
  r?: string
  note?: string
  source: string
  fromLesson: boolean
}

const bare = (x: string) => norm(x).replace(/^(el|la|los|las|un|una|il|lo|l|i|gli|le) /, '')

/** Adună toate cuvintele unui curs: vocabularul capitolelor plus cuvintele explicate în texte. */
function buildDictionary(course: Course): Entry[] {
  const map = new Map<string, Entry>()
  for (const lesson of allLessons(course)) {
    const src = lesson.chapter ? `Cap. ${lesson.chapter.number}` : lesson.title
    for (const w of lesson.words) {
      const key = bare(w.t)
      if (!map.has(key)) map.set(key, { t: w.t, ro: w.ro, r: w.r, note: w.note, source: src, fromLesson: true })
    }
    const readings: Reading[] = []
    if (lesson.chapter) {
      readings.push(lesson.chapter.dialogue)
      if (lesson.chapter.reading) readings.push(lesson.chapter.reading.reading)
      if (lesson.chapter.story) readings.push(lesson.chapter.story.reading)
      for (const h of lesson.chapter.homework) if (h.kind === 'reading') readings.push(h.reading)
    }
    for (const r of readings) {
      for (const [t, ro] of Object.entries(r.gloss ?? {})) {
        const key = bare(t)
        if (/^\d/.test(ro) || map.has(key)) continue // numerele scrise ca cifre și dublurile se sar
        map.set(key, { t, ro, source: src, fromLesson: false })
      }
    }
  }
  return [...map.values()].sort((a, b) => norm(a.t).replace(/^(el|la|los|las) /, '').localeCompare(norm(b.t).replace(/^(el|la|los|las) /, ''), course.lang))
}

export function DictionaryScreen({ lang, back }: { lang: LangCode; back: () => void }) {
  const course = getCourse(lang)
  const entries = useMemo(() => buildDictionary(course), [course])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<'all' | 'lessons'>('all')

  const query = norm(q)
  const shown = entries.filter((e) => (filter === 'all' || e.fromLesson) && (!query || norm(e.t).includes(query) || norm(tc(e.ro)).includes(query) || (e.r && norm(e.r).includes(query))))
  const source = (s: string) => (s.startsWith('Cap. ') ? t('Cap. {n}', { n: s.slice(5) }) : tc(s))

  return (
    <div className="screen">
      <TopBar title={<><Flag lang={lang} size={26} /> {t('Dicționar')}</>} onBack={back} />
      <div className="dict-search">
        <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Caută un cuvânt sau o traducere…')} autoCapitalize="off" spellCheck={false} />
      </div>
      <div className="segmented">
        <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>{t('Toate')} ({entries.length})</button>
        <button className={filter === 'lessons' ? 'on' : ''} onClick={() => setFilter('lessons')}>{t('Doar din lecții')} ({entries.filter((e) => e.fromLesson).length})</button>
      </div>
      <p className="muted small">{t('Dicționarul crește cu fiecare capitol nou. Atinge 🔊 ca să auzi pronunția.')}</p>
      <div className="dict-list">
        {shown.slice(0, 400).map((e) => (
          <div key={e.t + e.source} className="dict-row">
            <SpeakButton text={e.t.replace(/[…]/g, '')} lang={lang} small />
            <div className="dict-body">
              <div className={`dict-word ${lang === 'ja' ? 'jp' : ''}`}>{e.t}{e.r && <span className="romaji"> · {e.r}</span>}</div>
              <div className="dict-ro">{tc(e.ro)}</div>
              {e.note && <div className="muted small">{tc(e.note)}</div>}
            </div>
            <span className="dict-src">{source(e.source)}</span>
          </div>
        ))}
        {!shown.length && <p className="muted center">{t('Niciun cuvânt găsit.')}</p>}
      </div>
    </div>
  )
}
