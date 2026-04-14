import { useEffect, useRef } from 'react'
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
    desc: 'Sites institucionais, landing pages e portfólios que convertem visitantes em clientes reais. Design premium, carregamento rápido e otimizados para SEO.',
    icon: <IconSite />,
    tags: ['React', 'Next.js', 'Vite', 'SEO'],
    destaque: '+180% de conversão média',
    cor: '#3D6AC1',
  },
  {
    id: 2,
    num: '02',
    titulo: 'Sistemas Web & SaaS',
    desc: 'Plataformas completas com dashboards, autenticação, banco de dados e lógica de negócio. Do MVP ao produto escalável.',
    icon: <IconSaas />,
    tags: ['Node.js', 'PostgreSQL', 'API REST', 'React'],
    destaque: '3x mais produtividade',
    cor: '#E0AF46',
  },
  {
    id: 3,
    num: '03',
    titulo: 'E-commerce',
    desc: 'Lojas virtuais com carrinho inteligente, integração de pagamento, gestão de estoque e experiência de compra que fideliza.',
    icon: <IconEcommerce />,
    tags: ['Stripe', 'Firebase', 'Next.js', 'WooCommerce'],
    destaque: 'R$ 40k em 30 dias',
    cor: '#3D6AC1',
  },
  {
    id: 4,
    num: '04',
    titulo: 'Conteúdo para Instagram',
    desc: 'Estratégia editorial, criação de posts, reels e stories alinhados à identidade da sua marca para crescer com consistência.',
    icon: <IconInstagram />,
    tags: ['Design', 'Copywriting', 'Reels', 'Stories'],
    destaque: '+5k seguidores/mês',
    cor: '#E1306C',
  },
  {
    id: 5,
    num: '05',
    titulo: 'Sistemas de Gestão',
    desc: 'CRM, ERP e painéis administrativos personalizados que automatizam processos e eliminam retrabalho operacional.',
    icon: <IconSistema />,
    tags: ['React', 'MongoDB', 'Charts', 'Relatórios'],
    destaque: '-60% tempo administrativo',
    cor: '#E0AF46',
  },
  {
    id: 6,
    num: '06',
    titulo: 'Automação',
    desc: 'Fluxos automáticos de WhatsApp, e-mail marketing, agendamento e integração entre ferramentas do seu negócio.',
    icon: <IconAutomacao />,
    tags: ['N8N', 'WhatsApp API', 'Zapier', 'Make'],
    destaque: '24h trabalhando por você',
    cor: '#3D6AC1',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])
  const activeRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      return undefined
    }

    const activate = (index) => {
      document.getElementById(`srv-panel-${activeRef.current}`)?.classList.remove('panel-active')
      itemsRef.current[activeRef.current]?.classList.remove('srv-active')
      itemsRef.current[index]?.classList.add('srv-active')
      document.getElementById(`srv-panel-${index}`)?.classList.add('panel-active')
      activeRef.current = index
    }

    activate(0)

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight

      if (rect.top > 0 || rect.bottom < window.innerHeight || total <= 0) {
        return
      }

      const progress = Math.abs(rect.top) / total
      const index = Math.min(Math.floor(progress * services.length), services.length - 1)

      if (index !== activeRef.current) {
        activate(index)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="services" id="servicos" ref={sectionRef} aria-label="Serviços">
      <div className="services-sticky">
        <div className="services-header">
          <span className="section-eyebrow">Serviços</span>
          <BlurText
            text="Tudo que seu negócio precisa no digital"
            as="h2"
            className="section-heading"
            staggerDelay={0.06}
          />
        </div>

        <div className="services-body">
          <div className="services-list">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(element) => {
                  itemsRef.current[index] = element
                }}
                className="srv-item"
                style={{ '--srv-cor': service.cor }}
              >
                <span className="srv-num">{service.num}</span>
                <div className="srv-icon">{service.icon}</div>
                <h3 className="srv-titulo">{service.titulo}</h3>
              </div>
            ))}
          </div>

          <div className="services-detail">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="srv-detail-panel"
                id={`srv-panel-${index}`}
                style={{ '--srv-cor': service.cor }}
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
          <div key={service.id} className="srv-card-mobile" style={{ '--srv-cor': service.cor }}>
            <div className="srv-card-icon">{service.icon}</div>
            <h3>{service.titulo}</h3>
            <p>{service.desc}</p>
            <div className="sdp-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="sdp-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
