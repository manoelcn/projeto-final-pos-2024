import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import brandService from '../../services/brandsService'; // Importando o serviço de brands
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Brands = () => {
    const [brands, setBrands] = useState([]);  // Estado para armazenar as brands
    const [selectedBrand, setSelectedBrand] = useState(null); // Armazena os detalhes da marca selecionada
    const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
    const [error, setError] = useState(null); // Armazena erros (se houver)

    // useEffect para fazer o GET quando o componente for montado
    useEffect(() => {
        // Chama o serviço para listar as brands
        brandService
            .listBrands()
            .then((data) => {
                setBrands(data); // Atualiza o estado com as brands retornadas pela API
            })
            .catch((error) => {
                setError(error.message); // Caso ocorra um erro, atualiza o estado de erro
            });
    }, []); // O array vazio significa que o useEffect será chamado apenas uma vez quando o componente for montado

    const handleShowDetails = (id) => {
        // Busca os detalhes da marca pelo ID
        brandService
            .getBrandById(id)
            .then((data) => {
                setSelectedBrand(data); // Armazena os detalhes da marca
                setShowModal(true); // Exibe o modal
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes da marca.");
            });
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fecha o modal
        setSelectedBrand(null); // Limpa os detalhes da marca
        setError(null); // Limpa erros
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
                        <input type="text" class="form-control" name="name" placeholder="Nome" />
                        <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
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
                            {brands.length > 0 ? (
                                brands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.id}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.description}</td>
                                        <td>
                                            <a href={`/brands/${brand.id}`} class="btn btn-info btn-sm">
                                                <i class="bi bi-eye">Detalhar</i>
                                            </a>
                                            <a href="#" class="btn btn-warning btn-sm">
                                                <i class="bi bi-pencil">Editar</i>
                                            </a>
                                            <a href="#" class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash">Excluir</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        Nenhuma marca encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* Modal para exibir os detalhes da marca */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Marca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {selectedBrand ? (
                        <div>
                            <p><strong>ID:</strong> {selectedBrand.id}</p>
                            <p><strong>Nome:</strong> {selectedBrand.name}</p>
                            <p><strong>Descrição:</strong> {selectedBrand.description}</p>
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Brands;
