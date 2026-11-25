/** Steaguri desenate: emoji-urile de steag nu apar pe Windows. */
export function Flag({ lang, size = 36 }: { lang: string; size?: number }) {
  const h = Math.round(size * 0.7)
  const common = { width: size, height: h, className: 'flag', 'aria-hidden': true } as const
  if (lang === 'es') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#c60b1e" />
        <rect y="5" width="30" height="10" fill="#ffc400" />
      </svg>
    )
  }
  if (lang === 'it') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="10" height="20" fill="#009246" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ce2b37" />
      </svg>
    )
  }
  if (lang === 'fr') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ed2939" />
      </svg>
    )
  }
  if (lang === 'en') {
    return (
      <svg {...common} viewBox="0 0 60 40">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#c8102e" strokeWidth="3" />
        <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 v40 M0,20 h60" stroke="#c8102e" strokeWidth="7" />
      </svg>
    )
  }
  if (lang === 'de') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="30" height="7" fill="#000" />
        <rect y="7" width="30" height="6" fill="#dd0000" />
        <rect y="13" width="30" height="7" fill="#ffce00" />
      </svg>
    )
  }
  if (lang === 'ro') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="10" height="20" fill="#002b7f" />
        <rect x="10" width="10" height="20" fill="#fcd116" />
        <rect x="20" width="10" height="20" fill="#ce1126" />
      </svg>
    )
  }
  if (lang === 'ja') {
    return (
      <svg {...common} viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#fff" />
        <circle cx="15" cy="10" r="6" fill="#bc002d" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#e8e8e8" />
    </svg>
  )
}
