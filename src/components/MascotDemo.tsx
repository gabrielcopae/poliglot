import { Mascot, type Mood } from './Mascot'

/** Pagina de prezentare a lui Mr. Poli (se deschide cu ?poli în adresă). */
export function MascotDemo({ onClose }: { onClose: () => void }) {
  const moods: [Mood, string][] = [
    ['idle', 'Așteaptă (clipește, foile foșnesc)'],
    ['wave', 'Salută'],
    ['happy', 'Bucuros: răspuns corect / ai învățat azi'],
    ['cheer', 'Sărbătorește: obiectiv atins, serie'],
    ['sad', 'Încurajează: răspuns greșit / zi liberă'],
    ['sleepy', 'Doarme: e târziu'],
  ]
  return (
    <div className="poli-demo" onClick={onClose}>
      <div className="poli-demo-box" onClick={(e) => e.stopPropagation()}>
        <h2>Mr. Poli</h2>
        <div className="poli-demo-grid">
          {moods.map(([m, label]) => (
            <figure key={m}>
              <Mascot mood={m} size={130} />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <button className="btn primary" onClick={onClose}>OK</button>
      </div>
    </div>
  )
}
