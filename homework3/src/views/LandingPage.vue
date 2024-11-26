<template>
  <div>
    <HeaderComponent />

    <div class="container">
      <main class="main-content">
        <PostComponent v-for="post in posts" :key="post.id" :post="post" />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
import PostComponent from '../components/Post.vue'

export default {
  name: 'LandingPage',
  components: {
    HeaderComponent,
    FooterComponent,
    PostComponent,
  },
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    // Example fetch to retrieve posts
    /*
      fetch('your-api-endpoint')
        .then((response) => response.json())
        .then((data) => {
          this.posts = data.posts;
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
      */
  },
}
</script>

<style scoped>
@import '@/assets/css/styles.css';
</style>
