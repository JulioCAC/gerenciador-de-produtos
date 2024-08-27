import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FornecedorList from './pages/fornecedor/FornecedorList'
import Navbar from './components/Navbar'
import FornecedorForm from './pages/fornecedor/FornecedorForm'
import ProdutoList from './pages/produto/ProdutoList'
import ProdutoForm from './pages/produto/ProdutoForm'
import Inicial from './pages/Inicio'
import ClienteList from './pages/cliente/ClienteList'
import ClienteForm from './pages/cliente/ClienteForm'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="container">
    <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/listar-fornecedores" element={<FornecedorList />} />
        <Route path="/add-fornecedores" element={<FornecedorForm />} />
        <Route path="/edit-fornecedores/:id" element={<FornecedorForm />} />
        <Route path="/listar-produtos" element={<ProdutoList />} />
        <Route path="/add-produtos" element={<ProdutoForm />} />
        <Route path="/add-clientes" element={<ClienteForm />} />
        <Route path="/listar-clientes" element={<ClienteList />} />
        <Route path="/edit-clientes/:id" element={<ClienteForm />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App