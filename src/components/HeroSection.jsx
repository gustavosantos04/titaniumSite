import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const MOBILE_BREAKPOINT = 768

// Coloque o vídeo em /public/videos/hero-light-beam.mp4
const HERO_VIDEO_SRC = '/videos/hero-light-beam.mp4'

// Fallback usado no mobile e caso o vídeo falhe no desktop.
const HERO_FALLBACK_SRC = '/frames/frame 1.jpg'

const subtitles = [
  'Criamos sites que vendem.',
  'Construímos sistemas que escalam.',
  'Geramos conteúdo que converte.',
]

export default function HeroSection() {
  const subtitleTimeoutRef = useRef(0)
  const videoRef = useRef(null)
  const videoRestartTimeoutRef = useRef(0)
  const videoFadeResetTimeoutRef = useRef(0)
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [useVideo, setUseVideo] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return !(isMobile || isTouchDevice || prefersReducedMotion)
  })
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoRestarting, setVideoRestarting] = useState(false)
  const [videoLoopFade, setVideoLoopFade] = useState(false)

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
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const onChange = () => {
      const isMobile = mediaQuery.matches
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setUseVideo(!(isMobile || isTouchDevice || prefersReducedMotion))
    }

    onChange()
    mediaQuery.addEventListener('change', onChange)

    return () => {
      mediaQuery.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => (
    () => {
      window.clearTimeout(videoRestartTimeoutRef.current)
      window.clearTimeout(videoFadeResetTimeoutRef.current)
    }
  ), [])

  const shouldHideFallback = videoReady && useVideo && !videoFailed && !videoRestarting

  const restartVideoSmoothly = () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    setVideoRestarting(true)
    setVideoLoopFade(true)
    window.clearTimeout(videoRestartTimeoutRef.current)
    window.clearTimeout(videoFadeResetTimeoutRef.current)

    videoRestartTimeoutRef.current = window.setTimeout(() => {
      video.currentTime = 0

      const playPromise = video.play()

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          setVideoFailed(true)
        })
      }
    }, 260)
  }

  const handleVideoPlaying = () => {
    setVideoReady(true)

    if (videoRestarting) {
      window.clearTimeout(videoRestartTimeoutRef.current)
      videoRestartTimeoutRef.current = window.setTimeout(() => {
        setVideoRestarting(false)
      }, 180)
    }

    if (videoLoopFade) {
      window.clearTimeout(videoFadeResetTimeoutRef.current)
      videoFadeResetTimeoutRef.current = window.setTimeout(() => {
        setVideoLoopFade(false)
      }, 260)
    }
  }

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return
    }

    const remainingTime = video.duration - video.currentTime

    if (remainingTime <= 0.35) {
      setVideoLoopFade(true)
      return
    }

    if (!videoRestarting && remainingTime > 0.6 && videoLoopFade) {
      setVideoLoopFade(false)
    }
  }

  return (
    <section
      id="main-content"
      className="hero"
      aria-label="Hero com vídeo de fundo"
    >
      <div className="hero-stage">
        <img
          className={`hero-fallback-frame ${shouldHideFallback ? 'is-hidden' : ''}`}
          src={HERO_FALLBACK_SRC}
          alt="Feixe de luz azul em fundo escuro"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {useVideo && !videoFailed ? (
          <video
            ref={videoRef}
            className={`hero-video ${videoReady ? 'is-ready' : ''}`}
            src={HERO_VIDEO_SRC}
            poster={HERO_FALLBACK_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={handleVideoPlaying}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={restartVideoSmoothly}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          />
        ) : null}

        <div className="hero-backdrop" aria-hidden="true" />
        <div className={`hero-loop-fade ${videoLoopFade ? 'is-active' : ''}`} aria-hidden="true" />

        <div className="hero-copy">
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

          <div className="hero-scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
