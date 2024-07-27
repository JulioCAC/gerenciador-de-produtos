import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';



const FornecedorList = () => {
    const [fornecedores, setFornecedores] = useState([])
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [modalSucesso, setModalSucesso] = useState(false)


    useEffect(() => {
        const buscarFornecedores = () => {
            axios.get("/fornecedores")
            .then(response => {setFornecedores(response.data)})
            .catch(error => {console.error("Ocorreu um erro", error)})
        }
        buscarFornecedores()
    }, [])

    const abrirModal = (fornecedor) => {
        setFornecedorSelecionado(fornecedor)
        setModalAberto(true)
    }
    const fecharModal = () => {
        setModalAberto(false)
        setFornecedorSelecionado(null)
    }
    const abrirModalSucesso = () => {
        setModalSucesso(true)
        setTimeout(() => setModalSucesso(false), 1500)
    }
    const removerFornecedor = () => {
        axios.delete(`/fornecedores/${fornecedorSelecionado.id}`)
            .then(() => {setFornecedores(prevFornecedores => prevFornecedores.filter(fornecedor => fornecedor.id !== fornecedorSelecionado.id))
                fecharModal()
                abrirModalSucesso()
            })
    }

  return (
    <div className="container mt-5">
        <h2 className="mb-4">Lista de Fornecedores</h2>
        <Link to={"/add-fornecedores"} className="btn btn-primary mb-2">
            <FaPlus className="icon"/> Adicionar Fornecedor
        </Link>
        <table className="table">
            <thead>
                <tr>
                    <th>Nome:</th>
                    <th>CNPJ:</th>
                    <th>Email:</th>
                    <th>Ações:</th>
                </tr>
            </thead>
            <tbody>
                {
                    fornecedores.map(fornecedor => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.email}</td>
                            <td>
                                <Link to={`/edit-fornecedores/${fornecedor.id}`} className="btn btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn"/> Editar
                                </Link>
                                <button onClick={() => abrirModal(fornecedor)} className="btn btn-sm btn-danger">
                                    <FaTrash className="icon icon-btn"/> Excluir
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Modal isOpen={modalAberto} onRequestClose={fecharModal} className="modal" overlayClassName="overlay">
                <div className="modalContent">
                    <FaExclamationTriangle className="icon"/>
                    <h2>Confirmar Exvlusão</h2>
                    <p>Tem certeza que deseja excluir o fornecedor {fornecedorSelecionado && fornecedorSelecionado.nome}?</p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerFornecedor} className="btn btn-danger">Excluir</button>

                    </div>
                </div>

        </Modal>
        <Modal isOpen={modalSucesso} onRequestClose={() => setModalSucesso(false)} className="modal" overlayClassName="overlay">
            <div className="modalContent">
                <FaCheckCircle className="icon successIcon"/>
                <h2>Fornecedor exluído com sucesso!</h2>
            </div>
        </Modal>

    </div>
  )
}

export default FornecedorList