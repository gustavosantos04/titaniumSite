import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(100deg, #01060D 10%, #050A30 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
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
      color: #E0Af46;  /* cor específica pro link ativo */
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
`

function Navbar() {

  const [active, setActive] = useState('#home')

  // Atualiza o active conforme o scroll da página
  useEffect(() => {
    function onScroll() {
      const sections = ['#home', '#about', '#servicos', '#diferenciais', '#contato']
      const scrollPos = window.scrollY + 100 // ajuste para pegar topo da seção

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
    const yOffset = -80 // altura da navbar fixa
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <Nav>
      <Logo src="/logoTitanium.png" alt="Logo Titanium" />
      <Menu>
        {menuItems.map(({ id, label }) => (
          <li key={id}>
            <button onClick={() => handleScroll(id)}>{label}</button>
          </li>
        ))}
      </Menu>
    </Nav>
  )
}

export default Navbar
