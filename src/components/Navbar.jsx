import { useEffect, useState } from 'react'
import logoSrc from '../assets/logo-titanium.png'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Projetos' },
  { id: 'sobre', label: 'Processo' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`navbar ${menuOpen ? 'navbar--open' : ''}`}>
      <a className="navbar-brand" href="#inicio" aria-label="Titanium Legacy — início">
        <img className="navbar-logo" src={logoSrc} alt="Titanium Agency Legacy" width="174" height="58" />
      </a>

      <nav className="navbar-links" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
      </nav>

      <a className="navbar-contact" href="#contato">Iniciar projeto <span aria-hidden="true">↗</span></a>

      <button
        className="navbar-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span /><span />
      </button>

      <nav id="mobile-navigation" className="navbar-mobile" aria-label="Navegação mobile">
        {NAV_ITEMS.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
            <small>0{index + 1}</small><span>{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
