import axios from "axios";

const api = axios.create({
    baseURL: "https://frigidity-retreat-gosling.ngrok-free.dev",
    withCredentials: true

});

export default api;