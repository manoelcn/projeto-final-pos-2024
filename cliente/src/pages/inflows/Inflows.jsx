import React, { useEffect, useState } from "react";
import inflowsService from '../../services/inflowsService';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const Inflows = () => {
    const [inflows, setInflows] = useState([]);
    const [error, setError] = useState(null);
    const [filteredInflows, setFilteredInflows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        inflowsService
            .listInflows()
            .then((data) => {
                setInflows(data);
                setFilteredInflows(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSearchClick = () => {
        setFilteredInflows(
            inflows.filter((inflow) =>
                inflow.product.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    if (error) {
        return <p>Erro ao carregar entradas: {error}</p>
    }

    return (
        <div class="container-fluid mt-4">
            <div class="row">
                <div class="col-md-12">
                    <h3>Entradas</h3>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" className="form-control" name="search" placeholder="Produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={handleSearchClick}>
                            <SearchIcon />
                        </button>
                        <a className="btn btn-secondary" href="/inflows">
                            <FilterAltOffIcon />
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <a href="/createinflow" class="btn btn-primary">
                        <AddIcon /> Cadastrar Entrada
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped table-bordered">
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
                            {filteredInflows.length > 0 ? (
                                filteredInflows.map((inflow) => (
                                    <tr key={inflow.id}>
                                        <td>{inflow.id}</td>
                                        <td>{inflow.product}</td>
                                        <td>{inflow.supplier}</td>
                                        <td>{inflow.quantity}</td>
                                        <td>{inflow.created_at}</td>
                                        <td>
                                            <a href={`inflows/${inflow.id}`} class="btn btn-info btn-sm">
                                                <VisibilityIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" class="text-center">
                                        Nenhuma entrada encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inflows;