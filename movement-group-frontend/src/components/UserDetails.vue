<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useSnackbarStore } from "../stores/snackbar";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();
const showDeleteDialog = ref(false);

onMounted(async () => {
  try {
    await userStore.fetchUserDetails(props.id);
  } catch (error) {
    snackbarStore.showSnackbar({
      message: "Failed to load user details",
      color: "error",
      show: true,
    });
  }
});

onUnmounted(() => {
  userStore.clearCurrentUser();
  userStore.clearError();
});

const currentUser = computed(() => userStore.currentUser);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleDelete = async () => {
  try {
    await userStore.removeUser(props.id);
    snackbarStore.showSnackbar({
      message: "User deleted successfully",
      color: "success",
      show: true,
    });
    router.push("/");
  } catch (error) {
    snackbarStore.showSnackbar({
      message: (error as Error)?.message || "Failed to delete user",
      color: "error",
      show: true,
    });
  }
};
</script>

<template>
  <v-container class="py-8">
    <!-- Error Alert -->
    <v-alert
      v-if="userStore.error"
      type="error"
      closable
      density="comfortable"
      class="mb-4"
      @click:close="userStore.clearError()"
    >
      {{ userStore.error }}
    </v-alert>

    <!-- Loading State -->
    <div
      v-if="userStore.loading"
      class="d-flex justify-center align-center"
      style="min-height: 400px"
    >
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- User Details -->
    <v-row v-else-if="currentUser" class="align-stretch">
      <v-col cols="12" md="4">
        <v-card class="h-100">
          <v-img
            :src="currentUser.avatar"
            height="350"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5" />
              </v-row>
            </template>
          </v-img>
          <v-card-text class="text-center pt-4">
            <div class="text-h5 font-weight-bold mb-2">
              {{ currentUser.first_name }} {{ currentUser.last_name }}
            </div>
            <div class="text-subtitle-1 text-medium-emphasis">
              {{ currentUser.email }}
            </div>
          </v-card-text>
          <v-card-actions
            v-if="isAuthenticated"
            class="px-4 pb-4 d-flex flex-column"
          >
            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-pencil"
              :to="`/user/${currentUser._id}/edit`"
              block
              class="mb-2"
            >
              Edit Profile
            </v-btn>
            <v-btn
              color="error"
              variant="tonal"
              prepend-icon="mdi-delete"
              block
              @click="showDeleteDialog = true"
            >
              Delete User
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="h-100">
          <v-toolbar color="primary" density="comfortable">
            <v-toolbar-title class="text-white"
              >User Information</v-toolbar-title
            >
          </v-toolbar>

          <v-card-text class="pa-4">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" variant="tonal">
                    <v-icon>mdi-email</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-subtitle-1 font-weight-bold"
                  >Email</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-1">{{
                  currentUser.email
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-divider class="my-2" />

              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" variant="tonal">
                    <v-icon>mdi-account</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-subtitle-1 font-weight-bold"
                  >Full Name</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-1">
                  {{ currentUser.first_name }} {{ currentUser.last_name }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider class="my-2" />

              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" variant="tonal">
                    <v-icon>mdi-clock-outline</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-subtitle-1 font-weight-bold"
                  >Member Since</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-1">
                  {{
                    currentUser.createdAt
                      ? new Date(currentUser.createdAt).toLocaleDateString()
                      : "N/A"
                  }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-btn
              block
              prepend-icon="mdi-arrow-left"
              color="primary"
              variant="tonal"
              to="/"
            >
              Back to Users
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- No User Found -->
    <v-alert v-else type="info" class="mt-4" text="User not found">
      <template v-slot:prepend>
        <v-icon>mdi-account-question</v-icon>
      </template>
    </v-alert>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      confirm-text="Delete"
      confirm-color="error"
      @confirm="handleDelete"
    />
  </v-container>
</template>
