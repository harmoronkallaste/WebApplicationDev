<template>
    <div id="app">
      <HeaderComponent />
      <div class="login-container">
        <main class="login-content" id="login-container">
          <h2>Welcome to PostIt</h2>
          <form id="loginForm" @submit.prevent="handleFormSubmit">
  
            <div class="form-group">
              <input type="email" id="email" v-model="email" placeholder="Email" required />
            </div>
  
            <div class="form-group">
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
            </div>
  
            <div class="form-group">
              <button @click="handleFormSubmit" type="submit" class="button" id="login-button"> Log in </button>
              <span class="or-text">or</span>
              <button @click='this.$router.push("/signup")' type="submit" class="button" id="signup-button"> Sign up </button>
            </div>
          </form>
        </main>
      </div>
  
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/Header.vue'
  import FooterComponent from '../components/Footer.vue'
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
    },
    data() {
      return {
        dropdownVisible: false,
        email: '',
        password: '',
        mockUsers: [],
        secretKey: "$2a$10$N715LPdCc891J66nlkF4Kej6Jt3XhNTHfsl/8F7J2VE6XG8BopbeK",
        binID: "672a363ae41b4d34e44ee9f0",
      };
    },
    created() {
      this.fetchMockUsers();
    },
    methods: {
      fetchMockUsers() {
        fetch(`https://api.jsonbin.io/v3/b/${this.binID}`, {
          method: "GET",
          headers: {
            "X-Master-Key": this.secretKey,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
            return response.json();
          })
          .then((data) => {
            this.mockUsers = data.record;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      logout() {
        alert("Logged out");
        // Implement logout functionality
      },
      handleFormSubmit() {
        if (!this.email || !this.password) {
          alert("Email and Password are required!");
          return;
        }
        this.loginUser();
      },
      loginUser() {
        var data = {
          email: this.email,
          password: this.password
        };
        // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', //  Don't forget to specify this if you need cookies
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.error);
                });
            }
            return response.json();
        })
        .then((data) => {
        console.log(data);
        this.$router.push("/");
        // location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          alert("Invalid email or password! Please try again.")
          console.log("error");
        });
        // Kasutajad juba andmebaasis:
        // renofeliks.lindvere@gmail.com
        // AAawdawd_a213_
        // harmo.argpart@gag.ee
        // Kitarrid_2024
        // ron.vahtra@ut.ee
        // MaOlenRon_69
    },
    },
  };
  </script>
  
  <style>
    @import url("../assets/css/login.css");
  </style>
  