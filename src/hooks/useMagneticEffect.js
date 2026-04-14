import { useEffect, useRef } from 'react'

export default function useMagneticEffect(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return undefined
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      return undefined
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (event.clientX - cx) * strength
      const dy = (event.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }

    const onEnter = () => {
      el.style.transition = 'transform 0.15s ease-out'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseenter', onEnter)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseenter', onEnter)
    }
  }, [strength])

  return ref
}
