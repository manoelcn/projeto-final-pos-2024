import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import suppliersService from '../services/suppliersService';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);

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
                        <a href="#" class="btn btn-primary float-end">
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
                                            <a href="#" class="btn btn-info btn-sm">
                                                <i class="bi bi-eye"></i>
                                            </a>
                                            <a href="#" class="btn btn-warning btn-sm">
                                                <i class="bi bi-pencil"></i>
                                            </a>
                                            <a href="#" class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash"></i>
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
        </div>
    );
};

export default Suppliers;