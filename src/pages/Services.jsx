import React from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaCode, FaPaintBrush, FaBullhorn } from 'react-icons/fa'

// Seção geral dos serviços com fundo e leve padrão visual
const ServicesSection = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  background: #011526;
  position: relative;
  z-index: 1; /* Mantém fundo atrás do conteúdo */
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 15px
  );
`

// Container centralizado para limitar largura máxima e centralizar conteúdo
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

// Título da seção Serviços
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #f9f9f9;
  margin-bottom: 3rem;
`

// Grid flexível para os cards de serviços
const ServicesGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;
  z-index: 1; /* Mantém cards atrás do botão CTA */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`

// Cada card de serviço estilizado com animações e hover
const ServiceCard = styled(motion.div)`
  flex: 1;
  max-width: 300px;
  background: #021c31;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 30px rgba(0,0,0,0.3);
  text-align: center;
  position: relative; /* Necessário para o badge no canto */
  border: 2px solid transparent;

  svg {
    font-size: 3rem;
    color: #3D6AC1;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.5rem;
    color: #f9f9f9;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #d1d1d1;
    line-height: 1.5;
  }

  .badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #3D6AC1;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
  }

  &:hover {
    border-image: linear-gradient(45deg, #3D6AC1, #105773) 1;

    svg {
      transform: scale(1.2) rotate(5deg);
    }
  }
`

// Botão principal de chamada para ação (CTA)
const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 40px;
  cursor: pointer;
  background: #3D6AC1;
  color: #fff;
  text-decoration: none;
  margin-top: 3rem;

  position: relative; /* Para controlar camada */
  z-index: 10; /* Garante que fique acima dos cards */

  &:hover {
    background: #050A30;
  }
`

// Link secundário dentro do card para saber mais
const SmallCTAButton = styled.a`
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #3D6AC1;
  text-decoration: underline;

  &:hover {
    color: #105773;
  }
`

const Services = () => {
  // Animação para movimentar os cards conforme o scroll
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <ServicesSection id="servicos">
      <Container>
        <SectionTitle>Serviços</SectionTitle>
        <ServicesGrid>
          <ServiceCard
            
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="badge">Premium</span>
            <FaCode />
            <h3>Desenvolvimento</h3>
            <p>Sites, sistemas e soluções sob medida para levar o seu negócio ao próximo nível digital.</p>
            <SmallCTAButton href="#">Saiba Mais</SmallCTAButton>
          </ServiceCard>

          <ServiceCard
            
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="badge">Premium</span>
            <FaPaintBrush />
            <h3>Design</h3>
            <p>Identidade visual e interfaces atraentes para destacar a sua marca e gerar conexão com seu público.</p>
            <SmallCTAButton href="#">Saiba Mais</SmallCTAButton>
          </ServiceCard>

          <ServiceCard
            
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="badge">Premium</span>
            <FaBullhorn />
            <h3>Marketing Digital</h3>
            <p>Estratégias e conteúdo para aumentar o alcance e melhorar as suas vendas online.</p>
            <SmallCTAButton href="#">Saiba Mais</SmallCTAButton>
          </ServiceCard>
        </ServicesGrid>

        <CTAButton
          href="#contato"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Vamos Conversar
        </CTAButton>
      </Container>
    </ServicesSection>
  )
}

export default Services
