<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../04-store/userStore";
import { User } from "../../02-models/User";

const store = useUserStore();
const route = useRoute();
const router = useRouter();
const userId = route.params.id as string;

// Fetch user details when component is mounted
onMounted(() => {
  store.fetchUserDetails(userId);
});

// Computed property to ensure TypeScript recognizes the userDetails type
const userDetails = computed<User | null>(() => store.userDetails);

// Function to delete user and navigate back after deletion
const deleteUser = async () => {
  await store.removeUser(userId);
  alert("User deleted successfully!");
  router.push("/"); // Redirect to users list or homepage
};
</script>

<template>
  <div v-if="userDetails">
    <h2>{{ userDetails.first_name }} {{ userDetails.last_name }}</h2>
    <p>Email: {{ userDetails.email }}</p>
    <button @click="deleteUser">Delete User</button>
  </div>
</template>
