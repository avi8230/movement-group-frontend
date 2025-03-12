<template>
  <v-app-bar color="primary" elevation="1">
    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">
        User CRM
      </router-link>
    </v-app-bar-title>
    
    <v-spacer></v-spacer>

    <template v-if="authStore.isAuthenticated">
      <v-btn to="/" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      
      <v-btn to="/add-user" icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>

      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn to="/login" prepend-icon="mdi-login" class="text-none">
        Login
      </v-btn>
      
      <v-btn to="/register" prepend-icon="mdi-account-plus" class="text-none ml-2">
        Register
      </v-btn>
    </template>

    <v-btn icon @click="toggleTheme" class="ml-2">
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const theme = useTheme()
const isDark = ref(false)
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  isDark.value = theme.global.current.value.dark
})

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  isDark.value = !isDark.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.v-app-bar {
  color: white;
}
</style> 