// Arată perechile română ↔ traducere pe rânduri, ca să găsești rapid o nealiniere.
// Rulare: node tools/tr-check.mjs <parte> <fișier.txt> [de-la] [până-la]
import { readFileSync } from 'node:fs'
const [part, file, a = '0', b = '99999'] = process.argv.slice(2)
const ro = JSON.parse(readFileSync(`src/i18n/content/ro/${part}.json`, 'utf8'))
const tr = readFileSync(file, 'utf8').replace(/\r/g, '').split('\n')
for (let i = +a; i < Math.min(+b, Math.max(ro.length, tr.length)); i++) console.log(i, (ro[i] ?? '∅').slice(0, 34), '|', (tr[i] ?? '∅').slice(0, 34))
