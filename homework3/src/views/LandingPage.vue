<template>
  <div>
    <HeaderComponent />

    <div class="container">
      <main class="main-content">
        <PostComponent v-for="post in posts" :key="post.id" :post="post" @like-post="incrementLike"/>
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
import PostComponent from '../components/Post.vue'
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'LandingPage',
  components: {
    HeaderComponent,
    FooterComponent,
    PostComponent,
  },
  computed: {
      ...mapState(['posts']),
    },
    methods: {
      ...mapActions(['fetchPosts']),
      ...mapMutations(['incrementLike']),
    },
    mounted() {
      this.fetchPosts();
  },
}
</script>

<style scoped>
@import '@/assets/css/styles.css';
</style>
