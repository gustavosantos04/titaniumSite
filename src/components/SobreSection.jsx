import BlurText from './BlurText'
import Timeline from './Timeline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './SobreSection.css'

const USE_ORBITAL_VISUAL = true

const valores = [
  {
    sigla: 'M',
    titulo: 'Missão',
    texto: 'Ajudar negócios a organizar sua presença digital com mais clareza, direção e consistência.',
  },
  {
    sigla: 'V',
    titulo: 'Visão',
    texto: 'Crescer de forma sustentável ao lado de marcas que valorizam trabalho bem feito e comunicação direta.',
  },
  {
    sigla: 'V',
    titulo: 'Valores',
    texto: 'Honestidade no escopo, cuidado na execução, proximidade no processo e melhoria contínua a cada entrega.',
  },
]

export default function SobreSection() {
  const leftRef = useScrollAnimation({ threshold: 0.15 })
  const rightRef = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const processRef = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  return (
    <section className="sobre" aria-label="Sobre nós">
      <div className="sobre-inner">
        <div ref={leftRef} className="sobre-left">
          {USE_ORBITAL_VISUAL ? (
            <div className="sobre-visual anim-hidden-left">
              <div className="sv-ring sv-ring--1" aria-hidden="true" />
              <div className="sv-ring sv-ring--2" aria-hidden="true" />
              <div className="sv-ring sv-ring--3" aria-hidden="true" />

              <div className="sv-center">
                <span className="sv-year">1:1</span>
                <span className="sv-label">parceria</span>
              </div>

              <div className="sv-stat sv-stat--tl">
                <strong>escuta</strong>
                <span>ativa</span>
              </div>

              <div className="sv-stat sv-stat--br">
                <strong>entrega</strong>
                <span>clara</span>
              </div>

              <div className="sv-badge">
                <span>com</span>
                <span className="sv-badge-gold">método</span>
              </div>
            </div>
          ) : (
            <div className="sobre-editorial anim-hidden-left">
              <div className="sobre-editorial-card">
                <span className="sobre-editorial-tag">Operação enxuta</span>
                <h3 className="sobre-editorial-title">Criamos presença digital com direção estratégica, estética forte e execução consistente.</h3>
                <p className="sobre-editorial-text">
                  Menos efeito solto, mais estrutura. A proposta aqui é transformar ideia em presença digital clara, funcional e alinhada ao momento da marca.
                </p>
              </div>

              <div className="sobre-editorial-stats">
                <div className="sobre-stat-card">
                  <strong>escuta</strong>
                  <span>antes de qualquer entrega</span>
                </div>
                <div className="sobre-stat-card">
                  <strong>clareza</strong>
                  <span>do briefing ao lançamento</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={rightRef} className="sobre-right">
          <div className="sobre-right-shell anim-hidden-right">
            <p className="section-eyebrow">Sobre nós</p>
            <BlurText
              as="h2"
              text="Presença com direção"
              className="section-heading"
            />
            <BlurText
              text="Somos uma agência jovem, com operação enxuta e acompanhamento próximo. Entramos em cada projeto para entender o contexto, organizar prioridades e entregar algo coerente com o momento do negócio."
              className="sobre-desc"
            />

            <div className="sobre-divider" />

            <div className="sobre-mvv">
              {valores.map((valor) => (
                <article key={valor.titulo} className="mvv-item anim-hidden">
                  <span className="mvv-sigla">{valor.sigla}</span>
                  <div>
                    <span className="mvv-titulo">{valor.titulo}</span>
                    <p className="mvv-texto">{valor.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={processRef} className="sobre-process anim-hidden">
        <p className="section-eyebrow">Como trabalhamos</p>
        <BlurText
          as="h2"
          text="Nosso processo"
          className="section-heading"
        />
        <Timeline />
      </div>
    </section>
  )
}
