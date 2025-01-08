import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import brandService from '../../services/brandsService'; // Importando o serviço de brands
import Modal from "react-bootstrap/Modal"; // Modal do Bootstrap
import Button from "react-bootstrap/Button"; // Botão do Bootstrap

const Brands = () => {
    const [brands, setBrands] = useState([]);  // Estado para armazenar as brands
    const [error, setError] = useState(null); // Armazena erros (se houver)
    const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
    const [brandToDelete, setBrandToDelete] = useState(null); // Marca selecionada para exclusão
    const [filteredBrands, setFilteredBrands] = useState([]); // Marcas filtradas
    const [searchTerm, setSearchTerm] = useState(''); // Termo de busca

    // useEffect para fazer o GET quando o componente for montado
    useEffect(() => {
        // Chama o serviço para listar as brands
        brandService
            .listBrands()
            .then((data) => {
                setBrands(data); // Atualiza o estado com as brands retornadas pela API
                setFilteredBrands(data); // Inicialmente, exibir todas as marcas
            })
            .catch((error) => {
                setError(error.message); // Caso ocorra um erro, atualiza o estado de erro
            });
    }, []); // O array vazio significa que o useEffect será chamado apenas uma vez quando o componente for montado

    const handleSearchClick = () => {
        setFilteredBrands(
            brands.filter((brand) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleShowModal = (brand) => {
        setBrandToDelete(brand);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setBrandToDelete(null);
        setShowModal(false);
    };

    const handleDeleteBrand = () => {
        if (!brandToDelete) return;
        brandService
            .deleteBrand(brandToDelete.id)
            .then(() => {
                setBrands(brands.filter((b) => b.id !== brandToDelete.id)); // Remove a marca da lista
                handleCloseModal(); // Fecha o modal
            })
            .catch(() => {
                setError("Erro ao excluir a marca.");
                handleCloseModal();
            });
    };

    // Exibe mensagem de erro, se houver
    if (error) {
        return <p>Erro ao carregar as brands: {error}</p>;
    }

    return (

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Marcas
                    </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="button"
                            className="btn btn-primary"
                            onClick={handleSearchClick}><i class="bi bi-search"></i></button>
                        <a className="btn" href="/brands">limpar busca</a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="/createbrand" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Marca
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.id}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.description}</td>
                                        <td>
                                            <a href={`/brands/${brand.id}`} className="btn btn-info btn-sm">
                                                <i className="bi bi-eye">Detalhar</i>
                                            </a>
                                            <a href={`/brands/${brand.id}/edit`} className="btn btn-warning btn-sm">
                                                <i className="bi bi-pencil">Editar</i>
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleShowModal(brand);
                                                }}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <i className="bi bi-trash">Excluir</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        Nenhuma marca encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* Modal de Confirmação */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir a marca{" "}
                    <strong>{brandToDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBrand}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Brands;
