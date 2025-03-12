<template>
  <v-container>
    <!-- Loading State -->
    <div v-if="store.loading" class="d-flex justify-center align-center my-4">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Error State -->
    <v-alert
      v-else-if="store.error"
      type="error"
      class="mb-4"
      closable
      @click:close="store.clearError()"
    >
      {{ store.error }}
    </v-alert>

    <template v-else>
      <!-- Users Grid -->
      <v-row>
        <v-col v-for="user in users" :key="user._id" cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="344" elevation="3">
            <v-img
              height="200px"
              :src="user.avatar || defaultAvatar"
              :alt="user.first_name"
              cover
            ></v-img>

            <v-card-title>
              {{ user.first_name }} {{ user.last_name }}
            </v-card-title>

            <v-card-subtitle>
              {{ user.email }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="primary"
                variant="tonal"
                :to="`/user/${user._id}`"
                block
              >
                View Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- No Users Message -->
      <v-row v-if="users.length === 0" class="mt-4">
        <v-col cols="12" class="text-center">
          <v-alert type="info" text="No users found" />
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row class="mt-4" v-if="store.pagination.totalPages > 1">
        <v-col cols="12" class="d-flex justify-center">
          <v-pagination
            v-model="currentPage"
            :length="store.pagination.totalPages"
            :total-visible="5"
            @update:model-value="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>

      <!-- Total Users Count -->
      <v-row class="mt-2">
        <v-col cols="12" class="text-center text-subtitle-1">
          Total Users: {{ store.pagination.totalUsers }}
          <span class="text-subtitle-2 text-medium-emphasis">
            (Page {{ currentPage }} of {{ store.pagination.totalPages }})
          </span>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import type { User } from "../types/User";

defineComponent({
  name: "Home",
});

const store = useUserStore();
const route = useRoute();
const router = useRouter();
// @ts-ignore
const paramPage = computed(() => Number(route.params.page) || 1);

// Get page from route or default to 1
const currentPage = computed(() => {
  // @ts-ignore
  const page = paramPage.value;
  return page > 0 ? page : 1;
});

// Watch for route changes
watch(
  () => paramPage.value,
  () => {
    store.fetchUsers(currentPage.value);
  }
);

// Fetch user details when component is mounted
onMounted(() => {
  store.fetchUsers(currentPage.value);
});

const users = computed<User[]>(() => store.users);
const defaultAvatar = "https://i.pravatar.cc/300";

const handlePageChange = async (newPage: number) => {
  // Update route which will trigger the watch
  await router.push(`/page/${newPage}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>