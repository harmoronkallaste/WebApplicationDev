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
      <img v-if="post.imgSrc" :src="post.imgSrc" alt="Post Image" class="post-image" />
      <p class="post-text">{{ post.text }}</p>
    </div>
    <hr class="solid" />
    <div class="post-footer">
      <button class="engagement"><i class="fa-regular fa-heart"></i> Like</button>
      <button class="engagement"><i class="fa-regular fa-comment"></i> Comment</button>
      <button class="engagement"><i class="fa-solid fa-retweet"></i> Share</button>
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
  data() {
    return {
      defaultProfilePic: require('@/assets/images/profilepic.jpg'),
    }
  },
}
</script>

<style scoped>
@import url('https://kit.fontawesome.com/9a2c1412cd.js');
@import '@/assets/css/home.css';
</style>
