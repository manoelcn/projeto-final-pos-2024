import React, { useEffect, useState } from "react";
import productService from "../../services/productsService";
import brandService from "../../services/brandsService";
import categoryService from "../../services/categoriesService";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        serie_number: "",
        cost_price: "",
        selling_price: "",
        quantity: "",
        brand: "",
        category: "",
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        productService
            .getProductById(id)
            .then((data) => setProduct(data))
            .catch(() => setError("Erro ao carregar os detalhes do produto."));

        brandService
            .listBrands()
            .then((data) => setBrands(data))
            .catch((err) => console.error("Erro ao carregar marcas", err));

        categoryService
            .listCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.error("Erro ao carregar categorias", err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        productService
            .updateProduct(id, product)
            .then(() => {
                setSuccessMessage("Produto atualizado com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/products");
                }, 1000);
            })
            .catch(() => {
                setError("Erro ao atualizar o produto.");
            });
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Atualizar Produto</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleUpdate}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Número de Série:</label>
                    <input
                        type="text"
                        name="serie_number"
                        value={product.serie_number}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Preço de Custo:</label>
                    <input
                        type="number"
                        name="cost_price"
                        value={product.cost_price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Preço de Venda:</label>
                    <input
                        type="number"
                        name="selling_price"
                        value={product.selling_price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Marca:</label>
                    <select
                        name="brand"
                        value={product.brand}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione uma marca</option>
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
                        value={product.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Atualizar Produto</button>
            </form>
        </div>
    );
};

export default EditProduct;