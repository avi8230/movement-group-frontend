import axios from "./api";
import type { Credentials } from "../02-models/Credentials";
import type { User } from "../02-models/User";

const API_URL_AUTH = `${import.meta.env.VITE_API_URL}/auth`;
console.log(API_URL_AUTH);
export const register = (data: Omit<User, "_id">) =>
    axios.post<User>(`${API_URL_AUTH}/register`, data);

export const login = (data: Credentials) =>
    axios.post<{ token: string; user: User }>(`${API_URL_AUTH}/login`, data);

export const logout = async (): Promise<void> => {
    await axios.post(`${API_URL_AUTH}/logout`, {});
};
