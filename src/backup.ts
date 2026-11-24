import { exportProgress, importProgress } from './db'
import { localGet, localSet } from './settings'

/** Copia de rezervă locală: un fișier JSON salvat de utilizator (Descărcări / Drive). */

const key = (user: string) => `poliglot.lastBackup.${user}`

/** Când a fost salvată ultima copie (ms), sau 0 dacă niciodată. */
export function lastBackup(user: string): number {
  return Number(localGet(key(user)) ?? 0)
}

/** Zilele trecute de la ultima copie (Infinity dacă niciodată). */
export function daysSinceBackup(user: string): number {
  const t = lastBackup(user)
  return t ? Math.floor((Date.now() - t) / 86400000) : Infinity
}

/** Salvează progresul într-un fișier. Pe telefon încearcă meniul de partajare (Drive, Fișiere…). */
export async function saveBackup(user: string): Promise<void> {
  const json = await exportProgress()
  const name = `poliglot-${user}-${new Date().toISOString().slice(0, 10)}.json`
  const file = new File([json], name, { type: 'application/json' })
  const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean }
  const mobile = window.matchMedia?.('(pointer: coarse)').matches
  if (mobile && nav.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: 'Poliglot' })
      localSet(key(user), String(Date.now()))
      return
    } catch (e) {
      if ((e as Error).name === 'AbortError') throw e
      // altfel: descărcare obișnuită
    }
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  localSet(key(user), String(Date.now()))
}

/** Restaurează progresul dintr-un fișier de rezervă. */
export async function restoreBackup(user: string, f: File): Promise<void> {
  await importProgress(await f.text())
  localSet(key(user), String(Date.now()))
}
