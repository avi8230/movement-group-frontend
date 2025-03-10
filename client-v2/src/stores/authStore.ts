import { defineStore } from 'pinia';
import AuthService from "../03-http/authService";
import { useUserStore } from "./userStore";
import type { Credentials } from '../02-types/Credentials';
import type { User } from '../02-types/User';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false
    }),
    actions: {
        async register(user: User): Promise<void> {
            try {
                const data: User = await AuthService.register(user);
                this.user = data;
                this.isAuthenticated = true;
            } catch (error) {
                throw new Error(`Error registering user: ${error}`);
            }
        },
        async login(credentials: Credentials): Promise<void> {
            try {
                const data: User = await AuthService.login(credentials);
                this.user = data;
                this.isAuthenticated = true;
            } catch (error) {
                throw new Error(`Error logging in: ${error}`);
            }
        },
        async logout(): Promise<void> {
            try {
                await AuthService.logout();
                this.user = null;
                this.isAuthenticated = false;
                useUserStore().clear();
            } catch (error) {
                throw new Error(`Error logging out: ${error}`);
            }
        }
    }
});
