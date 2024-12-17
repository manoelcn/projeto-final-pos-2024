import React, { useEffect, useState } from "react";
import categoriesService from '../services/categoriesService';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        categoriesService
            .listCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Erro ao carregar as categorias: {error}</p>
    }

    return (
        <div>
            <h1>Lista de categorias</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;