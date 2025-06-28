import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ReactTyped } from 'react-typed'
import About from '../About/About' // ✅ Importação da Seção Sobre
import Services from './Services'
import Differentials from './Differentials'
import Contato from './Contato'

const HeroSection = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #01060D 30%, #050A30 100%);
  color: ${({ theme }) => theme.text};
  overflow: hidden;

  /* Elementos de destaque no fundo */
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 100%;
    filter: blur(100px);
    z-index: 0;
  }

  &::before {
    top: -100px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: #3D6AC1;
    opacity: 0.25;
  }

  &::after {
    bottom: -100px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: #2A468B;
    opacity: 0.25;
  }
`

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    align-items: center;
  }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    margin-top: 2rem;
  }
`

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 900px;
  margin: 1rem 0 2rem;
  line-height: 1.5;
  white-space: normal;
  word-break: normal;
`

const CTAButton = styled(motion.a)`
  padding: 1rem 1.5rem;
  max-width: 250px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`

const HeroImage = styled.img`
  max-width: 80%;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.3);
`

function Home() {
  return (
    <>
      <HeroSection id="home">
        <Container>
          <Left>
            <Title
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Vamos contruir seu Legado?
            </Title>
            <Subtitle>
              aqui criamos{' '}
              <ReactTyped
                strings={[
                  'Sites Profissionais para Empresas',
                  'Sistemas Personalizados para Negócios',
                  'Marketing Digital para Alavancar Sua Marca',
                ]}
                typeSpeed={40}
                backSpeed={30}
                loop
              />
            </Subtitle>
            <CTAButton
              as={motion.a}
              href="https://wa.me/5551995988984?text=Olá, quero construir meu legado com a Titanium!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Criar seu Legado
            </CTAButton>
          </Left>
          <Right>
            <HeroImage
              src="/arnold-francisca-f77Bh3inUpE-unsplash.jpg"
              alt="Desenvolvimento de software e marketing digital"
              loading="lazy"
            />
          </Right>
        </Container>
      </HeroSection>
    </>
  )
}

export default Home
