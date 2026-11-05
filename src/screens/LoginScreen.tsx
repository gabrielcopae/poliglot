import { useEffect, useState, type FormEvent } from 'react'
import { createAccount, listAccounts, login, type Account, type Session } from '../accounts'

export function LoginScreen({ onLogin }: { onLogin: (s: Session) => void }) {
  const [accounts, setAccounts] = useState<Account[] | null>(null)
  const [mode, setMode] = useState<'login' | 'create'>('login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    listAccounts().then((list) => {
      setAccounts(list)
      if (!list.length) setMode('create')
      else if (list.length === 1) setName(list[0].name)
    })
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'create' && password !== password2) { setError('Parolele nu coincid.'); return }
    setBusy(true)
    try {
      onLogin(mode === 'create' ? await createAccount(name, password) : await login(name, password))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  if (!accounts) return null

  return (
    <div className="screen login">
      <div className="login-head">
        <div className="login-logo">📖</div>
        <h1>Poliglot</h1>
        <p className="muted">Español · Italiano · 日本語</p>
      </div>

      <form className="card login-card" onSubmit={submit}>
        {accounts.length > 0 && (
          <div className="segmented">
            <button type="button" className={mode === 'login' ? 'on' : ''} onClick={() => { setMode('login'); setError('') }}>Intră în cont</button>
            <button type="button" className={mode === 'create' ? 'on' : ''} onClick={() => { setMode('create'); setError(''); setName('') }}>Cont nou</button>
          </div>
        )}
        {mode === 'create' && !accounts.length && (
          <p className="muted small">Bun venit! Creează-ți un cont. Fiecare cont are progresul lui separat pe acest dispozitiv.</p>
        )}

        {mode === 'login' && accounts.length > 1 && (
          <div className="login-users">
            {accounts.map((a) => (
              <button type="button" key={a.key} className={`token ${name.toLowerCase() === a.key ? 'on' : ''}`} onClick={() => setName(a.name)}>
                👤 {a.name}
              </button>
            ))}
          </div>
        )}

        <label className="field-label" htmlFor="u">Utilizator</label>
        <input id="u" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" autoCapitalize="off" placeholder="ex. Gabriela" />
        <label className="field-label" htmlFor="p">Parolă</label>
        <input id="p" className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'create' ? 'new-password' : 'current-password'} />
        {mode === 'create' && (
          <>
            <label className="field-label" htmlFor="p2">Repetă parola</label>
            <input id="p2" className="field" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} autoComplete="new-password" />
          </>
        )}
        {error && <div className="warn login-error">{error}</div>}
        <button className="btn primary big login-btn" disabled={busy || !name.trim() || !password}>
          {busy ? '…' : mode === 'create' ? 'Creează contul' : 'Intră'}
        </button>
      </form>
      <p className="muted small center login-note">
        Conturile și progresul sunt salvate pe acest dispozitiv. Ca să muți progresul pe alt dispozitiv, folosește Setări → Exportă progresul.
      </p>
    </div>
  )
}
