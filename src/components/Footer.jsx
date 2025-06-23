import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
  border-top: 1px solid #333;
`

function Footer() {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Titanium Agency Legacy. Todos os direitos reservados.</p>
    </FooterContainer>
  )
}

export default Footer
