<!-- Post.vue -->
<template>
    <div class="post">
      <div class="post-header">
        <div class="author-pic">
          <img :src="post.profile_pic || defaultProfilePic" class="author-img" />
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
          <i class="fa-solid fa-heart"></i> Like ({{ post.likeCount || 0 }})
        </button>
        <!-- Other buttons if any -->
      </div>
      <span class="post-author">{{ post.author }}</span>
      <span class="post-date">{{ post.date }}</span>
    </div>
  </template>
  
  <script>
  import defaultProfilePic from '@/assets/images/profilepic.jpg';
  
  export default {
    name: 'PostComponent',
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        defaultProfilePic,
      };
    },
    methods: {
      likePost() {
        this.$emit('like-post', this.post.id);
      },
    },
  };
  </script>
  
  <style>
    @import url('https://kit.fontawesome.com/9a2c1412cd.js');
    @import '@/assets/css/home.css';
  </style>
