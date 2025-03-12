<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                v-bind="emailProps"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
              />
              <v-text-field
                v-model="password"
                v-bind="passwordProps"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              @click="onSubmit"
              size="large"
              block
              class="text-none text-subtitle-1"
              prepend-icon="mdi-login"
            >
              Login
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            Don't have an account?
            <router-link to="/register">Register here</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import type { Credentials } from "@/types/Credentials";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const showPassword = ref(false);
const snackbarStore = useSnackbarStore();

const schema = yup.object({
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(6).required().label("Password"),
});

const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const vuetifyConfig = (state: { errors: any }) => ({
  props: {
    "error-messages": state.errors,
  },
});

const [email, emailProps] = defineField("email", vuetifyConfig);
const [password, passwordProps] = defineField("password", vuetifyConfig);

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const result = await authStore.login({
      email: values.email,
      password: values.password,
    });
    if (result.error) {
      snackbarStore.showSnackbar({
        message: result?.error || "Failed to login",
        color: "error",
        show: true,
      });
      return;
    }
    // Redirect to home page after successful login
    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.v-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
