import { useEffect, useState } from 'react'
import iconSrc from '../assets/icone-t.png'
import logoSrc from '../assets/logo-titanium.png'
import './SiteIntro.css'

export default function SiteIntro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false)
      return undefined
    }

    const timer = window.setTimeout(() => setVisible(false), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro-grid" />
      <div className="site-intro-brand">
        <img className="site-intro-icon" src={iconSrc} alt="" />
        <img className="site-intro-logo" src={logoSrc} alt="" />
      </div>
      <div className="site-intro-line"><span /></div>
      <span className="site-intro-code">TI / LEGACY / 001</span>
    </div>
  )
}
