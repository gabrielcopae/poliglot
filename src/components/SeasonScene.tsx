import { useEffect, useRef } from 'react'
import type { Season } from '../season'

interface Props {
  season: Season
  night: boolean
  particles: boolean
}

interface P {
  x: number; y: number; vx: number; vy: number
  size: number; rot: number; vr: number
  phase: number; hue: number; alpha: number
}

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function SeasonScene({ season, night, particles }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !particles || reduceMotion()) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, window.matchMedia?.('(pointer: coarse)').matches ? 1.5 : 2)
    let list: P[] = []

    const fireflies = season === 'summer' && night
    const spawn = (initial: boolean): P => {
      const size = season === 'winter' ? 1.5 + Math.random() * 3 : season === 'summer' ? 1.5 + Math.random() * 2.5 : 6 + Math.random() * 7
      return {
        x: Math.random() * w,
        y: initial || season === 'summer' ? Math.random() * h : -20,
        vx: (Math.random() - 0.3) * 0.4,
        vy: season === 'summer' ? -0.05 - Math.random() * 0.15 : season === 'winter' ? 0.35 + Math.random() * 0.8 : 0.45 + Math.random() * 0.7,
        size,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random(),
        alpha: 0.5 + Math.random() * 0.5,
      }
    }

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const touch = window.matchMedia?.('(pointer: coarse)').matches
      const target = Math.round(Math.min(touch ? 24 : 55, Math.max(touch ? 12 : 18, (w * h) / (touch ? 30000 : 22000))))
      list = Array.from({ length: target }, () => spawn(true))
    }

    const petal = (p: P) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.scale(Math.cos(p.phase * 1.3), 1)
      const g = ctx.createLinearGradient(0, -p.size, 0, p.size)
      g.addColorStop(0, night ? 'rgba(255,190,215,.75)' : 'rgba(255,214,228,.95)')
      g.addColorStop(1, night ? 'rgba(230,140,180,.6)' : 'rgba(242,150,185,.9)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.7, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    const LEAF = ['#d9541e', '#e88a1a', '#c0392b', '#f0b429', '#a8481e']
    const leaf = (p: P) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.scale(Math.cos(p.phase), 1)
      ctx.globalAlpha = night ? 0.65 : 0.92
      ctx.fillStyle = LEAF[Math.floor(p.hue * LEAF.length)]
      const r = p.size
      ctx.beginPath()
      if (p.hue < 0.65) {
        // frunză ovală cu vârf ascuțit
        ctx.moveTo(0, -r * 1.2)
        ctx.quadraticCurveTo(r * 0.95, -r * 0.2, 0, r)
        ctx.quadraticCurveTo(-r * 0.95, -r * 0.2, 0, -r * 1.2)
      } else {
        // frunză de arțar: 5 lobi rotunjiți
        const lobes = [1.15, 0.9, 0.6, 0.6, 0.9]
        for (let i = 0; i < 5; i++) {
          const a = -Math.PI / 2 + (i * Math.PI * 2) / 5
          const mid = a + Math.PI / 5
          const tip = r * lobes[i]
          const prev = a - Math.PI / 5
          if (i === 0) ctx.moveTo(Math.cos(prev) * r * 0.4, Math.sin(prev) * r * 0.4)
          ctx.quadraticCurveTo(Math.cos(a - 0.35) * tip, Math.sin(a - 0.35) * tip, Math.cos(a) * tip, Math.sin(a) * tip)
          ctx.quadraticCurveTo(Math.cos(a + 0.35) * tip, Math.sin(a + 0.35) * tip, Math.cos(mid) * r * 0.4, Math.sin(mid) * r * 0.4)
        }
        ctx.closePath()
      }
      ctx.fill()
      ctx.strokeStyle = 'rgba(90,40,10,.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, -r * 0.9)
      ctx.lineTo(0, r * 1.3)
      ctx.stroke()
      ctx.restore()
    }

    const flake = (p: P) => {
      ctx.globalAlpha = p.alpha * (night ? 0.9 : 0.95)
      ctx.fillStyle = night ? '#eaf2ff' : '#ffffff'
      ctx.shadowColor = night ? 'rgba(200,220,255,.8)' : 'rgba(120,150,190,.5)'
      ctx.shadowBlur = 4
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const glow = (p: P, t: number) => {
      const blink = fireflies ? Math.max(0, Math.sin(t / 700 + p.phase * 3)) : 0.5 + 0.5 * Math.sin(t / 1200 + p.phase)
      const color = fireflies ? '214,255,120' : '255,236,170'
      const r = p.size * (fireflies ? 4 : 3)
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
      g.addColorStop(0, `rgba(${color},${0.9 * blink * p.alpha})`)
      g.addColorStop(1, `rgba(${color},0)`)
      ctx.globalAlpha = 1
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < list.length; i++) {
        const p = list[i]
        p.phase += 0.012
        p.rot += p.vr
        if (season === 'summer') {
          p.x += p.vx * 0.6 + Math.sin(p.phase) * (fireflies ? 0.5 : 0.2)
          p.y += p.vy + Math.cos(p.phase * 0.7) * (fireflies ? 0.35 : 0.1)
        } else {
          p.x += p.vx + Math.sin(p.phase) * (season === 'winter' ? 0.35 : 0.8)
          p.y += p.vy
        }
        if (p.y > h + 30 || p.x < -40 || p.x > w + 40 || p.y < -40) {
          list[i] = spawn(false)
          if (season === 'summer') list[i].y = h + 10
          continue
        }
        ctx.globalAlpha = 1
        if (season === 'spring') petal(p)
        else if (season === 'autumn') leaf(p)
        else if (season === 'winter') flake(p)
        else glow(p, t)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      ctx.clearRect(0, 0, w, h)
    }
  }, [season, night, particles])

  return (
    <div className="scene" aria-hidden="true">
      <div className="sky" />
      <div className={night ? 'moon' : 'sun'} />
      {night && <div className="stars" />}
      <svg className="hills" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="hill h1" d="M0 190 C 220 120 420 130 640 175 S 1080 230 1440 150 V320 H0Z" />
        <path className="hill h2" d="M0 240 C 260 190 520 210 760 240 S 1200 260 1440 215 V320 H0Z" />
        <path className="hill h3" d="M0 285 C 300 255 640 270 900 285 S 1300 290 1440 270 V320 H0Z" />
      </svg>
      <Tree season={season} />
      <canvas ref={ref} className="particles" />
    </div>
  )
}

/** Un copac în colț, care se schimbă după anotimp. */
function Tree({ season }: { season: Season }) {
  const crown: Record<Season, string[]> = {
    spring: ['#f7c6d6', '#f3a9c2', '#fbdce6'],
    summer: ['#4f9d58', '#3c8a4a', '#67b56b'],
    autumn: ['#e07b28', '#c8501f', '#f0a830'],
    winter: [],
  }
  const c = crown[season]
  return (
    <svg className="tree" viewBox="0 0 220 260" aria-hidden="true">
      <path
        className="trunk"
        d="M108 260 C 110 210 104 180 96 150 M101 175 C 80 150 60 140 40 128 M100 160 C 120 130 150 118 176 104 M97 150 C 92 120 98 95 110 70 M108 92 C 125 80 140 64 150 46 M104 100 C 86 86 72 72 66 52"
      />
      {c.length > 0 && (
        <g className="crown">
          <circle cx="50" cy="118" r="30" fill={c[0]} />
          <circle cx="170" cy="96" r="32" fill={c[1]} />
          <circle cx="110" cy="62" r="40" fill={c[2]} />
          <circle cx="150" cy="44" r="26" fill={c[0]} />
          <circle cx="68" cy="52" r="26" fill={c[1]} />
          <circle cx="100" cy="110" r="30" fill={c[0]} />
          <circle cx="135" cy="80" r="28" fill={c[2]} />
        </g>
      )}
      {season === 'winter' && (
        <g className="snowcap">
          <path d="M40 126 C 55 132 75 142 98 156" />
          <path d="M176 102 C 150 116 125 128 102 158" />
          <path d="M66 50 C 75 70 90 86 104 98" />
          <path d="M150 44 C 140 62 125 80 108 90" />
        </g>
      )}
    </svg>
  )
}
