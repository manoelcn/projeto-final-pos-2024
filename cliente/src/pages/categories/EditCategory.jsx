import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import categoryService from "../../services/categoriesService";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes da categoria");
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value })); // Atualiza o estado com os novos valores
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        categoryService
            .updateCategory(id, category)
            .then(() => {
                setSuccessMessage("Categoria atualizada com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/categories");
                }, 1000);
            })
            .catch(() => {
                setError("Erro ao atualizar a categoria.");
            });
    };

    if (loading) return <p>Carregando...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Atualizar Categoria</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleUpdateCategory}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
};

export default EditCategory;