import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import productService from "../../services/productsService";
import brandService from "../../services/brandsService";
import categoryService from "../../services/categoriesService";
import { Empty } from "antd";
import { Spin } from "antd";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService
            .getProductById(id)
            .then((data) => {
                setProduct(data);

                brandService.getBrandById(data.brand)
                    .then((brandData) => setBrand(brandData))
                    .catch(() => setError("Erro ao carregar a marca."));

                categoryService.getCategoryById(data.category)
                    .then((categoryData) => setCategory(categoryData))
                    .catch(() => setError("Erro ao carregar a categoria."));

                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes do produto.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container-fluid mt-4 px-5 text-center"><Spin /></div>;
    if (error) return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;

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
                                    <strong>Marca:</strong> {brand ? brand.name : "Carregando..."}
                                </Card.Text>
                                <Card.Text>
                                <strong>Categoria:</strong> {category ? category.name : "Carregando..."}
                                </Card.Text>
                                <Card.Text>
                                <strong>Número de Série:</strong> {product.serie_number}
                                </Card.Text>
                                <Card.Text>
                                <strong>Preço de Custo:</strong> R${product.cost_price}
                                </Card.Text>
                                <Card.Text>
                                <strong>Preço de Venda:</strong> R${product.selling_price}
                                </Card.Text>
                                <Card.Text>
                                <strong>Quantidade em Estoque:</strong> {product.quantity}
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
