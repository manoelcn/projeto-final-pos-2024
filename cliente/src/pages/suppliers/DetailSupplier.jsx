import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import suppliersService from "../../services/suppliersService";

const DetailSupplier = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        suppliersService
            .getSupplierById(id)
            .then((data) => {
                setSupplier(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar fornecedores.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes do Fornecedor</h1>
            {supplier ? (
                <div>
                    <p><strong>Id:</strong> {supplier.id}</p>
                    <p><strong>Nome:</strong> {supplier.name}</p>
                    <p><strong>Descrição:</strong> {supplier.description || "Sem descrição"}</p>
                </div>
            ) : (
                <p>Fornecedor não encontrado.</p>
            )}
        </div>
    )
};

export default DetailSupplier;