import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoriesService";
import { Empty } from "antd";

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

    if (error) return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;

    return (
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Cadastrar Categoria
                        </h3>
                    </div>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleCreateCategory}>

                                <label><strong>Nome</strong></label>
                                <input className="form-control" type="text" name="name" placeholder="Nome da categoria" value={newCategory.name} onChange={handleInputChange} required /><br />

                                <label><strong>Descrição</strong></label>
                                <textarea className="form-control" name="description" placeholder="Descrição da categoria" value={newCategory.description} onChange={handleInputChange} required /><br />

                                <Button type="submit">Criar</Button>
                            </form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Button href="/categories" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
