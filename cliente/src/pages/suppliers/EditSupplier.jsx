import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from "react-router-dom";
import suppliersService from "../../services/suppliersService";

const EditSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        suppliersService
            .getSupplierById(id)
            .then((data => {
                setSupplier(data);
                setLoading(false);
            }))
            .catch(() => {
                setError("Erro ao carregar os detalhes do fornecedor.");
                setLoading(false);
            })
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSupplier = (e) => {
        e.preventDefault();
        suppliersService
            .updateSupplier(id, supplier)
            .then(() => {
                setSuccessMessage("Fornecedor atualizado com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/suppliers");
                });
            })
            .catch(() => {
                setError("Erro ao atualizar o fornecedor.");
            });
    };

    if (loading) return <p>Carregando...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Atualizar Fornecedor
                        </h3>
                    </div>
                    <Card>
                        {supplier ? (
                            <Card.Body>
                                <form className="form" onSubmit={handleUpdateSupplier}>
                                    <label><strong>Nome</strong></label>
                                    <input className="form-control" type="text" name="name" value={supplier.name} onChange={handleInputChange} required /><br />
                                    <label><strong>Descrição</strong></label>
                                    <textarea className="form-control rows" name="description" value={supplier.description} onChange={handleInputChange} /><br />

                                    <Button type="submit">Atualizar</Button>
                                </form>
                            </Card.Body>
                        ) : (
                            <CardText>
                                Nenhuma informação encontrada!
                            </CardText>
                        )}
                    </Card>
                    <br />
                    <Button href="/suppliers" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    )
};

export default EditSupplier;