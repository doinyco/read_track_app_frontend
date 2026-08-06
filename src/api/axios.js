import axios from "axios";

const api = axios.create({
    baseURL: "https://16.146.146.33:8000",
    withCredentials: true

});

export default api;