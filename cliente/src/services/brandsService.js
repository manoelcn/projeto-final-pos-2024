import apiWrapper from "./apiWrapper";

const brandService = {
    listBrands() {
        return apiWrapper.get("brands");
    },

    getBrandById(id) {
        return apiWrapper.get(`brands/${id}`);
    },

    createBrand(brand) {
        return apiWrapper.post("brands", brand);
    },

    updateBrand(id, brand) {
        return apiWrapper.put(`brands/${id}`, brand);
    },

    deleteBrand(id) {
        return apiWrapper.delete(`brands/${id}`);
    },
};

export default brandService;
