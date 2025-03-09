import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import UserDetails from '../views/UserDetails.vue';
import AddUser from '../views/AddUser.vue';
import EditUser from '../views/EditUser.vue';

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
