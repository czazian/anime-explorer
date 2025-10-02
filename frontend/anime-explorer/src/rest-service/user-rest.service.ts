import type { AxiosResponse } from "axios";
import type { UserCreationRequestModel } from "../model/ApiModel/Request/UserCreationRequestModel";
import API from "./api-client";
import {ApiConstant} from "./api-constant.ts";

const ENDPOINT = ApiConstant;

export const UserRestService = {
    checkUserLogin: async (userData: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await API.post(
                `${ENDPOINT.USER_MODULE.USER}${ENDPOINT.USER_MODULE.USER_LOGIN}`,
                userData
            );
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
            const response: AxiosResponse<any> = await API.post(
                `${ENDPOINT.USER_MODULE.USER}${ENDPOINT.USER_MODULE.USER_REGISTER}`,
                userData,
                { headers: { "Content-Type": "application/json" } }
            );
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    updateProfile: async (userId: string, userData: FormData): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await API.put(
                `${ENDPOINT.USER_MODULE.USER}${ENDPOINT.USER_MODULE.UPDATE_PROFILE}/${userId}`,
                userData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user ${userId}:`, error);
            throw error;
        }
    },
};