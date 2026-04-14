import { useState } from 'react'
import BlurText from './BlurText'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ContatoSection.css'

const WHATSAPP = import.meta.env.VITE_WHATSAPP || '5500000000000'
const EMAIL = import.meta.env.VITE_EMAIL || 'contato@titaniumagency.com.br'
const INSTAGRAM = import.meta.env.VITE_INSTAGRAM || 'titaniumagencylegacy'

const canais = [
  {
    label: 'WhatsApp',
    detalhe: 'Resposta em até 2h',
    href: `https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site e quero saber mais sobre os serviços da Titanium.`,
    cor: '#25D366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'E-mail',
    detalhe: EMAIL,
    href: `mailto:${EMAIL}`,
    cor: '#3D6AC1',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    detalhe: `@${INSTAGRAM}`,
    href: `https://instagram.com/${INSTAGRAM}`,
    cor: '#E1306C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function ContatoSection() {
  const leftRef = useScrollAnimation({ threshold: 0.15 })
  const rightRef = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const [form, setForm] = useState({
    nome: '',
    whatsapp: '',
    servico: '',
    mensagem: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = () => {
    if (!form.nome || !form.whatsapp) {
      return
    }

    setLoading(true)
    const msg = encodeURIComponent(
      `Olá! Sou ${form.nome}.\n\nWhatsApp: ${form.whatsapp}\n\nServiço de interesse: ${form.servico || 'Não informado'}\n\n${form.mensagem || 'Quero saber mais sobre os serviços da Titanium.'}`,
    )

    window.setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank', 'noopener,noreferrer')
      setEnviado(true)
      setLoading(false)
    }, 600)
  }

  return (
    <section className="contato" id="contato" aria-label="Contato">
      <div className="contato-inner">
        <div className="contato-left" ref={leftRef}>
          <span className="section-eyebrow">Contato</span>
          <BlurText
            text="Vamos construir algo incrível juntos?"
            as="h2"
            className="section-heading"
            staggerDelay={0.06}
          />
          <p className="contato-desc">
            Conte sobre o seu projeto. Respondemos em até 2 horas
            no WhatsApp e transformamos sua ideia em resultado real.
          </p>

          <div className="contato-canais">
            {canais.map((canal) => (
              <a
                key={canal.label}
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="canal-item"
                style={{ '--canal-cor': canal.cor }}
              >
                <span className="canal-icon">{canal.icon}</span>
                <div className="canal-info">
                  <strong>{canal.label}</strong>
                  <span>{canal.detalhe}</span>
                </div>
                <svg className="canal-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>

          <div className="contato-badge">
            <span className="badge-dot" />
            <span>Online agora · Resposta rápida garantida</span>
          </div>
        </div>

        <div className="contato-right" ref={rightRef}>
          {!enviado ? (
            <div className="contato-form">
              <div className="form-header">
                <span className="form-tag">Início rápido</span>
                <p>Preencha e já abrimos o WhatsApp com tudo preenchido para você.</p>
              </div>

              <div className="form-group">
                <label htmlFor="nome">Seu nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Como posso te chamar?"
                  value={form.nome}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="servico">Serviço de interesse</label>
                <select
                  id="servico"
                  name="servico"
                  value={form.servico}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Site institucional">Site institucional</option>
                  <option value="Landing page">Landing page</option>
                  <option value="Sistema web / SaaS">Sistema web / SaaS</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Conteúdo para Instagram">Conteúdo para Instagram</option>
                  <option value="Automação">Automação</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Mensagem (opcional)</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="3"
                  placeholder="Conte um pouco sobre seu projeto..."
                  value={form.mensagem}
                  onChange={handleChange}
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="button"
                className={`form-submit ${loading ? 'form-submit--loading' : ''}`}
                onClick={handleSubmit}
                disabled={loading || !form.nome || !form.whatsapp}
              >
                {loading ? 'Abrindo WhatsApp...' : 'Enviar pelo WhatsApp'}
              </button>

              <p className="form-disclaimer">
                Seus dados são usados apenas para entrar em contato com você.
              </p>
            </div>
          ) : (
            <div className="contato-sucesso">
              <div className="sucesso-icon">✓</div>
              <h3>Mensagem enviada!</h3>
              <p>O WhatsApp foi aberto com sua mensagem. Em breve retornaremos o contato.</p>
              <button type="button" className="form-submit" onClick={() => setEnviado(false)}>
                Enviar outra mensagem
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
