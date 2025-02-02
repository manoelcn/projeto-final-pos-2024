import React, { useEffect, useState } from "react";
import inflowsService from '../../services/inflowsService';
import productsService from '../../services/productsService';
import suppliersService from '../../services/suppliersService';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

const Inflows = () => {
    const [inflows, setInflows] = useState([]);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
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

        productsService
            .listProducts()
            .then((productData) => {
                setProducts(productData);
            })
            .catch(() => setError("Erro ao carregar produtos."));

        suppliersService
            .listSuppliers()
            .then((supplierData) => {
                setSuppliers(supplierData);
            })
            .catch(() => setError("Erro ao carregar fornecedores."));
    }, []);

    const handleSearchClick = () => {
        setFilteredInflows(
            inflows.filter((inflow) => {
                const product = products.find((p) => p.id === inflow.product);
                return product?.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    };

    const getProductName = (productId) => {
        const product = products.find(b => b.id === productId);
        return product ? product.title : "Carregando...";
    };

    const getSupplierName = (supplierId) => {
        const supplier = suppliers.find(b => b.id === supplierId);
        return supplier ? supplier.name : "Carregando...";
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
    }

    if (error) {
        return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;
    }

    return (
        <div class="container-fluid mt-4 px-5">
            <div class="row">
                <div class="col-md-12">
                    <h3>Entradas</h3>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            placeholder="Produto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearchClick}
                        >
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
                                        <td>{getProductName(inflow.product)}</td>
                                        <td>{getSupplierName(inflow.supplier)}</td>
                                        <td>{inflow.quantity}</td>
                                        <td>{formatarData(inflow.created_at)}</td>
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
                                        Nenhuma entrada encontrada.
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
