const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const apiWrapper = {
    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`GET ${endpoint} failed: ${response.statusText}`);
        }
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`POST ${endpoint} failed: ${response.statusText}`);
        }
        return response.json();
    },

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`PUT ${endpoint} failed: ${response.statusText}`);
        }
        return response.json();
    },

    async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`DELETE ${endpoint} failed: ${response.statusText}`);
        }
        return response.ok;
    },
};

export default apiWrapper;
