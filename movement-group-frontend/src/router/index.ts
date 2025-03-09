import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import UserDetails from '../views/UserDetails.vue';

const routes = [
    { path: '/', component: UserList }, // Home page - user list
    { path: '/user/:id', component: UserDetails } // User details page
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
