import React, { useEffect, useState } from "react";
import outflowsService from '../../services/outflowsService';
import productsService from '../../services/productsService';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

const Outflows = () => {
    const [outflows, setOutflows] = useState([]);
    const [products, setProducts] = useState([]);
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

        productsService
            .listProducts()
            .then((productData) => {
                setProducts(productData);
            })
            .catch(() => setError("Erro ao carregar produtos."));
    }, []);

    const handleSearchClick = () => {
        setFilteredOutflows(
            outflows.filter((outflow) =>
                outflow.product.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    function formatarData(Data) {
        const data = new Date(Data);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();

        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        const segundos = data.getSeconds().toString().padStart(2, '0');

        return `${dia}/${mes}/${ano} ${horas}h:${minutos}m:${segundos}s`;
    };

    if (error) {
        return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;
    }

    const getProductName = (productId) => {
        const product = products.find(b => b.id === productId);
        return product ? product.title : "Carregando...";
    };

    return (
        <div class="container-fluid mt-4 px-5">
            <div class="row">
                <div class="col-md-12">
                    <h3>Saídas</h3>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" className="form-control" name="search" placeholder="Produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={handleSearchClick}>
                            <SearchIcon />
                        </button>
                        <a className="btn btn-secondary" href="/outflows">
                            <FilterAltOffIcon />
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <a href="/createoutflow" class="btn btn-primary">
                        <AddIcon /> Cadastrar Saída
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
                                <th>Quantidade</th>
                                <th>Data de saída</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOutflows.length > 0 ? (
                                filteredOutflows.map((outflow) => (
                                    <tr key={outflow.id}>
                                        <td>{outflow.id}</td>
                                        <td>{getProductName(outflow.product)}</td>
                                        <td>{outflow.quantity}</td>
                                        <td>{formatarData(outflow.created_at)}</td>
                                        <td>
                                            <a href={`outflows/${outflow.id}`} class="btn btn-info btn-sm">
                                                <VisibilityIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" class="text-center">
                                        Nenhuma saída encontrada.
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

export default Outflows;