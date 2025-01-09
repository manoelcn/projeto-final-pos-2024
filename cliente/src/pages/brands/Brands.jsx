import React, { useEffect, useState } from "react";
import brandService from '../../services/brandsService';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Empty } from "antd";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        brandService
            .listBrands()
            .then((data) => {
                setBrands(data);
                setFilteredBrands(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSearchClick = () => {
        setFilteredBrands(
            brands.filter((brand) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleShowModal = (brand) => {
        setBrandToDelete(brand);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setBrandToDelete(null);
        setShowModal(false);
    };

    const handleDeleteBrand = () => {
        if (!brandToDelete) return;
        brandService
            .deleteBrand(brandToDelete.id)
            .then(() => {
                const updateBrands = brands.filter((b) => b.id !== brandToDelete.id);
                setBrands(updateBrands);
                setFilteredBrands(updateBrands.filter((brand) =>
                    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
                ));
                handleCloseModal();
            })
            .catch(() => {
                setError("Erro ao excluir a marca.");
                handleCloseModal();
            });
    };

    if (error) {
        return <div className="container-fluid mt-4 px-5"><Empty description={'Viiixe! alguma coisa deu errado :('} /></div>;
    }

    return (
        <div class="container-fluid mt-4 px-5">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text">
                        Marcas
                    </h3>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" name="name" placeholder="Nome" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleSearchClick} className="btn btn-primary">
                            <SearchIcon />
                        </Button>
                        <a class="btn btn-secondary" href="/brands"><FilterAltOffIcon /></a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-6">
                        <a href="/createbrand" class="btn btn-primary">
                            <AddIcon /> Cadastrar Marca
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.id}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.description}</td>
                                        <td>
                                            <a href={`/brands/${brand.id}`} class="btn btn-info btn-sm me-2">
                                                <VisibilityIcon />
                                            </a>
                                            <a href={`/brands/${brand.id}/edit`} class="btn btn-warning btn-sm me-2">
                                                <EditIcon />
                                            </a>
                                            <a class="btn btn-danger btn-sm me-2" onClick={(e) => { e.preventDefault(); handleShowModal(brand); }}>
                                                <DeleteIcon />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" class="text-center">
                                        Nenhuma marca encontrada.
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
                    Tem certeza que deseja excluir a marca{" "}
                    <strong>{brandToDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBrand}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default Brands;