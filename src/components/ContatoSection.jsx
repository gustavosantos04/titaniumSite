import { useState } from 'react'
import BlurText from './BlurText'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { buildWhatsappLink, contactEmail, instagramUrl } from '../config/site'
import './ContatoSection.css'

const canais = [
  {
    label: 'WhatsApp',
    detalhe: 'Converse sobre seu projeto',
    href: buildWhatsappLink('Olá! Vim pelo site e quero saber mais sobre os serviços da Titanium.'),
    cor: '#25D366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'E-mail',
    detalhe: contactEmail,
    href: `mailto:${contactEmail}`,
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
    detalhe: instagramUrl.replace('https://www.instagram.com/', '@').replaceAll('/', ''),
    href: instagramUrl,
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

const serviceOptions = [
  'Site ou experiência digital',
  'Sistema sob medida',
  'Automação ou integração',
  'Outro',
]

function formatWhatsapp(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits ? `(${digits}` : ''
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validate(form) {
  const errors = {}

  if (!form.nome.trim() || form.nome.trim().length < 2) {
    errors.nome = 'Informe seu nome para continuarmos.'
  }

  if (form.whatsapp.replace(/\D/g, '').length < 10) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD.'
  }

  if (form.mensagem.trim().length > 700) {
    errors.mensagem = 'A mensagem deve ter no máximo 700 caracteres.'
  }

  return errors
}

export default function ContatoSection({ id }) {
  const leftRef = useScrollAnimation({ threshold: 0.15 })
  const rightRef = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  const [form, setForm] = useState({
    nome: '',
    whatsapp: '',
    servico: '',
    mensagem: '',
  })
  const [errors, setErrors] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === 'whatsapp' ? formatWhatsapp(value) : value

    setForm((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFeedback('Revise os campos destacados antes de abrir o WhatsApp.')
      return
    }

    setLoading(true)
    setFeedback('')

    const whatsappMessage = [
      `Olá! Sou ${form.nome.trim()}.`,
      `WhatsApp: ${form.whatsapp}`,
      `Serviço de interesse: ${form.servico || 'Não informado'}`,
      form.mensagem.trim() || 'Quero saber mais sobre os serviços da Titanium.',
    ].join('\n\n')

    const targetUrl = buildWhatsappLink(whatsappMessage)
    const popup = window.open(targetUrl, '_blank', 'noopener,noreferrer')

    if (!popup) {
      window.location.assign(targetUrl)
    }

    setEnviado(true)
    setLoading(false)
    setFeedback('WhatsApp aberto com sua mensagem preenchida.')
  }

  return (
    <section className="contato" id={id} aria-labelledby="contato-heading">
      <div className="contato-inner">
        <div className="contato-left" ref={leftRef}>
          <span className="section-eyebrow">Contato</span>
          <BlurText
            text="Qual é o próximo passo do seu legado?"
            as="h2"
            id="contato-heading"
            className="section-heading"
            staggerDelay={0.06}
          />
          <p className="contato-desc">
            Conte o que precisa funcionar melhor. A conversa inicial serve para entendermos o contexto e indicarmos um próximo passo possível.
          </p>

          <div className="contato-canais" role="list" aria-label="Canais de contato direto">
            {canais.map((canal) => (
              <a
                key={canal.label}
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="canal-item"
                style={{ '--canal-cor': canal.cor }}
                role="listitem"
                aria-label={`${canal.label}: ${canal.detalhe}`}
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
            <span>Contato direto com a Titanium</span>
          </div>
        </div>

        <div className="contato-right" ref={rightRef}>
          {!enviado ? (
            <form className="contato-form" onSubmit={handleSubmit} noValidate>
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
                  autoComplete="name"
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={errors.nome ? 'nome-error' : undefined}
                  required
                />
                {errors.nome ? <span id="nome-error" className="form-error">{errors.nome}</span> : null}
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
                  autoComplete="tel"
                  inputMode="numeric"
                  aria-invalid={Boolean(errors.whatsapp)}
                  aria-describedby={errors.whatsapp ? 'whatsapp-error' : 'whatsapp-help'}
                  required
                />
                <span id="whatsapp-help" className="form-help">Use um número com DDD para agilizar o contato.</span>
                {errors.whatsapp ? <span id="whatsapp-error" className="form-error">{errors.whatsapp}</span> : null}
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
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
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
                  aria-invalid={Boolean(errors.mensagem)}
                  aria-describedby={errors.mensagem ? 'mensagem-error' : 'mensagem-help'}
                />
                <span id="mensagem-help" className="form-help">
                  Quanto mais contexto, mais objetiva fica a conversa no WhatsApp.
                </span>
                {errors.mensagem ? <span id="mensagem-error" className="form-error">{errors.mensagem}</span> : null}
              </div>

              <button
                type="submit"
                className={`form-submit ${loading ? 'form-submit--loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Abrindo WhatsApp...' : 'Enviar pelo WhatsApp'}
              </button>

              <p className="form-feedback" role="status" aria-live="polite">
                {feedback}
              </p>
              <p className="form-disclaimer">
                Seus dados são usados apenas para entrar em contato com você pelo WhatsApp.
              </p>
            </form>
          ) : (
            <div className="contato-sucesso" role="status" aria-live="polite">
              <div className="sucesso-icon">✓</div>
              <h3>Tudo pronto!</h3>
              <p>O WhatsApp foi aberto com sua mensagem preenchida. Agora é só revisar e enviar.</p>
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
