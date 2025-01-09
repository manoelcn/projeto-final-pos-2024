import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import productService from "../../services/productsService";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService
            .getProductById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes do produto.");
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
                            Detalhes do Produto
                        </h3>
                    </div>
                    <Card>

                        {product ? (
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    Marca: {product.brand}
                                </Card.Text>
                                <Card.Text>
                                    Categoria: {product.category}
                                </Card.Text>
                                <Card.Text>
                                    Número de Série: {product.serie_number}
                                </Card.Text>
                                <Card.Text>
                                    Preço de Custo: R${product.cost_price}
                                </Card.Text>
                                <Card.Text>
                                    Preço de Venda: R${product.selling_price}
                                </Card.Text>
                                <Card.Text>
                                    Quantidade em Estoque: {product.quantity}
                                </Card.Text>
                                <Button href="/products" variant="secondary">Voltar</Button>
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

export default DetailProduct;
