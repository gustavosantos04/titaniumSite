import iconSrc from '../assets/icone-t.png'
import logoSrc from '../assets/logo-titanium.png'
import { buildWhatsappLink, contactEmail, instagramUrl, siteName } from '../config/site'
import './Footer.css'

const links = {
  servicos: [
    { label: 'Desenvolvimento Web', href: '#servicos' },
    { label: 'Sistemas e Plataformas', href: '#servicos' },
    { label: 'Conteúdo para Instagram', href: '#servicos' },
    { label: 'Automação', href: '#servicos' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ],
  contato: [
    { label: 'WhatsApp', href: buildWhatsappLink('Olá, quero construir meu legado com a Titanium!') },
    { label: 'E-mail', href: `mailto:${contactEmail}` },
    { label: 'Instagram', href: instagramUrl },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Rodapé">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <span className="footer-brand-mark" aria-hidden="true">
                <img src={iconSrc} alt="" />
              </span>
              <img className="footer-brand-logo" src={logoSrc} alt={siteName} />
            </div>

            <p className="footer-tagline">Criamos Legado.</p>
            <p className="footer-desc">
              Transformamos a visão de empreendedores em sistemas e sites que geram resultado real.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <span className="col-title">Serviços</span>
              {links.servicos.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-col">
              <span className="col-title">Empresa</span>
              {links.empresa.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-col">
              <span className="col-title">Contato</span>
              {links.contato.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>(c) {year} {siteName}. Todos os direitos reservados.</span>
          <span>Feito com propósito • Brasil</span>
        </div>
      </div>
    </footer>
  )
}
