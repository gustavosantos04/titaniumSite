import { useState } from 'react'
import aaauImg from '../assets/portfolio/aaau.webp'
import ngfRacingImg from '../assets/portfolio/ngf-racing.webp'
import './PortfolioSection.css'

const projects = [
  {
    id: 'ngf', number: '01', title: 'NGF Racing', type: 'Site institucional',
    summary: 'Presença digital para apresentar a marca, seus serviços e abrir um caminho direto de contato.',
    image: ngfRacingImg, imageAlt: 'Página inicial do site NGF Racing', status: 'Publicado',
  },
  {
    id: 'aaau', number: '02', title: 'AAAU', type: 'Site institucional',
    summary: 'Experiência digital criada para representar a identidade da atlética e aproximar novos membros.',
    image: aaauImg, imageAlt: 'Página inicial do site AAAU', status: 'Publicado',
  },
  {
    id: 'eletroser', number: '03', title: 'Eletroser', type: 'Site institucional',
    summary: 'Site profissional voltado à apresentação dos serviços e ao contato com novos clientes.',
    status: 'Case em preparação', visual: 'circuit',
  },
  {
    id: 'juridico', number: '04', title: 'Operação jurídica', type: 'Automação confidencial',
    summary: 'Fluxo interno para apoiar o cadastro de processos e reduzir tarefas manuais em um escritório de advocacia.',
    status: 'Cliente confidencial', visual: 'flow',
  },
  {
    id: 'core', number: '05', title: 'Titanium Core', type: 'Produto próprio',
    summary: 'Produto tecnológico próprio da Titanium, apresentado com transparência enquanto sua primeira versão é construída.',
    status: 'Em desenvolvimento', visual: 'core',
  },
]

function ProjectVisual({ project }) {
  if (project.image) return <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
  return (
    <div className={`project-abstract project-abstract--${project.visual}`} aria-hidden="true">
      <span className="project-abstract-label">{project.type}</span>
      <div className="project-abstract-grid" />
      <strong>{project.number}</strong>
    </div>
  )
}

export default function PortfolioSection({ id }) {
  const [activeId, setActiveId] = useState(projects[0].id)
  const activeProject = projects.find((project) => project.id === activeId) || projects[0]

  return (
    <section className="portfolio" id={id} aria-labelledby="portfolio-heading">
      <header className="portfolio-header">
        <div>
          <span className="section-eyebrow">Projetos / 01—05</span>
          <h2 id="portfolio-heading" className="section-heading">Trabalho que vira<br />estrutura real.</h2>
        </div>
        <p>Projetos publicados, soluções internas e produtos em construção. Cada trabalho responde a um contexto diferente.</p>
      </header>

      <div className="portfolio-layout">
        <div className="project-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-row ${activeId === project.id ? 'project-row--active' : ''}`}
              onMouseEnter={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex="0"
            >
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-meta"><span>{project.type}</span><small>{project.status}</small></div>
              <span className="project-arrow" aria-hidden="true">↗</span>
              <div className="project-mobile-visual"><ProjectVisual project={project} /></div>
            </article>
          ))}
        </div>

        <aside className="project-preview" aria-live="polite">
          <ProjectVisual project={activeProject} />
          <div className="project-preview-caption"><span>{activeProject.title}</span><span>{activeProject.status}</span></div>
        </aside>
      </div>
    </section>
  )
}
