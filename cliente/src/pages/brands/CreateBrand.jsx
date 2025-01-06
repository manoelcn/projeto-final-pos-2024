import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o useNavigate
import brandService from "../../services/brandsService"; // Importando o serviço de brands

const CreateBrand = () => {
    const [newBrand, setNewBrand] = useState({ name: "", description: "" }); // Estado para nome e descrição
    const [error, setError] = useState(null); // Estado para erros
    const navigate = useNavigate(); // Hook para navegação

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBrand((prev) => ({ ...prev, [name]: value })); // Atualiza o estado com base no campo
    };

    const handleCreateBrand = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        brandService
            .createBrand(newBrand)
            .then(() => {
                navigate("/brands"); // Redireciona para a página de lista de marcas
            })
            .catch((err) => {
                setError(err.message); // Exibe mensagem de erro
            });
    };

    return (
        <div>
            <h1>Criar Nova Marca</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateBrand}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome da marca"
                        value={newBrand.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição da marca"
                        value={newBrand.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateBrand;
