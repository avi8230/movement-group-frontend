<template>
  <v-snackbar
    v-model="snackbarStore.snackbar.show"
    :color="snackbarStore.snackbar.color"
    :timeout="snackbarStore.snackbar.timeout"
    :location="snackbarStore.snackbar.location"
    :multi-line="snackbarStore.snackbar.multiLine"
    :variant="snackbarStore.snackbar.variant"
  >
    {{ snackbarStore.snackbar.message }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbarStore.hideSnackbar()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "../stores/snackbar";
const snackbarStore = useSnackbarStore();
</script>
