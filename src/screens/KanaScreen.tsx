import { useState } from 'react'
import { HIRAGANA, KATAKANA } from '../content/ja'
import { speak } from '../speech'
import { TopBar } from '../components/ui'

export function KanaScreen({ back }: { back: () => void }) {
  const [set, setSet] = useState<'h' | 'k'>('h')
  const [last, setLast] = useState<string | null>(null)
  const table = set === 'h' ? HIRAGANA : KATAKANA
  return (
    <div className="screen">
      <TopBar title="Tabelul kana" onBack={back} />
      <div className="segmented">
        <button className={set === 'h' ? 'on' : ''} onClick={() => setSet('h')}>ひらがな Hiragana</button>
        <button className={set === 'k' ? 'on' : ''} onClick={() => setSet('k')}>カタカナ Katakana</button>
      </div>
      <p className="muted">
        {set === 'h'
          ? 'Hiragana: pentru cuvintele japoneze și terminațiile gramaticale.'
          : 'Katakana: pentru cuvinte străine și nume, de exemplu ルーマニア (Rūmania) = România.'}
      </p>
      <div className="kana-grid">
        {table.flat().map((cell, i) =>
          cell ? (
            <button
              key={i}
              className={`kana-cell ${last === cell[0] ? 'on' : ''}`}
              onClick={() => { setLast(cell[0]); speak(cell[0], 'ja', 'ja-JP') }}
            >
              <span className="jp">{cell[0]}</span>
              <small>{cell[1]}</small>
            </button>
          ) : (
            <span key={i} className="kana-cell empty" />
          ),
        )}
      </div>
    </div>
  )
}
