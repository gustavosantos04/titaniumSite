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

const ContactItem = styled(motion.a)`
  background: linear-gradient(135deg, #3d6ac1, #5A8FD4);
  color: #fff;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(61, 106, 193, 0.4);

  &:hover {
    background: linear-gradient(135deg, #ffffff, #f0f0f0);
    color: #3d6ac1;
    box-shadow: 0 6px 30px rgba(61, 106, 193, 0.6);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.2);
  }
`

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  color: #050a30;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;

  &:hover {
    background: linear-gradient(135deg, #3d6ac1, #5A8FD4);
    color: #fff;
    box-shadow: 0 6px 30px rgba(61, 106, 193, 0.6);
    transform: translateY(-2px);
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> WhatsApp
          </ContactItem>

          <ContactItem
            href="mailto:titaniumagencylegacy@gmail.com?subject=Quero criar o meu Legado!"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> E-mail
          </ContactItem>

          <ContactItem
            href="https://www.instagram.com/titaniumagencylegacy/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
