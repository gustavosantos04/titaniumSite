import { useEffect, useRef } from 'react'
import BlurText from './BlurText'
import aaauImg from '../assets/portfolio/aaau.png'
import ngfRacingImg from '../assets/portfolio/ngf-racing.png'
import './PortfolioSection.css'

const projects = [
  {
    id: 1,
    titulo: 'NGF Racing',
    categoria: 'Site institucional',
    descricao: 'Apresentação da marca com foco em posicionamento, clareza de serviço e um caminho de contato mais direto.',
    destaque: 'Aumento de leads',
    img: ngfRacingImg,
    alt: 'Tela inicial do projeto NGF Racing',
    cor: '#a10c0c',
    rot: -2,
    scale: 1.01,
  },
  {
    id: 2,
    titulo: 'AAAU',
    categoria: 'Site institucional',
    descricao: 'Apresentação da atlética com foco em posicionamento, identidade visual e um contato mais direto com os estudantes.',
    destaque: 'Atrair mais membros',
    img: aaauImg,
    alt: 'Tela inicial do projeto AAAU',
    cor: '#E0AF46',
    rot: 2,
    scale: 0.99,
  },
]

export default function PortfolioSection({ id }) {
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
    <section className="portfolio" id={id} aria-labelledby="portfolio-heading">
      <div className="portfolio-intro">
        <p className="section-eyebrow">Portfólio</p>
        <BlurText
          as="h2"
          id="portfolio-heading"
          text="Projetos em destaque"
          className="section-heading"
        />
        <BlurText
          text="Selecionamos poucos projetos para destacar o tipo de problema que gostamos de resolver e a forma como organizamos cada entrega."
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
            className="pcard"
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
                alt={project.alt}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.parentNode.classList.add('pcard-img-placeholder')
                }}
              />
              <span className="pcard-resultado-pill">{project.destaque}</span>
              <div className="pcard-image-tint" aria-hidden="true" />
            </div>

            <div className="pcard-info">
              <span className="pcard-cat">{project.categoria}</span>
              <h3 className="pcard-title">{project.titulo}</h3>
              <p className="pcard-desc">{project.descricao}</p>
              <span className="pcard-link pcard-link--muted">Apresentação disponível no contato</span>
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
