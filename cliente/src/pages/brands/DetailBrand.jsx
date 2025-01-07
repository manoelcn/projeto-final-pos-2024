import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obter o ID da URL
import brandService from "../../services/brandsService"; // Importando o serviço

const DetailBrand = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const [brand, setBrand] = useState(null); // Estado para armazenar a marca
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erros

    useEffect(() => {
        // Busca os detalhes da marca
        brandService
            .getBrandById(id)
            .then((data) => {
                setBrand(data); // Atualiza o estado com os dados da marca
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes da marca.");
                setLoading(false); // Desativa o estado de carregamento
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes da Marca</h1>
            {brand ? (
                <div>
                    <p><strong>ID:</strong> {brand.id}</p>
                    <p><strong>Nome:</strong> {brand.name}</p>
                    <p><strong>Descrição:</strong> {brand.description || "Sem descrição."}</p>
                </div>
            ) : (
                <p>Marca não encontrada.</p>
            )}
        </div>
    );
};

export default DetailBrand;
