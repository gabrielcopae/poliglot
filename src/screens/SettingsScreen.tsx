declare const __BUILD__: string
import { Flag } from '../components/Flag'
import { useEffect, useRef, useState } from 'react'
import { COURSES } from '../content'
import { exportProgress, importProgress } from '../db'
import { SEASONS, type Season } from '../season'
import { setSettings, useSettings, type Settings } from '../settings'
import { allVoices, canListen, onVoices, speak, voiceFor, voiceId, voicesFor } from '../speech'
import { TopBar } from '../components/ui'

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
      setMsg('✔ Progresul a fost importat.')
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
      <TopBar title="Setări" />

      <article className="card account">
        <h3>👤 Cont</h3>
        <p>Ești conectat ca <b>{user}</b>. Progresul tău e separat de al altor utilizatori.</p>
        <button className="btn" onClick={() => { if (window.confirm('Ieși din cont?')) signOut() }}>Ieși din cont / schimbă utilizatorul</button>
      </article>

      <article className="card">
        <h3>🎨 Aspect</h3>
        <label className="field-label">Anotimp</label>
        {seg('season', [['auto', '🗓️ Automat'], ...(Object.keys(SEASONS) as Season[]).map((k) => [k, `${SEASONS[k].emoji} ${SEASONS[k].name}`] as [Season, string])])}
        <label className="field-label">Zi / noapte</label>
        {seg('time', [['auto', '🕒 După oră'], ['day', '☀️ Zi'], ['night', '🌙 Noapte']])}
        <label className="toggle"><input type="checkbox" checked={s.particles} onChange={(e) => setSettings({ particles: e.target.checked })} /> Animații de fundal (petale, frunze, zăpadă)</label>
        <label className="field-label">Animația cu cartea la pornire</label>
        {seg('intro', [['daily', 'O dată pe zi'], ['always', 'Mereu'], ['never', 'Niciodată']])}
      </article>

      <article className="card">
        <h3>🔊 Voce și pronunție</h3>
        <label className="toggle"><input type="checkbox" checked={s.autoplay} onChange={(e) => setSettings({ autoplay: e.target.checked })} /> Redă automat pronunția</label>
        <label className="toggle"><input type="checkbox" checked={s.romaji} onChange={(e) => setSettings({ romaji: e.target.checked })} /> Arată romaji la japoneză</label>
        <label className="field-label">Viteza vocii: {s.rate.toFixed(2)}×</label>
        <input type="range" min={0.5} max={1.3} step={0.05} value={s.rate} onChange={(e) => setSettings({ rate: Number(e.target.value) })} />
        {COURSES.map((c) => {
          const list = voicesFor(c.lang)
          return (
            <div key={c.lang} className="voice-row">
              <label className="field-label"><Flag lang={c.lang} size={18} /> {c.name}</label>
              {list.length ? (
                <>
                  {([['', '🔤 Voce pentru cuvinte', undefined], [':f', '👩 Voce pentru femei', 'f'], [':m', '👨 Voce pentru bărbați', 'm']] as const).map(([suffix, label, gender]) => {
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
                  <div className="muted small">{list.length} {list.length === 1 ? 'voce găsită' : 'voci găsite'} pe acest aparat.</div>
                </>
              ) : (
                <div className="warn">Nicio voce instalată pentru {c.name.toLowerCase()}. Vezi instrucțiunile de mai jos.</div>
              )}
            </div>
          )
        })}
        <details className="help">
          <summary>Cum instalez voci offline gratuite?</summary>
          <p><b>Windows:</b> Setări → Oră și limbă → Vorbire → Adăugați voci → alege Spaniolă (Spania), Italiană, Japoneză. Repornește browserul.</p>
          <p><b>Android:</b> Setări → Sistem → Limbi → Ieșire text în vorbire → Serviciul Google → Instalează date vocale → descarcă spaniolă, italiană, japoneză.</p>
          <p><b>iPhone:</b> Setări → Accesibilitate → Conținut vorbit → Voci → alege limba și descarcă o voce „Îmbunătățită”.</p>
          <p className="muted">În etapa următoare aplicația va avea propria voce descărcabilă (Kokoro), de calitate mai bună, identică pe toate dispozitivele.</p>
        </details>
        <details className="help">
          <summary>🔍 Diagnostic: toate vocile primite de la browser ({allVoices().length})</summary>
          <p className="muted small">Lista brută, fără niciun filtru. Dacă o voce descărcată nu apare aici, browserul nu o dă aplicației.</p>
          {(['es', 'ja', 'it'] as const).map((code) => {
            const vs = allVoices().filter((v) => v.lang.toLowerCase().startsWith(code))
            return (
              <div key={code} className="voice-diag-group">
                <b>{code === 'es' ? 'Spaniolă' : code === 'ja' ? 'Japoneză' : 'Italiană'} ({vs.length})</b>
                <ul className="voice-diag">
                  {vs.map((v, i) => <li key={i}>{v.name} · {v.lang}{v.localService ? '' : ' (online)'}{v.default ? ' · implicită' : ''}</li>)}
                  {!vs.length && <li>nicio voce</li>}
                </ul>
              </div>
            )
          })}
          <p className="muted small">Alte limbi: {allVoices().filter((v) => !/^(es|ja|it)/i.test(v.lang)).length} voci.</p>
        </details>
        <p className="muted small">Versiunea aplicației: {__BUILD__}</p>
        <p className="muted small">Verificarea pronunției prin microfon: {canListen() ? 'disponibilă (are nevoie de internet).' : 'indisponibilă în acest browser. Folosește Chrome sau Edge.'}</p>
      </article>

      <article className="card">
        <h3>💾 Progres și stocare</h3>
        {storage && (
          <p className="muted small">
            Folosit: {(storage.used / 1024 / 1024).toFixed(1)} MB din {(storage.quota / 1024 / 1024 / 1024).toFixed(1)} GB disponibili ·{' '}
            {storage.persisted ? 'stocare protejată ✔' : 'stocare neprotejată'}
          </p>
        )}
        {storage && !storage.persisted && <button className="btn" onClick={persist}>🔒 Protejează datele de ștergere automată</button>}
        <div className="row">
          <button className="btn" onClick={doExport}>⬇ Exportă progresul</button>
          <button className="btn" onClick={() => file.current?.click()}>⬆ Importă progres</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
        </div>
        <p className="muted small">Folosește exportul ca să muți progresul între telefon și laptop.</p>
        {msg && <p>{msg}</p>}
      </article>

      <article className="card">
        <h3>ℹ️ Despre</h3>
        <p className="muted small">Poliglot v0.1 · funcționează complet offline după prima deschidere. Surse deschise folosite în etapele următoare: Tatoeba (CC BY 2.0 FR), JMdict/EDRDG (CC BY-SA 4.0), KanjiVG (CC BY-SA 3.0).</p>
      </article>
    </div>
  )
}
