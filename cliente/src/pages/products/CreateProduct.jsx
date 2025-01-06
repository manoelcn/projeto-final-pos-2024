import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../services/productsService";
import brandService from "../../services/brandsService";
import categoryService from "../../services/categoriesService";

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        serie_number: "",
        cost_price: null,
        selling_price: null,
        quantity: null,
        brand: null,
        category: null,
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        brandService
            .listBrands()
            .then((data) => setBrands(data))
            .catch((err) => setError("Erro ao carregar marcas"));

        categoryService
            .listCategories()
            .then((data) => setCategories(data))
            .catch((err) => setError("Erro ao carregar categorias"));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateProduct = (e) => {
        e.preventDefault();

        productService
            .createProduct(productData)
            .then(() => {
                navigate("/products");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <h1>Criar Novo Produto</h1>
            {error && <p style={{ color: "red" }}>Erro: {error}</p>}

            <form onSubmit={handleCreateProduct}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título do produto"
                        value={productData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descrição do produto"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Número de Série:</label>
                    <input
                        type="text"
                        name="serie_number"
                        placeholder="Número de série"
                        value={productData.serie_number}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Preço de Custo:</label>
                    <input
                        type="number"
                        name="cost_price"
                        placeholder="Preço de custo"
                        value={productData.cost_price || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Preço de Venda:</label>
                    <input
                        type="number"
                        name="selling_price"
                        placeholder="Preço de venda"
                        value={productData.selling_price || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantidade"
                        value={productData.quantity || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <select
                        name="brand"
                        value={productData.brand || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione uma marca
                        </option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Categoria:</label>
                    <select
                        name="category"
                        value={productData.category || ""}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione uma categoria
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Criar Produto</button>
            </form>
        </div>
    );
};

export default CreateProduct;