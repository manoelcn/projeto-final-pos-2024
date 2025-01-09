import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import outflowService from "../../services/outflowsService";

const DetailOutflow = () => {
    const { id } = useParams();
    const [outflow, setOutflow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        outflowService
            .getOutflowById(id)
            .then((data) => {
                setOutflow(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes das saídas.");
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
                            Detalhes da Saída
                        </h3>
                    </div>
                    <Card>
                        {outflow ? (
                            <Card.Body>
                                <Card.Title>{outflow.product}</Card.Title>
                                <Card.Text>
                                    {outflow.description}
                                </Card.Text>
                                <Card.Text>
                                    Produto: {outflow.product}
                                </Card.Text>
                                <Card.Text>
                                    Quantidade: {outflow.quantity}
                                </Card.Text>
                                <Button href="/outflows" variant="secondary">Voltar</Button>
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
    );
};

export default DetailOutflow;