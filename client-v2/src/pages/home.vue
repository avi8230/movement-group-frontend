<script setup lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import type { User } from "../02-types/User";

defineComponent({
  name: "Home",
});

const store = useUserStore();

// Fetch user details when component is mounted
onMounted(() => {
  console.log("Fetching users", store);
  store.fetchUsers(1);
});

const users = computed<User[]>(() => store.users);
const defaultAvatar = "https://i.pravatar.cc/300";
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="user in users" :key="user._id" cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="344">
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
            <router-link
              :to="{ name: 'UserDetails', params: { id: user._id } }"
            >
              <v-btn color="orange-lighten-2" text>Explore</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add any custom styles here */
</style>