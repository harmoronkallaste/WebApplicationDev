import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        commit('setPosts', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async deleteAllPosts({ dispatch }) {
      try {
        await fetch('http://localhost:3000/posts', {
          method: 'DELETE',
        });
        dispatch('fetchPosts');
      } catch (error) {
        console.error('Error deleting posts:', error);
      }
    },
  },
});
