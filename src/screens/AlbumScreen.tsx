import { t, tc, tk, tn, langWord } from '../i18n'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState, type ReactNode } from 'react'
import { Spotlight } from '../components/Spotlight'
import { Flag } from '../components/Flag'
import { TopBar } from '../components/ui'
import { COURSES, getCourse } from '../content'
import type { LangCode, Lesson } from '../content/types'
import { db } from '../db'
import { KEEPSAKES } from '../journey'
import { speak } from '../speech'
import { ALL_REWARDS, RewardCard, RewardLocked, isAdmin, studyDays, type Reward } from '../components/RewardCard'
import SESSION_PLACES from '../content/session-places.json'
import { MILESTONES, StreakCard, longestStreak } from '../components/StreakCard'
import { buildSyllabus } from './CourseScreen'

/** Fraza de pe spatele cartonașului: obiectul special sau prima replică din dialogul capitolului. */
function backOf(lesson: Lesson) {
  const k = KEEPSAKES[lesson.id]
  if (k) return { t: k.t, ro: tc(k.ro), gender: undefined }
  const d = lesson.chapter?.dialogue
  const line = d?.lines[0]
  return { t: line?.t ?? tc(lesson.title), ro: line?.ro ? tc(line.ro) : '', gender: line?.who ? d?.cast?.[line.who] : undefined }
}

/** Cartonașul special de la Teme: obiectul sau scena din povestea capitolului; se întoarce la atingere. */
function SpecialCard({ lesson, lang, label, onOpen }: { lesson: Lesson; lang: LangCode; label: string; onOpen?: () => void }) {
  const [flipped, setFlipped] = useState(false)
  const kk = KEEPSAKES[lesson.id]
  const b = backOf(lesson)
  const locale = getCourse(lang).locale
  return (
    <button className={'album-card gold ' + (flipped ? 'flipped' : '')} onClick={() => (onOpen ? onOpen() : setFlipped(!flipped))}>
      <div className="album-inner">
        <div className="album-face">
          <span className="album-emoji">{kk?.emoji ?? lesson.emoji}</span>
          <b>{tc(kk?.name ?? lesson.title)}</b>
          <small>{label}</small>
        </div>
        <div className="album-face album-back">
          <span className={lang === 'ja' ? 'jp' : ''}>{b.t}</span>
          <small>{b.ro}</small>
          <span className="album-play" onClick={(e) => { e.stopPropagation(); speak(b.t, lang, locale, undefined, b.gender ? { gender: b.gender } : {}) }}>🔊</span>
        </div>
      </div>
    </button>
  )
}

export function AlbumScreen({ back, user }: { back: () => void; user: string }) {
  const admin = isAdmin(user)
  const [cityLang, setCityLang] = useState<string>('all')
  const chapters = useLiveQuery(() => db.chapters.toArray(), [], [])
  const homework = useLiveQuery(() => db.homework.toArray(), [], [])
  const [lang, setLang] = useState<LangCode>('es')
  const [spot, setSpot] = useState<ReactNode>(null)
  const days = useLiveQuery(() => db.days.toArray(), [], [])
  const doneLessons = useLiveQuery(() => db.lessons.toArray(), [], [])
  const earned = studyDays(days)
  const course = getCourse(lang)

  return (
    <div className="screen">
      <TopBar title={`🃏 ${t('Albumul cu amintiri')}`} onBack={back} />
      <section className="reward-preview">
        {admin && <div className="admin-banner">👑 {t('Mod admin: toate cartonașele sunt deblocate')}</div>}
        <h3>🏙️ {t('Locurile tale')} <span className="muted small">({t('{n} din {all}', { n: admin ? ALL_REWARDS.length : Math.min(earned.length, ALL_REWARDS.length), all: ALL_REWARDS.length })})</span></h3>
        <p className="muted small">{t('În fiecare zi în care înveți câștigi un cartonaș nou: un loc unde se vorbește limba pe care o înveți, cu ceva special din el și un fun fact despre limbă (atinge cartonașul). La fiecare a 7-a zi, rama e aurie.')}</p>
        {admin && (
          <div className="segmented wrap">
            {[['all', tk('Toate')], ['es', tk('Spaniolă')], ['ja', tk('Japoneză')], ['it', tk('Italiană')], ['fr', tk('Franceză')], ['ro', tk('România')]].map(([k, label]) => (
              <button key={k} className={cityLang === k ? 'on' : ''} onClick={() => setCityLang(k)}>{t(label)}</button>
            ))}
          </div>
        )}
        <div className="reward-grid">
          {admin
            ? ALL_REWARDS.map((r, i) => ({ r, i })).filter(({ r }) => cityLang === 'all' || r.lang === cityLang).map(({ r, i }) => <RewardCard key={r.img} reward={r} day={i + 1} onOpen={() => setSpot(<RewardCard reward={r} day={i + 1} />)} />)
            : <>
              {earned.length === 0 && <RewardCard reward={ALL_REWARDS[0]} day={1} preview onOpen={() => setSpot(<RewardCard reward={ALL_REWARDS[0]} day={1} preview />)} />}
              {earned.slice(0, ALL_REWARDS.length).map((date, i) => <RewardCard key={date} reward={ALL_REWARDS[i]} day={i + 1} date={date} onOpen={() => setSpot(<RewardCard reward={ALL_REWARDS[i]} day={i + 1} date={date} />)} />)}
              {earned.length < ALL_REWARDS.length && earned.length > 0 && <RewardLocked day={earned.length + 1} />}
            </>}
        </div>
      </section>
      <section className="reward-preview">
        <h3>✨ {t('Cartonașe speciale pentru serie')}</h3>
        <p className="muted small">{t('La 3, 7, 10, 20, 30… zile la rând primești un cartonaș holografic.')} {t('Cea mai lungă serie a ta:')} <b>{longestStreak(days)}</b> {tn(longestStreak(days), 'zi', 'zile')}.</p>
        <div className="reward-grid">
          {MILESTONES.map((n) => (!admin && longestStreak(days) < n
            ? <StreakCard key={n} n={n} locked />
            : <button key={n} className="holo-btn" onClick={() => setSpot(<StreakCard n={n} />)}><StreakCard n={n} /></button>))}
        </div>
      </section>
      <h3 className="section-title">📚 {t('Cartonașele ședințelor')}</h3>
      <p className="muted small">{t('Fiecare ședință terminată îți aduce un loc din lumea limbii respective. Ultima ședință din capitol (Temele) îți aduce un cartonaș special, auriu, cu povestea capitolului.')}</p>
      <div className="segmented">
        {COURSES.map((c) => (
          <button key={c.lang} className={c.lang === lang ? 'on' : ''} onClick={() => setLang(c.lang)}><Flag lang={c.lang} size={16} /> {t(c.name)}</button>
        ))}
      </div>
      {(() => {
        const places = (SESSION_PLACES as Reward[]).filter((p) => p.lang === lang)
        const syl = buildSyllabus(lang, chapters.filter((c) => c.lang === lang), homework, new Set(doneLessons.map((l) => l.id)))
        let k = 0
        const rows = syl.flatMap((u) => u.lessons).map(({ lesson, items }) => ({
          lesson,
          cards: items.map((it, i) => {
            const special = !!lesson.chapter && i === items.length - 1
            return { it, special, place: special ? undefined : places[k++] }
          }),
        }))
        const all = rows.flatMap((r) => r.cards)
        const have = all.filter((c) => admin || c.it.status === 'done').length
        return (
          <>
            <p className="muted small">{t('{n} din {all} cartonașe la {lang}.', { n: have, all: all.length, lang: langWord(course.name) })}</p>
            {rows.map(({ lesson, cards }) => (
              <section key={lesson.id} className="album-row">
                <div className="album-row-title">{lesson.emoji} {lesson.chapter ? `${t('Cap. {n}', { n: lesson.chapter.number })} · ${tc(lesson.title)}` : tc(lesson.title)}</div>
                <div className="reward-grid album-row-grid">
                  {cards.map(({ it, special, place }) => {
                    const owned = admin || it.status === 'done'
                    const label = special ? `⭐ ${t('Teme')} · ${t('Ședința {n}', { n: it.n })}` : t('Ședința {n}', { n: it.n })
                    if (special) {
                      if (!owned) return <div key={it.n} className="album-card locked gold"><div className="album-face"><span className="album-q">⭐</span><small>{label}</small></div></div>
                      return <SpecialCard key={it.n} lesson={lesson} lang={lang} label={label} onOpen={() => setSpot(<SpecialCard lesson={lesson} lang={lang} label={label} />)} />
                    }
                    if (!place) return <RewardLocked key={it.n} day={it.n} label={label} title={t('Loc nou, în curând')} />
                    return owned ? <RewardCard key={it.n} reward={place} day={it.n} label={label} gold={false} onOpen={() => setSpot(<RewardCard reward={place} day={it.n} label={label} gold={false} />)} /> : <RewardLocked key={it.n} day={it.n} label={label} />
                  })}
                </div>
              </section>
            ))}
          </>
        )
      })()}
      {spot && <Spotlight onClose={() => setSpot(null)}>{spot}</Spotlight>}
    </div>
  )
}
