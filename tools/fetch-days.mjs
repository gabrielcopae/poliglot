// Pentru fiecare zi din an: sărbători / zile mondiale din Wikipedia în spaniolă (sau sfântul zilei)
// și zilele comemorative (記念日) din Wikipedia în japoneză. Scrie tools/out/days-raw.json (de tradus în română).
// Rulare: node tools/fetch-days.mjs
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const UA = { 'User-Agent': 'Poliglot-learning-app/1.0 (personal, non-commercial; github.com/gabrielcopae/poliglot)' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function wikitext(host, page) {
  for (let i = 0; i < 5; i++) {
    await sleep(1200)
    const r = await fetch(`https://${host}/w/api.php?action=parse&format=json&prop=wikitext&redirects=1&page=${encodeURIComponent(page)}`, { headers: UA })
    const t = await r.text()
    if (t.startsWith('{')) return JSON.parse(t).parse?.wikitext?.['*'] ?? ''
    await sleep(15000)
  }
  return ''
}
// textul curat al unei linii de listă din wikitext
const clean = (s) => s
  .split(/<br\s*\/?>/i)[0]
  .replace(/\{\{仮リンク\|([^|}]+)[^}]*\}\}/g, '$1')
  .replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>/g, '')
  .replace(/\{\{[^{}]*\}\}/g, '')
  .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
  .replace(/'''?|<[^>]+>/g, '')
  .replace(/^[*#:\s]+/, '')
  .replace(/\s+/g, ' ')
  .trim()
function section(text, names) {
  const lines = text.split('\n')
  const start = lines.findIndex((l) => /^==+/.test(l) && names.some((n) => l.includes(n)))
  if (start < 0) return []
  const level = lines[start].match(/^=+/)[0].length
  const out = []
  for (const l of lines.slice(start + 1)) {
    const m = l.match(/^(=+)/)
    if (m && m[1].length <= level) break
    if (/^\*(?![:*])/.test(l)) out.push(clean(l))
  }
  return out.filter((x) => x.length > 2 && x.length < 140)
}

const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const OUT = 'tools/out/days-raw.json'
const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}

for (let m = 1; m <= 12; m++) {
  for (let d = 1; d <= DAYS[m - 1]; d++) {
    const key = `${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    if (out[key]?.es && out[key]?.ja) continue
    const es = await wikitext('es.wikipedia.org', `${d} de ${MONTHS_ES[m - 1]}`)
    const ja = await wikitext('ja.wikipedia.org', `${m}月${d}日`)
    out[key] = {
      es: section(es, ['Celebraciones']).slice(0, 4),
      esSaint: section(es, ['Santoral']).slice(0, 2),
      ja: section(ja, ['記念日・年中行事', '記念日']).slice(0, 4),
    }
    writeFileSync(OUT, JSON.stringify(out, null, 1))
    process.stdout.write(`${key} `)
  }
}
console.log('\ngata')
