import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from "react-router-dom"; // Para obter o ID e redirecionar
import brandService from "../../services/brandsService"; // Importando o serviço
import { Empty } from "antd";
import { Spin } from "antd";

const EditBrand = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate(); // Para redirecionar após a atualização
    const [brand, setBrand] = useState({ name: "", description: "" }); // Estado para armazenar a marca
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erros
    const [successMessage, setSuccessMessage] = useState(null); // Estado para mensagens de sucesso

    useEffect(() => {
        // Busca os detalhes da marca
        brandService
            .getBrandById(id)
            .then((data) => {
                setBrand(data); // Atualiza o estado com os dados da marca
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes da marca.");
                setLoading(false); // Desativa o estado de carregamento
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand((prev) => ({ ...prev, [name]: value })); // Atualiza o estado com os novos valores
    };

    const handleUpdateBrand = (e) => {
        e.preventDefault();
        brandService
            .updateBrand(id, brand)
            .then(() => {
                setSuccessMessage("Marca atualizada com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/brands"); // Redireciona para a lista de marcas
                });
            })
            .catch(() => {
                setError("Erro ao atualizar a marca.");
            });
    };

    if (loading) return <div className="container-fluid mt-4 px-5 text-center"><Spin /></div>;
    if (error) return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;

    return (
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Atualizar Marca
                        </h3>
                    </div>
                    <Card>
                        {brand ? (
                            <Card.Body>
                                <form className="form" onSubmit={handleUpdateBrand}>
                                    <label><strong>Nome</strong></label>
                                    <input className="form-control" type="text" name="name" value={brand.name} onChange={handleInputChange} required /><br />
                                    <label><strong>Descrição</strong></label>
                                    <textarea className="form-control rows" name="description" value={brand.description} onChange={handleInputChange} /><br />

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
                    <Button href="/brands" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default EditBrand;