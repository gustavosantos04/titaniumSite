import { useEffect, useRef, useState } from 'react'
import BlurText from './BlurText'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './TestimonialsSection.css'

const depoimentos = [
  {
    id: 1,
    nome: 'Nelter Santos',
    cargo: 'Dono',
    empresa: 'NGF Racing',
    texto:
      'Site muito mais intuitivo e com diferencial gigante no meu nicho. O processo foi leve, com comunicação clara e entregas rápidas. Recomendo demais para quem quer crescer online.',
    inicial: 'NS',
    cor: '#3D6AC1',
  },
  {
    id: 2,
    nome: 'Gestão',
    cargo: 'Atlética Universitária',
    empresa: 'AAAU',
    texto:
      'Em nome da atlética, só temos a agradecer. O site ficou incrível, super fácil de usar e com uma identidade visual que representa muito bem a nossa marca. Primeiro site no nicho de atléticas.',
    inicial: 'AU',
    cor: '#E0AF46',
  },
  {
    id: 3,
    nome: 'Silvio Ricardo',
    cargo: 'Dono',
    empresa: 'Eletroser',
    texto:
      'O site da Eletroser ficou muito bom, superou minhas expectativas. O processo foi tranquilo, com comunicação clara e entregas rápidas. Recomendo a Titanium para quem quer um site profissional e eficiente.',
    inicial: 'SR',
    cor: '#2A468B',
  },
]

export default function TestimonialsSection({ id }) {
  const sectionRef = useScrollAnimation()
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)

  const goTo = (idx) => {
    if (animating || idx === active) {
      return
    }

    setAnimating(true)
    window.setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    intervalRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % depoimentos.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalRef.current)
    }
  }, [])

  const depoimento = depoimentos[active]

  return (
    <section
      className="testimonials-section section-padding"
      id={id}
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials-inner">
        <p className="testimonials-label section-eyebrow anim-hidden">Depoimentos</p>
        <div className="section-divider anim-hidden anim-delay-1" />
        <BlurText
          as="h2"
          id="testimonials-heading"
          text="O que dizem da Titanium"
          className="testimonials-title anim-hidden anim-delay-2"
        />
        <BlurText
          text="Relatos de clientes sobre processo, clareza e entrega."
          className="testimonials-intro anim-hidden anim-delay-3"
        />

        <article
          className={`testimonial-card anim-hidden anim-delay-4 ${animating ? 'fade-out' : 'fade-in'}`}
          aria-live="polite"
        >
          <div className="quote-mark">"</div>
          <p className="testimonial-text">{depoimento.texto}</p>

          <div className="testimonial-author">
            <div className="author-avatar" style={{ background: depoimento.cor }}>
              {depoimento.inicial}
            </div>

            <div>
              <span className="author-nome">{depoimento.nome}</span>
              <span className="author-cargo">
                {depoimento.cargo} - {depoimento.empresa}
              </span>
            </div>
          </div>
        </article>

        <div className="testimonial-dots anim-hidden anim-delay-5">
          {depoimentos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`dot${active === index ? ' active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Depoimento ${index + 1}`}
            />
          ))}
        </div>

        <div className="testimonial-nav anim-hidden anim-delay-5">
          {depoimentos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`nav-chip${active === index ? ' active' : ''}`}
              onClick={() => goTo(index)}
              aria-pressed={active === index}
            >
              <span className="chip-avatar" style={{ background: item.cor }}>
                {item.inicial}
              </span>
              <span className="chip-nome">{item.nome}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
