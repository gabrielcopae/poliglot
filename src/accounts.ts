import Dexie, { type Table } from 'dexie'
import { localGet, localSet } from './settings'

/**
 * Conturi locale: fiecare utilizator are propria bază de date pe acest dispozitiv.
 * Parola nu se salvează, ci doar o amprentă (hash) a ei, cu „sare”.
 */
export interface Account {
  key: string // numele cu litere mici
  name: string
  salt: string
  hash: string
  dbName: string
  created: number
}

export interface Session {
  key: string
  name: string
  dbName: string
}

class AccountsDB extends Dexie {
  accounts!: Table<Account, string>
  constructor() {
    super('poliglot-accounts')
    this.version(1).stores({ accounts: 'key' })
  }
}

const adb = new AccountsDB()
const SESSION_KEY = 'poliglot.session'

export function listAccounts() {
  return adb.accounts.orderBy('key').toArray()
}

export function savedSession(): Session | null {
  try {
    const raw = localGet(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function saveSession(s: Session | null) {
  if (s) localSet(SESSION_KEY, JSON.stringify(s))
  else localSet(SESSION_KEY, '')
}

function randomHex(bytes: number) {
  const a = new Uint8Array(bytes)
  crypto.getRandomValues(a)
  return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password: string, salt: string): Promise<string> {
  // Întinderea cheii: multe runde de SHA-256, ca o parolă să nu poată fi ghicită ușor din amprentă.
  let h = sha256(`${salt}:${password}`)
  for (let i = 0; i < 4000; i++) h = sha256(h + salt)
  return h
}

// Contul „admin” are o parolă fixă. În cod e doar amprenta ei (codul e public), nu parola.
const ADMIN_SALT = 'poliglot-admin-v1'
const ADMIN_HASH = 'fc9ce047e45229ee546c29b4173492ad04b247158548ea2f82cd32d9ae4cafe5'
async function adminPasswordOk(password: string) {
  return (await hashPassword(password, ADMIN_SALT)) === ADMIN_HASH
}

export async function createAccount(name: string, password: string): Promise<Session> {
  const clean = name.trim()
  const key = clean.toLowerCase()
  if (clean.length < 2 || clean.length > 24) throw new Error('Numele trebuie să aibă între 2 și 24 de caractere.')
  if (password.length < 4) throw new Error('Parola trebuie să aibă cel puțin 4 caractere.')
  if (key === 'admin' && !(await adminPasswordOk(password))) throw new Error('Contul admin are o parolă fixă. Parola nu e corectă.')
  if (await adb.accounts.get(key)) throw new Error('Există deja un cont cu acest nume.')
  // primul cont preia progresul făcut înainte de apariția conturilor
  const first = (await adb.accounts.count()) === 0
  const salt = randomHex(16)
  const account: Account = {
    key,
    name: clean,
    salt,
    hash: await hashPassword(password, salt),
    dbName: first ? 'poliglot' : `poliglot-${randomHex(6)}`,
    created: Date.now(),
  }
  await adb.accounts.add(account)
  return { key, name: clean, dbName: account.dbName }
}

export async function login(name: string, password: string): Promise<Session> {
  const acc = await adb.accounts.get(name.trim().toLowerCase())
  if (acc?.key === 'admin' && !(await adminPasswordOk(password))) throw new Error('Nume sau parolă greșită.')
  if (!acc || (await hashPassword(password, acc.salt)) !== acc.hash) throw new Error('Nume sau parolă greșită.')
  return { key: acc.key, name: acc.name, dbName: acc.dbName }
}

export async function deleteAccount(key: string) {
  const acc = await adb.accounts.get(key)
  if (!acc) return
  await adb.accounts.delete(key)
  await Dexie.delete(acc.dbName)
}

// ——— SHA-256 în JavaScript pur (merge și unde crypto.subtle lipsește, de ex. pe http în rețeaua locală) ———

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
])

export function sha256(text: string): string {
  const msg = new TextEncoder().encode(text)
  const len = msg.length
  const total = Math.ceil((len + 9) / 64) * 64
  const buf = new Uint8Array(total)
  buf.set(msg)
  buf[len] = 0x80
  const view = new DataView(buf.buffer)
  view.setUint32(total - 4, (len * 8) >>> 0)
  view.setUint32(total - 8, Math.floor((len * 8) / 2 ** 32))
  const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19])
  const W = new Uint32Array(64)
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n))
  for (let off = 0; off < total; off += 64) {
    for (let t = 0; t < 16; t++) W[t] = view.getUint32(off + t * 4)
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3)
      const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10)
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0
    }
    let [a, b, c, d, e, f, g, h] = H
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const t1 = (h + S1 + ch + K[t] + W[t]) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) >>> 0
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0
    }
    H[0] += a; H[1] += b; H[2] += c; H[3] += d; H[4] += e; H[5] += f; H[6] += g; H[7] += h
  }
  return Array.from(H, (x) => x.toString(16).padStart(8, '0')).join('')
}
