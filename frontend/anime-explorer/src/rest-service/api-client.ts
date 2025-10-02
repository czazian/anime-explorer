import axios, { type AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;