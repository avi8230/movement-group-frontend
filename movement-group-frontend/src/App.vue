<script setup lang="ts">
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/add-user">Add User</router-link>
    </nav>
    
    <router-view></router-view> <!-- Renders the active page -->
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
</style>
