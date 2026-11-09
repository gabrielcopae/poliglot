// Descarcă liniile (în ordinea corectă) din KanjiVG (CC BY-SA 3.0, https://kanjivg.tagaini.net)
// și scrie src/content/kanji-data.json. Rulare: node tools/fetch-kanji.mjs
import { writeFileSync } from 'node:fs'
import { KANJI } from './kanji-list.mjs'

const out = []
for (const [char, meaning, on, kun, ex, exRo, group] of KANJI) {
  const code = char.codePointAt(0).toString(16).padStart(5, '0')
  const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`
  const svg = await (await fetch(url)).text()
  // Liniile au id-ul kvg:<cod>-s1, -s2…; le luăm în ordinea numerelor
  const strokes = [...svg.matchAll(/<path[^>]*id="kvg:[0-9a-f]+-s(\d+)"[^>]*d="([^"]+)"/g)]
    .map((m) => [Number(m[1]), m[2]])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
  if (!strokes.length) { console.log('fără linii:', char, url); continue }
  out.push({ char, meaning, on, kun, ex, exRo, group, strokes })
  process.stdout.write(char)
}
writeFileSync('src/content/kanji-data.json', JSON.stringify(out))
console.log(`\n${out.length} kanji salvate`)
