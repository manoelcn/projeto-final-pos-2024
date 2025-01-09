import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom"; // Para obter o ID da URL
import brandService from "../../services/brandsService"; // Importando o serviço
import { Empty } from "antd";
import { Spin } from "antd";

const DetailBrand = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const [brand, setBrand] = useState(null); // Estado para armazenar a marca
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erros

    useEffect(() => {
        // Busca os detalhes da marca
        brandService
            .getBrandById(id)
            .then((data) => {
                setBrand(data); // Atualiza o estado com os dados da marca
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes da marca.");
                setLoading(false); // Desativa o estado de carregamento
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
                            Detalhes da Marca
                        </h3>
                    </div>
                    <Card>

                        {brand ? (
                            <Card.Body>
                                <Card.Title>{brand.name}</Card.Title>
                                <Card.Text>
                                    {brand.description}
                                </Card.Text>
                                <Button href="/brands" variant="secondary">Voltar</Button>
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

export default DetailBrand;