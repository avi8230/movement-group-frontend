import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users'; // backend URL

axios.defaults.withCredentials = true; // Allow sending cookies (JWT)

export const getUsers = (page: number) => axios.get(`${API_URL}/getUsers/${page}`);
export const getUserById = (id: string) => axios.get(`${API_URL}/getUser/${id}`);
export const createUser = (data: any) => axios.post(`${API_URL}/createUser`, data);
export const updateUser = (id: string, data: any) => axios.put(`${API_URL}/updateUser/${id}`, data);
export const deleteUser = (id: string) => axios.delete(`${API_URL}/deleteUser/${id}`);

export const register = (data: any) => axios.post(`${API_URL}/register`, data);
export const login = (data: any) => axios.post(`${API_URL}/login`, data);
export const logout = () => axios.post(`${API_URL}/logout`);
