import Timeline from './Timeline'
import './SobreSection.css'

const principles = [
  { number: '01', title: 'Contato direto', text: 'Você conversa com quem entende e executa o projeto, sem camadas desnecessárias no caminho.' },
  { number: '02', title: 'Escopo visível', text: 'Etapas, prioridades e limites são alinhados antes da construção para que todos saibam o que esperar.' },
  { number: '03', title: 'Entrega acompanhada', text: 'Publicação não é despedida. A entrega inclui orientação e espaço para os ajustes combinados.' },
]

const mvv = [
  { label: 'Missão', text: 'Transformar necessidades reais de negócio em tecnologia útil, compreensível e bem construída.' },
  { label: 'Visão', text: 'Construir uma empresa reconhecida por produtos digitais duradouros e relações honestas.' },
  { label: 'Valores', text: 'Responsabilidade no escopo, cuidado na execução, comunicação direta e evolução contínua.' },
]

export default function SobreSection({ id }) {
  return (
    <section className="about" id={id} aria-labelledby="about-heading">
      <div className="about-intro">
        <div>
          <span className="section-eyebrow">Titanium / modo de construir</span>
          <h2 id="about-heading" className="section-heading">A ideia ganha<br />estrutura.</h2>
        </div>
        <div className="about-statement">
          <p>Somos um estúdio de tecnologia com operação enxuta. Entramos em cada projeto para entender a rotina, decidir o que importa agora e construir uma solução que possa continuar evoluindo.</p>
          <span>ESTRATÉGIA → INTERFACE → TECNOLOGIA</span>
        </div>
      </div>

      <div className="about-principles">
        {principles.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="about-process">
        <span className="section-eyebrow">Do primeiro contato ao lançamento</span>
        <h2 className="section-heading">Um processo que você<br />consegue acompanhar.</h2>
        <Timeline />
      </div>

      <div className="about-mvv">
        {mvv.map((item) => (
          <article key={item.label}><h3>{item.label}</h3><p>{item.text}</p></article>
        ))}
      </div>
    </section>
  )
}
