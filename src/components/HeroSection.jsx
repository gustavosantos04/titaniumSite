import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const MOBILE_BREAKPOINT = 768
const HERO_VIDEO_SRC = '/videos/hero-light-beam.mp4'
const HERO_FALLBACK_SRC = '/frames/hero-poster.jpg'
const LOOP_SEAM_THRESHOLD = 0.35
const LOOP_SEAM_RELEASE_MS = 180

const subtitles = [
  'Criamos sites com foco em conversão.',
  'Construímos sistemas pensados para a rotina do negócio.',
  'Desenhamos conteúdo com direção e consistência.',
]

function canAutoplayHeroVideo() {
  if (typeof window === 'undefined') {
    return false
  }

  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const prefersReducedData = navigator.connection?.saveData
  const slowConnection = ['slow-2g', '2g'].includes(navigator.connection?.effectiveType)

  return !(isMobile || isTouchDevice || prefersReducedMotion || prefersReducedData || slowConnection)
}

export default function HeroSection({ id }) {
  const subtitleTimeoutRef = useRef(0)
  const idleTimerRef = useRef(0)
  const loopReleaseTimeoutRef = useRef(0)
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [useVideo, setUseVideo] = useState(() => canAutoplayHeroVideo())
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoopTransition, setVideoLoopTransition] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

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
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const pointerQuery = window.matchMedia('(pointer: coarse)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateStrategy = () => {
      const prefersReducedData = navigator.connection?.saveData
      const slowConnection = ['slow-2g', '2g'].includes(navigator.connection?.effectiveType)
      setUseVideo(!(mobileQuery.matches || pointerQuery.matches || motionQuery.matches || prefersReducedData || slowConnection))
    }

    updateStrategy()
    mobileQuery.addEventListener('change', updateStrategy)
    pointerQuery.addEventListener('change', updateStrategy)
    motionQuery.addEventListener('change', updateStrategy)

    return () => {
      mobileQuery.removeEventListener('change', updateStrategy)
      pointerQuery.removeEventListener('change', updateStrategy)
      motionQuery.removeEventListener('change', updateStrategy)
    }
  }, [])

  useEffect(() => {
    if (!useVideo) {
      setShouldLoadVideo(false)
      setVideoReady(false)
      setVideoLoopTransition(false)
      return undefined
    }

    const scheduleLoad = () => setShouldLoadVideo(true)

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(scheduleLoad, { timeout: 1200 })

      return () => {
        window.cancelIdleCallback(idleId)
      }
    }

    idleTimerRef.current = window.setTimeout(scheduleLoad, 350)

    return () => {
      window.clearTimeout(idleTimerRef.current)
    }
  }, [useVideo])

  useEffect(() => (
    () => {
      window.clearTimeout(subtitleTimeoutRef.current)
      window.clearTimeout(idleTimerRef.current)
      window.clearTimeout(loopReleaseTimeoutRef.current)
    }
  ), [])

  const releaseLoopTransition = () => {
    window.clearTimeout(loopReleaseTimeoutRef.current)
    loopReleaseTimeoutRef.current = window.setTimeout(() => {
      setVideoLoopTransition(false)
    }, LOOP_SEAM_RELEASE_MS)
  }

  const handleVideoTimeUpdate = (event) => {
    const { duration, currentTime, ended } = event.currentTarget

    if (!Number.isFinite(duration) || duration <= 0 || ended) {
      return
    }

    if (duration - currentTime <= LOOP_SEAM_THRESHOLD && !videoLoopTransition) {
      setVideoLoopTransition(true)
    }
  }

  const handleVideoEnded = async (event) => {
    const video = event.currentTarget

    setVideoLoopTransition(true)

    try {
      video.currentTime = 0
      const playPromise = video.play()

      if (playPromise?.catch) {
        await playPromise.catch(() => {})
      }
    } finally {
      releaseLoopTransition()
    }
  }

  const handleVideoPlaying = () => {
    setVideoReady(true)

    if (videoLoopTransition) {
      releaseLoopTransition()
    }
  }

  const shouldHideFallback = useVideo && shouldLoadVideo && !videoFailed && videoReady

  return (
    <section id={id} className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <img
          className={`hero-fallback-frame ${shouldHideFallback ? 'is-hidden' : ''}`}
          src={HERO_FALLBACK_SRC}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {useVideo && shouldLoadVideo && !videoFailed ? (
          <video
            className={`hero-video ${videoReady ? 'is-ready' : ''}`}
            src={HERO_VIDEO_SRC}
            poster={HERO_FALLBACK_SRC}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={handleVideoPlaying}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          />
        ) : null}

        <div
          className={`hero-video-seam ${videoLoopTransition ? 'is-visible' : ''}`}
          aria-hidden="true"
        />
        <div className="hero-backdrop" aria-hidden="true" />

        <div className="hero-copy">
          <p className="hero-eyebrow">Agência de desenvolvimento e conteúdo</p>

          <h1 id="hero-title" className="hero-title" aria-label="Vamos construir seu legado">
            <span className="hero-line">Vamos construir</span>
            <span className="hero-line hero-line--gold">seu legado</span>
          </h1>

          <p className={`hero-subtitle ${visible ? 'sub-in' : 'sub-out'}`} aria-live="polite">
            {subtitles[subtitleIdx]}
          </p>

          <div className="hero-ctas">
            <a className="cta-primary" href="#portfolio" aria-label="Ir para a seção de portfólio">
              Ver portfólio
            </a>
            <a className="cta-ghost" href="#contato">Falar com a Titanium</a>
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
