<!-- src/views/LandingPage.vue -->
<template>
  <div>
    <HeaderComponent/>
    <div class="container">
      <main class="main-content">
        <PostComponent
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @click.native="goToPost(post.id)"
        />
      </main>
      <button v-if="isAuthenticated" class="add-button" @click="goToAddPost">Add Post</button>
      <button v-if="isAuthenticated" class="delete-button" @click="deleteAllPosts">Delete All Posts</button>
    </div>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue';
import FooterComponent from '../components/Footer.vue';
import PostComponent from '../components/Post.vue';
import {mapState, mapActions} from 'vuex';
import auth from '../auth';

export default {
  name: 'LandingPage',
  components: {
    HeaderComponent,
    FooterComponent,
    PostComponent,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  computed: {
    ...mapState(['posts']),
  },
  methods: {
    ...mapActions(['fetchPosts', 'deleteAllPosts']),
    async checkAuth() {
      this.isAuthenticated = await auth.authenticated();
    },
    goToPost(postId) {
      this.$router.push(`/apost/${postId}`);
    },
    goToAddPost() {
      this.$router.push(`/addpost/`);
    },
    async deleteAllPosts() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      try {
        await fetch('http://localhost:3000/posts', {
          method: 'DELETE',
        });
        this.fetchPosts();
      } catch (error) {
        console.error('Error deleting posts:', error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    this.checkAuth();
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

button:hover {
  background-color: #820c0e;
}

button {
  background: #ba181b;
  border: 0;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
  border-radius: 20px;
}

</style>
