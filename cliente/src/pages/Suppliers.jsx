import React, { useEffect, useState } from "react";
import suppliersService from '../services/suppliersService';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
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
        <div>
            <h1>Lista de fornecedores</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier.id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Suppliers;