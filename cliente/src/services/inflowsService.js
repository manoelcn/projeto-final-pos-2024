import apiWrapper from "./apiWrapper";

const inflowService = {
    listInflows() {
        return apiWrapper.get("inflows");
    },

    getInflowById(id) {
        return apiWrapper.get(`inflows/${id}`);
    },
};

export default inflowService;