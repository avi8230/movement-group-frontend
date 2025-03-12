<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useSnackbarStore } from "../stores/snackbar";
import UserForm from "../components/UserForm.vue";
import type { User } from "../types/User";

const store = useUserStore();
const snackbarStore = useSnackbarStore();
const route = useRoute();
const router = useRouter();
const user = ref<User | null>(null);
const loading = ref(true);
// @ts-ignore
const userId = computed(() => route.params.id as string);

onMounted(async () => {
  try {
    user.value = await store.fetchUserDetails(userId.value);
    if (!user.value) {
      snackbarStore.showSnackbar({
        show: true,
        message: "User not found",
        color: "error",
        timeout: 3000,
      });
      router.push("/");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    snackbarStore.showSnackbar({
      show: true,
      message: "Error fetching user details",
      color: "error",
      timeout: 3000,
    });
    router.push("/");
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async (values: User) => {
  try {
    await store.editUser({ ...values, _id: userId.value });
    snackbarStore.showSnackbar({
      show: true,
      message: "User updated successfully",
      color: "success",
      timeout: 3000,
    });
    router.push("/");
  } catch (error) {
    console.error("Error updating user:", error);
    snackbarStore.showSnackbar({
      show: true,
      message: "Failed to update user",
      color: "error",
      timeout: 3000,
    });
  }
};
</script>

<template>
  <div
    v-if="loading"
    class="d-flex justify-center align-center"
    style="height: 400px"
  >
    <v-progress-circular indeterminate color="primary" />
  </div>
  <UserForm
    v-else-if="user"
    :initial-values="user"
    :is-update="true"
    @submit="handleSubmit"
  />
  <div v-else class="text-center pa-4">
    <p class="text-h6">User not found</p>
    <v-btn color="primary" to="/" class="mt-4">Go Back Home</v-btn>
  </div>
</template> 