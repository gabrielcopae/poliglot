export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function today(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Normalizează un răspuns: litere mici, fără punctuație; opțional fără accente. */
export function norm(s: string, keepAccents = false): string {
  let x = s.toLowerCase().normalize('NFC')
    .replace(/[¿¡?!.,;:、。「」『』"'‘’…()\-—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!keepAccents) x = x.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC')
  return x
}

export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    prev = cur
  }
  return prev[n]
}

export function similarity(a: string, b: string): number {
  const x = norm(a).replace(/ /g, ''), y = norm(b).replace(/ /g, '')
  if (!x && !y) return 1
  return 1 - levenshtein(x, y) / Math.max(x.length, y.length)
}

export function formatInterval(ms: number): string {
  const min = ms / 60000
  if (min < 60) return `${Math.max(1, Math.round(min))} min`
  const h = min / 60
  if (h < 24) return `${Math.round(h)} h`
  const d = Math.round(h / 24)
  if (d < 30) return `${d} ${d === 1 ? 'zi' : 'zile'}`
  const mo = Math.round(d / 30)
  if (mo < 12) return `${mo} ${mo === 1 ? 'lună' : 'luni'}`
  return `${(d / 365).toFixed(1)} ani`
}
