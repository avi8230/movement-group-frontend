<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";

const store = useUserStore();

// Define reactive form fields
const firstName = ref("");
const lastName = ref("");
const email = ref("");

// Function to add user
const addUser = async () => {
  if (!firstName.value || !lastName.value || !email.value) {
    alert("All fields are required!");
    return;
  }

  await store.addUser({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
  });

  // Clear the form
  firstName.value = "";
  lastName.value = "";
  email.value = "";

  alert("User added successfully!");
};
</script>

<template>
  <div>
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <label>First Name:</label>
      <input v-model="firstName" type="text" required />

      <label>Last Name:</label>
      <input v-model="lastName" type="text" required />

      <label>Email:</label>
      <input v-model="email" type="email" required />

      <button type="submit">Add User</button>
    </form>
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
