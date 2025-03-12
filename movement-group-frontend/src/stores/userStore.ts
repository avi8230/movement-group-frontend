import { defineStore } from 'pinia';
import UserService from '../http/userService';
import type { User } from '../types/User';
import type { PaginationState } from '../types/PaginationState';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        userDetails: null as User | null,
        currentUser: null as User | null,
        error: null as Error | null,
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
                const data = await UserService.getUsers(page);
                this.users = data.users;
                this.pagination = {
                    page: data.page,
                    totalPages: data.totalPages,
                    totalUsers: data.totalUsers
                };
            } catch (error) {
                this.users = [];

                if (axios.isAxiosError(error)) {
                    console.error("Axios error detected:", error);

                    if (error.response) {
                        this.error = new Error(error.response.data?.error || "An error occurred while fetching users");
                    } else {
                        this.error = new Error("An unknown Axios error occurred");
                    }
                } else {
                    this.error = new Error("An unexpected error occurred");
                }

                console.log(this.error);
                // throw new Error(`Error fetching users: ${error}`);
            } finally {
                this.loading = false;
            }
        },

        async fetchUserDetails(id: string): Promise<User | null> {
            this.loading = true;
            try {
                const data: User = await UserService.getUserById(id);
                this.userDetails = data;
                this.currentUser = data;
                return data;
            } catch (error) {
                this.userDetails = null;
                this.error = error as Error;
            } finally {
                this.loading = false;
            }
            return null;
        },

        async addUser(user: User): Promise<User | null> {
            this.loading = true;
            try {
                const newUser: User = await UserService.createUser(user);
                this.users.push(newUser);
                this.pagination.totalUsers += 1;
                return newUser;
            } catch (error) {
                this.error = error as Error;
            } finally {
                this.loading = false;
            }
            return null;
        },

        async editUser(user: User): Promise<User | null> {
            this.loading = true;
            try {
                const updateUser: User = await UserService.updateUser(user);
                this.userDetails = updateUser;
                this.users = this.users.map(u => u._id === updateUser._id ? updateUser : u);
                if (this.currentUser?._id === updateUser._id) {
                    this.currentUser = updateUser;
                }
                return updateUser;
            } catch (error) {
                this.error = error as Error;
            } finally {
                this.loading = false;
            }
            return null;
        },

        async removeUser(id: string): Promise<void> {
            this.loading = true;
            try {
                await UserService.deleteUser(id);
                this.users = this.users.filter(u => u._id !== id);
                this.pagination.totalUsers -= 1;
                if (this.currentUser?._id === id) {
                    this.currentUser = null;
                }
            } catch (error) {
                this.error = error as Error;
                throw new Error(`Error deleting user: ${error}`);
            } finally {
                this.loading = false;
            }
        },

        clear(): void {
            this.users = [];
            this.userDetails = null;
            this.currentUser = null;
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
