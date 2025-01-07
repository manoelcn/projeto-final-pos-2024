import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import outflowsService from '../../services/outflowsService';

const Outflows = () => {
    const [outflows, setOutflows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        outflowsService
            .listOutflows()
            .then((data) => {
                setOutflows(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Erro ao carregar saídas: {error}</p>
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Saídas
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
                        <a href="/createoutflow" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Saída
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
                                <th>Quantidade</th>
                                <th>Data de entrada</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outflows.length > 0 ? (
                                outflows.map((outflow) => (
                                    <tr key={outflow.id}>
                                        <td>{outflow.id}</td>
                                        <td>{outflow.product}</td>
                                        <td>{outflow.quantity}</td>
                                        <td>{outflow.created_at}</td>
                                        <td>
                                            <a href={`outflows/${outflow.id}`} class="btn btn-info btn-sm">
                                                <i class="bi bi-eye">Detalhar</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        Nenhuma saída encontrada
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

export default Outflows;