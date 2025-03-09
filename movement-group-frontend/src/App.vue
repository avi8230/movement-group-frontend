<script setup lang="ts">
import { logout } from "./api/userApi";
import { useRouter } from "vue-router";

const router = useRouter();

// Function to log out the user
const logoutUser = async () => {
  await logout();
  alert("Logged out successfully!");
  router.push("/login");
};
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="logoutUser">Logout</button>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
button {
  background: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
</style>
