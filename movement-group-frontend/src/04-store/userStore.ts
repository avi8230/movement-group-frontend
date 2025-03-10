import { defineStore } from 'pinia';
import UserService from '../03-services/userService';
import type { User } from '../02-models/User';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        userDetails: null as User | null
    }),
    actions: {
        async fetchUsers(page: number): Promise<any> {
            try {
                const data: any = await UserService.getUsers(page);
                this.users = data.users;
                return data;
            } catch (error) {
                throw new Error(`Error fetching users: ${error}`);
            }
        },

        async fetchUserDetails(id: string): Promise<User> {
            try {
                const data: User = await UserService.getUserById(id);
                this.userDetails = data;
                return data;
            } catch (error) {
                throw new Error(`Error fetching user details: ${error}`);
            }
        },

        async addUser(user: User): Promise<User> {
            try {
                const newUser: User = await UserService.createUser(user);
                this.users.push(newUser);
                return newUser;
            } catch (error) {
                throw new Error(`Error adding user: ${error}`);
            }
        },

        async editUser(user: User): Promise<User> {
            try {
                const updateUser: User = await UserService.updateUser(user);
                this.userDetails = updateUser;
                this.users = this.users.map(u => u._id === updateUser._id ? updateUser : u);
                return updateUser;
            } catch (error) {
                throw new Error(`Error editing user: ${error}`);
            }
        },

        async removeUser(id: string): Promise<void> {
            try {
                await UserService.deleteUser(id);
                this.users = this.users.filter(u => u._id !== id);
            } catch (error) {
                throw new Error(`Error deleting user: ${error}`);
            }
        },

        clear(): void {
            this.users = [];
            this.userDetails = null;
        }
    }
});
