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
                const newUser = await UserService.createUser(user);
                this.users.push(newUser);
            } catch (error) {
                throw `Error adding user: ${error}`;
            }
        },

        async editUser(user: User) {
            try {
                const updateUser = await UserService.updateUser(user);
                this.userDetails = updateUser;
                this.users = this.users.map(u => u._id === updateUser._id ? updateUser : u);
            } catch (error) {
                throw `Error editing user: ${error}`;
            }
        },

        async removeUser(id: string) {
            try {
                await UserService.deleteUser(id);
                this.users = this.users.filter(u => u._id !== id);
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
