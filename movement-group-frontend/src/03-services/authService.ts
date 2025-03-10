import axios from "./api";
import type { Credentials } from "../02-models/Credentials";
import type { User } from "../02-models/User";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

const AuthService = {
    register: async (data: User): Promise<User> => {
        const response = await axios.post<User>(`${API_URL_AUTH}/register`, data);
        return response.data;
    },

    login: async (data: Credentials): Promise<User> => {
        const response = await axios.post<User>(`${API_URL_AUTH}/login`, data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axios.post(`${API_URL_AUTH}/logout`);
    }
};

export default AuthService;
