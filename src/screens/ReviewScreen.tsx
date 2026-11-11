import { t, tc } from '../i18n'
import { Flag } from '../components/Flag'
import { useEffect, useState } from 'react'
import { getCourse, lookupWord } from '../content'
import type { LangCode } from '../content/types'
import { bumpDay, db, type CardRow } from '../db'
import { useSettings } from '../settings'
import { speak } from '../speech'
import { GRADES, grade, preview } from '../srs'
import { formatInterval } from '../util'
import { Progress, SpeakButton, TopBar } from '../components/ui'

/** Un cuvânt scos din conținut între timp: îl sărim. */
function SkipMissing({ onSkip }: { onSkip: () => void }) {
  useEffect(onSkip, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function ReviewScreen({ lang, back }: { lang?: LangCode; back?: () => void }) {
  const settings = useSettings()
  const [queue, setQueue] = useState<CardRow[] | null>(null)
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    const now = Date.now()
    const q = lang
      ? db.cards.where('[lang+due]').between([lang, 0], [lang, now]).toArray()
      : db.cards.where('due').belowOrEqual(now).toArray()
    q.then((rows) => setQueue(rows.sort((a, b) => a.due - b.due).slice(0, 100)))
  }, [lang])

  const card = queue?.[pos]
  const entry = card ? lookupWord(card.lang, card.wordId) : undefined

  useEffect(() => {
    if (card && entry && settings.autoplay) speak(entry.word.t, card.lang, entry.course.locale)
  }, [card?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const title = lang ? <><Flag lang={lang} size={26} /> {t('Repetiție')} · {t(getCourse(lang).name)}</> : t('Repetiție')

  if (!queue) return <div className="screen"><TopBar title={title} onBack={back} /></div>

  if (!card) {
    return (
      <div className="screen">
        <TopBar title={title} onBack={back} />
        <div className="card empty">
          <div className="done-emoji">{doneCount ? '✨' : '🌿'}</div>
          <h2>{doneCount ? t('Gata! Ai repetat {n} cuvinte.', { n: doneCount }) : t('Nimic de repetat acum')}</h2>
          <p className="muted">{t('Fă o lecție nouă sau revino mai târziu. Aplicația îți arată fiecare cuvânt chiar înainte să-l uiți.')}</p>
        </div>
      </div>
    )
  }

  if (!entry) return <SkipMissing onSkip={() => setPos(pos + 1)} />


  const { word, course } = entry
  const rate = async (r: (typeof GRADES)[number]['rating']) => {
    const updated = await grade(card, r)
    await bumpDay({ reviews: 1, xp: 1 })
    setDoneCount((n) => n + 1)
    setShown(false)
    // dacă revine azi în aceeași sesiune (sub 10 min), îl punem la coadă
    if (updated.due - Date.now() < 10 * 60 * 1000) setQueue((q) => [...(q ?? []), updated])
    setPos(pos + 1)
  }

  return (
    <div className="screen review">
      <TopBar title={title} onBack={back} right={<span className="muted small">{t('{n} rămase', { n: queue.length - pos })}</span>} />
      <Progress value={pos / queue.length} />
      <div className="card flash review-card" onClick={() => !shown && setShown(true)}>
        <div className="muted small"><Flag lang={course.lang} size={18} /> {t(course.name)}</div>
        <div className={`flash-word ${course.lang === 'ja' ? 'jp' : ''}`}>{word.t}</div>
        <SpeakButton text={word.t} lang={course.lang} />
        {shown ? (
          <div className="reveal">
            {word.r && settings.romaji && <div className="romaji">{word.r}</div>}
            <div className="flash-ro">{tc(word.ro)}</div>
          </div>
        ) : (
          <div className="muted">{t('Îți amintești ce înseamnă? Atinge ca să vezi.')}</div>
        )}
      </div>
      <div className="sticky-actions">
        {!shown ? (
          <button className="btn primary big" onClick={() => setShown(true)}>{t('Arată răspunsul')}</button>
        ) : (
          <div className="grades">
            {GRADES.map((g) => (
              <button key={g.label} className={`grade ${g.cls}`} onClick={() => rate(g.rating)}>
                <b>{t(g.label)}</b>
                <small>{formatInterval(preview(card, g.rating))}</small>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
