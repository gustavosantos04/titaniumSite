import Timeline from './Timeline'
import './SobreSection.css'

const mvv = [
  ['Missão', 'Transformar necessidades reais em tecnologia útil e bem construída.'],
  ['Visão', 'Criar produtos digitais duradouros e relações honestas.'],
  ['Valores', 'Responsabilidade, cuidado, comunicação direta e evolução.'],
]

export default function SobreSection({ id }) {
  return (
    <section className="about" id={id} aria-labelledby="about-heading">
      <div className="about-summary">
        <div>
          <span className="section-eyebrow">Sobre a Titanium</span>
          <h2 id="about-heading" className="section-heading">Tecnologia feita<br />de perto.</h2>
        </div>
        <div className="about-copy">
          <p>Somos um estúdio de tecnologia com operação enxuta. Entendemos o contexto, definimos o que realmente precisa ser construído e acompanhamos cada etapa diretamente.</p>
          <p>Sem camadas desnecessárias entre a conversa e a execução.</p>
        </div>
      </div>

      <div className="about-process">
        <span className="section-eyebrow">Nosso processo</span>
        <h2 className="section-heading">Da ideia ao lançamento.</h2>
        <Timeline />
      </div>

      <div className="about-mvv" aria-label="Missão, visão e valores">
        {mvv.map(([label, text]) => (
          <div key={label}><strong>{label}</strong><span>{text}</span></div>
        ))}
      </div>
    </section>
  )
}
