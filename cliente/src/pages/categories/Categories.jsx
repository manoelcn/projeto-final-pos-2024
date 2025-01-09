import React, { useEffect, useState } from "react";
import categoriesService from '../../services/categoriesService';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

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
                setCategories(categories.filter((c) => c.id !== categoryDelete.id));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir categoria.");
                handleCloseModal();
            });
    };

    if (error) {
        return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;
    }

    return (
        <div class="container-fluid mt-4 px-5">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text">
                        Categorias
                    </h3>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" name="name" placeholder="Nome" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button variant="primary" onClick={handleSearchClick} className="btn btn-primary">
                            <SearchIcon />
                        </Button>
                        <a class="btn btn-secondary" href="/categories">
                            <FilterAltOffIcon />
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="/createcategory" class="btn btn-primary">
                            <AddIcon /> Cadastrar Categoria
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped table-bordered">
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
                                            <a href={`/categories/${category.id}`} class="btn btn-info btn-sm me-2">
                                                <VisibilityIcon />
                                            </a>
                                            <a href={`/categories/${category.id}/edit`} class="btn btn-warning btn-sm me-2">
                                                <EditIcon />
                                            </a>
                                            <a class="btn btn-danger btn-sm me-2" onClick={(e) => { e.preventDefault(); handleShowModal(category); }}>
                                                <DeleteIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" class="text-center">
                                        Nenhuma categoria encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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