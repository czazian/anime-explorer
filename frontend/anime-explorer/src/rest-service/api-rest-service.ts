import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:8080",
    timeout: 10000,
});

export const ApiRestService = {
    
    // async getAnimeList() {
    //     const response = await api.get("/anime");
    //     return response.data;
    // },

};
