import { useEffect, useRef } from 'react'

export default function useMagneticEffect(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return undefined
    }

    if (
      window.matchMedia('(pointer: coarse)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    let frameId = 0
    const coords = { x: 0, y: 0 }

    const render = () => {
      frameId = 0
      el.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0)`
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      coords.x = (event.clientX - cx) * strength
      coords.y = (event.clientY - cy) * strength

      if (!frameId) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    const onLeave = () => {
      coords.x = 0
      coords.y = 0
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    const onEnter = () => {
      el.style.transition = 'transform 0.15s ease-out'
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerenter', onEnter)

    return () => {
      window.cancelAnimationFrame(frameId)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerenter', onEnter)
    }
  }, [strength])

  return ref
}
