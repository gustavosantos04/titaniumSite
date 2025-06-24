import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`

const Logo = styled.img`
  height: 100px;
  width: auto;
`

const Menu = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  a {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    padding: 0.5rem;
    position: relative;

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
  const location = useLocation()

  return (
    <Nav>
      <Logo src="public\logoTitanium.png" alt="Logo Titanium" />
      <Menu>
        {[
          { path: '/', label: 'Início' },
          { path: '/sobre', label: 'Sobre' },
          { path: '/servicos', label: 'Serviços' },
          { path: '/projetos', label: 'Projetos' },
          { path: '/blog', label: 'Blog' },
          { path: '/contato', label: 'Contato' },
        ].map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={{
                color:
                  location.pathname === item.path
                    ? 'var(--active-color, #E0Af46)' // Cor destaque para ativo
                    : 'inherit',
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </Menu>
    </Nav>
  )
}

export default Navbar
