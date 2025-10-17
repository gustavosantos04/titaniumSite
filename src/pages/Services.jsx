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
  max-width: 320px;
  background: linear-gradient(135deg, #021c31, #032844);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0px 8px 40px rgba(0,0,0,0.4);
  text-align: center;
  position: relative;
  border: 2px solid transparent;
  transition: all 0.4s ease;

  svg {
    font-size: 3.5rem;
    color: #3D6AC1;
    margin-bottom: 1.5rem;
    transition: all 0.4s ease;
  }

  h3 {
    font-size: 1.6rem;
    color: #f9f9f9;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1.05rem;
    color: #d1d1d1;
    line-height: 1.6;
  }

  &:hover {
    border: 2px solid #3D6AC1;
    box-shadow: 0px 12px 50px rgba(61, 106, 193, 0.3);
    transform: translateY(-8px);

    svg {
      transform: scale(1.15) rotate(5deg);
      color: #5A8FD4;
    }
  }
`

// Botão principal de chamada para ação (CTA)
const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(135deg, #3D6AC1, #5A8FD4);
  color: #fff;
  text-decoration: none;
  margin-top: 3rem;
  box-shadow: 0 4px 20px rgba(61, 106, 193, 0.4);
  transition: all 0.4s ease;

  position: relative;
  z-index: 10;

  &:hover {
    background: linear-gradient(135deg, #5A8FD4, #3D6AC1);
    box-shadow: 0 6px 30px rgba(61, 106, 193, 0.6);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
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
            <FaCode />
            <h3>Desenvolvimento</h3>
            <p>Sites, sistemas e soluções sob medida para levar o seu negócio ao próximo nível digital.</p>
          </ServiceCard>

          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaPaintBrush />
            <h3>Design</h3>
            <p>Identidade visual e interfaces atraentes para destacar a sua marca e gerar conexão com seu público.</p>
          </ServiceCard>

          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <FaBullhorn />
            <h3>Marketing Digital</h3>
            <p>Estratégias e conteúdo para aumentar o alcance e melhorar as suas vendas online.</p>
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
