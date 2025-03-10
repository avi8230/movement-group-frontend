import axios from 'axios';

const API_URL_USER = 'http://localhost:3001/api/users'; // backend URL
const API_URL_AUTH = 'http://localhost:3001/api/auth'; // backend URL

axios.defaults.withCredentials = true; // Allow sending cookies (JWT)

// API functions
export const getUsers = (page: number) => axios.get(`${API_URL_USER}/getUsers/${page}`, { withCredentials: true });
export const getUserById = (id: string) => axios.get(`${API_URL_USER}/getUser/${id}`, { withCredentials: true });
export const createUser = (data: any) => axios.post(`${API_URL_USER}/createUser`, data, { withCredentials: true });
export const updateUser = (id: string, data: any) => axios.put(`${API_URL_USER}/updateUser/${id}`, data, { withCredentials: true });
export const deleteUser = (id: string) => axios.delete(`${API_URL_USER}/deleteUser/${id}`, { withCredentials: true });

export const register = (data: any) => axios.post(`${API_URL_AUTH}/register`, data, { withCredentials: true });
export const login = (data: any) => axios.post(`${API_URL_AUTH}/login`, data, { withCredentials: true });
export const logout = async () => { await axios.post(`${API_URL_AUTH}/logout`, {}, { withCredentials: true }); };
