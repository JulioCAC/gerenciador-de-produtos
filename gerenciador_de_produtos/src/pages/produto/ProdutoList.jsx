import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [modalSucesso, setModalSucesso] = useState(false)
    const [tooltipAberto, setTooltipAberto] = useState(false)

    useEffect(() => {
        const buscarProdutos = () => {
            axios.get("/produtos")
            .then(response => {setProdutos(response.data)})
            .catch(error => {console.error("Ocorreu um erro: ", error)})
        }
        buscarProdutos()
    }, [])
    const abrirModal = (produto) => {
        setProdutoSelecionado(produto)
        setModalAberto(true)
    }
    const fecharModal = () => {
        setModalAberto(false)
        setProdutoSelecionado(null)
    }
    const abrirModalSucesso = () => {
        setModalSucesso(true)
        setTimeout(() => setModalSucesso(false), 1500)
    }
    const removerProduto = () => {
        axios.delete(`/produtos/${produtoSelecionado.id}`)
            .then(() => {setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== produtoSelecionado.id))
                fecharModal()
                abrirModalSucesso()
            })
    }
    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)

    }


  return (
    <div className="container mt-5">
    <h2 className="mb-4" style={{ position: 'relative' }}>Lista de Produtos 
        <FaQuestionCircle className="tooltip-icon" onClick={toggleTooltip}/>
        {tooltipAberto && (
            <div className="tooltip">
                Aqui você pode ver, editar ou excluir produtos cadastrados no sistema.
            </div>
        )}
    </h2>
    <Link to={"/add-produtos"} className="btn btn-primary mb-2">
        <FaPlus className="icon"/> Adicionar Produto
    </Link>

    <table className="table">
        <thead>
            <tr>
                <th>Nome:</th>
                <th>Preço:</th>
                <th>Descrição:</th>
                <th>Quantidade em Estoque:</th>
                <th>Ações:</th>
            </tr>
        </thead>
        <tbody>
            {
                produtos.map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>{produto.preco}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.quantidadeEstoque}</td>
                        <td>
                            <Link to={`/edit-produtos/${produto.id}`} className="btn btn-sm btn-warning">
                                <FaEdit className="icon icon-btn"/> Editar
                            </Link>
                            <button onClick={() => abrirModal(produto)} className="btn btn-sm btn-danger">
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
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir o produto {produtoSelecionado && produtoSelecionado.nome}?</p>
                <div className="modalButtons">
                    <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                    <button onClick={removerProduto} className="btn btn-danger">Excluir</button>

                </div>
            </div>

    </Modal>
    <Modal isOpen={modalSucesso} onRequestClose={() => setModalSucesso(false)} className="modal" overlayClassName="overlay">
        <div className="modalContent">
            <FaCheckCircle className="icon successIcon"/>
            <h2>Produto exluído com sucesso!</h2>
        </div>
    </Modal>


    </div>
  )
}

export default ProdutoList