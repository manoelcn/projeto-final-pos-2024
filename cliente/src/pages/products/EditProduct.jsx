import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import productService from "../../services/productsService";
import brandService from "../../services/brandsService";
import categoryService from "../../services/categoriesService";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "antd";
import { Spin } from "antd";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        productService
            .getProductById(id)
            .then((data) => setProduct(data))
            .catch(() => setError("Erro ao carregar os detalhes do produto."));
        setLoading(false);

        brandService
            .listBrands()
            .then((data) => setBrands(data))
            .catch((err) => console.error("Erro ao carregar marcas", err));
        setLoading(false);

        categoryService
            .listCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.error("Erro ao carregar categorias", err));
        setLoading(false);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        productService
            .updateProduct(id, product)
            .then(() => {
                setSuccessMessage("Produto atualizado com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/products");
                });
            })
            .catch(() => {
                setError("Erro ao atualizar o produto.");
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
                            Atualizar Produto
                        </h3>
                    </div>
                    <Card>
                        {product ? (
                            <Card.Body>
                                <form className="form row" onSubmit={handleUpdateProduct}>
                                    <div class="col-md-6">
                                        <label><strong>Título</strong></label>
                                        <input className="form-control" type="text" name="title" value={product.title} onChange={handleInputChange} required /><br />

                                        <label><strong>Descrição</strong></label>
                                        <textarea className="form-control" name="description" value={product.description} onChange={handleInputChange} required /><br />

                                        <label><strong>Número de Série</strong></label>
                                        <input className="form-control" type="text" name="serie_number" value={product.serie_number} onChange={handleInputChange} /><br />

                                        <label><strong>Preço de Custo</strong></label>
                                        <input className="form-control" type="number" name="cost_price" value={product.cost_price} onChange={handleInputChange} required /><br />
                                    </div>
                                    <div class="col-md-6">
                                        <label><strong>Preço de Venda</strong></label>
                                        <input className="form-control" type="number" name="selling_price" value={product.selling_price} onChange={handleInputChange} required /><br />

                                        <label><strong>Quantidade</strong></label>
                                        <input className="form-control" type="number" name="quantity" value={product.quantity} onChange={handleInputChange} required /><br />

                                        <label><strong>Marca</strong></label>
                                        <select className="form-control" name="brand" value={product.brand} onChange={handleInputChange} required>
                                            <option value="">Selecione uma marca</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select><br />

                                        <label><strong>Categoria</strong></label>
                                        <select className="form-control" name="category" value={product.category} onChange={handleInputChange} required>
                                            <option value="">Selecione uma categoria</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select><br />
                                    </div>
                                    <div>
                                        <Button type="submit">Atualizar</Button>
                                    </div>
                                </form>
                            </Card.Body>
                        ) : (
                            <CardText>
                                Nenhuma informação encontrada!
                            </CardText>
                        )}
                    </Card>
                    <br />
                    <Button href="/products" variant="secondary">Cancelar e Voltar</Button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;