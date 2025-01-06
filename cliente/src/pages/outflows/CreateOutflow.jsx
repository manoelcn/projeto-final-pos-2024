import React, { useState, useEffect } from "react";
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
            <h1>Criar Saída de Produto</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateOutflow}>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantidade"
                        value={outflowData.quantity || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição da saída"
                        value={outflowData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Produto:</label>
                    <select
                        name="product"
                        value={outflowData.product || ""}
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
                <button type="submit">Criar Saída</button>
            </form>
        </div>
    );
};

export default CreateOutflow;