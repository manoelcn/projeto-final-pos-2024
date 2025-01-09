import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Cadastrar Marca
                        </h3>
                    </div>
                    <Card>

                        <Card.Body>
                            <form onSubmit={handleCreateBrand}>

                                <label><strong>Nome</strong></label>
                                <input className="form-control" type="text" name="name" placeholder="Nome da marca" value={newBrand.name} onChange={handleInputChange} required /><br />

                                <label><strong>Descrição</strong></label>
                                <textarea className="form-control" name="description" placeholder="Descrição da marca" value={newBrand.description} onChange={handleInputChange} required /><br />

                                <Button type="submit">Criar</Button>
                            </form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Button href="/brands" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateBrand;