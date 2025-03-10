import { defineStore } from 'pinia';
import AuthService from "../03-services/authService";
import { useUserStore } from "./userStore";
import type { Credentials } from '../02-models/Credentials';
import type { User } from '../02-models/User';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false
    }),
    actions: {
        async register(userData: User) {
            try {
                const data = await AuthService.register(userData);
                this.user = data;
                this.isAuthenticated = true;
            } catch (error) {
                throw `Error registering user: ${error}`;
            }
        },
        async login(credentials: Credentials) {
            try {
                const data = await AuthService.login(credentials);
                this.user = data;
                this.isAuthenticated = true;
            } catch (error) {
                throw `Error logging in: ${error}`;
            }
        },
        async logout() {
            try {
                await AuthService.logout();
                this.user = null;
                this.isAuthenticated = false;
                useUserStore().clear();
            } catch (error) {
                throw `Error logging out: ${error}`;
            }
        }
    }
});
