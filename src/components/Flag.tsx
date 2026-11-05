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
  return (
    <svg {...common} viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#bc002d" />
    </svg>
  )
}
