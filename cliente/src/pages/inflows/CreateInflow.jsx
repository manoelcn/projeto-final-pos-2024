import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
            <h1>Criar Entrada de Produto</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateInflow}>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantidade"
                        value={inflowData.quantity || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição da entrada"
                        value={inflowData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Fornecedor:</label>
                    <select
                        name="supplier"
                        value={inflowData.supplier || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione um fornecedor
                        </option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Produto:</label>
                    <select
                        name="product"
                        value={inflowData.product || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione um produto
                        </option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Criar Entrada</button>
            </form>
        </div>
    )
}

export default CreateInflow;