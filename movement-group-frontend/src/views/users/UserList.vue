<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../../store/userStore";

const store = useUserStore();

// Fetch users when component is mounted
onMounted(() => {
  store.fetchUsers(1);
});

// Function to delete user
const deleteUser = async (userId: string) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await store.removeUser(userId);
    alert("User deleted successfully!");
  }
};
</script>

<template>
  <div>
    <h2>Users List</h2>
    <router-link to="/add-user">
      <button>Add New User</button>
    </router-link>
    <ul>
      <li v-for="user in store.users" :key="user._id">
        <router-link :to="`/user/${user._id}`">
          {{ user.first_name }} {{ user.last_name }}
        </router-link>
        <router-link :to="`/edit-user/${user._id}`">
          <button>Edit</button>
        </router-link>
        <button
          @click="deleteUser(user._id)"
          style="background: red; color: white"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>
