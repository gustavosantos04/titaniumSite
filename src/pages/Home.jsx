// src/pages/Home.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: linear-gradient(to bottom, #011526, #01060D);
  color: white;
  text-align: center;
  padding: 2rem;
`

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  color: #b0c4de;
`

function Home() {
  return (
    <Hero>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Aqui criamos legados
      </Title>

      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Soluções digitais premium em marketing, sites e sistemas personalizados.
      </Subtitle>
    </Hero>
  )
}

export default Home
