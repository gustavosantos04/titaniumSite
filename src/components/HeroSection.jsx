import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

const MOBILE_BREAKPOINT = 768
const LOOP_BLEND_START_SECONDS = 0.45
const LOOP_FADE_OUT_MS = 240
const LOOP_SETTLE_MS = 520

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
  const videoRefs = useRef([null, null])
  const loopSwapTimeoutRef = useRef(0)
  const loopResetTimeoutRef = useRef(0)
  const activeVideoIndexRef = useRef(0)
  const isLoopTransitioningRef = useRef(false)
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
  const [readyVideos, setReadyVideos] = useState([false, false])
  const [videoFailed, setVideoFailed] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [videoLoopFade, setVideoLoopFade] = useState(false)

  useEffect(() => {
    activeVideoIndexRef.current = activeVideoIndex
  }, [activeVideoIndex])

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
      window.clearInterval(subtitleTimeoutRef.current)
      window.clearTimeout(loopSwapTimeoutRef.current)
      window.clearTimeout(loopResetTimeoutRef.current)
    }
  ), [])

  const handleVideoReady = (index) => {
    setReadyVideos((current) => {
      if (current[index]) {
        return current
      }

      const next = [...current]
      next[index] = true
      return next
    })
  }

  const startLoopTransition = () => {
    if (isLoopTransitioningRef.current) {
      return
    }

    const currentIndex = activeVideoIndexRef.current
    const nextIndex = currentIndex === 0 ? 1 : 0
    const currentVideo = videoRefs.current[currentIndex]
    const nextVideo = videoRefs.current[nextIndex]

    if (!currentVideo || !nextVideo) {
      return
    }

    isLoopTransitioningRef.current = true
    setVideoLoopFade(true)
    window.clearTimeout(loopSwapTimeoutRef.current)
    window.clearTimeout(loopResetTimeoutRef.current)

    nextVideo.currentTime = 0
    nextVideo.muted = true

    const playPromise = nextVideo.play()

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        setVideoFailed(true)
      })
    }

    loopSwapTimeoutRef.current = window.setTimeout(() => {
      setActiveVideoIndex(nextIndex)
    }, LOOP_FADE_OUT_MS)

    loopResetTimeoutRef.current = window.setTimeout(() => {
      currentVideo.pause()
      currentVideo.currentTime = 0
      setVideoLoopFade(false)
      isLoopTransitioningRef.current = false
    }, LOOP_SETTLE_MS)
  }

  const handleVideoTimeUpdate = (index) => {
    if (index !== activeVideoIndexRef.current || isLoopTransitioningRef.current) {
      return
    }

    const activeVideo = videoRefs.current[index]

    if (!activeVideo || !Number.isFinite(activeVideo.duration) || activeVideo.duration <= 0) {
      return
    }

    const remainingTime = activeVideo.duration - activeVideo.currentTime

    if (remainingTime <= LOOP_BLEND_START_SECONDS) {
      startLoopTransition()
    }
  }

  const handleVideoError = () => {
    setVideoFailed(true)
  }

  const shouldHideFallback = useVideo && !videoFailed && readyVideos.some(Boolean)

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
          <>
            {[0, 1].map((index) => (
              <video
                key={index}
                ref={(node) => {
                  videoRefs.current[index] = node
                }}
                className={`hero-video ${readyVideos[index] ? 'is-ready' : ''} ${activeVideoIndex === index ? 'is-active' : 'is-idle'}`}
                src={HERO_VIDEO_SRC}
                poster={HERO_FALLBACK_SRC}
                autoPlay={index === 0}
                muted
                playsInline
                preload="auto"
                onCanPlay={() => handleVideoReady(index)}
                onPlaying={() => handleVideoReady(index)}
                onTimeUpdate={() => handleVideoTimeUpdate(index)}
                onError={handleVideoError}
                aria-hidden="true"
              />
            ))}
          </>
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
