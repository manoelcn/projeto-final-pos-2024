import apiWrapper from "./apiWrapper";

const productService = {
    listProducts() {
        return apiWrapper.get("products");
    },

    getProductById(id) {
        return apiWrapper.get(`products/${id}`);
    },

    createProduct(product) {
        return apiWrapper.post("products", product);
    },

    updateProduct(id, product) {
        return apiWrapper.put(`products/${id}`, product);
    },

    deleteProduct(id) {
        return apiWrapper.delete(`products/${id}`);
    },
};

export default productService;
