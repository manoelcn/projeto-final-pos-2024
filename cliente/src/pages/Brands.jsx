import React, { useEffect, useState } from "react";
import brandService from "../services/brandsService"; // Importando o serviço de brands

const Brands = () => {
    const [brands, setBrands] = useState([]);  // Estado para armazenar as brands
    const [error, setError] = useState(null);   // Estado para armazenar erros, caso ocorra

    // useEffect para fazer o GET quando o componente for montado
    useEffect(() => {
        // Chama o serviço para listar as brands
        brandService
            .listBrands()
            .then((data) => {
                setBrands(data); // Atualiza o estado com as brands retornadas pela API
            })
            .catch((error) => {
                setError(error.message); // Caso ocorra um erro, atualiza o estado de erro
            });
    }, []); // O array vazio significa que o useEffect será chamado apenas uma vez quando o componente for montado

    // Exibe mensagem de erro, se houver
    if (error) {
        return <p>Erro ao carregar as brands: {error}</p>;
    }

    return (
        <div>
            <h1>Lista de marcas</h1>
            <ul>
                {/* Renderiza as brands na tela */}
                {brands.map((brand) => (
                    <li key={brand.id}>{brand.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Brands;
