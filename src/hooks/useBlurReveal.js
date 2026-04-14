import { useEffect, useRef } from 'react'

export function useBlurReveal(options = {}) {
  const ref = useRef(null)
  const {
    threshold = 0.2,
    staggerDelay = 0.04,
    duration = 0.7,
    rootMargin = '0px 0px -80px 0px',
  } = options

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return undefined
    }

    const text = el.getAttribute('data-text') || el.textContent || ''
    const words = text.trim().split(/\s+/).filter(Boolean)

    if (!words.length) {
      return undefined
    }

    el.innerHTML = words
      .map(
        (word, index) => `
          <span
            class="blur-word"
            style="transition-delay:${index * staggerDelay}s;transition-duration:${duration}s;"
          >${word}</span>
        `,
      )
      .join('')

    const spans = el.querySelectorAll('.blur-word')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      spans.forEach((span) => {
        span.style.opacity = '1'
        span.style.filter = 'blur(0px)'
        span.style.transform = 'translateY(0)'
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spans.forEach((span) => {
            span.style.opacity = '1'
            span.style.filter = 'blur(0px)'
            span.style.transform = 'translateY(0)'
          })
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [duration, rootMargin, staggerDelay, threshold])

  return ref
}
