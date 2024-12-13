import apiWrapper from "./apiWrapper";

const suppliersService = {
    listSuppliers() {
        return apiWrapper.get("suppliers");
    },

    getSupplierById(id) {
        return apiWrapper.get(`suppliers/${id}`);
    },

    createSupplier(supplier) {
        return apiWrapper.post("suppliers", supplier);
    },

    updateSupplier(id, supplier) {
        return apiWrapper.put(`suppliers/${id}`, supplier);
    },

    deleteSupplier(id) {
        return apiWrapper.delete(`suppliers/${id}`);
    },
};

export default suppliersService;