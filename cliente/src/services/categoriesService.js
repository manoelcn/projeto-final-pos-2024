import apiWrapper from "./apiWrapper";

const categoryService = {
    listCategories() {
        return apiWrapper.get("categories");
    },

    getCategoryById(id) {
        return apiWrapper.get(`categories/${id}`);
    },

    createCategory(category) {
        return apiWrapper.post("categories", category);
    },

    updateCategory(id, category) {
        return apiWrapper.put(`categories/${id}`, category);
    },

    deleteCategory(id) {
        return apiWrapper.delete(`categories/${id}`);
    },
};

export default categoryService;
