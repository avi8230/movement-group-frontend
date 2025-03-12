import axios from "./api";
import type { User } from "../types/User";
import { extractErrorMessage, type ErrorResponse } from "../utils/errorHandler";

const API_URL_USER = `${import.meta.env.VITE_API_URL}/user`;

type UserPaginationResponse = {
    page: number;
    totalPages: number;
    totalUsers: number;
    users: User[];
};

type ServiceResponse<T> = {
    response: T | null;
    error: ErrorResponse | null;
};

export async function getUsers(page: number): Promise<ServiceResponse<UserPaginationResponse>> {
    try {
        const response = await axios.get(`${API_URL_USER}/getUsers/${page}`);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function getUserById(_id: string): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.get(`${API_URL_USER}/getUser/${_id}`);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function createUser(user: User): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.post(`${API_URL_USER}/createUser`, user);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function updateUser(user: User): Promise<ServiceResponse<User>> {
    try {
        const response = await axios.put(`${API_URL_USER}/updateUser/${user._id}`, user);
        return { response: response.data, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

export async function deleteUser(_id: string): Promise<ServiceResponse<void>> {
    try {
        await axios.delete(`${API_URL_USER}/deleteUser/${_id}`);
        return { response: undefined, error: null };
    } catch (error) {
        const errorResponse = extractErrorMessage(error);
        return { response: null, error: errorResponse };
    }
}

const UserService = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default UserService;