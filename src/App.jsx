import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhatsappButton from './components/WhatsappButton' // <-- Importação
import Services from './pages/Services'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Outras rotas */}
      </Routes>
      <Footer />
      <WhatsappButton /> {/* <-- Adição aqui */}
    </>
  )
}

export default App
