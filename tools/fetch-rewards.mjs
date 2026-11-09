// Descarcă fotografia principală (doar cu licență liberă) de pe Wikipedia / Wikimedia Commons pentru fiecare oraș,
// micșorată la 480 px, în public/rewards/, și scrie src/content/rewards-data.json cu autorul și licența.
// Rulare: node tools/fetch-rewards.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { REWARDS } from './rewards-list.mjs'
import { SESSION_PLACES } from './session-places-list.mjs'
import { SESSION_PLACES_ES2 } from './session-places-es2.mjs'
import { PEOPLE } from './people-list.mjs'

// node tools/fetch-rewards.mjs          → cartonașele zilnice
// node tools/fetch-rewards.mjs session  → cartonașele ședințelor
// node tools/fetch-rewards.mjs people   → personalitățile de pe ștampile
const MODE = process.argv[2] ?? 'daily'
const SESSION = MODE === 'session'
const PEOPLE_MODE = MODE === 'people'
// rândurile personalităților au în plus „cine a fost”; le aducem la forma [nume, loc, țară, titlu, limbă, fapt] + rol
const LIST = PEOPLE_MODE ? PEOPLE.map(([n, place, country, role, t, l, f]) => [n, country, place, t, l, f, role]) : SESSION ? [...SESSION_PLACES, ...SESSION_PLACES_ES2] : REWARDS
const OUT_JSON = PEOPLE_MODE ? 'src/content/people-data.json' : SESSION ? 'src/content/session-places.json' : 'src/content/rewards-data.json'
const PREFIX = PEOPLE_MODE ? 'p-' : SESSION ? 's-' : ''

const UA = { 'User-Agent': 'Poliglot-learning-app/1.0 (personal, non-commercial; github.com/gabrielcopae/poliglot)' }
const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
// Wikimedia limitează cererile prea dese: pauză între cereri și reîncercare
async function getJson(url) {
  for (let i = 0; i < 5; i++) {
    await sleep(1500)
    const r = await fetch(url, { headers: UA })
    const t = await r.text()
    if (t.startsWith('{')) return JSON.parse(t)
    await sleep(15000)
  }
  throw new Error('prea multe cereri')
}
const FREE = /^(cc[- ]by|cc[- ]by-sa|cc0|public domain|pd|gfdl|attribution|fal|free art)/i

mkdirSync('public/rewards', { recursive: true })
const out = []
// ce am descărcat deja rămâne (doar locurile noi sau fără poză se caută din nou)
const prev = existsSync(OUT_JSON) ? JSON.parse(readFileSync(OUT_JSON, 'utf8')) : []
const have = new Map(prev.filter((p) => existsSync(`public/rewards/${p.img}`)).map((p) => [`${p.city}|${p.country}`, p]))
for (const [city, country, landmark, title, lang, fact, role] of LIST) {
  const old = have.get(`${city}|${country}`) ?? (PEOPLE_MODE ? undefined : have.get(`${city}|undefined`))
  if (old && process.argv[3] !== 'all') { out.push({ ...old, country, landmark, lang, fact, ...(role ? { role } : {}) }); continue }
  try {
    const p = await getJson(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&redirects=1&titles=${encodeURIComponent(title)}`)
    const page = Object.values(p.query.pages)[0]
    let file = page.pageimage ? 'File:' + page.pageimage : ''
    if (!file) {
      // fără poză pe Wikipedia: căutăm direct în Wikimedia Commons o fotografie a locului
      const sr = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=10&srsearch=${encodeURIComponent(title.replace(/_/g, ' ').replace(/[(),]/g, ' ') + ' filetype:bitmap')}`)
      file = sr.query.search.map((x) => x.title).find((t) => /.(jpe?g)$/i.test(t)) ?? ''
      if (!file) { console.log('fără imagine:', city); continue }
      console.log('  (din Commons)', city, file)
    }
    const q = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=480&titles=${encodeURIComponent(file)}`)
    const info = Object.values(q.query.pages)[0]?.imageinfo?.[0]
    if (!info) { console.log('nu e pe Commons (probabil neliberă):', city); continue }
    const md = info.extmetadata ?? {}
    const license = strip(md.LicenseShortName?.value)
    if (!FREE.test(license)) { console.log('licență neliberă, sar:', city, license); continue }
    await sleep(1500)
    const img = await fetch(info.thumburl, { headers: UA })
    if (!img.ok || !(img.headers.get('content-type') ?? '').startsWith('image')) { console.log('imaginea nu s-a descărcat:', city); continue }
    const ext = info.thumburl.toLowerCase().includes('.png') ? 'png' : 'jpg'
    const name = `${PREFIX}${slug(city)}${out.some((o) => o.city === city) || LIST.filter((r) => r[0] === city).length > 1 ? '-' + slug(country) : ''}.${ext}`
    writeFileSync(`public/rewards/${name}`, Buffer.from(await img.arrayBuffer()))
    out.push({ city, country, landmark, lang, fact, ...(role ? { role } : {}), img: name, author: strip(md.Artist?.value) || 'Wikimedia Commons', license, source: info.descriptionurl })
    console.log('✓', city, '·', license)
  } catch (e) {
    console.log('eroare:', city, e.message)
  }
}
writeFileSync(OUT_JSON, JSON.stringify(out, null, 1))
console.log(out.length, 'cartonașe salvate')
