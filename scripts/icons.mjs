// Generează iconițele PNG din public/icon.svg (rulează: node scripts/icons.mjs)
import sharp from 'sharp'
const svg = 'public/icon.svg'
await sharp(svg).resize(192, 192).png().toFile('public/icon-192.png')
await sharp(svg).resize(512, 512).png().toFile('public/icon-512.png')
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#b4452a' } })
  .composite([{ input: await sharp(svg).resize(400, 400).png().toBuffer(), gravity: 'center' }])
  .png().toFile('public/icon-maskable.png')
console.log('icons ok')
