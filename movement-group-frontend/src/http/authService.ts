import axios from "./api";
import type { Credentials } from "../types/Credentials";
import type { User, RegisterUser } from "../types/User";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

export async function register(user: RegisterUser): Promise<User> {
    const response = await axios.post<User>(`${API_URL_AUTH}/register`, user);
    return response.data;
}

export async function login(user: Credentials): Promise<User> {
    const response = await axios.post<User>(`${API_URL_AUTH}/login`, user);
    return response.data;
}

export async function logout(): Promise<void> {
    await axios.post(`${API_URL_AUTH}/logout`);
}

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;