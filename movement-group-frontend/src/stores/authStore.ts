import { defineStore } from 'pinia';
import AuthService from "../http/authService";
import { useUserStore } from "./userStore";
import type { Credentials } from '../types/Credentials';
import type { User, RegisterUser } from '../types/User';
import type { ServiceResponse } from '../http/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false
    }),
    actions: {
        async register(user: RegisterUser): Promise<ServiceResponse<User>> {
            try {
                const { response, error } = await AuthService.register(user);
                if (response) {
                    this.user = response;
                    this.isAuthenticated = true;
                    this.persistAuthState();
                }
                return { response, error };
            } catch (error) {
                return { response: null, error };
            }
        },

        async login(credentials: Credentials): Promise<ServiceResponse<User>> {
            try {
                const { response, error } = await AuthService.login(credentials);
                if (response) {
                    this.user = response;
                    this.isAuthenticated = true;
                    this.persistAuthState();
                }
                return { response, error };
            } catch (error) {
                return { response: null, error };
            }
        },

        async logout(): Promise<ServiceResponse<void>> {
            try {
                const { response, error } = await AuthService.logout();
                if (!error) {
                    this.user = null;
                    this.isAuthenticated = false;
                    this.clearAuthState();
                    useUserStore().clear();
                }
                return { response, error };
            } catch (error) {
                return { response: null, error };
            }
        },

        async checkAuth(): Promise<ServiceResponse<User>> {
            try {
                const { response, error } = await AuthService.checkAuth();
                if (response) {
                    this.user = response;
                    this.isAuthenticated = true;
                    this.persistAuthState();
                } else {
                    this.clearAuthState();
                }
                return { response, error };
            } catch (error) {
                return { response: null, error };
            }
        },

        persistAuthState(): void {
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('isAuthenticated', String(this.isAuthenticated));
        },

        clearAuthState(): void {
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
        },

        initializeFromStorage(): void {
            const storedUser = localStorage.getItem('user');
            const storedAuth = localStorage.getItem('isAuthenticated');

            if (storedUser && storedAuth === 'true') {
                this.user = JSON.parse(storedUser);
                this.isAuthenticated = true;
            }
        }
    }
});
