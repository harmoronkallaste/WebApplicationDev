<script setup>
export default {
  name: 'Header'
};
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
  </header>
</template>

<style scoped>
/* Add header-specific styles */
</style>
