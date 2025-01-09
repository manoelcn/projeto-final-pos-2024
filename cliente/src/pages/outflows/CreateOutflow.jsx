import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import productService from "../../services/productsService";
import outflowService from "../../services/outflowsService";

const CreateOutflow = () => {
    const [outflowData, setOutflowData] = useState({
        "quantity": null,
        "description": "",
        "product": null
    });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        productService
            .listProducts()
            .then((data) => setProducts(data))
            .catch((err) => setError("Erro ao carregar produtos"));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOutflowData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOutflow = (e) => {
        e.preventDefault();

        outflowService
            .createOutlfow(outflowData)
            .then(() => {
                navigate("/outflows");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <div class="container-fluid mt-4 px-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <h3 class="text">
                                Cadastrar Saída
                            </h3>
                        </div>
                        <Card>
                            <Card.Body>
                                <form onSubmit={handleCreateOutflow}>

                                        <label><strong>Quantidade</strong></label>
                                        <input className="form-control" type="number" name="quantity" placeholder="Quantidade" value={outflowData.quantity || ""} onChange={handleInputChange} required /><br />

                                        <label><strong>Descrição</strong></label>
                                        <textarea className="form-control" name="description" placeholder="Descrição da saída" value={outflowData.description} onChange={handleInputChange} required /><br />                       
                                        <label><strong>Produto</strong></label>
                                        <select className="form-control" name="product" value={outflowData.product || ""} onChange={handleInputChange} required>
                                            <option value="" disabled>
                                                Selecione um produto
                                            </option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.title}
                                                </option>
                                            ))}
                                        </select><br />
                                    <Button type="submit">Criar</Button>
                                </form>
                            </Card.Body>
                        </Card>
                        <br />
                        <Button href="/brands" variant="secondary">Cancelar e Voltar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOutflow;