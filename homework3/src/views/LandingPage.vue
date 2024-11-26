<!-- src/views/LandingPage.vue -->
<template>
  <div>
    <HeaderComponent />
    <div class="container">
      <main class="main-content">
        <button class="reset-button" @click="resetLikes">Reset Likes</button> <!-- Reset Likes Button -->
        <PostComponent
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @like-post="handleLikePost"
        />
      </main>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue';
import FooterComponent from '../components/Footer.vue';
import PostComponent from '../components/Post.vue';
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
    ...mapActions(['fetchPosts', 'resetAllLikes']),
    ...mapMutations(['incrementLike']),
    resetLikes() {
      this.resetAllLikes(); // Dispatch the action to reset likes
    },
    handleLikePost(postId) {
      this.incrementLike(postId); // Pass the postId to the mutation
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
/* Add styles for the Reset Likes button */
.reset-button {
  background-color: #ba181b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin: 20px auto;
  transition: background-color 0.3s;
  max-width: 100%;
  display: block; /* Makes the button a block-level element */
}

.reset-button:hover {
  background-color: #820c0e;
}
</style>