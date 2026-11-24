import { useRef, useState } from 'react'
import { daysSinceBackup, restoreBackup, saveBackup } from '../backup'
import { localGet, localSet } from '../settings'
import { t } from '../i18n'

/**
 * Pe ecranul principal:
 * - fără progres: oferă restaurarea dintr-o copie (după ștergerea datelor / reinstalare);
 * - cu progres și fără copie recentă (7 zile): o bandă discretă „Salvează”.
 */
export function BackupStrip({ user, hasProgress }: { user: string; hasProgress: boolean }) {
  const file = useRef<HTMLInputElement>(null)
  const [, force] = useState(0)
  const [msg, setMsg] = useState('')
  const skipKey = `poliglot.restoreSkipped.${user}`
  const [skipped, setSkipped] = useState(() => localGet(skipKey) === '1')

  const save = async () => {
    try {
      await saveBackup(user)
      setMsg(t('✔ Copia a fost salvată.'))
      force((n) => n + 1)
    } catch { /* anulat */ }
  }
  const restore = async (f: File) => {
    try {
      await restoreBackup(user, f)
      setMsg(t('✔ Progresul a fost importat.'))
    } catch (e) {
      setMsg(`✘ ${(e as Error).message}`)
    }
  }

  if (msg) return <p className="backup-msg">{msg}</p>

  if (!hasProgress) {
    if (skipped) return null
    return (
      <div className="card backup-card">
        <b>💾 {t('Ai o copie de rezervă?')}</b>
        <small>{t('Dacă ai mai folosit aplicația, alege fișierul salvat și continui de unde ai rămas.')}</small>
        <div className="row">
          <button className="btn primary" onClick={() => file.current?.click()}>{t('Restaurează dintr-o copie')}</button>
          <button className="btn" onClick={() => { localSet(skipKey, '1'); setSkipped(true) }}>{t('Încep de la zero')}</button>
        </div>
        <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && restore(e.target.files[0])} />
      </div>
    )
  }

  const days = daysSinceBackup(user)
  if (days < 7) return null
  return (
    <button className="card review-strip backup-strip" onClick={save}>
      <span className="plan-icon">💾</span>
      <span className="plan-body">
        <b>{t('Salvează o copie a progresului')}</b>
        <small>{days === Infinity ? t('Nu ai salvat încă nicio copie') : t('Ultima copie: acum {n} zile', { n: days })}</small>
      </span>
      <span className="due-go">▶</span>
    </button>
  )
}

/** Buton mic, mereu disponibil, jos pe ecranul principal. */
export function SaveButton({ user }: { user: string }) {
  const [done, setDone] = useState(false)
  return (
    <button className="btn ghost save-link" onClick={async () => { try { await saveBackup(user); setDone(true) } catch { /* anulat */ } }}>
      {done ? t('✔ Copia a fost salvată.') : `💾 ${t('Salvează o copie a progresului')}`}
    </button>
  )
}
