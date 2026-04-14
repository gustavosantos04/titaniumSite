import { Suspense, lazy, useEffect, useState } from 'react'
import useLenis from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WhatsAppButton from './components/WhatsAppButton'
import './styles/globals.css'

const ServicesSection = lazy(() => import('./components/ServicesSection'))
const StatsSection = lazy(() => import('./components/StatsSection'))
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
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useLenis()

  useEffect(() => {
    const onScroll = () => {
      const html = document.documentElement
      const scrolled = html.scrollTop || document.body.scrollTop
      const total = html.scrollHeight - html.clientHeight
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : null}
      <a
        href="#main-content"
        className="skip-link"
        onFocus={(event) => {
          event.target.style.top = '1rem'
        }}
        onBlur={(event) => {
          event.target.style.top = '-100px'
        }}
      >
        Pular para o conteúdo
      </a>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 200,
          height: '2px',
          background: 'var(--gold)',
          width: `${progress}%`,
          transition: 'width 0.1s linear',
          pointerEvents: 'none',
        }}
      />
      <CustomCursor />
      <Navbar />
      {!loading ? (
        <main>
          <section id="inicio" aria-label="Início">
            <HeroSection />
          </section>

          <Suspense fallback={<SectionFallback />}>
            <section id="servicos" aria-label="Serviços">
              <ServicesSection />
            </section>
            <StatsSection />
            <section id="portfolio" aria-label="Portfólio">
              <PortfolioSection />
            </section>
            <section id="sobre" aria-label="Sobre a Titanium">
              <SobreSection />
            </section>
            <section id="diferenciais" aria-label="Diferenciais">
              <DiferenciaisSection />
            </section>
            <section id="depoimentos" aria-label="Depoimentos">
              <TestimonialsSection />
            </section>
            <section id="contato" aria-label="Contato">
              <ContatoSection />
            </section>
            <Footer />
            <WhatsAppButton />
          </Suspense>
        </main>
      ) : null}
    </>
  )
}
