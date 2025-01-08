import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import outflowsService from '../../services/outflowsService';

const Outflows = () => {
    const [outflows, setOutflows] = useState([]);
    const [error, setError] = useState(null);
    const [filteredOutflows, setFilteredOutflows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        outflowsService
            .listOutflows()
            .then((data) => {
                setOutflows(data);
                setFilteredOutflows(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Erro ao carregar saídas: {error}</p>
    }

    const handleSearchClick = () => {
        setFilteredOutflows(
            outflows.filter((outflow) =>
                outflow.product.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

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
                        <input
                            type="text"
                            className="form-control"
                            name="product"
                            placeholder="Produto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="button"
                            className="btn btn-primary"
                            onClick={handleSearchClick}><i class="bi bi-search"></i></button>
                        <a className="btn" href="/outflows">limpar busca</a>
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
                            {filteredOutflows.length > 0 ? (
                                filteredOutflows.map((outflow) => (
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