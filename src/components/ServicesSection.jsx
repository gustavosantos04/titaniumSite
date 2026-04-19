import { useEffect, useId, useMemo, useRef, useState } from 'react'
import BlurText from './BlurText'
import {
  IconSite, IconSistema, IconInstagram,
  IconAutomacao, IconEcommerce, IconSaas,
} from '../assets/icons/services'
import './ServicesSection.css'

const services = [
  {
    id: 1,
    num: '01',
    titulo: 'Sites & Landing Pages',
    desc: 'Sites institucionais, landing pages e portfólios com estrutura clara, carregamento rápido e foco em apresentação profissional.',
    icon: <IconSite />,
    tags: ['React', 'Next.js', 'Vite', 'SEO'],
    destaque: 'Clareza de proposta',
    cor: '#3D6AC1',
  },
  {
    id: 2,
    num: '02',
    titulo: 'Sistemas Web & SaaS',
    desc: 'Plataformas com dashboards, autenticação, banco de dados e lógica de negócio pensadas para organizar a operação e apoiar crescimento.',
    icon: <IconSaas />,
    tags: ['Node.js', 'PostgreSQL', 'API REST', 'React'],
    destaque: 'Estrutura para evoluir',
    cor: '#E0AF46',
  },
  {
    id: 3,
    num: '03',
    titulo: 'E-commerce',
    desc: 'Lojas virtuais com jornada simples, integração de pagamento, gestão de estoque e experiência pensada para facilitar a compra.',
    icon: <IconEcommerce />,
    tags: ['Stripe', 'Firebase', 'Next.js', 'WooCommerce'],
    destaque: 'Compra sem fricção',
    cor: '#3D6AC1',
  },
  {
    id: 4,
    num: '04',
    titulo: 'Conteúdo para Instagram',
    desc: 'Estratégia editorial, criação de posts, reels e stories alinhados à identidade da marca para comunicar com mais consistência.',
    icon: <IconInstagram />,
    tags: ['Design', 'Copywriting', 'Reels', 'Stories'],
    destaque: 'Consistência de marca',
    cor: '#E1306C',
  },
  {
    id: 5,
    num: '05',
    titulo: 'Sistemas de Gestão',
    desc: 'CRM, ERP e painéis administrativos personalizados para reduzir retrabalho e dar mais previsibilidade à rotina.',
    icon: <IconSistema />,
    tags: ['React', 'MongoDB', 'Charts', 'Relatórios'],
    destaque: 'Rotina mais organizada',
    cor: '#E0AF46',
  },
  {
    id: 6,
    num: '06',
    titulo: 'Automação',
    desc: 'Fluxos automáticos de WhatsApp, e-mail, agendamento e integração entre ferramentas para deixar processos mais leves.',
    icon: <IconAutomacao />,
    tags: ['N8N', 'WhatsApp API', 'Zapier', 'Make'],
    destaque: 'Processos mais leves',
    cor: '#3D6AC1',
  },
]

export default function ServicesSection({ id }) {
  const baseId = useId()
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth >= 769 : true
  ))
  const serviceIds = useMemo(
    () => services.map((service) => ({
      tabId: `${baseId}-${service.id}-tab`,
      panelId: `${baseId}-${service.id}-panel`,
    })),
    [baseId],
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)')
    const updateViewport = () => setIsDesktop(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      return undefined
    }

    let frameId = 0

    const onScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0

        const section = sectionRef.current

        if (!section) {
          return
        }

        const rect = section.getBoundingClientRect()
        const total = section.offsetHeight - window.innerHeight

        if (rect.top > 0 || rect.bottom < window.innerHeight || total <= 0) {
          return
        }

        const progress = Math.abs(rect.top) / total
        const nextIndex = Math.min(Math.floor(progress * services.length), services.length - 1)
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isDesktop])

  return (
    <section ref={sectionRef} className="services" id={id} aria-labelledby={`${baseId}-heading`}>
      <div className="services-sticky">
        <div className="services-header">
          <span className="section-eyebrow">Serviços</span>
          <BlurText
            text="Soluções digitais"
            as="h2"
            id={`${baseId}-heading`}
            className="section-heading"
            staggerDelay={0.06}
          />
        </div>

        <div className="services-body">
          <div
            className="services-list"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Lista de serviços"
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`srv-item${activeIndex === index ? ' srv-active' : ''}`}
                style={{ '--srv-cor': service.cor }}
                role="tab"
                id={serviceIds[index].tabId}
                aria-selected={activeIndex === index}
                aria-controls={serviceIds[index].panelId}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => {
                  if (isDesktop) {
                    setActiveIndex(index)
                  }
                }}
                onKeyDown={(event) => {
                  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                    return
                  }

                  event.preventDefault()

                  if (event.key === 'Home') {
                    setActiveIndex(0)
                    document.getElementById(serviceIds[0].tabId)?.focus()
                    return
                  }

                  if (event.key === 'End') {
                    const lastIndex = services.length - 1
                    setActiveIndex(lastIndex)
                    document.getElementById(serviceIds[lastIndex].tabId)?.focus()
                    return
                  }

                  const direction = event.key === 'ArrowDown' ? 1 : -1
                  const nextIndex = (index + direction + services.length) % services.length
                  setActiveIndex(nextIndex)
                  document.getElementById(serviceIds[nextIndex].tabId)?.focus()
                }}
              >
                <span className="srv-num">{service.num}</span>
                <div className="srv-icon">{service.icon}</div>
                <h3 className="srv-titulo">{service.titulo}</h3>
              </button>
            ))}
          </div>

          <div className="services-detail">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`srv-detail-panel${activeIndex === index ? ' panel-active' : ''}`}
                id={serviceIds[index].panelId}
                style={{ '--srv-cor': service.cor }}
                role="tabpanel"
                aria-labelledby={serviceIds[index].tabId}
                tabIndex={0}
                hidden={activeIndex !== index}
              >
                <div className="sdp-icon">{service.icon}</div>
                <h3 className="sdp-titulo">{service.titulo}</h3>
                <p className="sdp-desc">{service.desc}</p>
                <div className="sdp-destaque">
                  <span className="sdp-destaque-label">Resultado típico</span>
                  <span className="sdp-destaque-valor">{service.destaque}</span>
                </div>
                <div className="sdp-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="sdp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="services-mobile">
        {services.map((service) => (
          <article key={service.id} className="srv-card-mobile" style={{ '--srv-cor': service.cor }}>
            <div className="srv-card-icon">{service.icon}</div>
            <h3>{service.titulo}</h3>
            <p>{service.desc}</p>
            <div className="sdp-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="sdp-tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
