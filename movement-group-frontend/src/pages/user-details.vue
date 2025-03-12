<template>
  <UserDetails :id="userId" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import UserDetails from "../components/UserDetails.vue";

const route = useRoute();
// @ts-ignore
const userId = computed(() => route.params.id as string);
</script>
