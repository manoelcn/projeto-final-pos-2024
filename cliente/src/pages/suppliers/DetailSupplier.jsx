import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import suppliersService from "../../services/suppliersService";

const DetailSupplier = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        suppliersService
            .getSupplierById(id)
            .then((data) => {
                setSupplier(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar fornecedores.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Detalhes do Fornecedor
                        </h3>
                    </div>
                    <Card>

                        {supplier ? (
                            <Card.Body>
                                <Card.Title>{supplier.name}</Card.Title>
                                <Card.Text>
                                    {supplier.description}
                                </Card.Text>
                                <Button href="/suppliers" variant="secondary">Voltar</Button>
                            </Card.Body>
                        ) : (
                            <CardText>
                                Nenhuma informação encontrada!
                            </CardText>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default DetailSupplier;