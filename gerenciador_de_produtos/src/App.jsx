import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FornecedorList from './pages/fornecedor/FornecedorList'
import Navbar from './components/Navbar'

import FornecedorForm from './pages/fornecedor/FornecedorForm'
import ProdutoList from './pages/produto/ProdutoList'
import ProdutoForm from './pages/produto/ProdutoForm'
import Inicio from './pages/Inicio'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/listar-fornecedores" element={<FornecedorList/>}/>
        <Route path="/add-fornecedores" element={<FornecedorForm/>}/>
        <Route path="edit-fornecedores/:id" element={<FornecedorForm/>}/>
        <Route path="listar-produtos" element={<ProdutoList/>}/>
        <Route path="/listar-produtos" element={<ProdutoList />} />
        <Route path="/add-produtos" element={<ProdutoForm />} />
        <Route path="edit-produtos/:id" element={<ProdutoForm/>}/>
      </Routes>
    </div>
      
    </BrowserRouter>
  )
}

export default App