<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../04-store/authStore";
import { useRouter } from "vue-router";
import type { UserRegister } from "../02-models/User";

const authStore = useAuthStore();
const router = useRouter();

const newUser = ref<UserRegister>({
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  avatar: "",
});

const register = async () => {
  await authStore.register(newUser.value);
  router.push("/users");
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-text-field v-model="newUser.first_name" label="First Name" />
        <v-text-field v-model="newUser.last_name" label="Last Name" />
        <v-text-field v-model="newUser.email" label="Email" />
        <v-text-field
          v-model="newUser.password"
          label="Password"
          type="password"
        />
        <v-btn @click="register" color="primary">Register</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
