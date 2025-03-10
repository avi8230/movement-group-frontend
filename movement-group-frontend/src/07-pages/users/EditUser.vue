<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../04-store/userStore";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const userId = route.params.id as string;

// Setting the form values
const firstName = ref("");
const lastName = ref("");
const email = ref("");

// Loads user data while the page is loading
onMounted(async () => {
  await store.fetchUserDetails(userId);
  if (store.userDetails) {
    firstName.value = store.userDetails.first_name;
    lastName.value = store.userDetails.last_name;
    email.value = store.userDetails.email;
  }
});

// User update function
const updateUser = async () => {
  await store.editUser(userId, {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
  });
  alert("User updated successfully!");
  router.push("/");
};
</script>

<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <label>First Name:</label>
      <input v-model="firstName" type="text" required />

      <label>Last Name:</label>
      <input v-model="lastName" type="text" required />

      <label>Email:</label>
      <input v-model="email" type="email" required />

      <button type="submit">Update User</button>
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
  background: green;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
