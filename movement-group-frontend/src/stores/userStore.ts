import { defineStore } from 'pinia';
import UserService from '../http/userService';
import type { User } from '../types/User';
import type { PaginationState } from '../types/PaginationState';
import type { ErrorResponse } from '../utils/errorHandler';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        userDetails: null as User | null,
        currentUser: null as User | null,
        error: null as ErrorResponse | null,
        loading: false as boolean,
        pagination: {
            page: 1,
            totalPages: 1,
            totalUsers: 0
        } as PaginationState
    }),
    actions: {
        async fetchUsers(page: number = 1): Promise<void> {
            this.loading = true;
            try {
                const { response, error } = await UserService.getUsers(page);
                if (response) {
                    this.users = response.users;
                    this.pagination = {
                        page: response.page,
                        totalPages: response.totalPages,
                        totalUsers: response.totalUsers
                    };
                } else {
                    this.users = [];
                    this.error = error;
                }
            } finally {
                this.loading = false;
            }
        },

        async fetchUserDetails(id: string): Promise<User | null> {
            this.loading = true;
            try {
                const { response, error } = await UserService.getUserById(id);
                if (response) {
                    this.userDetails = response;
                    this.currentUser = response;
                    return response;
                } else {
                    this.userDetails = null;
                    this.error = error;
                }
            } finally {
                this.loading = false;
            }
            return null;
        },

        async addUser(user: User): Promise<User | null> {
            this.loading = true;
            try {
                const { response, error } = await UserService.createUser(user);
                if (response) {
                    this.users.push(response);
                    this.pagination.totalUsers += 1;
                    return response;
                } else {
                    this.error = error;
                }
            } finally {
                this.loading = false;
            }
            return null;
        },

        async editUser(user: User): Promise<User | null> {
            this.loading = true;
            try {
                const { response, error } = await UserService.updateUser(user);
                if (response) {
                    this.userDetails = response;
                    this.users = this.users.map(u => u._id === response._id ? response : u);
                    if (this.currentUser?._id === response._id) {
                        this.currentUser = response;
                    }
                    return response;
                } else {
                    this.error = error;
                }
            } finally {
                this.loading = false;
            }
            return null;
        },

        async removeUser(id: string): Promise<boolean> {
            this.loading = true;
            try {
                const { error } = await UserService.deleteUser(id);
                if (!error) {
                    this.users = this.users.filter(u => u._id !== id);
                    this.pagination.totalUsers -= 1;
                    if (this.currentUser?._id === id) {
                        this.currentUser = null;
                    }
                    return true;
                } else {
                    this.error = error;
                    return false;
                }
            } finally {
                this.loading = false;
            }
        },

        clear(): void {
            this.users = [];
            this.userDetails = null;
            this.currentUser = null;
            this.error = null;
            this.pagination = {
                page: 1,
                totalPages: 1,
                totalUsers: 0
            };
        },
        clearCurrentUser(): void {
            this.currentUser = null;
        },
        clearError(): void {
            this.error = null;
        },
        clearLoading(): void {
            this.loading = false;
        }
    }
});
