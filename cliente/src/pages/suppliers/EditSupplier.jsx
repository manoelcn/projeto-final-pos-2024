import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import suppliersService from "../../services/suppliersService";

const EditSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        suppliersService
            .getSupplierById(id)
            .then((data => {
                setSupplier(data);
                setLoading(false);
            }))
            .catch(() => {
                setError("Erro ao carregar os detalhes do fornecedor.");
                setLoading(false);
            })
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSupplier = (e) => {
        e.preventDefault();
        suppliersService
            .updateSupplier(id, supplier)
            .then(() => {
                setSuccessMessage("Fornecedor atualizado com sucesso!");
                setTimeout(() => {
                    setSuccessMessage(null);
                    navigate("/suppliers");
                }, 1000);
            })
            .catch(() => {
                setError("Erro ao atualizar o fornecedor.");
            });
    };

    if (loading) return <p>Carregando...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Atualizar Fornecedor</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleUpdateSupplier}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={supplier.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea
                        name="description"
                        value={supplier.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
};

export default EditSupplier;