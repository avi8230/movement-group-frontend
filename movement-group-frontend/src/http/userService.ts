import axios from "./api";
import type { User } from "../types/User";

const API_URL_USER = `${import.meta.env.VITE_API_URL}/user`;

export async function getUsers(page: number): Promise<
    { page: number, totalPages: number, totalUsers: number, users: User[] }
> {
    const response = await axios.get(`${API_URL_USER}/getUsers/${page}`);
    return response.data;
}

async function getUserById(_id: string): Promise<User> {
    const response = await axios.get(`${API_URL_USER}/getUser/${_id}`);
    return response.data;
}

async function createUser(user: User): Promise<User> {
    const response = await axios.post(`${API_URL_USER}/createUser`, user);
    return response.data;
}

async function updateUser(user: User): Promise<User> {
    const response = await axios.put(`${API_URL_USER}/updateUser/${user._id}`, user);
    return response.data;
}

async function deleteUser(_id: string): Promise<void> {
    const response = await axios.delete(`${API_URL_USER}/deleteUser/${_id}`);
    return response.data;
}

const UserService = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default UserService;