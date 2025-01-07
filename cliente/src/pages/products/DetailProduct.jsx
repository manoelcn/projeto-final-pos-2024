import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/productsService";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService
            .getProductById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erro ao carregar os detalhes do produto.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            {product && (
                <div>
                    <p>
                        <strong>ID:</strong> {product.id}
                    </p>
                    <p>
                        <strong>Título:</strong> {product.title}
                    </p>
                    <p>
                        <strong>Descrição:</strong> {product.description}
                    </p>
                    <p>
                        <strong>Número de Série:</strong> {product.serie_number}
                    </p>
                    <p>
                        <strong>Preço de Custo:</strong> R$ {product.cost_price}
                    </p>
                    <p>
                        <strong>Preço de Venda:</strong> R$ {product.selling_price}
                    </p>
                    <p>
                        <strong>Quantidade:</strong> {product.quantity}
                    </p>
                    <p>
                        <strong>Marca:</strong> {product.brand || "Não especificado"}
                    </p>
                    <p>
                        <strong>Categoria:</strong>{" "}
                        {product.category || "Não especificado"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DetailProduct;
