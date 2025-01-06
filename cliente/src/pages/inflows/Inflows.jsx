import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import inflowsService from '../../services/inflowsService';

const Inflows = () => {
    const [inflows, setInflows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        inflowsService
            .listInflows()
            .then((data) => {
                setInflows(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Erro ao carregar entradas: {error}</p>
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Entradas
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
                        <a href="/createinflow" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Entrada
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
                                <th>Produto</th>
                                <th>Fornecedor</th>
                                <th>Quantidade</th>
                                <th>Data de entrada</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inflows.length > 0 ? (
                                inflows.map((inflow) => (
                                    <tr key={inflow.id}>
                                        <td>{inflow.id}</td>
                                        <td>{inflow.product}</td>
                                        <td>{inflow.supplier}</td>
                                        <td>{inflow.quantity}</td>
                                        <td>{inflow.created_at}</td>
                                        <td>
                                            <a href="#" class="btn btn-info btn-sm">
                                                <i class="bi bi-eye"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        Nenhuma entrada encontrada
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

export default Inflows;