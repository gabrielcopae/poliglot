// Găsește toate textele t('…') / tn(n, '…', '…') din src și arată ce lipsește din fiecare dicționar.
// Rulare: node tools/i18n-check.mjs            (rezumat)
//         node tools/i18n-check.mjs en         (lista cheilor care lipsesc în engleză, ca JSON)
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const files = []
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? (f !== 'i18n' && walk(p)) : /\.tsx?$/.test(f) && files.push(p) })
walk('src')
const keys = new Set()
const str = String.raw`'((?:[^'\\]|\\.)*)'`
const reT = new RegExp(String.raw`\btk?\(\s*` + str, 'g')
const reN = new RegExp(String.raw`\btn\([^,]+,\s*` + str + String.raw`\s*,\s*` + str, 'g')
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\')
for (const f of files) {
  const src = readFileSync(f, 'utf8')
  for (const m of src.matchAll(reT)) keys.add(unq(m[1]))
  for (const m of src.matchAll(reN)) { keys.add(unq(m[1])); keys.add(unq(m[2])) }
}
const want = process.argv[2]
for (const lang of ['en', 'es', 'it', 'fr', 'de', 'ja']) {
  const txt = readFileSync(`src/i18n/${lang}.ts`, 'utf8')
  const have = new Set([...txt.matchAll(/^\s*'((?:[^'\\]|\\.)*)'\s*:/gm)].map((m) => unq(m[1])))
  const missing = [...keys].filter((k) => !have.has(k))
  if (want === lang) { console.log(JSON.stringify(missing, null, 1)); process.exit(0) }
  if (!want) console.log(lang, 'lipsesc', missing.length, 'din', keys.size)
}
