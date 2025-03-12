<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="first_name"
                v-bind="firstNameProps"
                label="First Name"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
              />
              <v-text-field
                v-model="last_name"
                v-bind="lastNameProps"
                label="Last Name"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
              />
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
                v-model="avatar"
                v-bind="avatarProps"
                label="Avatar URL"
                prepend-inner-icon="mdi-image"
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
                hint="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
                persistent-hint
              />
              <v-text-field
                v-model="confirmPassword"
                v-bind="confirmPasswordProps"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
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
              prepend-icon="mdi-account-plus"
            >
              Register
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            Already have an account?
            <router-link to="/login">Login here</router-link>
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
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const showPassword = ref(false);

const schema = yup.object({
  first_name: yup.string().min(2).required().label("First Name"),
  last_name: yup.string().min(2).required().label("Last Name"),
  email: yup.string().email().required().label("Email"),
  avatar: yup.string().url()
//   .required()
  .label("Avatar URL"),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[0-9]/, "Password must include at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character"
    )
    .label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

// example of a password: Password123!

const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const vuetifyConfig = (state: { errors: any }) => ({
  props: {
    "error-messages": state.errors,
  },
});

const [first_name, firstNameProps] = defineField("first_name", vuetifyConfig);
const [last_name, lastNameProps] = defineField("last_name", vuetifyConfig);
const [email, emailProps] = defineField("email", vuetifyConfig);
const [avatar, avatarProps] = defineField("avatar", vuetifyConfig);
const [password, passwordProps] = defineField("password", vuetifyConfig);
const [confirmPassword, confirmPasswordProps] = defineField(
  "confirmPassword",
  vuetifyConfig
);

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await authStore.register({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      avatar: values.avatar,
      password: values.password,
    });
    router.push("/");
  } catch (error) {
    console.error("Registration error:", error);
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