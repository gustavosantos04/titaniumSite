import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaLightbulb, FaChartLine, FaHandshake } from 'react-icons/fa'

const Section = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  background: #FCF8E8;
  background-image: url("data:image/svg+xml,%3Csvg opacity='0.03' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 10 10'%3E%3Cpath d='M0 0 L10 0 L10 10 L0 10 Z' fill='%23050A30' /%3E%3C/svg%3E");
  background-size: 40px 40px;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #050A30;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #3D6AC1;
  max-width: 900px;
  margin: 0 auto 3rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`

const FeatureCard = styled(motion.div)`
  flex: 1;
  max-width: 300px;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 30px rgba(0,0,0,0.1);
  text-align: center;

  svg {
    font-size: 3rem;
    color: #3D6AC1;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #050A30;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
  }
`

const Reflection = styled.div`
  max-width: 800px;
  margin: 3rem auto 2rem;
  font-size: 1.25rem;
  font-style: italic;
  color: #3D6AC1;
  line-height: 1.5;

  span {
    font-weight: bold;
    color: #050A30;
  }
`

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

  &:hover {
    background: #050A30;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`

const Diferenciais = () => {
  return (
    <Section id="diferenciais">
      <Container>
        <SectionTitle>Por que construir um Legado?</SectionTitle>
        <SectionSubtitle>
          Não entregamos apenas serviços. Ajudamos a construir caminhos para que marcas e empresas possam transformar ideias em histórias que perduram no tempo.
        </SectionSubtitle>
        <FeaturesGrid>
          
          <FeatureCard
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FaLightbulb />
            <h3>Inovação Estratégica</h3>
            <p>Transformamos suas ideias em soluções eficazes e alinhadas às últimas tendências do mercado digital.</p>
          </FeatureCard>

          <FeatureCard
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FaChartLine />
            <h3>Crescimento Contínuo</h3>
            <p>Construímos estratégias para escalar e expandir o alcance da sua marca e aumentar a receita do seu negócio.</p>
          </FeatureCard>

          <FeatureCard
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <FaHandshake />
            <h3>Parceria Duradoura</h3>
            <p>Trabalhamos lado a lado para garantir que suas conquistas não sejam passageiras, mas um investimento para o futuro.</p>
          </FeatureCard>
        </FeaturesGrid>

        <Reflection>
          Porque no final das contas, não vendemos simplesmente sites ou marketing… <br/>
          <span>Construímos Legados</span> para que sua marca marque a história e sobreviva às mudanças do mercado.
        </Reflection>

        <CTAButton
          as={motion.a}
          href="#contato"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Vamos construir seu Legado?
        </CTAButton>
      </Container>
    </Section>
  )
}

export default Diferenciais
