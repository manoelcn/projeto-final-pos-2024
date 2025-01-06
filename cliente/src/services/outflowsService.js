import apiWrapper from "./apiWrapper";

const outflowService = {
    listOutflows() {
        return apiWrapper.get("outflows");
    },

    createOutlfow(outflow) {
        return apiWrapper.post("outflows", outflow);
    },

    getOutflowById(id) {
        return apiWrapper.get(`outflows/${id}`);
    },
};

export default outflowService;