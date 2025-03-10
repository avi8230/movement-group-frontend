import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./05-router/index"; // Ensure correct import
import vuetify from "./09-plugins/vuetify";
import App from "./App.vue";
import "./style.css";

// Create Vue App
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
