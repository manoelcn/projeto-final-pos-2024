import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoriesService";

const CreateCategory = () => {
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateCategory = (e) => {
        e.preventDefault();

        categoryService
            .createCategory(newCategory)
            .then(() => {
                navigate("/categories");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div>
            <h1>Criar Nova Categoria</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateCategory}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome da categoria"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição da categoria"
                        value={newCategory.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateCategory;
