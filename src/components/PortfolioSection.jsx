import { useEffect, useRef } from 'react'
import BlurText from './BlurText'
import './PortfolioSection.css'

const projects = [
  {
    id: 1,
    titulo: 'Bella Estética',
    categoria: 'Site + Agendamento',
    descricao: 'Landing page com identidade premium, prova social e fluxo de agendamento integrado para converter visitas em consultas.',
    resultado: '+180% agendamentos',
    img: '/assets/portfolio/bella-estetica.jpg',
    cor: '#3D6AC1',
    rot: -3,
    scale: 1.02,
  },
  {
    id: 2,
    titulo: 'TechFlow',
    categoria: 'Plataforma SaaS',
    descricao: 'Produto com dashboard operacional, acompanhamento em tempo real e arquitetura preparada para crescimento do time e da receita.',
    resultado: '3x produtividade',
    img: '/assets/portfolio/techflow.jpg',
    cor: '#E0AF46',
    rot: 2,
    scale: 0.98,
  },
  {
    id: 3,
    titulo: 'Gourmet & Cia',
    categoria: 'E-commerce + Delivery',
    descricao: 'Experiência de compra pensada para mobile, com navegação simples, pedidos rápidos e foco em repetição de compra.',
    resultado: 'R$ 40k em 30 dias',
    img: '/assets/portfolio/gourmet.jpg',
    cor: '#2A468B',
    rot: -1.5,
    scale: 1,
  },
  {
    id: 4,
    titulo: 'Clínica Vida',
    categoria: 'Sistema de Gestão',
    descricao: 'Painel interno para organizar atendimento, consultas e rotinas administrativas com mais previsibilidade e menos retrabalho.',
    resultado: '-60% tempo admin.',
    img: '/assets/portfolio/clinica.jpg',
    cor: '#3D6AC1',
    rot: 3,
    scale: 1.03,
  },
  {
    id: 5,
    titulo: 'ImóvelPrime',
    categoria: 'Portal Imobiliário',
    descricao: 'Portal com busca refinada, destaque para imóveis estratégicos e estrutura pensada para captação e qualificação de leads.',
    resultado: '2x leads qualificados',
    img: '/assets/portfolio/imovel.jpg',
    cor: '#E0AF46',
    rot: -2,
    scale: 0.97,
  },
]

export default function PortfolioSection() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardsRef.current.indexOf(entry.target)
            window.setTimeout(() => {
              entry.target.classList.add('card-visible')
            }, idx * 120)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    cardsRef.current.forEach((element) => element && observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="portfolio" aria-label="Portfólio">
      <div className="portfolio-intro">
        <p className="section-eyebrow">Portfólio</p>
        <BlurText
          as="h2"
          text="Projetos com direção criativa, execução técnica e resultado real."
          className="section-heading"
        />
        <BlurText
          text="As fotos dos projetos devem ser colocadas em public/assets/portfolio. Os textos e descrições ficam no array projects deste componente."
          className="portfolio-sub"
        />
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            ref={(element) => {
              cardsRef.current[index] = element
            }}
            className={`pcard pcard--${index % 2 === 0 ? 'left' : 'right'}`}
            style={{
              '--rot': `${project.rot}deg`,
              '--accent': project.cor,
              '--scale': project.scale,
            }}
          >
            <div className="pcard-img-wrap">
              <img
                className="pcard-img"
                src={project.img}
                alt={project.titulo}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.parentNode.classList.add('pcard-img-placeholder')
                }}
              />
              <span className="pcard-resultado-pill">{project.resultado}</span>
              <div className="pcard-image-tint" aria-hidden="true" />
            </div>

            <div className="pcard-info">
              <span className="pcard-cat">{project.categoria}</span>
              <h3 className="pcard-title">{project.titulo}</h3>
              <p className="pcard-desc">{project.descricao}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="portfolio-cta-wrap">
        <a className="cta-primary" href="#contato">Quero um projeto assim</a>
      </div>
    </section>
  )
}
