import { createStore } from 'vuex';

export default createStore({
    state: {
        posts: [
            // Sample posts
            { id: 1, title: 'First Post', content: 'This is the first post content' },
            { id: 2, title: 'Second Post', content: 'This is the second post content' },
            // Add more posts
        ]
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        fetchPosts({ commit }) {
            // Fetch posts from a JSON file or API
            commit('setPosts', posts);
        }
    }
});
