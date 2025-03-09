import { createRouter, createWebHistory } from 'vue-router';
// user components
import UserList from '../views/users/UserList.vue';
import UserDetails from '../views/users/UserDetails.vue';
import AddUser from '../views/users/AddUser.vue';
import EditUser from '../views/users/EditUser.vue';
// auth components
import Register from '../views/auth/Register.vue';
import Login from '../views/auth/Login.vue';

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
