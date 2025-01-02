import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import productsService from '../services/productsService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        productsService
            .listProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Erro ao carregar produtos: {error}</p>
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3>
                        Produtos
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
                            Cadastrar Produtos
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
                                <th>Título</th>
                                <th>Marca</th>
                                <th>Categoria</th>
                                <th>Preço de Custo</th>
                                <th>Preço de Venda</th>
                                <th>Número de Série</th>
                                <th>Quantidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.cost_price}</td>
                                        <td>{product.selling_price}</td>
                                        <td>{product.serie_number}</td>
                                        <td>{product.quantity}</td>
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
                                        Nenhum produto encontrado
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

export default Products;