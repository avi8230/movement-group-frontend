import axios from "./api";
import type { User } from "../02-models/User";

const API_URL_USER = `${import.meta.env.VITE_API_URL}/user`;

export const getUsers = (page: number) =>
    axios.get<any>(`${API_URL_USER}/getUsers/${page}`);

export const getUserById = (id: string) =>
    axios.get<User>(`${API_URL_USER}/getUser/${id}`);

export const createUser = (data: Omit<User, "_id">) =>
    axios.post<User>(`${API_URL_USER}/createUser`, data);

export const updateUser = (id: string, data: Partial<Omit<User, "_id">>) =>
    axios.put<User>(`${API_URL_USER}/updateUser/${id}`, data);

export const deleteUser = (id: string) =>
    axios.delete<{ message: string }>(`${API_URL_USER}/deleteUser/${id}`);
