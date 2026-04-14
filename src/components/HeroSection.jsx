import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const subtitles = [
  'Criamos sites que vendem.',
  'Construímos sistemas que escalam.',
  'Geramos conteúdo que converte.',
]

const HERO_COUNTS = {
  small: 2000,
  medium: 375,
  large: 125,
}

const VIDEO_SRC = '/assets/hero-bg.mp4'

function buildLayer(three, count, size, opacity, bounds) {
  const { BufferGeometry, BufferAttribute, PointsMaterial, Points, Color, NormalBlending } = three
  const geometry = new BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const drift = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const phases = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const colorSeed = Math.random()
    const color = colorSeed < 0.2
      ? new Color('#E0AF46')
      : colorSeed < 0.5
        ? new Color('#3D6AC1')
        : new Color('#FCF8E8')
    const x = (Math.random() - 0.5) * bounds.x * 2
    const y = (Math.random() - 0.5) * bounds.y * 2
    const z = (Math.random() - 0.5) * bounds.z * 2

    positions[offset] = x
    positions[offset + 1] = y
    positions[offset + 2] = z
    drift[offset] = x
    drift[offset + 1] = y
    drift[offset + 2] = z
    velocities[offset] = (Math.random() - 0.5) * 0.004
    velocities[offset + 1] = (Math.random() - 0.5) * 0.003
    velocities[offset + 2] = (Math.random() - 0.5) * 0.002
    phases[index] = Math.random() * Math.PI * 2

    colors[offset] = color.r
    colors[offset + 1] = color.g
    colors[offset + 2] = color.b
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    sizeAttenuation: false,
    blending: NormalBlending,
    vertexColors: true,
  })

  return {
    geometry,
    material,
    positions,
    drift,
    velocities,
    phases,
    points: new Points(geometry, material),
  }
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const subtitleTimeoutRef = useRef(0)
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false)
      window.clearTimeout(subtitleTimeoutRef.current)
      subtitleTimeoutRef.current = window.setTimeout(() => {
        setSubtitleIdx((index) => (index + 1) % subtitles.length)
        setVisible(true)
      }, 400)
    }, 3200)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(subtitleTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvasHost = canvasRef.current

    if (!container || !canvasHost) {
      return undefined
    }

    let disposed = false
    let cleanup = () => {}

    import('three').then((module) => {
      if (disposed) {
        return
      }

      const {
        Group,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
      } = module
      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      renderer.setClearColor(0x000000, 0)
      canvasHost.appendChild(renderer.domElement)

      const scene = new Scene()
      const camera = new PerspectiveCamera(56, 1, 1, 300)
      camera.position.set(0, 0, 120)

      const cloud = new Group()
      cloud.position.x = 8
      scene.add(cloud)

      const mobileView = window.innerWidth < 768
      const bounds = { x: 80, y: 50, z: 64 }
      const layers = [
        buildLayer(module, mobileView ? Math.round(HERO_COUNTS.small * 0.45) : HERO_COUNTS.small, 0.7, 0.08, bounds),
        buildLayer(module, mobileView ? Math.round(HERO_COUNTS.medium * 0.55) : HERO_COUNTS.medium, 1.8, 0.14, bounds),
        buildLayer(module, mobileView ? Math.round(HERO_COUNTS.large * 0.65) : HERO_COUNTS.large, 3.2, 0.22, bounds),
      ]

      layers.forEach((layer) => cloud.add(layer.points))

      const pointerTarget = { x: 0, y: 0 }
      const pointerCurrent = { x: 0, y: 0 }
      let frameId = 0
      let lastTime = performance.now()

      const resize = () => {
        const width = container.clientWidth
        const height = container.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / Math.max(height, 1)
        camera.updateProjectionMatrix()
      }

      resize()

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)

      const onMove = ({ clientX, clientY }) => {
        const rect = container.getBoundingClientRect()
        pointerTarget.x = ((clientX - rect.left) / rect.width - 0.5) * 2
        pointerTarget.y = ((clientY - rect.top) / rect.height - 0.5) * 2
      }

      const canTrackPointer = window.matchMedia('(pointer: fine)').matches

      if (canTrackPointer) {
        window.addEventListener('mousemove', onMove)
      }

      const animate = (time) => {
        if (disposed) {
          return
        }

        const delta = Math.min((time - lastTime) / 16.6667, 2)
        lastTime = time
        const wave = time * 0.00035

        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.04
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.04

        cloud.rotation.y += (pointerCurrent.x * 0.14 - cloud.rotation.y) * 0.04
        cloud.rotation.x += (-pointerCurrent.y * 0.08 - cloud.rotation.x) * 0.04
        camera.position.x += (pointerCurrent.x * 3.8 - camera.position.x) * 0.04
        camera.position.y += (-pointerCurrent.y * 2.2 - camera.position.y) * 0.04
        camera.lookAt(scene.position)

        layers.forEach((layer, layerIndex) => {
          const amplitude = 0.55 + layerIndex * 0.28

          for (let index = 0; index < layer.phases.length; index += 1) {
            const offset = index * 3

            layer.drift[offset] += layer.velocities[offset] * delta
            layer.drift[offset + 1] += layer.velocities[offset + 1] * delta
            layer.drift[offset + 2] += layer.velocities[offset + 2] * delta

            if (layer.drift[offset] > bounds.x) layer.drift[offset] = -bounds.x
            if (layer.drift[offset] < -bounds.x) layer.drift[offset] = bounds.x
            if (layer.drift[offset + 1] > bounds.y) layer.drift[offset + 1] = -bounds.y
            if (layer.drift[offset + 1] < -bounds.y) layer.drift[offset + 1] = bounds.y
            if (layer.drift[offset + 2] > bounds.z) layer.drift[offset + 2] = -bounds.z
            if (layer.drift[offset + 2] < -bounds.z) layer.drift[offset + 2] = bounds.z

            const phase = layer.phases[index]
            layer.positions[offset] = layer.drift[offset] + Math.sin(wave + phase) * amplitude
            layer.positions[offset + 1] = layer.drift[offset + 1] + Math.cos(wave * 0.85 + phase) * amplitude * 0.7
            layer.positions[offset + 2] = layer.drift[offset + 2] + Math.sin(wave * 0.65 + phase * 1.2) * amplitude * 0.5
          }

          layer.geometry.attributes.position.needsUpdate = true
        })

        renderer.render(scene, camera)
        frameId = window.requestAnimationFrame(animate)
      }

      frameId = window.requestAnimationFrame(animate)

      cleanup = () => {
        window.cancelAnimationFrame(frameId)
        if (canTrackPointer) {
          window.removeEventListener('mousemove', onMove)
        }
        resizeObserver.disconnect()
        layers.forEach((layer) => {
          layer.geometry.dispose()
          layer.material.dispose()
        })
        scene.remove(cloud)
        renderer.dispose()
        if (canvasHost.contains(renderer.domElement)) {
          canvasHost.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="main-content"
      className="hero"
      aria-label="Hero"
    >
      <div className="hero-canvas" ref={canvasRef} aria-hidden="true" />
      {!isMobile && (
        <video
          className="hero-video"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-center">
        <p className="hero-eyebrow">Agência de desenvolvimento e conteúdo</p>

        <h1 className="hero-title" aria-label="Vamos construir seu legado">
          <span className="hero-line">Vamos construir</span>
          <span className="hero-line hero-line--gold">seu legado</span>
        </h1>

        <p className={`hero-subtitle ${visible ? 'sub-in' : 'sub-out'}`}>
          {subtitles[subtitleIdx]}
        </p>

        <div className="hero-ctas">
          <a className="cta-primary" href="#portfolio">Ver portfólio</a>
          <a className="cta-ghost" href="#contato">Falar com a Titanium</a>
        </div>

        <div className="hero-stats" aria-label="Indicadores da Titanium">
          <div className="hstat">
            <strong>+50</strong>
            <span>PROJETOS</span>
          </div>
          <div className="hstat-divider" aria-hidden="true" />
          <div className="hstat">
            <strong>100%</strong>
            <span>SATISFAÇÃO</span>
          </div>
          <div className="hstat-divider" aria-hidden="true" />
          <div className="hstat">
            <strong>2020</strong>
            <span>DESDE</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
