import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import suppliersService from '../../services/suppliersService';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [supplierDelete, setSupplierDelete] = useState(null);

    useEffect(() => {
        suppliersService
            .listSuppliers()
            .then((data) => {
                setSuppliers(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

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
                setSuppliers(suppliers.filter((b) => b.id !== supplierDelete.id));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir fornecedor.");
                handleCloseModal();
            });
    };

    if (error) {
        return <p>Erro ao carregar fornecedores: {error}</p>
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Fornecedores
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
                        <a href="/createsupplier" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Fornecedor
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
                            {suppliers.length > 0 ? (
                                suppliers.map((supplier) => (
                                    <tr key={supplier.id}>
                                        <td>{supplier.id}</td>
                                        <td>{supplier.name}</td>
                                        <td>{supplier.description}</td>
                                        <td>
                                            <a href={`/suppliers/${supplier.id}`} class="btn btn-info btn-sm">
                                                <i class="bi bi-eye">Detalhar</i>
                                            </a>
                                            <a href={`/suppliers/${supplier.id}/edit`} class="btn btn-warning btn-sm">
                                                <i class="bi bi-pencil">Editar</i>
                                            </a>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleShowModal(supplier);
                                            }} class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash">Excluir</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        Nenhum fornecedor encontrado
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