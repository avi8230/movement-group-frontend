import axios from "./api";
import type { Credentials } from "../types/Credentials";
import type { User, RegisterUser } from "../types/User";
import { extractErrorMessage, type ErrorResponse } from "../utils/errorHandler";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;

type ServiceResponse<T> = {
    response: T | null;
    error: ErrorResponse | null;
};

export async function register(user: RegisterUser): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.post<User>(`${API_URL_AUTH}/register`, user);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function login(user: Credentials): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.post<User>(`${API_URL_AUTH}/login`, user);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function logout(): Promise<ServiceResponse<void>> {
    try {
        await axios.post(`${API_URL_AUTH}/logout`);
        return { response: undefined, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function checkAuth(): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.get<User>(`${API_URL_AUTH}/check`);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

const AuthService = {
    register,
    login,
    logout,
    checkAuth
};

export default AuthService;