import { useEffect, useRef, useState } from 'react'
import iconSrc from '../assets/icone-t.png'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval)
          return 100
        }

        return Math.min(prev + 2, 100)
      })
    }, 30)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (progress < 100 || completedRef.current) {
      return undefined
    }

    completedRef.current = true

    const fadeTimer = window.setTimeout(() => {
      setFadeOut(true)
    }, 300)

    const completeTimer = window.setTimeout(() => {
      onComplete?.()
    }, 900)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete, progress])

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`} aria-hidden={fadeOut}>
      <div className="loading-icon">
        <img className="loading-t" src={iconSrc} alt="Titanium Agency Legacy" />
      </div>

      <div className="loading-bar-wrap" aria-hidden="true">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="loading-label">TITANIUM AGENCY LEGACY</div>
    </div>
  )
}
