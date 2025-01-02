import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import brandService from '../../services/brandsService'; // Importando o serviço de brands

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
                    <h3>
                        Marcas
                    </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" name="name" placeholder="Nome" />
                        <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="#" class="btn btn-primary float-end">
                            <i class="bi bi-plus"></i>
                            Cadastrar Marca
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.length > 0 ? (
                                brands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.id}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.description}</td>
                                        <td>
                                            <a href="#" class="btn btn-info btn-sm">
                                                <i class="bi bi-eye"></i>
                                            </a>
                                            <a href="#" class="btn btn-warning btn-sm">
                                                <i class="bi bi-pencil"></i>
                                            </a>
                                            <a href="#" class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        Nenhuma marca encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Brands;
