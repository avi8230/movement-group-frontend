<script setup lang="ts">
import { useUserStore } from "../stores/userStore";
import { useSnackbarStore } from "../stores/snackbar";
import UserForm from "../components/UserForm.vue";
import type { User } from "../types/User";
import { useRouter } from "vue-router";

const store = useUserStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();

const handleSubmit = async (values: User) => {
  try {
    await store.addUser(values);
    snackbarStore.showSnackbar({
      show: true,
      message: "User added successfully",
      color: "success",
      timeout: 3000,
    });
    router.push("/");
  } catch (error) {
    console.error("Error adding user:", error);
    snackbarStore.showSnackbar({
      show: true,
      message: "Failed to add user",
      color: "error",
      timeout: 3000,
    });
  }
};
</script>

<template>
  <UserForm @submit="handleSubmit" />
</template>

<style scoped>
/* Add any custom styles here */
</style>