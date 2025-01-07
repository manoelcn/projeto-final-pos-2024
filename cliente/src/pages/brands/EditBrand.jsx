import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obter o ID e redirecionar
import brandService from "../../services/brandsService"; // Importando o serviço

const EditBrand = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate(); // Para redirecionar após a atualização
    const [brand, setBrand] = useState({ name: "", description: "" }); // Estado para armazenar a marca
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erros
    const [successMessage, setSuccessMessage] = useState(null); // Estado para mensagens de sucesso

    useEffect(() => {
        // Busca os detalhes da marca
        brandService
            .getBrandById(id)
            .then((data) => {
                setBrand(data); // Atualiza o estado com os dados da marca
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes da marca.");
                setLoading(false); // Desativa o estado de carregamento
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand((prev) => ({ ...prev, [name]: value })); // Atualiza o estado com os novos valores
    };

    const handleUpdateBrand = (e) => {
        e.preventDefault();
        brandService
            .updateBrand(id, brand)
            .then(() => {
                setSuccessMessage("Marca atualizada com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/brands"); // Redireciona para a lista de marcas
                }, 3000);
            })
            .catch(() => {
                setError("Erro ao atualizar a marca.");
            });
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Atualizar Marca</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleUpdateBrand}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={brand.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea
                        name="description"
                        value={brand.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};

export default EditBrand;
