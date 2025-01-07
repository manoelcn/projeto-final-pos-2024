import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import outflowService from "../../services/outflowsService";

const DetailOutflow = () => {
    const { id } = useParams();
    const [outflow, setOutflow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        outflowService
            .getOutflowById(id)
            .then((data) => {
                setOutflow(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes das saídas.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes da Saída</h1>
            {outflow ? (
                <div>
                    <p><strong>Produto:</strong> {outflow.product}</p>
                    <p><strong>Quantidade:</strong> {outflow.quantity}</p>
                    <p><strong>Descrição:</strong> {outflow.description}</p>
                </div>
            ) : (
                <p>Saída não encontrada.</p>
            )}
        </div>
    );
};

export default DetailOutflow;