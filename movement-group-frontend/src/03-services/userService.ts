import axios from "./api";
import type { User } from "../02-models/User";

const API_URL_USER = `${import.meta.env.VITE_API_URL}/user`;

const UserService = {
    getUsers: async (page: number): Promise<
        { page: number, totalPages: number, totalUsers: number, users: User[] }
    > => {
        const response = await axios.get(`${API_URL_USER}/getUsers/${page}`);
        return response.data;
    },

    getUserById: async (_id: string): Promise<User> => {
        const response = await axios.get(`${API_URL_USER}/getUser/${_id}`);
        return response.data;
    },

    createUser: async (data: User): Promise<User> => {
        const response = await axios.post(`${API_URL_USER}/createUser`, data);
        return response.data;
    },

    updateUser: async (data: User): Promise<User> => {
        const response = await axios.put(`${API_URL_USER}/updateUser/${data._id}`, data);
        return response.data;
    },

    deleteUser: async (_id: string): Promise<{ message: string }> => {
        const response = await axios.delete(`${API_URL_USER}/deleteUser/${_id}`);
        return response.data;
    }
};

export default UserService;
