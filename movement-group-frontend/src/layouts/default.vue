<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <router-view />
    </v-main>
    <AppSnackbar />
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppSnackbar from "@/components/AppSnackbar.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style scoped>
.v-app-bar {
  background-color: #1976d2;
  color: white;
}
</style>
