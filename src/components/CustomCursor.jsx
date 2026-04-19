import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const CursorLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
`

const sharedCursorStyles = `
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 999px;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform, opacity;
`

const CursorDot = styled.div`
  ${sharedCursorStyles}
  width: 8px;
  height: 8px;
  background: var(--gold);
`

const CursorRing = styled.div`
  ${sharedCursorStyles}
  width: 32px;
  height: 32px;
  border: 1px solid var(--gold-border);
`

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const ringStateRef = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePointerMode = () => {
      setEnabled(!pointerQuery.matches)
      setReducedMotion(motionQuery.matches)
    }

    updatePointerMode()
    pointerQuery.addEventListener('change', updatePointerMode)
    motionQuery.addEventListener('change', updatePointerMode)

    return () => {
      pointerQuery.removeEventListener('change', updatePointerMode)
      motionQuery.removeEventListener('change', updatePointerMode)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) {
      return undefined
    }

    let visible = false

    const setOpacity = (opacity) => {
      dot.style.opacity = opacity
      ring.style.opacity = opacity
    }

    const onMove = ({ clientX, clientY }) => {
      targetRef.current.x = clientX
      targetRef.current.y = clientY

      if (!visible) {
        visible = true
        setOpacity('1')
      }

      if (reducedMotion) {
        dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
        ring.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onLeave = () => {
      visible = false
      setOpacity('0')
    }

    const animate = () => {
      if (reducedMotion) {
        return
      }

      const target = targetRef.current
      const ringState = ringStateRef.current

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`

      ringState.x += (target.x - ringState.x) * 0.1
      ringState.y += (target.y - ringState.y) * 0.1

      ring.style.transform = `translate3d(${ringState.x}px, ${ringState.y}px, 0) translate(-50%, -50%)`
      frameRef.current = window.requestAnimationFrame(animate)
    }

    setOpacity('0')
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    if (!reducedMotion) {
      frameRef.current = window.requestAnimationFrame(animate)
    }

    return () => {
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, reducedMotion])

  if (!enabled) {
    return null
  }

  return (
    <CursorLayer aria-hidden="true">
      <CursorDot ref={dotRef} />
      <CursorRing ref={ringRef} />
    </CursorLayer>
  )
}
