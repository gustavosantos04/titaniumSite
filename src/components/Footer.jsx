import logoSrc from '../assets/logo-titanium.png'
import { buildWhatsappLink, contactEmail, instagramUrl, siteName } from '../config/site'
import './Footer.css'

const links = {
  servicos: [
    { label: 'Sites e experiências', href: '#servicos' },
    { label: 'Sistemas sob medida', href: '#servicos' },
    { label: 'Automações e integrações', href: '#servicos' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Nosso processo', href: '#sobre' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ],
  contato: [
    { label: 'WhatsApp', href: buildWhatsappLink('Olá, quero conhecer melhor a Titanium.') },
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
              <img className="footer-official-logo" src={logoSrc} alt={siteName} width="240" height="80" loading="lazy" />
            </div>

            <p className="footer-tagline">Criamos Legado.</p>
            <p className="footer-desc">
              Construímos sites, sistemas e automações para o próximo passo do seu negócio.
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
          <span>© {year} {siteName}. Todos os direitos reservados.</span>
          <span>Feito com propósito • Brasil</span>
        </div>
      </div>
    </footer>
  )
}
