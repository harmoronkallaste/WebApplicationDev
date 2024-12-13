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
                @input="validatePassword"
                @focus="touched = true"
                @blur="touched = false"
                placeholder="Password"
                required
              />
            </div>
            <div class="validation-errors" v-if="touched && passwordErrors.length > 0">
              <p v-for="(error, index) in passwordErrors" :key="index" class="error">{{ error }}</p>
            </div>

            <div class="form-group">
              <button @click="handleFormSubmit" type="submit" class="button" id="signup-button"> Sign up </button>
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
    computed: {
      passwordErrors() {
        const errors = [];
        const startsWithUppercase = /^[A-Z]/.test(this.password);
        const lengthCheck = this.password.length > 7 && this.password.length < 15;
        const uppercaseCheck = /[A-Z]/.test(this.password);
        const lowercaseCheck = (this.password.match(/[a-z]/g) || []).length >= 2;
        const numericCheck = /\d/.test(this.password);
        const underscoreCheck = this.password.includes("_");

        if (!startsWithUppercase) errors.push("Password must start with an uppercase letter.");
        if (!lengthCheck) errors.push("Password must be 8-14 characters long.");
        if (!uppercaseCheck) errors.push("Password must include at least one uppercase letter.");
        if (!lowercaseCheck) errors.push("Password must include at least two lowercase letters.");
        if (!numericCheck) errors.push("Password must include at least one numeric value.");
        if (!underscoreCheck) errors.push("Password must include the character '_'.");

        return errors;
      },
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
      handleFormSubmit() {
        if (!this.email || !this.password) {
            alert("Email and Password are required!");
            return;
        }
        this.validatePassword();
        if (this.passwordErrors.length > 0) {
            alert('Please ensure your password meets all validation criteria.');
            return;
        }
        this.signupUser();
      },
      signupUser() {
        var data = {
            email: this.email,
            password: this.password
        };
        // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
        fetch("http://localhost:3000/auth/signup", {
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
        })
        .catch((e) => {
          console.log(e);
          alert("Email already in use!")
          console.log("error");
        });
      },
    },
  };
  </script>

  <style>
    @import url("../assets/css/login.css");
  </style>
