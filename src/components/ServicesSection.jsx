import { IconSite, IconSistema, IconAutomacao } from '../assets/icons/services'
import './ServicesSection.css'

const services = [
  {
    number: '01', title: 'Sites & experiências digitais', icon: <IconSite />,
    description: 'Sites institucionais, landing pages, portfólios e lojas que apresentam sua marca com objetividade e funcionam bem em qualquer tela.',
    deliverables: ['Arquitetura e interface', 'Desenvolvimento responsivo', 'SEO e publicação'],
  },
  {
    number: '02', title: 'Sistemas sob medida', icon: <IconSistema />,
    description: 'Painéis, portais e ferramentas internas construídos em torno da rotina real da sua operação.',
    deliverables: ['Mapeamento da operação', 'Interfaces e regras de negócio', 'Evolução por etapas'],
  },
  {
    number: '03', title: 'Automações & integrações', icon: <IconAutomacao />,
    description: 'Fluxos que conectam ferramentas, organizam informações e retiram tarefas repetitivas do caminho da equipe.',
    deliverables: ['Diagnóstico do fluxo', 'Integração entre ferramentas', 'Monitoramento e suporte'],
  },
]

export default function ServicesSection({ id }) {
  return (
    <section className="services" id={id} aria-labelledby="services-heading">
      <header className="services-header">
        <span className="section-eyebrow">Como podemos construir</span>
        <h2 id="services-heading" className="section-heading">Tecnologia com<br />função definida.</h2>
        <p>Não começamos pela ferramenta. Primeiro entendemos o que precisa funcionar; depois escolhemos a melhor forma de construir.</p>
      </header>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.number} className="service-card">
            <div className="service-card-top"><span>{service.number}</span><div>{service.icon}</div></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.deliverables.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
