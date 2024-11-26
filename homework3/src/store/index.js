// src/store/index.js
import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    incrementLike(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likeCount = (post.likeCount || 0) + 1;
      }
    },
    setPosts(state, posts) {
      state.posts = posts.map((post) => ({
        ...post,
        id: uuidv4(), // Assign a unique ID to each post
        likeCount: post.likeCount || 0, // Ensure likeCount is initialized
      }));
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likeCount = 0;
      });
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const secretKey = '$2a$10$N715LPdCc891J66nlkF4Kej6Jt3XhNTHfsl/8F7J2VE6XG8BopbeK';
      const binID = '672a3f0aacd3cb34a8a3248b';

      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binID}`, {
          method: 'GET',
          headers: {
            'X-Master-Key': secretKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        commit('setPosts', data.record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    resetAllLikes({ commit }) {
      commit('resetLikes');
    },
  },
});
