// Descarcă fotografia principală (doar cu licență liberă) de pe Wikipedia / Wikimedia Commons pentru fiecare oraș,
// micșorată la 480 px, în public/rewards/, și scrie src/content/rewards-data.json cu autorul și licența.
// Rulare: node tools/fetch-rewards.mjs
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { REWARDS } from './rewards-list.mjs'

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
for (const [city, country, landmark, title, lang, fact] of REWARDS) {
  try {
    const p = await getJson(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=name&redirects=1&titles=${encodeURIComponent(title)}`)
    const page = Object.values(p.query.pages)[0]
    if (!page.pageimage) { console.log('fără imagine:', city); continue }
    const file = 'File:' + page.pageimage
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
    const name = `${slug(city)}.${ext}`
    writeFileSync(`public/rewards/${name}`, Buffer.from(await img.arrayBuffer()))
    out.push({ city, country, landmark, lang, fact, img: name, author: strip(md.Artist?.value) || 'Wikimedia Commons', license, source: info.descriptionurl })
    console.log('✓', city, '·', license)
  } catch (e) {
    console.log('eroare:', city, e.message)
  }
}
writeFileSync('src/content/rewards-data.json', JSON.stringify(out, null, 1))
console.log(out.length, 'cartonașe salvate')
