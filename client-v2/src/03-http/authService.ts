import axios from "./api";
import type { Credentials } from "../02-types/Credentials";
import type { User } from "../02-types/User";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

const AuthService = {
    register: async (user: User): Promise<User> => {
        const response = await axios.post<User>(`${API_URL_AUTH}/register`, user);
        return response.data;
    },

    login: async (user: Credentials): Promise<User> => {
        const response = await axios.post<User>(`${API_URL_AUTH}/login`, user);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axios.post(`${API_URL_AUTH}/logout`);
    }
};

export default AuthService;
