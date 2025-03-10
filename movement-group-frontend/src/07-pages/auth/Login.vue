<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../../03-services/userService';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Function to log in the user
const loginUser = async () => {
  try {
    await login({ email: email.value, password: password.value });
    alert('Login successful!');
    router.push('/'); // Redirect to home page
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials.';
    console.error('Error logging in:', error);
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label>Email:</label>
      <input v-model="email" type="email" required />

      <label>Password:</label>
      <input v-model="password" type="password" required />

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
