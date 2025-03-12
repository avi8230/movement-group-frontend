/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import UserDetails from '../pages/user-details.vue'
import UpdateUser from '../pages/update-user.vue'
import Home from '../pages/index.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts([
        ...routes,
        { 
            path: '/', 
            component: Home, 
            name: 'home',
            meta: { requiresAuth: false }
        },
        { 
            path: '/page/:page', 
            component: Home, 
            name: 'page',
            meta: { requiresAuth: false }
        },
        { 
            path: '/user/:id', 
            component: UserDetails, 
            name: 'UserDetails',
            meta: { requiresAuth: false }
        },
        { 
            path: '/user/:id/edit', 
            component: UpdateUser, 
            name: 'UpdateUser',
            meta: { requiresAuth: true }
        },
        {
            path: '/add-user',
            component: () => import('../pages/add-user.vue'),
            name: 'AddUser',
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            component: () => import('../pages/login.vue'),
            name: 'Login',
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            component: () => import('../pages/register.vue'),
            name: 'Register',
            meta: { requiresAuth: false }
        }
    ]),
})

// Navigation guard
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    const requiresAuth = to.meta.requiresAuth as boolean

    // Handle protected routes
    if (requiresAuth && !authStore.isAuthenticated) {
        // Store the intended destination
        next({ 
            path: '/login', 
            query: { redirect: to.fullPath }
        })
    } 
    // Prevent authenticated users from accessing login/register
    else if (authStore.isAuthenticated && ['/login', '/register'].includes(to.path)) {
        next({ path: '/' })
    }
    // Allow all other navigations
    else {
        next()
    }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
    if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            console.log('Reloading page to fix dynamic import error')
            localStorage.setItem('vuetify:dynamic-reload', 'true')
            location.assign(to.fullPath)
        } else {
            console.error('Dynamic import error, reloading page did not fix it', err)
        }
    } else {
        console.error(err)
    }
})

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
