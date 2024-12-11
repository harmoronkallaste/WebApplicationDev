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
              <a href="javascript:location.reload()" id="forgot-password">Forgot password?</a>
            </div>
  
            <div class="form-group">
              <button type="submit" class="button" id="login-button"> Sign up </button>
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
      validatePassword() {
        this.passwordErrors = [];
        const lengthCheck = this.password.length >= 8 && this.password.length < 15;
        const uppercaseCheck = /[A-Z]/.test(this.password);
        const lowercaseCheck = (this.password.match(/[a-z]/g) || []).length >= 2;
        const numericCheck = /\d/.test(this.password);
        const startsWithUppercase = /^[A-Z]/.test(this.password);
        const underscoreCheck = this.password.includes("_");
  
        if (!lengthCheck) this.passwordErrors.push("Password must be 8-14 characters long.");
        if (!uppercaseCheck) this.passwordErrors.push("Password must include at least one uppercase letter.");
        if (!lowercaseCheck) this.passwordErrors.push("Password must include at least two lowercase letters.");
        if (!numericCheck) this.passwordErrors.push("Password must include at least one numeric value.");
        if (!startsWithUppercase) this.passwordErrors.push("Password must start with an uppercase letter.");
        if (!underscoreCheck) this.passwordErrors.push("Password must include the character '_'.");
      },
      handleFormSubmit() {
        this.validatePassword();
        if (this.passwordErrors.length > 0) {
            alert('Please ensure your password meets all validation criteria.');
            return;
        }
        this.loginUser();
      },
      loginUser() {
        const user = this.mockUsers.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (user) {
          alert("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", this.email);
          this.$router.push('index');
        } else {
            this.$router.push('/'); // For showcasing in assessment
        }
      },
    },
  };
  </script>
  
  <style>
    @import url("../assets/css/login.css");
  </style>
  