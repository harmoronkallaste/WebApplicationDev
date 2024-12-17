<template>
  <div id="app">
    <HeaderComponent/>
    <div class="A Post">
      <h3>Edit Post</h3>
      <div id="form">
        <label for="body">What would you like to post about? </label>
        <input name="body" type="text" id="body" required v-model="post.body"/>
        <button @click="updatePost" class="updatePost">Update Post</button>
        <button @click="deletePost" class="deletePost">Delete Post</button>
      </div>
    </div>
    <FooterComponent/>
  </div>
</template>


<script>
import auth from '../auth';
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "APost",
  components: {FooterComponent, HeaderComponent},
  data() {
    return {
      post: {
        id: "",
        body: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    async updatePost() {
      fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async deletePost() {
      await fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })

        .catch((e) => {
          console.log(e);
        });
    },
  },
  async mounted() {
    if (!await auth.authenticated()) {
      this.$router.push('/login');
    } else {
      // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
      // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their
      // position in the URL. The captured values are populated in the req.params object, with the name
      // of the route parameter specified in the path as their respective keys
      this.fetchAPost(this.$route.params.id);
    }
  },
};
</script>

<style scoped>
#form {
  max-width: 420px;
  margin: 30px auto;
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  color: #ba181b;
}

label {
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  letter-spacing: 0.3px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  color: #666;
}

button {
  background: #ba181b;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
  border-radius: 20px;
}
button:hover {
  background-color: #820c0e;
}

</style>
