import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../api/userApi';

export const useUserStore = defineStore('user', () => {
    const users = ref([]);
    const userDetails = ref(null);

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
    const addUser = async (userData: any) => {
        try {
            await createUser(userData);
            await fetchUsers(1); // Refresh user list
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    // Update user details
    const editUser = async (id: string, userData: any) => {
        try {
            await updateUser(id, userData);
            await fetchUserDetails(id);
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
