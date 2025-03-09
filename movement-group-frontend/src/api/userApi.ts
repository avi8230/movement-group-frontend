import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users'; // backend URL

axios.defaults.withCredentials = true; // Allow sending cookies (JWT)

// API functions
export const getUsers = (page: number) => axios.get(`${API_URL}/getUsers/${page}`, { withCredentials: true });
export const getUserById = (id: string) => axios.get(`${API_URL}/getUser/${id}`, { withCredentials: true });
export const createUser = (data: any) => axios.post(`${API_URL}/createUser`, data, { withCredentials: true });
export const updateUser = (id: string, data: any) => axios.put(`${API_URL}/updateUser/${id}`, data, { withCredentials: true });
export const deleteUser = (id: string) => axios.delete(`${API_URL}/deleteUser/${id}`, { withCredentials: true });

export const register = (data: any) => axios.post(`${API_URL}/register`, data, { withCredentials: true });
export const login = (data: any) => axios.post(`${API_URL}/login`, data, { withCredentials: true });
export const logout = () => axios.post(`${API_URL}/logout`, { withCredentials: true });