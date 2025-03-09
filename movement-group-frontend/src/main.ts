import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/index';
import App from './App.vue';
import './style.css';

// Create Vue App
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
