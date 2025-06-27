import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './About/About'
import Services from './pages/Services'
import Differentials from './pages/Differentials'
import Contato from './pages/Contato'
import WhatsappButton from './components/WhatsappButton'

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Differentials />
      <Contato />
      <Footer />
      <WhatsappButton />
    </>
  )
}

export default App
