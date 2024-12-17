<template>
  <div id="app">
    <HeaderComponent/>
    <div class="New Post">
      <div id="form">
        <h3>A Post</h3>
        <label for="body">What would you like to post about? </label>
        <input name="body" type="text" id="body" required v-model="post.body"/>
        <span class="post-date">{{ post.date }}</span>
        <button @click="addPost" class="addPost">Add Post</button>
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
  name: "AddPost",
  components: {FooterComponent, HeaderComponent},
  data() {
    return {
      post: {
        body: "",
      },
    };
  },
  methods: {
    async addPost() {
      if (!await auth.authenticated()) {
        this.$router.push('/login');
        return;
      }
      var data = {
        body: this.post.body,
      };
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e.message);
          alert(`Error adding post! ${e.message}`);
        });
    },
  },
  async mounted() {
    if (!await auth.authenticated()) {
      this.$router.push('/login');
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
  padding: 40px;
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
  margin-bottom: 20px;
  color: #666;
}

button {
  display: block;
  background: #ba181b;
  border: 0;
  padding: 10px 20px;
  margin: auto;
  color: white;
  border-radius: 20px;
}
button:hover {
  background-color: #820c0e;
}

</style>
