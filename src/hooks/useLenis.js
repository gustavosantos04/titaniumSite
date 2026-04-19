import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    let frameId = 0

    const frame = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(frame)
    }

    frameId = window.requestAnimationFrame(frame)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])
}
