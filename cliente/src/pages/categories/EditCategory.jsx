import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from "react-router-dom";
import categoryService from "../../services/categoriesService";
import { Empty } from "antd";
import { Spin } from "antd";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao carregar os detalhes da categoria");
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value })); // Atualiza o estado com os novos valores
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        categoryService
            .updateCategory(id, category)
            .then(() => {
                setSuccessMessage("Categoria atualizada com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/categories");
                });
            })
            .catch(() => {
                setError("Erro ao atualizar a categoria.");
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
                            Atualizar Categoria
                        </h3>
                    </div>
                    <Card>
                        {category ? (
                            <Card.Body>
                                <form className="form" onSubmit={handleUpdateCategory}>
                                    <label><strong>Nome</strong></label>
                                    <input className="form-control" type="text" name="name" value={category.name} onChange={handleInputChange} required /><br />
                                    <label><strong>Descrição</strong></label>
                                    <textarea className="form-control rows" name="description" value={category.description} onChange={handleInputChange} /><br />

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
                    <Button href="/categories" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    )
};

export default EditCategory;