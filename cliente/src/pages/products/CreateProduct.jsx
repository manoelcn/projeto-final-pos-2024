import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
        <div class="container-fluid mt-4 px-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="col-md-12">
                        <h3 class="text">
                            Cadastrar Produto
                        </h3>
                    </div>
                    <Card>
                        <Card.Body>
                            <form className="form row" onSubmit={handleCreateProduct}>
                                <div class="col-md-6">
                                    <label><strong>Título</strong></label>
                                    <input className="form-control" type="text" name="title" placeholder="Título do produto" value={productData.title} onChange={handleInputChange} required /><br />

                                    <label><strong>Descrição</strong></label>
                                    <textarea className="form-control" name="description" placeholder="Descrição do produto" value={productData.description} onChange={handleInputChange} required /><br />

                                    <label><strong>Número de Série</strong></label>
                                    <input className="form-control" type="text" name="serie_number" placeholder="Número de série" value={productData.serie_number} onChange={handleInputChange} /><br />

                                    <label><strong>Preço de Custo</strong></label>
                                    <input className="form-control" type="number" name="cost_price" placeholder="Preço de custo" value={productData.cost_price || ""} onChange={handleInputChange} /><br />
                                </div>

                                <div class="col-md-6">
                                    <label><strong>Preço de Venda</strong></label>
                                    <input className="form-control" type="number" name="selling_price" placeholder="Preço de venda" value={productData.selling_price || ""} onChange={handleInputChange} /><br />

                                    <label><strong>Quantidade</strong></label>
                                    <input className="form-control" type="number" name="quantity" placeholder="Quantidade" value={productData.quantity || ""} onChange={handleInputChange} /><br />

                                    <label><strong>Marca</strong></label>
                                    <select className="form-control" name="brand" value={productData.brand || ""} onChange={handleInputChange} required>
                                        <option value="" disabled>
                                            Selecione uma marca
                                        </option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select><br />

                                    <label><strong>Categoria</strong></label>
                                    <select className="form-control" name="category" value={productData.category || ""} onChange={handleInputChange} required>
                                        <option value="" disabled>
                                            Selecione uma categoria
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select><br />
                                </div>
                                <div>
                                    <Button type="submit">Criar</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Button href="/products" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;