import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import suppliersService from "../../services/suppliersService";

const CreateSupplier = () => {
    const [newSupplier, setNewSupplier] = useState({ name: "", description: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateSupplier = (e) => {
        e.preventDefault();

        suppliersService
            .createSupplier(newSupplier)
            .then(() => {
                navigate("/suppliers");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div>
            <h1>Criar Novo Fornecedor</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateSupplier}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome do fornecedor"
                        value={newSupplier.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição do fornecedor"
                        value={newSupplier.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateSupplier;
