import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/users/UserList.vue';
import UserDetails from '../views/users/UserDetails.vue';
import AddUser from '../views/users/AddUser.vue';
import EditUser from '../views/users/EditUser.vue';

const routes = [
    { path: '/', component: UserList },
    { path: '/user/:id', component: UserDetails },
    { path: '/add-user', component: AddUser },
    { path: '/edit-user/:id', component: EditUser }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
