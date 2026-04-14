import { useEffect, useRef } from 'react'

function normalizeOptions(options) {
  if (typeof options === 'number') {
    return { threshold: options }
  }

  return options
}

function applyDelayClass(node) {
  const delayMap = ['1', '2', '3', '4', '5']

  delayMap.forEach((delay) => {
    if (node.classList.contains(`anim-delay-${delay}`)) {
      node.classList.add(`delay-${delay}`)
    }
  })
}

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return undefined
    }

    const {
      threshold = 0.15,
      rootMargin = '0px 0px -60px 0px',
      animationClass = 'animate-in',
    } = normalizeOptions(options)

    const targets = Array.from(
      el.querySelectorAll('.anim-hidden, .anim-hidden-left, .anim-hidden-right, [data-animate-self]'),
    )
    const nodes = targets.length ? targets : [el]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    nodes.forEach((node) => {
      node.classList.add('will-animate')
      applyDelayClass(node)
    })

    if (reducedMotion) {
      nodes.forEach((node) => {
        node.classList.add(animationClass, 'anim-visible')
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add(animationClass, 'anim-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [options])

  return ref
}

export default useScrollAnimation
