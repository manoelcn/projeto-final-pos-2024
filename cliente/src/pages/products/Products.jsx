import React, { useEffect, useState } from "react";
import productsService from '../../services/productsService';
import brandService from "../../services/brandsService";
import categoryService from "../../services/categoriesService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productDelete, setProductDelete] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        productsService
            .listProducts()
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => {
                setError(error.message);
            });

        brandService
            .listBrands()
            .then((brandData) => {
                setBrands(brandData);
            })
            .catch(() => setError("Erro ao carregar marcas."));

        categoryService
            .listCategories()
            .then((categoryData) => {
                setCategories(categoryData);
            })
            .catch(() => setError("Erro ao carregar categorias."));
    }, []);

    const handleSearchClick = () => {
        setFilteredProducts(
            products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleShowModal = (product) => {
        setProductDelete(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setProductDelete(null);
        setShowModal(false);
    };

    const handleDeleteProduct = () => {
        if (!productDelete) return;
        productsService
            .deleteProduct(productDelete.id)
            .then(() => {
                const updatedProducts = products.filter((b) => b.id !== productDelete.id);
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts.filter((product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                ));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir produto.");
                handleCloseModal();
            });
    };

    if (error) {
        return <div className="container-fluid mt-4 px-5">
            <Empty description={'Viiixe! alguma coisa deu errado :('} />
            <br />
            <div className="text-center">
                <Button href="/products" variant="secondary">Voltar</Button>
            </div>
        </div>;
    }

    const getBrandName = (brandId) => {
        const brand = brands.find(b => b.id === brandId);
        return brand ? brand.name : "Carregando...";
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : "Carregando...";
    };

    return (
        <div className="container-fluid mt-4 px-5">
            <div className="row">
                <div className="col-md-12">
                    <h3>Produtos</h3>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input type="text" className="form-control" name="title" placeholder="Título" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button variant="primary" onClick={handleSearchClick}>
                            <SearchIcon />
                        </Button>
                        <a className="btn btn-secondary" href="/products">
                            <FilterAltOffIcon />
                        </a>
                    </div>
                </div>
                <div className="col-md-6">
                    <a href="/createproduct" className="btn btn-primary">
                        <AddIcon /> Cadastrar Produto
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Marca</th>
                                <th>Categoria</th>
                                <th>Preço de Custo</th>
                                <th>Preço de Venda</th>
                                <th>Número de Série</th>
                                <th>Quantidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{getBrandName(product.brand)}</td>
                                        <td>{getCategoryName(product.category)}</td>
                                        <td>R$ {product.cost_price}</td>
                                        <td>R$ {product.selling_price}</td>
                                        <td>{product.serie_number}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <a href={`/products/${product.id}`} className="btn btn-info btn-sm me-2">
                                                <VisibilityIcon />
                                            </a>
                                            <a href={`/products/${product.id}/edit`} className="btn btn-warning btn-sm me-2">
                                                <EditIcon />
                                            </a>
                                            <a className="btn btn-danger btn-sm" onClick={(e) => { e.preventDefault(); handleShowModal(product); }}>
                                                <DeleteIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        Nenhum produto encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir o produto{" "}
                    <strong>{productDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;