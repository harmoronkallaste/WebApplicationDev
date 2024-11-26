<script>
export default {
  name: 'Post',
  props: {
    post: Object
  }
};
</script>

<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
  </div>
</template>

<style scoped>
/* Add styles for individual posts */
</style>
