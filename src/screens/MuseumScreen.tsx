import { t, tc } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState, type ReactNode } from 'react'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { isAdmin } from '../components/RewardCard'
import { Spotlight } from '../components/Spotlight'
import { getCourse } from '../content'
import PEOPLE from '../content/people-data.json'
import type { LangCode } from '../content/types'
import { db } from '../db'
import { stamps } from '../journey'

interface Person { city: string; landmark: string; country: string; role: string; lang: string; fact: string; img: string; author: string; license: string }

/** Tabloul mare din muzeu: portret, nume, rol, locul nașterii și fun fact. */
function Portrait({ p, chapter }: { p: Person; chapter: number }) {
  return (
    <div className="museum-plaque">
      <div className="museum-photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}rewards/${p.img})` }} />
      <b>{tc(p.city)}</b>
      <small>{tc(p.role)}</small>
      <small>📍 {tc(p.landmark)}, {tc(p.country)}</small>
      <p>{tc(p.fact)}</p>
      <span className="museum-credit">{t('Capitolul {n}', { n: chapter })} · {t('Foto')}: {p.author.slice(0, 30)} · {p.license}</span>
    </div>
  )
}

/** Muzeul personalităților: o sală pentru fiecare limbă; portretele apar pe măsură ce câștigi ștampilele capitolelor. */
export function MuseumScreen({ back, user }: { back: () => void; user: string }) {
  const admin = isAdmin(user)
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const [spot, setSpot] = useState<ReactNode>(null)
  const got = new Set(stamps(chapters, homework).filter((s) => s.lang === lang).map((s) => s.lesson.chapter!.number))
  const people = (PEOPLE as Person[]).filter((p) => p.lang === lang)
  const langs: LangCode[] = ['es', 'ja']
  const have = admin ? people.length : people.filter((_, i) => got.has(i + 1)).length

  return (
    <div className="screen">
      <TopBar title={`🏛️ ${t('Muzeul personalităților')}`} onBack={back} />
      <div className="segmented">
        {langs.map((l) => (
          <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}><Flag lang={l} size={16} /> {t(getCourse(l).name)}</button>
        ))}
      </div>
      <p className="muted small">{t('Sala „{lang}”: {n} din {all} portrete. Fiecare capitol terminat aduce în muzeu personalitatea de pe ștampila lui. Atinge un tablou ca să-l vezi de aproape.', { lang: t(getCourse(lang).name), n: have, all: people.length })}</p>
      <div className="museum-wall">
        {people.map((p, i) => {
          const owned = admin || got.has(i + 1)
          return owned ? (
            <button key={p.img} className="museum-frame" onClick={() => setSpot(<Portrait p={p} chapter={i + 1} />)}>
              <div className="museum-photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}rewards/${p.img})` }} />
              <span className="museum-name">{tc(p.city)}</span>
            </button>
          ) : (
            <div key={p.img} className="museum-frame empty">
              <div className="museum-photo silhouette">👤</div>
              <span className="museum-name">{t('Capitolul {n}', { n: i + 1 })}</span>
            </div>
          )
        })}
      </div>
      {spot && <Spotlight onClose={() => setSpot(null)}>{spot}</Spotlight>}
    </div>
  )
}
