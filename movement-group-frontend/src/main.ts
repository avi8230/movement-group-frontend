/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { useSnackbarStore } from "@/stores/snackbarStore";

// Components
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

// Register other plugins
registerPlugins(app)

// Initialize the application
const initApp = async () => {
    const authStore = useAuthStore()
    
    // Initialize from storage first
    authStore.initializeFromStorage()
    
    try {
        // Then verify with server
        const response = await authStore.checkAuth()
        if (response.error) {
            const snackbarStore = useSnackbarStore();
            // snackbarStore.showSnackbar({
            //   message: response?.error || "Failed to verify authentication",
            //   color: "error",
            //   show: true,
            // });
        }                  
    } catch (error) {
        console.error('Failed to verify authentication:', error)
    }
    
    // Mount the app after authentication check
    app.mount('#app')
}

// Start the application
initApp()