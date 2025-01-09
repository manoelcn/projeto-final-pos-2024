import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import inflowService from "../../services/inflowsService";
import productService from "../../services/productsService";
import suppliersService from "../../services/suppliersService";

const DetailInflow = () => {
    const { id } = useParams();
    const [inflow, setInflow] = useState(null);
    const [product, setProduct] = useState(null);
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        inflowService
            .getInflowById(id)
            .then((data) => {
                setInflow(data);

                productService
                    .getProductById(data.product)
                    .then((productData) => setProduct(productData))
                    .catch(() => setError("Erro ao carregar o produto."));

                suppliersService
                    .getSupplierById(data.supplier)
                    .then((supplierData) => setSupplier(supplierData))
                    .catch(() => setError("Erro ao carregar o fornecedor."));
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes das entradas.");
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
                            Detalhes da Entrada
                        </h3>
                    </div>
                    <Card>
                        {inflow ? (
                            <Card.Body>
                                <Card.Title>{product ? product.title : "Carregando..."}</Card.Title>
                                <Card.Text>
                                    {inflow.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Fornecedor:</strong> {supplier ? supplier.name : "Carregando..."}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Quantidade:</strong> {inflow.quantity}
                                </Card.Text>
                                <Button href="/inflows" variant="secondary">Voltar</Button>
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

export default DetailInflow;