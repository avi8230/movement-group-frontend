<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../04-store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const credentials = ref({ email: "", password: "" });

const login = async () => {
  await authStore.login(credentials.value);
  router.push("/users");
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="credentials.email" label="Email" />
        <v-text-field
          v-model="credentials.password"
          label="Password"
          type="password"
        />
        <v-btn @click="login" color="primary">Login</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
