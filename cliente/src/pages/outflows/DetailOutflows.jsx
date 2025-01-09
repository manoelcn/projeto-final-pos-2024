import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import outflowService from "../../services/outflowsService";
import productService from "../../services/productsService";

const DetailOutflow = () => {
    const { id } = useParams();
    const [outflow, setOutflow] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        outflowService
            .getOutflowById(id)
            .then((data) => {
                setOutflow(data);

                productService
                    .getProductById(data.product)
                    .then((productData) => setProduct(productData))
                    .catch(() => setError("Erro ao carregar o produto."));

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
                                <Card.Title>{product ? product.title : "Carregando..."}</Card.Title>
                                <Card.Text>
                                    {outflow.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Quantidade:</strong> {outflow.quantity}
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