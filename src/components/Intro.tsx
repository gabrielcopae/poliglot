import { useEffect } from 'react'

const DURATION = 5200

export function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, DURATION)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="intro" onClick={onDone} role="presentation">
      <div className="intro-glow" />
      <div className="intro-stage">
        <div className="book">
          <div className="book-page base">
            <span className="ink" />
            <span className="ink" />
            <span className="ink short" />
          </div>
          <div className="book-page flip f3" />
          <div className="book-page flip f2" />
          <div className="book-page flip f1" />
          <div className="book-cover">
            <div className="cover-front">
              <div className="cover-frame">
                <svg viewBox="0 0 64 64" className="cover-emblem" aria-hidden="true">
                  <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 32h44M14 21h36M14 43h36" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <div className="cover-title">Poliglot</div>
              </div>
            </div>
            <div className="cover-inside" />
          </div>
        </div>
        <span className="iw w1">Hola</span>
        <span className="iw w2">Ciao</span>
        <span className="iw w3">こんにちは</span>
        <div className="intro-flash" />
      </div>
      <div className="intro-logo">
        <div className="intro-name">Poliglot</div>
        <div className="intro-tag">Español · Italiano · 日本語</div>
      </div>
      <div className="intro-skip">Atinge pentru a sări</div>
    </div>
  )
}
