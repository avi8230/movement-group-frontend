<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../04-store/authStore";
import { useUserStore } from "../04-store/userStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import type { User, UserRegister } from "../02-models/User";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const { user, isAuthenticated } = storeToRefs(authStore);
const { users } = storeToRefs(userStore);

const credentials = ref({ email: "", password: "" });
const newUser = ref<UserRegister>({
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  avatar: "",
});

onMounted(() => {
  userStore.fetchUsers(1);
});

// Register a new user
const register = async () => {
  await authStore.register(newUser.value);
};

// Login with provided credentials
const login = async () => {
  await authStore.login(credentials.value);
};

// Logout and redirect to login page
const logout = async () => {
  await authStore.logout();
  router.push("/login");
};

// Add a new user
const addUser = async () => {
  await userStore.addUser(newUser.value);
};

// Edit an existing user
const editUser = async (user: User) => {
  await userStore.editUser(user);
};

// Remove a user by ID
const removeUser = async (id: string) => {
  await userStore.removeUser(id);
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>User Management</v-card-title>
      <v-card-text>
        <v-text-field v-model="credentials.email" label="Email" />
        <v-text-field v-model="credentials.password" label="Password" type="password" />
        <v-btn @click="login" color="primary">Login</v-btn>
        <v-btn @click="logout" color="red" v-if="isAuthenticated">Logout</v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title>Users List</v-card-title>
      <v-list>
        <v-list-item v-for="user in users" :key="user._id">
          <v-list-item-content>
            <v-list-item-title>{{ user.first_name }} {{ user.last_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn @click="editUser(user)" color="blue">Edit</v-btn>
          <v-btn @click="removeUser(user._id)" color="red">Delete</v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
