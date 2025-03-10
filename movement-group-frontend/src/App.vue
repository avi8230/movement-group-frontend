<script setup lang="ts">
import { useAuthStore } from "./04-store/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

// Function to log out the user
const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <v-app>
    <v-container>
      <v-toolbar color="primary" dark>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/register" text>Register</v-btn>
        <v-btn to="/login" text>Login</v-btn>
        <v-btn to="/users" text>User Management</v-btn>
        <v-btn v-if="authStore.isAuthenticated" @click="logoutUser" color="red">Logout</v-btn>
      </v-toolbar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>
