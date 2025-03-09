<script setup lang="ts">
import { ref } from "vue";
import { register } from "../../api/userApi";
import { useRouter } from "vue-router";

const router = useRouter();

// Form fields
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Function to register a new user
const registerUser = async () => {
  try {
    await register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
    });
    alert("Registration successful!");
    router.push("/"); // Redirect to home page
  } catch (error) {
    errorMessage.value = "Registration failed. Please try again.";
    console.error("Error registering:", error);
  }
};
</script>

<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <label>First Name:</label>
      <input v-model="firstName" type="text" required />

      <label>Last Name:</label>
      <input v-model="lastName" type="text" required />

      <label>Email:</label>
      <input v-model="email" type="email" required />

      <label>Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Register</button>
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
  background: green;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
