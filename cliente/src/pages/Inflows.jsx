import React, { useEffect, useState } from "react";
import inflowsService from '../services/inflowsService';

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
        <div>
            <h1>Lista de entradas</h1>
            <ul>
                {inflows.map((inflow) => (
                    <li key={inflow.id}>{inflow.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inflows;