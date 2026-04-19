import { useBlurReveal } from '../hooks/useBlurReveal'
import './BlurText.css'

export default function BlurText({
  text,
  as,
  className = '',
  staggerDelay = 0.04,
  duration = 0.7,
  threshold = 0.2,
  rootMargin = '0px 0px -80px 0px',
  ...props
}) {
  const Component = as || 'p'
  const ref = useBlurReveal({ staggerDelay, duration, threshold, rootMargin })

  return (
    <Component
      ref={ref}
      data-text={text}
      className={['blur-text', className].filter(Boolean).join(' ')}
      {...props}
    >
      {text}
    </Component>
  )
}
