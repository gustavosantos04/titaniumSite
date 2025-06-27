import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBullseye, FaEye, FaHandsHelping } from 'react-icons/fa'

const AboutSection = styled.section`
  position: relative;
  padding: 5rem 0;
  background-color: #FCF8E8;
  color: #050A30;
  width: 100vw;

  /* Leve padrão de fundo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(#3d6ac130 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3;
    pointer-events: none;
  }
`

const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`

const Left = styled.div`
  flex: 1;

  img {
    max-width: 100%;
    border-radius: 20px;
    box-shadow: 0px 4px 30px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }
`

const Right = styled.div`
  flex: 1;

  h2 {
    font-size: 2.5rem;
    color: #050A30;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
    max-width: 600px;

    @media (max-width: 1024px) {
      margin: 0 auto;
    }
  }
`

const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.25rem;
  color: #3D6AC1;
  margin: 2rem 0;
  padding-left: 1rem;
  border-left: 4px solid #3D6AC1;

  @media (max-width: 1024px) {
    text-align: center;
    border-left: none;
    padding-left: 0;
  }
`

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background: #3D6AC1;
  color: #fff;
  text-decoration: none;
  margin-top: 1rem;

  &:hover {
    background: #050A30;
  }
`

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 4rem 0 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const FeatureItem = styled(motion.div)`
  flex: 1;
  max-width: 300px;
  text-align: center;

  svg {
    font-size: 48px;
    color: #3D6AC1;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #3D6AC1;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: #050A30;
  }
`

const About = () => {
  const [mainRef, mainInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <AboutSection id="about">
      <Container>
        <MainContent ref={mainRef}>
          <Left
            as={motion.div}
            initial={{ opacity: 0, x: -30 }}
            animate={mainInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <img
              src="src\assets\bench-accounting-C3V88BOoRoM-unsplash.jpg"
              alt="Equipe Titanium Agency"
            />
          </Left>
          <Right
            as={motion.div}
            initial={{ opacity: 0, x: 30 }}
            animate={mainInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2>Sobre a Titanium Agency Legacy</h2>
            <p>
              A Titanium Agency Legacy nasceu para transformar ideias em soluções digitais de alto impacto.
              Com uma equipe jovem e apaixonada por tecnologia, marketing e design, somos especializados
              em criar sites, sistemas e estratégias que fortalecem marcas e constroem legados duradouros.
            </p>
            <Quote>“Construímos mais do que sites, construímos legados para o futuro”</Quote>
            <CTAButton
              as={motion.a}
              href="#servicos"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Saiba mais sobre nós
            </CTAButton>
          </Right>
        </MainContent>

        <Features ref={featuresRef}>
          {featuresInView && (
            <>
              <FeatureItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <FaBullseye />
                <h3>Missão</h3>
                <p>Impulsionar marcas com tecnologia e design para alcançar destaque e sucesso no digital.</p>
              </FeatureItem>

              <FeatureItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <FaEye />
                <h3>Visão</h3>
                <p>Ser referência em marketing e tecnologia, construindo legados e relações de longo prazo com nossos clientes.</p>
              </FeatureItem>

              <FeatureItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >
                <FaHandsHelping />
                <h3>Valores</h3>
                <p>Inovação, compromisso, excelência e parceria para transformar e evoluir junto com cada cliente e projeto.</p>
              </FeatureItem>
            </>
          )}
        </Features>
      </Container>
    </AboutSection>
  );
};

export default About;
