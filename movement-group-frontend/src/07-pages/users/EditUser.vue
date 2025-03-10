<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../04-store/userStore";
import { User } from "../../02-models/User";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const userId = route.params.id as string;

// Setting the form values
const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");

// Loads user data while the page is loading
onMounted(async () => {
  await store.fetchUserDetails(userId);
  if (store.userDetails) {
    const user: User = store.userDetails;
    firstName.value = user.first_name;
    lastName.value = user.last_name;
    email.value = user.email;
  }
});

// User update function
const updateUser = async () => {
  const updatedUser: User = {
    _id: userId,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    avatar: "",
  };

  await store.editUser(updatedUser);
  alert("User updated successfully!");
  router.push("/");
};
</script>

<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" type="text" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

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
