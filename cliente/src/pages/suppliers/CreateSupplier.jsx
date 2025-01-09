import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Cadastrar Fornecedor
                        </h3>
                    </div>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleCreateSupplier}>

                                <label><strong>Nome</strong></label>
                                <input className="form-control" type="text" name="name" placeholder="Nome do fornecedor" value={newSupplier.name} onChange={handleInputChange} required /><br />

                                <label><strong>Descrição</strong></label>
                                <textarea className="form-control" name="description" placeholder="Descrição do fornecedor" value={newSupplier.description} onChange={handleInputChange} required /><br />

                                <Button type="submit">Criar</Button>
                            </form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Button href="/suppliers" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateSupplier;
