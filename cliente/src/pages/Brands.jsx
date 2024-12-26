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
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center">
                        Lista de marcas
                    </h3>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td>{brand.id}</td>
                                    <td>{brand.name}</td>
                                    <td>{brand.description || "N/A"}</td>
                                    <td>
                                        <button className="btn btn-primary">Editar</button>
                                        <button className="btn btn-danger">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Brands;
