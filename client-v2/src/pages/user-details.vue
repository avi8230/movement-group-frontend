<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const route = useRoute();
const store = useUserStore();
const user = ref(null);

onMounted(() => {
  const userId = route.params.id;
  console.log('Fetching user', userId);
  user.value = store.fetchUserDetails(userId);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="user">
          <v-img
            height="500px"
            width="500px"
            :src="user.avatar || 'https://i.pravatar.cc/300'"
            :alt="user.first_name"
            cover
          ></v-img>
          <v-card-title>
            {{ user.first_name }} {{ user.last_name }}
          </v-card-title>
          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>
          <v-card-text>
            {{ user.first_name }} {{ user.last_name }} is a user in the system.
          </v-card-text>
        </v-card>
        <v-alert v-else type="error">
          User not found.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add any custom styles here */
</style>