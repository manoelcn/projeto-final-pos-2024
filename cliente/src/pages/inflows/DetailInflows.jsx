import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import inflowService from "../../services/inflowsService";

const DetailInflow = () => {
    const { id } = useParams();
    const [inflow, setInflow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        inflowService
            .getInflowById(id)
            .then((data) => {
                setInflow(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes das entradas.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes da Entrada</h1>
            {inflow ? (
                <div>
                    <p><strong>Fornecedor:</strong> {inflow.supplier}</p>
                    <p><strong>Quantidade:</strong> {inflow.quantity}</p>
                    <p><strong>Descrição:</strong> {inflow.description}</p>
                </div>
            ) : (
                <p>Entrada não encontrada.</p>
            )}
        </div>
    );
};

export default DetailInflow;