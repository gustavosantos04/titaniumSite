// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Navbar /> {/* Componente de navegação no topo */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rotas futuras: /sobre, /serviços, etc */}
      </Routes>
    </>
  )
}

export default App
