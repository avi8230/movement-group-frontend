<script setup lang="ts">
import { ref } from "vue";
import { register } from "../../03-services/userService";
import { useRouter } from "vue-router";
import { User } from "../../02-models/User";

const router = useRouter();

// Form fields
const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

// Function to register a new user
const registerUser = async () => {
  try {
    const newUser: User & { password: string } = {
      _id: "",
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      avatar: "",
      password: password.value, // Add the password that does not exist in the User interface
    };

    await register(newUser);
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
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" type="text" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />

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
