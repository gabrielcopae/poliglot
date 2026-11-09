/**
 * Numele fișierului audio pentru o replică: același în aplicație și în generatorul de voci.
 * gender: 'f' / 'm' pentru personaje, 'n' pentru cuvinte și propoziții fără vorbitor.
 */
export function audioKey(lang: string, gender: 'f' | 'm' | 'n', text: string): string {
  const s = `${lang}|${gender}|${text.trim()}`
  // FNV-1a pe 32 de biți, de două ori (cu „sare” diferită) → 16 caractere hex
  let h1 = 0x811c9dc5
  let h2 = 0x01000193 ^ 0x5bd1e995
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 0x01000193)
    h2 = Math.imul(h2 ^ c, 0x01000193)
  }
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0')
}
