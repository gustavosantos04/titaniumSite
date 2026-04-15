import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import BlurText from './BlurText'
import useScrollAnimation from '../hooks/useScrollAnimation'

const STATS = [
  { value: 40, suffix: '+', label: 'Projetos entregues' },
  { value: 100, suffix: '%', label: 'Clientes satisfeitos' },
  { value: 2, suffix: '+', label: 'Anos construindo legado' },
  { value: 3, suffix: 'x', label: 'Retorno médio dos clientes' },
]

const easeOutQuart = (t) => 1 - (1 - t) ** 4

const Section = styled.section.attrs({
  className: 'section-padding',
  'aria-label': 'Resultados',
})`
  background: var(--bg);
  border-top: 1px solid var(--blue-border);
`

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 48px;
`

const StatsLabel = styled.p`
  margin-bottom: 12px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
`

const StatsTitle = styled(BlurText).attrs({ as: 'h2' })`
  margin-bottom: 16px;
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--cream);
`

const StatsIntro = styled(BlurText)`
  max-width: 560px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--cream-60);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
`

const StatItem = styled.article`
  padding: 0 28px;

  &:not(:last-child) {
    border-right: 1px solid var(--blue-border);
  }

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  @media (max-width: 767px) {
    padding: 0 0 32px;

    &:not(:last-child) {
      border-right: none;
    }

    &:nth-child(-n + 2) {
      border-bottom: 1px solid var(--blue-border);
    }

    &:nth-child(n + 3) {
      padding-bottom: 0;
    }
  }
`

const StatNumber = styled.div`
  font-family: var(--font-display);
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 800;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -0.02em;
`

const StatSuffix = styled.span`
  font-size: 0.55em;
  vertical-align: super;
`

const StatBar = styled.div`
  width: 0;
  height: 2px;
  background: var(--blue);
  margin: 16px 0;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;

  .anim-visible & {
    width: 40px;
  }
`

const StatLabel = styled.div`
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--cream-60);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export default function StatsSection() {
  const sectionRef = useScrollAnimation()
  const counterRef = useRef(null)
  const rafRef = useRef(0)
  const [counts, setCounts] = useState(() => STATS.map(() => 0))

  useEffect(() => {
    const section = counterRef.current

    if (!section) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts(STATS.map((stat) => stat.value))
      return undefined
    }

    let hasAnimated = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return
        }

        hasAnimated = true
        const duration = 2000
        let startTime = 0

        const step = (timestamp) => {
          if (!startTime) {
            startTime = timestamp
          }

          const progress = Math.min((timestamp - startTime) / duration, 1)
          const eased = easeOutQuart(progress)
          setCounts(STATS.map((stat) => Math.round(stat.value * eased)))

          if (progress < 1) {
            rafRef.current = window.requestAnimationFrame(step)
          }
        }

        rafRef.current = window.requestAnimationFrame(step)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <Section id="stats" ref={sectionRef}>
      <Inner ref={counterRef}>
        <Header>
          <StatsLabel className="section-eyebrow anim-hidden">Resultados que falam</StatsLabel>
          <div className="section-divider anim-hidden anim-delay-1" />
          <StatsTitle
            text="Números que provam o legado"
            className="anim-hidden anim-delay-2"
          />
          <StatsIntro
            text="A combinação entre estratégia, design e tecnologia aparece no que realmente importa: avanço consistente e clientes satisfeitos."
            className="anim-hidden anim-delay-3"
          />
        </Header>

        <Grid>
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} className={`anim-hidden anim-delay-${index + 1}`}>
              <StatNumber>
                <span>{counts[index]}</span>
                <StatSuffix>{stat.suffix}</StatSuffix>
              </StatNumber>
              <StatBar className="stat-bar" />
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
