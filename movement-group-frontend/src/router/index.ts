import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import UserDetails from '../views/UserDetails.vue';
import AddUser from '../views/AddUser.vue';

const routes = [
    { path: '/', component: UserList },
    { path: '/user/:id', component: UserDetails },
    { path: '/add-user', component: AddUser },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
