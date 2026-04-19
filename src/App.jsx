import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import useLenis from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WhatsAppButton from './components/WhatsAppButton'
import './styles/globals.css'

const ServicesSection = lazy(() => import('./components/ServicesSection'))
const PortfolioSection = lazy(() => import('./components/PortfolioSection'))
const SobreSection = lazy(() => import('./components/SobreSection'))
const DiferenciaisSection = lazy(() => import('./components/DiferenciaisSection'))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'))
const ContatoSection = lazy(() => import('./components/ContatoSection'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return (
    <div
      aria-hidden="true"
      className="section-padding"
      style={{ minHeight: '18vh', background: 'transparent' }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const progressRef = useRef(null)

  useLenis()

  useEffect(() => {
    let frameId = 0

    const updateProgress = () => {
      frameId = 0
      const html = document.documentElement
      const scrolled = html.scrollTop || document.body.scrollTop
      const total = html.scrollHeight - html.clientHeight
      const ratio = total > 0 ? Math.min(scrolled / total, 1) : 0

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }
    }

    const onScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : null}
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 200,
          height: '2px',
          background: 'var(--gold)',
          width: '100%',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.12s linear',
          pointerEvents: 'none',
        }}
      />
      <CustomCursor />
      <Navbar />
      {!loading ? (
        <main id="main-content" tabIndex="-1" aria-busy={loading}>
          <HeroSection id="inicio" />

          <Suspense fallback={<SectionFallback />}>
            <ServicesSection id="servicos" />
            <TestimonialsSection id="depoimentos" />
            <PortfolioSection id="portfolio" />
            <SobreSection id="sobre" />
            <DiferenciaisSection id="diferenciais" />
            <ContatoSection id="contato" />
            <Footer />
            <WhatsAppButton />
          </Suspense>
        </main>
      ) : null}
    </>
  )
}
