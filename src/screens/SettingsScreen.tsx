declare const __BUILD__: string
import { Flag } from '../components/Flag'
import { useEffect, useRef, useState } from 'react'
import { COURSES } from '../content'
import { exportProgress, importProgress } from '../db'
import { SEASONS, type Season } from '../season'
import { setSettings, recordedVoicesOn, useSettings, type Settings } from '../settings'
import { allVoices, canListen, onVoices, speak, voiceFor, voiceId, voicesFor } from '../speech'
import { TopBar } from '../components/ui'
import { audioLessons, downloadLang, downloadedCount, loadAudioIndex } from '../audio'
import { UI_LANGS, t, tn, langWord } from '../i18n'

export function SettingsScreen({ user, signOut }: { user: string; signOut: () => void }) {
  const s = useSettings()
  const [, force] = useState(0)
  const [storage, setStorage] = useState<{ used: number; quota: number; persisted: boolean } | null>(null)
  const [msg, setMsg] = useState('')
  const file = useRef<HTMLInputElement>(null)

  useEffect(() => onVoices(() => force((n) => n + 1)), [])
  useEffect(() => {
    (async () => {
      const est = await navigator.storage?.estimate?.()
      const persisted = (await navigator.storage?.persisted?.()) ?? false
      if (est) setStorage({ used: est.usage ?? 0, quota: est.quota ?? 0, persisted })
    })()
  }, [])

  const doExport = async () => {
    const blob = new Blob([await exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `poliglot-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const doImport = async (f: File) => {
    try {
      await importProgress(await f.text())
      setMsg(t('✔ Progresul a fost importat.'))
    } catch (e) {
      setMsg(`✘ ${(e as Error).message}`)
    }
  }

  const persist = async () => {
    const ok = await navigator.storage?.persist?.()
    setStorage((st) => (st ? { ...st, persisted: !!ok } : st))
  }

  const seg = <K extends keyof Settings>(key: K, options: [Settings[K], string][]) => (
    <div className="segmented wrap">
      {options.map(([v, label]) => (
        <button key={String(v)} className={s[key] === v ? 'on' : ''} onClick={() => setSettings({ [key]: v } as Partial<Settings>)}>{label}</button>
      ))}
    </div>
  )

  return (
    <div className="screen settings">
      <TopBar title={t('Setări')} />

      <article className="card">
        <h3>🌐 {t('Limba aplicației')}</h3>
        <div className="segmented wrap">
          {UI_LANGS.map((l) => (
            <button key={l.code} className={(s.ui ?? 'ro') === l.code ? 'on' : ''} onClick={() => setSettings({ ui: l.code })}>{l.name}</button>
          ))}
        </div>
        <p className="muted small">{t('Meniurile, explicațiile și traducerile apar în limba aleasă.')}</p>
      </article>

      <article className="card account">
        <h3>👤 {t('Cont')}</h3>
        <p>{t('Ești conectat ca')} <b>{user}</b>. {t('Progresul tău e separat de al altor utilizatori.')}</p>
        <button className="btn" onClick={() => { if (window.confirm(t('Ieși din cont?'))) signOut() }}>{t('Ieși din cont / schimbă utilizatorul')}</button>
      </article>

      <article className="card">
        <h3>🎨 {t('Aspect')}</h3>
        <label className="field-label">{t('Anotimp')}</label>
        {seg('season', [['auto', `🗓️ ${t('Automat')}`], ...(Object.keys(SEASONS) as Season[]).map((k) => [k, `${SEASONS[k].emoji} ${t(SEASONS[k].name)}`] as [Season, string])])}
        <label className="field-label">{t('Zi / noapte')}</label>
        {seg('time', [['auto', `🕒 ${t('După oră')}`], ['day', `☀️ ${t('Zi')}`], ['night', `🌙 ${t('Noapte')}`]])}
        <label className="toggle"><input type="checkbox" checked={s.particles} onChange={(e) => setSettings({ particles: e.target.checked })} /> {t('Animații de fundal (petale, frunze, zăpadă)')}</label>
        <label className="field-label">{t('Animația cu cartea la pornire')}</label>
        {seg('intro', [['daily', t('O dată pe zi')], ['always', t('Mereu')], ['never', t('Niciodată')]])}
      </article>

      <article className="card">
        <h3>🔊 {t('Voce și pronunție')}</h3>
        <RecordedVoices on={recordedVoicesOn(s)} />
        <label className="toggle"><input type="checkbox" checked={s.autoplay} onChange={(e) => setSettings({ autoplay: e.target.checked })} /> {t('Redă automat pronunția')}</label>
        <label className="toggle"><input type="checkbox" checked={s.romaji} onChange={(e) => setSettings({ romaji: e.target.checked })} /> {t('Arată romaji la japoneză')}</label>
        <label className="field-label">{t('Viteza vocii: {n}×', { n: s.rate.toFixed(2) })}</label>
        <input type="range" min={0.5} max={1.3} step={0.05} value={s.rate} onChange={(e) => setSettings({ rate: Number(e.target.value) })} />
        {COURSES.map((c) => {
          const list = voicesFor(c.lang)
          return (
            <div key={c.lang} className="voice-row">
              <label className="field-label"><Flag lang={c.lang} size={18} /> {t(c.name)}</label>
              {list.length ? (
                <>
                  {([['', `🔤 ${t('Voce pentru cuvinte')}`, undefined], [':f', `👩 ${t('Voce pentru femei')}`, 'f'], [':m', `👨 ${t('Voce pentru bărbați')}`, 'm']] as const).map(([suffix, label, gender]) => {
                    const key = c.lang + suffix
                    const cur = gender ? voiceFor(c.lang, gender) : list.find((v) => voiceId(v) === s.voices[key]) ?? list.find((v) => v.voiceURI === s.voices[key]) ?? list[0]
                    return (
                      <div key={key} className="voice-line">
                        <span className="muted small">{label}</span>
                        <div className="voice-pick">
                          <select value={cur ? voiceId(cur) : ''} onChange={(e) => setSettings({ voices: { ...s.voices, [key]: e.target.value } })}>
                            {list.map((v, i) => <option key={`${voiceId(v)}-${i}`} value={voiceId(v)}>{v.name}{v.localService ? ' · offline' : ' · online'}</option>)}
                          </select>
                          <button className="btn" onClick={() => speak(c.hello, c.lang, c.locale, undefined, gender ? { gender } : {})}>▶</button>
                        </div>
                      </div>
                    )
                  })}
                  <div className="muted small">{tn(list.length, '{n} voce găsită pe acest aparat.', '{n} voci găsite pe acest aparat.')}</div>
                </>
              ) : (
                <div className="warn">{t('Nicio voce instalată pentru {lang}. Vezi instrucțiunile de mai jos.', { lang: langWord(c.name) })}</div>
              )}
            </div>
          )
        })}
        <details className="help">
          <summary>{t('Cum instalez voci offline gratuite?')}</summary>
          <p><b>Windows:</b> {t('Setări → Oră și limbă → Vorbire → Adăugați voci → alege Spaniolă (Spania), Italiană, Japoneză. Repornește browserul.')}</p>
          <p><b>Android:</b> {t('Setări → Sistem → Limbi → Ieșire text în vorbire → Serviciul Google → Instalează date vocale → descarcă spaniolă, italiană, japoneză.')}</p>
          <p><b>iPhone:</b> {t('Setări → Accesibilitate → Conținut vorbit → Voci → alege limba și descarcă o voce „Îmbunătățită”.')}</p>
        </details>
        <details className="help">
          <summary>🔍 {t('Diagnostic: toate vocile primite de la browser ({n})', { n: allVoices().length })}</summary>
          <p className="muted small">{t('Lista brută, fără niciun filtru. Dacă o voce descărcată nu apare aici, browserul nu o dă aplicației.')}</p>
          {COURSES.map((c) => {
            const vs = allVoices().filter((v) => v.lang.toLowerCase().startsWith(c.lang))
            return (
              <div key={c.lang} className="voice-diag-group">
                <b>{t(c.name)} ({vs.length})</b>
                <ul className="voice-diag">
                  {vs.map((v, i) => <li key={i}>{v.name} · {v.lang}{v.localService ? '' : ' (online)'}{v.default ? ` · ${t('implicită')}` : ''}</li>)}
                  {!vs.length && <li>{t('nicio voce')}</li>}
                </ul>
              </div>
            )
          })}
          <p className="muted small">{t('Alte limbi: {n} voci.', { n: allVoices().filter((v) => !COURSES.some((c) => v.lang.toLowerCase().startsWith(c.lang))).length })}</p>
        </details>
        <p className="muted small">{t('Versiunea aplicației: {v}', { v: __BUILD__ })}</p>
        <p className="muted small">{t('Verificarea pronunției prin microfon:')} {canListen() ? t('disponibilă (are nevoie de internet).') : t('indisponibilă în acest browser. Folosește Chrome sau Edge.')}</p>
      </article>

      <article className="card">
        <h3>💾 {t('Progres și stocare')}</h3>
        {storage && (
          <p className="muted small">
            {t('Folosit: {used} MB din {quota} GB disponibili', { used: (storage.used / 1024 / 1024).toFixed(1), quota: (storage.quota / 1024 / 1024 / 1024).toFixed(1) })} ·{' '}
            {storage.persisted ? t('stocare protejată ✔') : t('stocare neprotejată')}
          </p>
        )}
        {storage && !storage.persisted && <button className="btn" onClick={persist}>🔒 {t('Protejează datele de ștergere automată')}</button>}
        <div className="row">
          <button className="btn" onClick={doExport}>⬇ {t('Exportă progresul')}</button>
          <button className="btn" onClick={() => file.current?.click()}>⬆ {t('Importă progres')}</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
        </div>
        <p className="muted small">{t('Folosește exportul ca să muți progresul între telefon și laptop.')}</p>
        {msg && <p>{msg}</p>}
      </article>

      <article className="card">
        <h3>ℹ️ {t('Despre')}</h3>
        <p className="muted small">{t('Poliglot funcționează complet offline după prima deschidere. Surse deschise: Wikimedia Commons (poze), KanjiVG (CC BY-SA 3.0), Kokoro (voci, Apache 2.0).')}</p>
      </article>
    </div>
  )
}

/** Vocile înregistrate dinainte: comutator și descărcare pentru offline. */
function RecordedVoices({ on }: { on: boolean }) {
  const [, force] = useState(0)
  const [saved, setSaved] = useState<Record<string, number>>({})
  const [busy, setBusy] = useState<Record<string, string>>({})
  useEffect(() => {
    let alive = true
    Promise.all(COURSES.map((c) => loadAudioIndex(c.lang))).then(async () => {
      const m: Record<string, number> = {}
      for (const c of COURSES) m[c.lang] = await downloadedCount(c.lang)
      if (alive) { setSaved(m); force((x) => x + 1) }
    })
    return () => { alive = false }
  }, [])
  const total = (lang: string) => new Set(Object.values(audioLessons(lang)).flat()).size
  const langs = COURSES.filter((c) => total(c.lang) > 0)
  return (
    <div className="recorded-box">
      <label className="toggle"><input type="checkbox" checked={on} onChange={(e) => setSettings({ recorded: e.target.checked })} /> {t('Folosește vocile înregistrate (voce de femeie și de bărbat, la fel pe orice telefon)')}</label>
      {on && langs.map((c) => {
        const all = total(c.lang)
        const have = saved[c.lang] ?? 0
        return (
          <div key={c.lang} className="recorded-row">
            <span><Flag lang={c.lang} size={16} /> {t('{lang}: {have} / {all} replici salvate pe telefon', { lang: t(c.name), have: Math.min(have, all), all })}</span>
            <button className="btn" disabled={!!busy[c.lang] || have >= all} onClick={async () => {
              setBusy((b) => ({ ...b, [c.lang]: '0%' }))
              await downloadLang(c.lang, (d, n) => setBusy((b) => ({ ...b, [c.lang]: Math.round((d / n) * 100) + '%' })))
              const n = await downloadedCount(c.lang)
              setSaved((m) => ({ ...m, [c.lang]: n }))
              setBusy((b) => ({ ...b, [c.lang]: '' }))
            }}>{busy[c.lang] ? `⬇ ${busy[c.lang]}` : have >= all ? `✓ ${t('Descărcat')}` : `⬇ ${t('Descarcă pentru offline')}`}</button>
          </div>
        )
      })}
      {on && !langs.length && <p className="muted small">{t('Vocile înregistrate se încarcă… (au nevoie de internet prima dată).')}</p>}
    </div>
  )
}
