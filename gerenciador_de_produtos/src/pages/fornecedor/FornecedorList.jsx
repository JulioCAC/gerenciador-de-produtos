import React, { useEffect, useState } from 'react';
import axios from '../../api';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';

const FornecedorList = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalSucesso, setModalSucesso] = useState(false);
    const [modalErro, setModalErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [tooltipAberto, setTooltipAberto] = useState(false);

    useEffect(() => {
        const buscarFornecedores = () => {
            axios.get("/fornecedores")
                .then(response => setFornecedores(response.data))
                .catch(error => console.error("Ocorreu um erro", error));
        };
        buscarFornecedores();
    }, []);

    const abrirModal = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setFornecedorSelecionado(null);
    };

    const abrirModalSucesso = () => {
        setModalSucesso(true);
        setTimeout(() => setModalSucesso(false), 1500);
    };

    const removerFornecedor = async () => {
        if (!fornecedorSelecionado) return;

        try {
            await axios.delete(`/fornecedores/${fornecedorSelecionado.id}`);
            setFornecedores(prevFornecedores => 
                prevFornecedores.filter(fornecedor => fornecedor.id !== fornecedorSelecionado.id)
            );
            fecharModal();
            abrirModalSucesso();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Trata erro de fornecedor relacionado a produtos
                setMensagemErro('Não é possível excluir este fornecedor porque ele está relacionado a outros produtos.');
                setModalErro(true);
            } else {
                console.error("Erro ao excluir fornecedor:", error);
                setMensagemErro('Ocorreu um erro ao tentar excluir o fornecedor. Tente novamente mais tarde.');
                setModalErro(true);
            }
            fecharModal();
        }
    };

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4" style={{ position: 'relative' }}>Lista de Fornecedores 
                <FaQuestionCircle className="tooltip-icon" onClick={toggleTooltip}/>
                {tooltipAberto && (
                    <div className="tooltip">
                        Aqui você pode ver, editar ou excluir fornecedores cadastrados no sistema.
                    </div>
                )}
            </h2>
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

            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaExclamationTriangle className="icon" />
                    <h2>Confirmar Exclusão</h2>
                    <p>Tem certeza que deseja excluir o fornecedor 
                        {fornecedorSelecionado && fornecedorSelecionado.nome}?
                    </p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerFornecedor} className="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalSucesso}
                onRequestClose={() => setModalSucesso(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaCheckCircle className="icon successIcon"/>
                    <h2>Fornecedor excluído com sucesso!</h2>
                </div>
            </Modal>

            <Modal
                isOpen={modalErro}
                onRequestClose={() => setModalErro(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaExclamationTriangle className="icon" />
                    <h2>Erro</h2>
                    <p>{mensagemErro}</p>
                    <div className="modalButtons">
                        <button onClick={() => setModalErro(false)} className="btn btn-secondary">Fechar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FornecedorList;
