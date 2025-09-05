import axios, {type AxiosInstance, type AxiosResponse} from "axios";
import type {UserCreationRequestModel} from "../constants/ApiModel/Request/UserCreationRequestModel.ts";

const API: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Endpoint URLs
const ENDPOINTS = {
    // User Module
    USER: "/users",
    USER_REGISTER: "/register",
    USER_LOGIN: "/login",

    // Anime Module
    Anime: "/anime"


};

export const ApiRestService = {

    // User Module
    checkUserLogin: async(userData: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await API.post(`${ENDPOINTS.USER + ENDPOINTS.USER_LOGIN}`, userData);
            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            console.error(`Error fetching user ${userData}:`, error);
            throw error;
        }
    },

    createUser: async (userData: UserCreationRequestModel): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await API.post(`${ENDPOINTS.USER + ENDPOINTS.USER_REGISTER}`, userData);
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    updateUser: async (id: string, userData: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await API.put(`${ENDPOINTS.USER}/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            throw error;
        }
    },

};

export default ApiRestService;
