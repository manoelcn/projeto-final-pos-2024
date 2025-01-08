import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import categoriesService from '../../services/categoriesService';
import Modal from "react-bootstrap/Modal"; // Modal do Bootstrap
import Button from "react-bootstrap/Button";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categoryDelete, setCategoryDelete] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        categoriesService
            .listCategories()
            .then((data) => {
                setCategories(data);
                setFilteredCategories(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSearchClick = () => {
        setFilteredCategories(
            categories.filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleShowModal = (category) => {
        setCategoryDelete(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setCategoryDelete(null);
        setShowModal(false);
    };

    const handleDeleteCategory = () => {
        if (!categoryDelete) return;
        categoriesService
            .deleteCategory(categoryDelete.id)
            .then(() => {
                setCategories(categories.filter((b) => b.id !== categoryDelete.id));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir categoria.");
                handleCloseModal();
            });
    }

    if (error) {
        return <p>Erro ao carregar as categorias: {error}</p>
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Categorias
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
                        <a className="btn" href="/categories">limpar busca</a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="/createcategory" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Categoria
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
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <a href={`/categories/${category.id}`} class="btn btn-info btn-sm">
                                                <i class="bi bi-eye">Detalhar</i>
                                            </a>
                                            <a href={`/categories/${category.id}/edit`} class="btn btn-warning btn-sm">
                                                <i class="bi bi-pencil">Editar</i>
                                            </a>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleShowModal(category);
                                            }} class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash">Excluir</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        Nenhuma categoria encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir a categoria{" "}
                    <strong>{categoryDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Categories;