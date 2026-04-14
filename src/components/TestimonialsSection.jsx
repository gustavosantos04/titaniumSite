import { useEffect, useRef, useState } from 'react'
import BlurText from './BlurText'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './TestimonialsSection.css'

const depoimentos = [
  {
    id: 1,
    nome: 'Mariana Costa',
    cargo: 'Proprietária',
    empresa: 'Bella Estética',
    texto:
      'A Titanium transformou completamente meu negócio. Em 60 dias, triplicamos os agendamentos e hoje tenho um sistema que trabalha por mim 24 horas.',
    inicial: 'MC',
    cor: '#3D6AC1',
  },
  {
    id: 2,
    nome: 'Rafael Mendes',
    cargo: 'CEO',
    empresa: 'TechFlow Consultoria',
    texto:
      'Profissionalismo impecável. Entregaram antes do prazo, com qualidade acima do esperado. O suporte pós-entrega é diferencial: são parceiros de verdade.',
    inicial: 'RM',
    cor: '#E0AF46',
  },
  {
    id: 3,
    nome: 'Beatriz Oliveira',
    cargo: 'Diretora',
    empresa: 'Clínica Vida',
    texto:
      'Nosso sistema antigo era um pesadelo. A equipe da Titanium entendeu cada detalhe do nosso processo e criou algo que realmente funciona para a saúde.',
    inicial: 'BO',
    cor: '#2A468B',
  },
  {
    id: 4,
    nome: 'Lucas Ferreira',
    cargo: 'Fundador',
    empresa: 'ImóvelPrime',
    texto:
      'ROI em menos de 3 meses. O portal que desenvolveram se tornou nossa principal fonte de leads qualificados. Vale cada centavo investido.',
    inicial: 'LF',
    cor: '#3D6AC1',
  },
]

export default function TestimonialsSection() {
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
    intervalRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % depoimentos.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalRef.current)
    }
  }, [])

  const depoimento = depoimentos[active]

  return (
    <section className="testimonials-section section-padding" ref={sectionRef} aria-label="Depoimentos">
      <div className="testimonials-inner">
        <p className="testimonials-label section-eyebrow anim-hidden">Depoimentos</p>
        <div className="section-divider anim-hidden anim-delay-1" />
        <BlurText
          as="h2"
          text="O que nossos clientes dizem"
          className="testimonials-title anim-hidden anim-delay-2"
        />
        <BlurText
          text="Projetos memoráveis deixam resultados mensuráveis e relações duradouras. É isso que os clientes relatam depois da entrega."
          className="testimonials-intro anim-hidden anim-delay-3"
        />

        <article className={`testimonial-card anim-hidden anim-delay-4 ${animating ? 'fade-out' : 'fade-in'}`}>
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
