// Adaugă în src/content/people-data.json data nașterii fiecărei personalități (Wikidata, proprietatea P569).
// Rulare: node tools/fetch-birthdays.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { PEOPLE } from './people-list.mjs'

const UA = { 'User-Agent': 'Poliglot-learning-app/1.0 (personal, non-commercial; github.com/gabrielcopae/poliglot)' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function json(url) {
  for (let i = 0; i < 5; i++) {
    await sleep(1200)
    const t = await (await fetch(url, { headers: UA })).text()
    if (t.startsWith('{')) return JSON.parse(t)
    await sleep(15000)
  }
  return {}
}

const data = JSON.parse(readFileSync('src/content/people-data.json', 'utf8'))
for (const [name, , , , title] of PEOPLE) {
  const person = data.find((p) => p.city === name)
  if (!person || person.born) continue
  const p = await json(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=${encodeURIComponent(title)}`)
  const qid = Object.values(p.query?.pages ?? {})[0]?.pageprops?.wikibase_item
  if (!qid) { console.log('fără Wikidata:', name); continue }
  const w = await json(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=claims&ids=${qid}`)
  const claim = w.entities?.[qid]?.claims?.P569?.[0]?.mainsnak?.datavalue?.value
  // doar datele exacte la zi (precizie 11); la oamenii foarte vechi, data e uneori doar anul
  if (!claim || claim.precision < 11) { console.log('fără zi exactă:', name, claim?.time ?? ''); continue }
  person.born = claim.time.replace(/^\+/, '').slice(0, 10)
  console.log(name, person.born)
  writeFileSync('src/content/people-data.json', JSON.stringify(data, null, 1))
}
writeFileSync('src/content/people-data.json', JSON.stringify(data, null, 1))
console.log('gata')
