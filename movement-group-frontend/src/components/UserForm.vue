<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="mx-auto" elevation="8">
          <v-card-title class="text-center px-4 pt-4 text-h5">
            {{ isUpdate ? "Update User" : "Add New User" }}
          </v-card-title>

          <v-card-text class="px-4 pt-4">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="first_name"
                v-bind="firstNameProps"
                label="First Name"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
                prepend-inner-icon="mdi-account"
              />

              <v-text-field
                v-model="last_name"
                v-bind="lastNameProps"
                label="Last Name"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
                prepend-inner-icon="mdi-account"
              />

              <v-text-field
                v-model="email"
                v-bind="emailProps"
                label="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-3"
                prepend-inner-icon="mdi-email"
              />

              <v-text-field
                v-model="avatar"
                v-bind="avatarProps"
                label="Avatar URL"
                variant="outlined"
                density="comfortable"
                bg-color="surface"
                class="mb-6"
                prepend-inner-icon="mdi-image"
              />

              <v-btn
                color="primary"
                type="submit"
                :prepend-icon="
                  isUpdate ? 'mdi-content-save' : 'mdi-account-plus'
                "
                size="large"
                block
                class="text-none text-subtitle-1"
              >
                {{ isUpdate ? "Update" : "Add" }} User
              </v-btn>

              <v-btn
                variant="outlined"
                prepend-icon="mdi-refresh"
                @click="resetForm()"
                size="large"
                block
                class="text-none text-subtitle-1"
                style="margin-top: 10px"
              >
                Reset Form
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

interface Props {
  initialValues?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar?: string;
  };
  isUpdate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
  isUpdate: false,
});

// define emit
const emit = defineEmits(["submit"]);

const schema = yup.object({
  first_name: yup.string().required().label("First Name"),
  last_name: yup.string().required().label("Last Name"),
  email: yup.string().email().required().label("E-mail"),
  avatar: yup.string().url().required().label("Avatar URL"),
});

const { defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
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

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  if (!props.isUpdate) {
    resetForm();
  }
});
</script>

<style scoped>
.v-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
