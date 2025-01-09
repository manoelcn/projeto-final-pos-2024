import React, { useEffect, useState } from "react";
import suppliersService from '../../services/suppliersService';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [supplierDelete, setSupplierDelete] = useState(null);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        suppliersService
            .listSuppliers()
            .then((data) => {
                setSuppliers(data);
                setFilteredSuppliers(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSearchClick = () => {
        setFilteredSuppliers(
            suppliers.filter((supplier) =>
                supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleShowModal = (supplier) => {
        setSupplierDelete(supplier);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSupplierDelete(null);
        setShowModal(false);
    };

    const handleDeleteSupplier = () => {
        if (!supplierDelete) return;
        suppliersService
            .deleteSupplier(supplierDelete.id)
            .then(() => {
                const updateSuppliers = suppliers.filter((s) => s.id !== supplierDelete.id);
                setSuppliers(updateSuppliers);
                setFilteredSuppliers(updateSuppliers.filter((supplier) =>
                    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
                ));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir fornecedor.");
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
                        Fornecedores
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
                        <a class="btn btn-secondary" href="/suppliers">
                            <FilterAltOffIcon />
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="/createsupplier" class="btn btn-primary">
                            <AddIcon /> Cadastrar Fornecedor
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
                            {filteredSuppliers.length > 0 ? (
                                filteredSuppliers.map((supplier) => (
                                    <tr key={supplier.id}>
                                        <td>{supplier.id}</td>
                                        <td>{supplier.name}</td>
                                        <td>{supplier.description}</td>
                                        <td>
                                            <a href={`/suppliers/${supplier.id}`} class="btn btn-info btn-sm me-2">
                                                <VisibilityIcon />
                                            </a>
                                            <a href={`/suppliers/${supplier.id}/edit`} class="btn btn-warning btn-sm me-2">
                                                <EditIcon />
                                            </a>
                                            <a class="btn btn-danger btn-sm me-2" onClick={(e) => { e.preventDefault(); handleShowModal(supplier); }}>
                                                <DeleteIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" class="text-center">
                                        Nenhum fornecedor encontrado.
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
                    Tem certeza que deseja excluir o fornecedor{" "}
                    <strong>{supplierDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteSupplier}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Suppliers;