import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

// Create Pinia (State Management)
const pinia = createPinia();

// Create Vue Router
const router = createRouter({
    history: createWebHistory(),
    routes: [] // Add routes here
});

// Create Vue App
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
