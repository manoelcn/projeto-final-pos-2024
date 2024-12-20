import React, { useEffect, useState } from "react";
import productsService from '../services/productsService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
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
        <div>
            <h1>Lista de produtos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;