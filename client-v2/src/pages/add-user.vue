<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from '../stores/userStore';

const store = useUserStore();

const schema = yup.object({
  first_name: yup.string().required().label('First Name'),
  last_name: yup.string().required().label('Last Name'),
  email: yup.string().email().required().label('E-mail'),
  avatar: yup.string().url().label('Avatar URL'),
});

const { defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors,
  },
});

const [first_name, firstNameProps] = defineField('first_name', vuetifyConfig);
const [last_name, lastNameProps] = defineField('last_name', vuetifyConfig);
const [email, emailProps] = defineField('email', vuetifyConfig);
const [avatar, avatarProps] = defineField('avatar', vuetifyConfig);

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values);
  store.addUser(values);
  resetForm();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>Add New User</v-card-title>
          <v-card-text>
            <v-form @submit="onSubmit" class="px-4">
              <v-text-field v-model="first_name" v-bind="firstNameProps" label="First Name" />
              <v-text-field v-model="last_name" v-bind="lastNameProps" label="Last Name" />
              <v-text-field v-model="email" v-bind="emailProps" label="Email" type="email" />
              <v-text-field v-model="avatar" v-bind="avatarProps" label="Avatar URL" />

              <v-btn color="primary" type="submit">Submit</v-btn>
              <v-btn color="outline" class="ml-4" @click="resetForm()">Reset</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add any custom styles here */
</style>