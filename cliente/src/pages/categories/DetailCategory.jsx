import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryService from "../../services/categoriesService";

const DetailCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar detalhes da categoria.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes da Categoria</h1>
            {category ? (
                <div>
                    <p><strong>Id:</strong> {category.id}</p>
                    <p><strong>Nome:</strong> {category.name}</p>
                    <p><strong>Descrição:</strong> {category.description || "Sem descrição"}</p>
                </div>
            ) : (
                <p>Categoria não encontrada</p>
            )}
        </div>
    );
};

export default DetailCategory;