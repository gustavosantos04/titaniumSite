import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const PAPER = [242, 241, 235]
const NAVY = [11, 16, 48]

function mix(a, b, amount) {
  return a.map((value, index) => Math.round(value + (b[index] - value) * amount))
}

function ease(value) {
  return value * value * (3 - 2 * value)
}

function drawStructure(canvas, progress) {
  const context = canvas.getContext('2d')
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)

  const darkPhase = progress > 0.48
  const stroke = darkPhase ? '125, 162, 255' : '31, 63, 224'
  const build = ease(Math.min(Math.max((progress - 0.12) / 0.72, 0), 1))
  const cx = width * (width < 760 ? 0.52 : 0.72)
  const cy = height * (width < 760 ? 0.64 : 0.52)
  const scale = Math.min(width, height) * (width < 760 ? 0.35 : 0.43)

  context.lineWidth = 1
  context.strokeStyle = `rgba(${stroke}, ${darkPhase ? 0.11 : 0.09})`
  const grid = Math.max(34, Math.round(scale / 7))
  const drift = progress * grid
  for (let x = (cx % grid) - grid; x < width + grid; x += grid) {
    context.beginPath()
    context.moveTo(x + drift * 0.2, 0)
    context.lineTo(x + drift * 0.2, height)
    context.stroke()
  }
  for (let y = (cy % grid) - grid; y < height + grid; y += grid) {
    context.beginPath()
    context.moveTo(0, y - drift * 0.12)
    context.lineTo(width, y - drift * 0.12)
    context.stroke()
  }

  const points = [
    [-0.72, -0.48], [0.72, -0.48], [0.72, 0.48], [-0.72, 0.48],
    [-0.16, -0.48], [-0.16, 0.12], [0.72, 0.12], [0.18, 0.12], [0.18, 0.48],
  ]

  const project = ([x, y], z = 0) => {
    const flatX = x * scale
    const flatY = y * scale * 0.76
    const isoX = (x - y) * scale * 0.72
    const isoY = (x + y) * scale * 0.34 - z * scale
    return [cx + flatX + (isoX - flatX) * build, cy + flatY + (isoY - flatY) * build]
  }

  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [7, 8]]
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.strokeStyle = `rgba(${stroke}, 0.9)`
  context.lineWidth = width < 760 ? 1.2 : 1.45

  edges.forEach(([from, to], index) => {
    const start = project(points[from])
    const end = project(points[to])
    const reveal = Math.min(Math.max(progress * 2.2 - index * 0.07, 0), 1)
    context.beginPath()
    context.moveTo(start[0], start[1])
    context.lineTo(start[0] + (end[0] - start[0]) * reveal, start[1] + (end[1] - start[1]) * reveal)
    context.stroke()
  })

  if (build > 0.08) {
    const wallHeight = 0.3 * build
    ;[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((index) => {
      const base = project(points[index])
      const top = project(points[index], wallHeight)
      context.strokeStyle = `rgba(${stroke}, ${0.3 + build * 0.48})`
      context.beginPath()
      context.moveTo(base[0], base[1])
      context.lineTo(top[0], top[1])
      context.stroke()
    })
    edges.forEach(([from, to]) => {
      const start = project(points[from], wallHeight)
      const end = project(points[to], wallHeight)
      context.beginPath()
      context.moveTo(start[0], start[1])
      context.lineTo(end[0], end[1])
      context.stroke()
    })
  }

  context.fillStyle = `rgba(${stroke}, ${darkPhase ? 0.72 : 0.8})`
  points.slice(0, 4).forEach((point) => {
    const [x, y] = project(point, build * 0.3)
    context.beginPath()
    context.arc(x, y, 2.4, 0, Math.PI * 2)
    context.fill()
  })
}

export default function HeroSection({ id }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const [phase, setPhase] = useState('paper')

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return undefined

    const render = () => {
      frameRef.current = 0
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / travel, 0), 1)
      const colorProgress = ease(Math.min(Math.max((progress - 0.22) / 0.5, 0), 1))
      const background = mix(PAPER, NAVY, colorProgress)
      section.style.setProperty('--hero-bg', `rgb(${background.join(',')})`)
      section.style.setProperty('--hero-progress', progress.toFixed(3))
      setPhase(progress < 0.4 ? 'paper' : progress > 0.52 ? 'built' : 'transition')
      drawStructure(canvas, progress)
    }

    const requestRender = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    return () => {
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
    }
  }, [])

  return (
    <section ref={sectionRef} id={id} className={`hero hero--${phase}`} aria-labelledby="hero-title">
      <div className="hero-stage">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-coordinates hero-coordinates--top" aria-hidden="true">
          <span>TI / 01</span><span>29°41' S</span><span>FASE: {phase === 'paper' ? 'PLANTA' : 'ESTRUTURA'}</span>
        </div>

        <div className="hero-copy">
          <p className="hero-eyebrow">Estúdio de tecnologia · Brasil</p>
          <h1 id="hero-title" className="hero-title">
            <span>Construímos a</span>
            <span className="hero-title-accent">tecnologia.</span>
            <span>Você constrói o legado.</span>
          </h1>
          <p className="hero-subtitle">
            Sites, sistemas e automações feitos para organizar operações e sustentar o próximo passo do seu negócio.
          </p>
          <div className="hero-ctas">
            <a className="cta-primary" href="#contato">Falar com a Titanium</a>
            <a className="cta-ghost" href="#portfolio">Conhecer projetos</a>
          </div>
        </div>

        <div className="hero-progress" aria-hidden="true">
          <span>PROJETO</span><i /><span>CONSTRUÍDO</span>
        </div>
      </div>
    </section>
  )
}
