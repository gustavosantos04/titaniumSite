// src/components/Navbar.jsx
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #012840; /* Azul escuro da paleta */
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  color: #2063BC;
  font-size: 1.5rem;
  font-weight: bold;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #2063BC;
  }
`

function Navbar() {
  return (
    <NavbarContainer>
      <Logo>Titanium</Logo> {/* Aqui pode entrar o ícone futuramente */}
      <NavLinks>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/servicos">Serviços</NavLink>
        <NavLink to="/projetos">Projetos</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </NavLinks>
    </NavbarContainer>
  )
}

export default Navbar
