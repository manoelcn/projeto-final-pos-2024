import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import categoryService from "../../services/categoriesService";
import { Empty } from "antd";
import { Spin } from "antd";

const DetailCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar detalhes da categoria.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container-fluid mt-4 px-5 text-center"><Spin  /></div>;
    if (error) return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;

    return (
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Detalhes da Categoria
                        </h3>
                    </div>
                    <Card>

                        {category ? (
                            <Card.Body>
                                <Card.Title>{category.name}</Card.Title>
                                <Card.Text>
                                    {category.description}
                                </Card.Text>
                                <Button href="/categories" variant="secondary">Voltar</Button>
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

export default DetailCategory;