import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FornecedorList from './pages/fornecedor/FornecedorList'
import Navbar from './components/Navbar'
import FornecedorForm from './pages/fornecedor/FornecedorForm'
import ProdutoList from './pages/produto/ProdutoList'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={<FornecedorList/>}/>
        <Route path="/listar-fornecedores" element={<FornecedorList/>}/>
        <Route path="/add-fornecedores" element={<FornecedorForm/>}/>
        <Route path="edit-fornecedores/:id" element={<FornecedorForm/>}/>
        <Route path="listar-produtos" element={<ProdutoList/>}/>
      </Routes>
    </div>
      
    </BrowserRouter>
  )
}

export default App