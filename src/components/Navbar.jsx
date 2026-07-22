import { useEffect, useState } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'portfolio', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Processo' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('inicio')
      setDark(hero ? window.scrollY > hero.offsetHeight * 0.47 : window.scrollY > 80)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`navbar ${dark ? 'navbar--dark' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <a className="navbar-brand" href="#inicio" aria-label="Titanium Legacy — início">
        <span className="navbar-mark" aria-hidden="true">T</span>
        <span className="navbar-wordmark"><strong>TITANIUM</strong><small>LEGACY</small></span>
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
