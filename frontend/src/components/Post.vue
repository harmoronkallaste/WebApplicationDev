<!-- src/components/Post.vue -->
<template>
    <div class="post">
      <div class="post-header">
        <div class="author-pic">
          <img :src="resolvedProfilePic" class="author-img" alt="Author Picture" />
        </div>
        <span class="post-author">{{ post.author }}</span>
        <span class="post-date">{{ post.date }}</span>
      </div>
      <hr class="solid" />
      <div class="post-body">
        <img
          v-if="post.imgSrc"
          :src="post.imgSrc"
          alt="Post Image"
          class="post-image"
        />
        <p class="post-text">{{ post.text }}</p>
      </div>
      <hr class="solid" />
      <div class="post-footer">
        <button @click="likePost" class="engagement">
          <font-awesome-icon icon="heart" /> Like ({{ post.likeCount || 0 }})
        </button>
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
    computed: {
      // Resolve the profile picture path
      resolvedProfilePic() {
        return this.post.profile_pic || '/assets/images/profilepic.jpg';
      },
    },
    methods: {
      likePost() {
        this.$emit('like-post', this.post.id); // Emit the unique post.id
      },
    },
  };
  </script>
  
  <style>
  @import url('https://kit.fontawesome.com/9a2c1412cd.js');
  @import '@/assets/css/home.css';
  
  /* Add any additional styles if necessary */
  </style>
  