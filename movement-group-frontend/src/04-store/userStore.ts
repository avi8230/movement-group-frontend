import { defineStore } from 'pinia';
import UserService from '../03-services/userService';
import type { User } from '../02-models/User';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        userDetails: null as User | null
    }),
    actions: {
        async fetchUsers(page: number) {
            try {
                const data = await UserService.getUsers(page);
                this.users = data.users;
            } catch (error) {
                throw `Error fetching users: ${error}`;
            }
        },

        async fetchUserDetails(id: string) {
            try {
                const data = await UserService.getUserById(id);
                this.userDetails = data;
            } catch (error) {
                throw `Error fetching user details: ${error}`;
            }
        },

        async addUser(user: User) {
            try {
                await UserService.createUser(user);
                await this.fetchUsers(1);
            } catch (error) {
                throw `Error adding user: ${error}`;
            }
        },

        async editUser(user: User) {
            try {
                await UserService.updateUser(user);
                await this.fetchUserDetails(user._id);
                await this.fetchUsers(1);
            } catch (error) {
                throw `Error editing user: ${error}`;
            }
        },

        async removeUser(id: string) {
            try {
                await UserService.deleteUser(id);
                await this.fetchUsers(1);
            } catch (error) {
                throw `Error deleting user: ${error}`;
            }
        },

        clear() {
            this.users = [];
            this.userDetails = null;
        }
    }
});
