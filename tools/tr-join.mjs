// Unește fișierele text de traducere (un rând = o traducere, în ordinea textelor românești) într-un JSON.
// Rulare: node tools/tr-join.mjs <limbă> <parte> <fișier1.txt> [fișier2.txt …]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const [lang, part, ...files] = process.argv.slice(2)
const ro = JSON.parse(readFileSync(`src/i18n/content/ro/${part}.json`, 'utf8'))
const lines = files.flatMap((f) => readFileSync(f, 'utf8').replace(/\r/g, '').split('\n').filter((l, i, a) => !(i === a.length - 1 && l === '')))
if (lines.length !== ro.length) { console.error(`${part}: ${lines.length} traduceri, dar ${ro.length} texte`); process.exit(1) }
mkdirSync(`src/i18n/content/${lang}`, { recursive: true })
writeFileSync(`src/i18n/content/${lang}/${part}.json`, JSON.stringify(lines))
console.log(`${lang}/${part}: ${lines.length} ✓`)
