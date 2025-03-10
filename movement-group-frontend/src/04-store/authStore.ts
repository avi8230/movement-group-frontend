import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthService from "../03-services/authService";
import type { Credentials } from '../02-models/Credentials';
import type { User } from '../02-models/User';

export const useAuthStore = defineStore('auth', () => {
    const user = ref < User | null > (null);
    const isAuthenticated = ref < boolean > (false);

    // Register
    const registerUser = async (userData: User) => {
        try {
            const { data } = await AuthService.register(userData);
            user.value = data;
            isAuthenticated.value = true;
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    // Login
    const loginUser = async (credentials: Credentials) => {
        try {
            const { data } = await AuthService.login(credentials);
            user.value = data.user;
            isAuthenticated.value = true;
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    // Logout
    const logoutUser = async () => {
        try {
            await AuthService.logout();
            user.value = null;
            isAuthenticated.value = false;
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return { user, isAuthenticated, registerUser, loginUser, logoutUser };
});
