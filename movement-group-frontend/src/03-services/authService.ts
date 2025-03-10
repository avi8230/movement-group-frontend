import axios from "./api";
import type { Credentials } from "../02-models/Credentials";
import type { User } from "../02-models/User";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

const AuthService = {
    register: (data: Omit<User, "_id">) => axios.post<User>(`${API_URL_AUTH}/register`, data),

    login: (data: Credentials) => axios.post<{ token: string; user: User }>(`${API_URL_AUTH}/login`, data),

    logout: async (): Promise<void> => {
        await axios.post(`${API_URL_AUTH}/logout`, {});
    }
};

export default AuthService;
