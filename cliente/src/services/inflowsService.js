import apiWrapper from "./apiWrapper";

const inflowService = {
    listInflows() {
        return apiWrapper.get("inflows");
    },

    createInflow(inflow) {
        return apiWrapper.post("brands", inflow);
    },

    getInflowById(id) {
        return apiWrapper.get(`inflows/${id}`);
    },
};

export default inflowService;