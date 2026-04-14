import BlurText from './BlurText'
import Timeline from './Timeline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './SobreSection.css'

const USE_ORBITAL_VISUAL = true

const valores = [
  {
    sigla: 'M',
    titulo: 'Missão',
    texto: 'Transformar a visão de empreendedores em produtos digitais que geram resultado real e duradouro.',
  },
  {
    sigla: 'V',
    titulo: 'Visão',
    texto: 'Ser a agência de referência para pequenos e médios empreendedores que querem deixar um legado digital.',
  },
  {
    sigla: 'V',
    titulo: 'Valores',
    texto: 'Compromisso, excelência técnica, comunicação honesta e entrega que supera o combinado.',
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
                <span className="sv-year">2020</span>
                <span className="sv-label">fundada</span>
              </div>

              <div className="sv-stat sv-stat--tl">
                <strong>+50</strong>
                <span>projetos</span>
              </div>

              <div className="sv-stat sv-stat--br">
                <strong>100%</strong>
                <span>satisfação</span>
              </div>

              <div className="sv-badge">
                <span>Criamos</span>
                <span className="sv-badge-gold">Legado</span>
              </div>
            </div>
          ) : (
            <div className="sobre-editorial anim-hidden-left">
              <div className="sobre-editorial-card">
                <span className="sobre-editorial-tag">Desde 2020</span>
                <h3 className="sobre-editorial-title">Criamos presença digital com base estratégica, estética forte e entrega consistente.</h3>
                <p className="sobre-editorial-text">
                  Menos efeito solto, mais estrutura. A proposta aqui é simples: transformar ideia em operação digital clara, elegante e lucrativa.
                </p>
              </div>

              <div className="sobre-editorial-stats">
                <div className="sobre-stat-card">
                  <strong>+50</strong>
                  <span>projetos entregues</span>
                </div>
                <div className="sobre-stat-card">
                  <strong>100%</strong>
                  <span>foco em resultado</span>
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
              text="Tecnologia, direção criativa e parceria para construir marcas digitais memoráveis."
              className="section-heading"
            />
            <BlurText
              text="Desenhamos experiências, sites e sistemas com um olhar editorial: estética forte, estrutura clara e foco absoluto em resultado. Cada projeto nasce para durar, crescer e reforçar a presença de quem empreende."
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
          text="Um processo direto, estratégico e construído para dar clareza do primeiro briefing ao lançamento."
          className="section-heading"
        />
        <Timeline />
      </div>
    </section>
  )
}
