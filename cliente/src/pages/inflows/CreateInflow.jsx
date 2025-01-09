import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import suppliersService from "../../services/suppliersService";
import productService from "../../services/productsService";
import inflowService from "../../services/inflowsService";

const CreateInflow = () => {
    const [inflowData, setInflowData] = useState({
        "quantity": null,
        "description": "",
        "supplier": null,
        "product": null
    });
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        suppliersService
            .listSuppliers()
            .then((data) => setSuppliers(data))
            .catch((err) => setError("Erro ao carregar fornecedores"));

        productService
            .listProducts()
            .then((data) => setProducts(data))
            .catch((err) => setError("Erro ao carregar produtos"));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInflowData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateInflow = (e) => {
        e.preventDefault();

        inflowService
            .createInflow(inflowData)
            .then(() => {
                navigate("/inflows");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <div>
                <div class="container-fluid mt-4 px-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div class="col-md-6">
                            <div class="col-md-12">
                                <h3 class="text">
                                    Cadastrar Entrada
                                </h3>
                            </div>
                            <Card>
                                <Card.Body>
                                    <form onSubmit={handleCreateInflow}>
                                        <label><strong>Quantidade</strong></label>
                                        <input className="form-control" type="number" name="quantity" placeholder="Quantidade" value={inflowData.quantity || ""} onChange={handleInputChange} required /><br />

                                        <label><strong>Descrição</strong></label>
                                        <textarea className="form-control" name="description" placeholder="Descrição da entrada" value={inflowData.description} onChange={handleInputChange} required /><br />

                                        <label><strong>Fornecedor</strong></label>
                                        <select className="form-control" name="supplier" value={inflowData.supplier || ""} onChange={handleInputChange} required>
                                            <option value="" disabled>
                                                Selecione um fornecedor
                                            </option>
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select><br />

                                        <label><strong>Produto</strong></label>
                                        <select className="form-control" name="product" value={inflowData.product || ""} onChange={handleInputChange} required>
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
                            <Button href="/inflows" variant="secondary">Cancelar e Voltar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateInflow;