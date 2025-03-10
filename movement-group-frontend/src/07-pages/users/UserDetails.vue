<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../04-store/userStore";

const store = useUserStore();
const route = useRoute();
const userId = route.params.id as string;

// Fetch user details when component is mounted
onMounted(() => {
  store.fetchUserDetails(userId);
});
</script>

<template>
  <div v-if="store.userDetails">
    <h2>
      {{ store.userDetails.first_name }} {{ store.userDetails.last_name }}
    </h2>
    <p>Email: {{ store.userDetails.email }}</p>
    <button @click="store.removeUser(userId)">Delete User</button>
  </div>
</template>
 