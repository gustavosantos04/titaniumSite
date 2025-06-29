import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(100deg, #01060D 10%, #050A30 100%);
  display: flex;
  justify-content: space-between; /* mudar para space-between para dar espaço para hamburger */
  align-items: center;
  padding: 0 1.5rem;
  z-index: 1000;
`

const Logo = styled.img`
  height: 75px;
  width: auto;
`

const Menu = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  button {
    font-family: 'Montserrat';
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    &.active {
      color: #E0Af46;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.secondary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  /* Responsividade: esconder menu no celular */
  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    right: 0;
    height: calc(100vh - 80px);
    width: 200px;
    background: linear-gradient(100deg, #01060D 10%, #050A30 100%);
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 5px rgba(0,0,0,0.2);
  }
`

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: ${({ open, theme }) => (open ? '#E0Af46' : theme.text)};
    margin: 5px 0;
    transition: all 0.3s ease;
  }

  /* Animar hamburger para X quando aberto */
  ${({ open }) =>
    open &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`

function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Atualiza o active conforme o scroll da página
  useEffect(() => {
    function onScroll() {
      const sections = ['#home', '#about', '#servicos', '#diferenciais', '#contato']
      const scrollPos = window.scrollY + 100

      let current = active

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i])
        if (section && section.offsetTop <= scrollPos) {
          current = sections[i]
          break
        }
      }

      if (current !== active) setActive(current)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [active])

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'diferenciais', label: 'Diferenciais' },
    { id: 'contato', label: 'Contato' },
  ]

  const handleScroll = (id) => {
    const yOffset = -80
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setMenuOpen(false) // fecha menu ao clicar em item (mobile)
    }
  }

  return (
    <Nav>
      <Logo src="/logoTitanium.png" alt="Logo Titanium" loading="lazy" />
      <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu toggle" role="button" tabIndex={0}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Menu open={menuOpen}>
        {menuItems.map(({ id, label }) => (
          <li key={id}>
            <button
              className={active === `#${id}` ? 'active' : ''}
              onClick={() => handleScroll(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </Menu>
    </Nav>
  )
}

export default Navbar
