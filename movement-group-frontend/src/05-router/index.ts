import { createRouter, createWebHistory } from 'vue-router';
// user components
import UserList from '../07-pages/users/UserList.vue';
import UserDetails from '../07-pages/users/UserDetails.vue';
import AddUser from '../07-pages/users/AddUser.vue';
import EditUser from '../07-pages/users/EditUser.vue';
// auth components
import Register from '../07-pages/auth/Register.vue';
import Login from '../07-pages/auth/Login.vue';

const routes = [
    // user routes
    { path: '/', component: UserList },
    { path: '/user/:id', component: UserDetails },
    { path: '/add-user', component: AddUser },
    { path: '/edit-user/:id', component: EditUser },
    // auth routes
    { path: '/register', component: Register },
    { path: '/login', component: Login },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
