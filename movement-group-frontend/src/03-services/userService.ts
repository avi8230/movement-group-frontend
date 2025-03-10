import axios from 'axios';
import type { Credentials } from "../02-models/Credentials";
import type { User } from "../02-models/User";

const API_URL_USER = 'http://localhost:3001/api/users'; // backend URL
const API_URL_AUTH = 'http://localhost:3001/api/auth'; // backend URL

axios.defaults.withCredentials = true; // Allow sending cookies (JWT)

// API functions
export const getUsers = (page: number) =>
    axios.get<any>(`${API_URL_USER}/getUsers/${page}`, { withCredentials: true });

export const getUserById = (id: string) =>
    axios.get<User>(`${API_URL_USER}/getUser/${id}`, { withCredentials: true });

export const createUser = (data: Omit<User, '_id'>) =>
    axios.post<User>(`${API_URL_USER}/createUser`, data, { withCredentials: true });

export const updateUser = (id: string, data: Partial<Omit<User, '_id'>>) =>
    axios.put<User>(`${API_URL_USER}/updateUser/${id}`, data, { withCredentials: true });

export const deleteUser = (id: string) =>
    axios.delete<{ message: string }>(`${API_URL_USER}/deleteUser/${id}`, { withCredentials: true });

export const register = (data: Omit<User, '_id'>) =>
    axios.post<User>(`${API_URL_AUTH}/register`, data, { withCredentials: true });

export const login = (data: Credentials) =>
    axios.post<{ token: string; user: User }>(`${API_URL_AUTH}/login`, data, { withCredentials: true });

export const logout = async (): Promise<void> => {
    await axios.post(`${API_URL_AUTH}/logout`, {}, { withCredentials: true });
};
