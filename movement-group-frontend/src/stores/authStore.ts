import { defineStore } from 'pinia';
import AuthService from "../http/authService";
import { useUserStore } from "./userStore";
import type { Credentials } from '../types/Credentials';
import type { User, RegisterUser } from '../types/User';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false
    }),
    actions: {
        async register(user: RegisterUser): Promise<void> {
            try {
                const data: User = await AuthService.register(user);
                this.user = data;
                this.isAuthenticated = true;
                this.persistAuthState();
            } catch (error) {
                throw new Error(`Error registering user: ${error}`);
            }
        },
        async login(credentials: Credentials): Promise<void> {
            try {
                const data: User = await AuthService.login(credentials);
                this.user = data;
                this.isAuthenticated = true;
                this.persistAuthState();
            } catch (error) {
                throw new Error(`Error logging in: ${error}`);
            }
        },
        async logout(): Promise<void> {
            try {
                await AuthService.logout();
                this.user = null;
                this.isAuthenticated = false;
                this.clearAuthState();
                useUserStore().clear();
            } catch (error) {
                throw new Error(`Error logging out: ${error}`);
            }
        },
        async checkAuth(): Promise<void> {
            try {
                const data = await AuthService.checkAuth();
                console.log('data',data);
                this.user = data;
                this.isAuthenticated = true;
                this.persistAuthState();
            } catch (error) {
                this.clearAuthState();
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
