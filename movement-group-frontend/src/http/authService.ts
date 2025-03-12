import axios from "./api";
import type { Credentials } from "../types/Credentials";
import type { User, RegisterUser } from "../types/User";
import { extractErrorMessage } from "../utils/errorHandler";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

export async function register(user: RegisterUser): Promise<User> {
    try {
        const response = await axios.post<User>(`${API_URL_AUTH}/register`, user);
        return response.data;
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        throw new Error(errorResponse.message);
    }
}

export async function login(user: Credentials): Promise<User> {
    try {
        const response = await axios.post<User>(`${API_URL_AUTH}/login`, user);
        return response.data;
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        throw new Error(errorResponse.message);
    }
}

export async function logout(): Promise<void> {
    try {
        await axios.post(`${API_URL_AUTH}/logout`);
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        throw new Error(errorResponse.message);
    }
}

export async function checkAuth(): Promise<User> {
    try {
        const response = await axios.get<User>(`${API_URL_AUTH}/check`);
        return response.data;
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        throw new Error(errorResponse.message);
    }
}

const AuthService = {
    register,
    login,
    logout,
    checkAuth
};

export default AuthService;