<script setup>
import { mapState } from 'vuex';
import Post from '../components/Post.vue';

export default {
  components: {
    Post
  },
  computed: {
    ...mapState(['posts'])
  }
};
</script>

<template>
  <div>
    <h1>Latest Posts</h1>
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped>
/* Add main page-specific styles */
</style>
