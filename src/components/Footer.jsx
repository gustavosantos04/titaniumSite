import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #FCF8E8;
  color: #050A30;
  text-align: center;
  padding: 2rem;

  
  margin-left: auto;
  margin-right: auto;

  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

function Footer() {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Titanium Agency Legacy. Todos os direitos reservados.</p>
    </FooterContainer>
  )
}

export default Footer
