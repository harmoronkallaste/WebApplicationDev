<!-- src/components/Post.vue -->
<template>
  <div class="post">
    <div class="post-body">
      <p class="post-text">{{ post.body }}</p>
      <span class="post-date">{{ post.timestamp }}</span>
    </div>
  </div>
</template>

  <script>
  export default {
    name: 'PostComponent',
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  };
  </script>

  <style>
  @import url('https://kit.fontawesome.com/9a2c1412cd.js');
  @import '@/assets/css/home.css';

  /* Add any additional styles if necessary */
  </style>
