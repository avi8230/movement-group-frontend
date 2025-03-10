<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../04-store/userStore";
import { User } from "../../02-models/User";

const store = useUserStore();

// Define reactive form fields
const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");

// Function to add user
const addUser = async () => {
  if (!firstName.value || !lastName.value || !email.value) {
    alert("All fields are required!");
    return;
  }

  const newUser: User = {
    _id: "",
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    avatar: "",
  };

  await store.addUser(newUser);

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
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" type="text" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

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
