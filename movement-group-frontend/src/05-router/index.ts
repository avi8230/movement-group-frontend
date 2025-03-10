import { createRouter, createWebHistory } from "vue-router";
import UserManagement from "../07-pages/UserManagement.vue";
import Login from "../07-pages/Login.vue";
import Register from "../07-pages/Register.vue";

const routes = [
    { path: "/", redirect: "/users" }, // Redirect home to /users
    { path: "/users", component: UserManagement },
    { path: "/login", component: Login }, // Fix missing route
    { path: "/register", component: Register } // Fix missing route
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
