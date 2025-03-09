<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../store/userStore";

const store = useUserStore();

// Fetch users when component is mounted
onMounted(() => {
  store.fetchUsers(1);
});
</script>

<template>
  <div>
    <h2>Users List</h2>
    <router-link to="/add-user">
      <button>Add New User</button>
    </router-link>
    <ul>
      <li v-for="user in store.users" :key="user._id">
        <router-link :to="`/user/${user._id}`"
          >{{ user.first_name }} {{ user.last_name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
