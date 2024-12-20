import React, { useEffect, useState } from "react";
import outflowsService from '../services/outflowsService';

const Outflows = () => {
    const [outflows, setOutflows] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
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
        <div>
            <h1>Lista de saídas</h1>
            <ul>
                {outflows.map((outflow) => (
                    <li key={outflow.id}>{outflow.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Outflows;