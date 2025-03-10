<script setup lang="ts">
import { ref } from "vue";
import { login } from "../../03-services/authService";
import { useRouter } from "vue-router";
import { Credentials } from "../../02-models/Credentials";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

// Function to log in the user
const loginUser = async () => {
  try {
    const credentials: Credentials = {
      email: email.value,
      password: password.value,
    };
    await login(credentials);
    alert("Login successful!");
    router.push("/"); // Redirect to home page
  } catch (error) {
    errorMessage.value = "Login failed. Please check your credentials.";
    console.error("Error logging in:", error);
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
input {
  margin-bottom: 10px;
  padding: 5px;
}
button {
  padding: 5px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
