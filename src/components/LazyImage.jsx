import { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={className} style={style}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : null}
    </div>
  )
}
