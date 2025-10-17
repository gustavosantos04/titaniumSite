import React from 'react'
import styled from 'styled-components'
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #01060D 0%, #050A30 100%);
  color: #f9f9f9;
  padding: 3rem 2rem 1.5rem;
  width: 100%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3D6AC1, transparent);
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`

const FooterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    color: #3D6AC1;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  p, a {
    font-size: 0.95rem;
    line-height: 1.8;
    color: rgba(249, 249, 249, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #3D6AC1;
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(249, 249, 249, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.2rem;
    color: #3D6AC1;
  }
  
  &:hover {
    color: #3D6AC1;
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(61, 106, 193, 0.2);
  color: #3D6AC1;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: #3D6AC1;
    color: #fff;
    transform: translateY(-3px);
  }
`

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid rgba(61, 106, 193, 0.3);
  padding-top: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  
  p {
    font-size: 0.9rem;
    color: rgba(249, 249, 249, 0.6);
  }
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #3D6AC1;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo>Titanium Agency Legacy</Logo>
            <p>
              Transformamos ideias em soluções digitais de alto impacto. 
              Construímos legados que perduram no tempo.
            </p>
            <SocialLinks>
              <SocialIcon href="https://instagram.com/titaniumagency" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/titaniumagency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon href="https://wa.me/5551995988984" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </SocialIcon>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Links Rápidos</h3>
            <QuickLinks>
              <a href="#home">Início</a>
              <a href="#about">Sobre</a>
              <a href="#servicos">Serviços</a>
              <a href="#diferenciais">Diferenciais</a>
              <a href="#contato">Contato</a>
            </QuickLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Contato</h3>
            <ContactInfo>
              <ContactItem href="https://wa.me/5551995988984" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
                <span>(51) 99598-8984</span>
              </ContactItem>
              <ContactItem href="mailto:titaniumagencylegacy@gmail.com">
                <FaEnvelope />
                <span>titaniumagencylegacy@gmail.com</span>
              </ContactItem>
              <ContactItem href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt />
                <span>Porto Alegre, RS</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>© {new Date().getFullYear()} Titanium Agency Legacy. Todos os direitos reservados.</p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  )
}

export default Footer

