import apiWrapper from "./apiWrapper";

const outflowService = {
    listOutflows() {
        return apiWrapper.get("outflows");
    },

    getOutflowById(id) {
        return apiWrapper.get(`outflows/${id}`);
    },
};

export default outflowService;