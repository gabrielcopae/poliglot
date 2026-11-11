import { t, tc } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { RewardCard, isAdmin, type Reward } from '../components/RewardCard'
import { Spotlight } from '../components/Spotlight'
import { COURSES, getCourse } from '../content'
import SESSION_PLACES from '../content/session-places.json'
import type { LangCode } from '../content/types'
import { db } from '../db'
import { buildSyllabus } from './CourseScreen'

/** Trenul limbilor: fiecare ședință terminată duce trenul la următoarea gară (un loc din lumea limbii). */
export function TrainScreen({ back, user }: { back: () => void; user: string }) {
  const admin = isAdmin(user)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const doneLessons = useLiveQuery(() => db.lessons.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const [spot, setSpot] = useState<ReactNode>(null)
  const here = useRef<HTMLDivElement>(null)

  const places = (SESSION_PLACES as Reward[]).filter((p) => p.lang === lang)
  const items = buildSyllabus(lang, chapters.filter((c) => c.lang === lang), homework, new Set(doneLessons.map((l) => l.id)))
    .flatMap((u) => u.lessons)
    .flatMap(({ lesson, items: its }) => its.map((it, i) => ({ it, lesson, special: !!lesson.chapter && i === its.length - 1 })))
  let k = 0
  const stations = items.map((x) => ({ ...x, place: x.special ? undefined : places[k++] }))
  const done = admin ? stations.length : stations.filter((s) => s.it.status === 'done').length
  // trenul stă la ultima gară la care ai ajuns (ședințele terminate, în ordine)
  const pos = admin ? stations.length - 1 : Math.max(0, stations.findIndex((s) => s.it.status !== 'done') - 1)
  const visible = stations.slice(0, Math.min(stations.length, pos + 6))

  useEffect(() => { here.current?.scrollIntoView({ block: 'center' }) }, [lang])

  return (
    <div className="screen">
      <TopBar title={`🚂 ${t('Trenul limbilor')}`} onBack={back} />
      <div className="segmented">
        {COURSES.map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => setLang(c.lang)}><Flag lang={c.lang} size={16} /> {t(c.name)}</button>
        ))}
      </div>
      <p className="muted small">{t('Ai trecut prin {n} din {all} gări. Fiecare ședință terminată duce trenul mai departe; la fiecare gară descoperi un loc și o curiozitate despre limba ei.', { n: done, all: stations.length })}</p>
      <div className="track">
        {visible.map((s, i) => {
          const passed = admin || s.it.status === 'done'
          const isHere = i === pos && (passed || i === 0)
          const label = s.special ? `⭐ ${t('Cap. {n} terminat', { n: s.lesson.chapter!.number })}` : s.place ? tc(s.place.city) : t('Gară nouă, în curând')
          return (
            <div key={s.it.n} ref={isHere ? here : undefined} className={`station ${passed ? 'passed' : ''} ${s.special ? 'special' : ''} ${isHere ? 'here' : ''}`}>
              <div className="station-dot">{isHere ? '🚂' : passed ? (s.special ? '⭐' : '●') : '○'}</div>
              <button className="station-body" disabled={!passed || !s.place} onClick={() => s.place && setSpot(<RewardCard reward={s.place} day={s.it.n} label={`${t('Gara {n}', { n: i + 1 })} · ${t('Ședința {n}', { n: s.it.n })}`} gold={false} />)}>
                {s.place && passed && <span className="station-thumb" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}rewards/${s.place.img})` }} />}
                <span className="station-text">
                  <b>{passed || i <= pos + 1 ? label : '???'}</b>
                  <small>{s.place ? `${tc(s.place.landmark)} · ${tc(s.place.country)}` : tc(s.lesson.title)} · {t('Ședința {n}', { n: s.it.n })}</small>
                </span>
              </button>
            </div>
          )
        })}
        {visible.length < stations.length && <div className="station more">… {t('încă {n} gări până la capătul liniei', { n: stations.length - visible.length })}</div>}
      </div>
      {spot && <Spotlight onClose={() => setSpot(null)}>{spot}</Spotlight>}
    </div>
  )
}
