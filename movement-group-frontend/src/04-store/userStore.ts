import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../03-services/userService';
import type { User } from '../02-models/User';

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([]);
    const userDetails = ref<User | null>(null);

    // Fetch all users
    const fetchUsers = async (page: number) => {
        try {
            const { data } = await getUsers(page);
            users.value = data.users;
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    // Fetch user details by ID
    const fetchUserDetails = async (id: string) => {
        try {
            const { data } = await getUserById(id);
            userDetails.value = data;
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    // Create a new user
    const addUser = async (user: User) => {
        try {
            user = { ...user, _id: '' };
            await createUser(user);
            await fetchUsers(1);
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    // Update user details
    const editUser = async (user: User) => {
        try {
            const { _id, ...userData } = user;
            await updateUser(_id, userData);
            await fetchUserDetails(_id);
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    // Delete a user
    const removeUser = async (id: string) => {
        try {
            await deleteUser(id);
            await fetchUsers(1);
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return { users, userDetails, fetchUsers, fetchUserDetails, addUser, editUser, removeUser };
});
