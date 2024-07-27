import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FornecedorList from './pages/fornecedor/FornecedorList'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={<FornecedorList/>}/>
        <Route path="/listar-fornecedores" element={<FornecedorList/>}/>
      </Routes>
    </div>
      
    </BrowserRouter>
  )
}

export default App