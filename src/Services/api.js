import axios from "axios";

// create config
const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials  : true
});

export default api;