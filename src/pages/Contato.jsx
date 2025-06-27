import React from 'react'
import styled from 'styled-components'
import { FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #021c31, #011526);
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b0c7f3;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const ContactButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const ContactItem = styled.a`
  background: #3d6ac1;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 40px;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #3d6ac1;
  }

  svg {
    font-size: 1.4rem;
  }
`

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: #ffffff;
  color: #050a30;
  padding: 1rem 2.5rem;
  border-radius: 40px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #3d6ac1;
    color: #fff;
  }
`

const Contato = () => {
  return (
    <Section id="contato">
      <Container>
        <Title>Vamos construir o futuro da sua marca?</Title>
        <Subtitle>
          Entre em contato por onde for melhor para você. Atendimento rápido, sem enrolação.
        </Subtitle>

        <ContactButtons>
          <ContactItem
            href="https://wa.me/5551995988984?text=Olá, quero criar meu legado digital com vocês!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </ContactItem>

          <ContactItem
            href="mailto:titaniumagencylegacy@gmail.com?subject=Quero criar o meu Legado!"
          >
            <FaEnvelope /> E-mail
          </ContactItem>

          <ContactItem
            href="https://www.instagram.com/titaniumagencylegacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram /> Instagram
          </ContactItem>
        </ContactButtons>

        <CTAButton
          href="https://wa.me/5551995988984?text=Olá, quero construir meu legado com a Titanium!"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
        >
          Vamos construir seu legado
        </CTAButton>
      </Container>
    </Section>
  )
}

export default Contato
