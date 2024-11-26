<template>
    <div id="app">
      <header class="header">
        <div class="header-content">
          <nav>
            <ul>
              <li>
                <router-link to="/">
                    <i class="fa-solid fa-house"></i> <span>Home</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="profile-pic">
            <h4 id="profileName">hkallaste</h4>
            <img id="profilePicture" src="../assets/images/profilepic.jpg" @click="toggleDropdown" />
            <div class="dropdown-menu" id="dropdownMenu" :style="{ display: dropdownVisible ? 'block' : 'none' }">
              <a>hkallaste</a>
              <a>hkallaste@hotmail.com</a>
              <a @click="logout">Logout</a>
            </div>
          </div>
        </div>
      </header>
  
      <div class="login-container">
        <main class="login-content" id="login-container">
          <h2>Welcome to PostIt</h2>
          <form id="loginForm" @submit.prevent="handleFormSubmit">
            <button type="button" class="button" id="create-account" @click="toggleCreateAccount">{{ createAccountButtonText }}</button>
            <p v-if="!isCreatingAccount" id="loginPrompt"> or <br> Please log in </p>
  
            <div v-if="isCreatingAccount" class="form-group" id="username-group">
              <input type="text" id="username" v-model="username" placeholder="Username" />
            </div>
  
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
              <button type="submit" class="button" id="login-button">{{ loginButtonText }}</button>
            </div>
          </form>
        </main>
      </div>
  
      <footer class="footer">
        <h4>Web Application Development - Homework 2</h4>
        <p>Harmo-Ron Kallaste, Reno Feliks Lindvere, Ron Aaron Vahtra</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dropdownVisible: false,
        isCreatingAccount: false,
        username: "",
        email: "",
        password: "",
        passwordErrors: [],
        touched: false,
        mockUsers: [],
        createAccountButtonText: "Create an Account",
        loginButtonText: "Log in",
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
      toggleCreateAccount() {
        this.isCreatingAccount = !this.isCreatingAccount;
        if (this.isCreatingAccount) {
          this.createAccountButtonText = "Back to Login";
          this.loginButtonText = "Create Account";
        } else {
          this.createAccountButtonText = "Create an Account";
          this.loginButtonText = "Log in";
        }
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
          alert("Please ensure your password meets all validation criteria.");
          return;
        }
  
        if (this.isCreatingAccount) {
          this.createAccount();
        } else {
          this.loginUser();
        }
      },
      createAccount() {
        const existingUser = this.mockUsers.find((user) => user.email === this.email);
        if (existingUser) {
          alert("An account with this email already exists.");
          return;
        }
        this.mockUsers.push({ username: this.username, email: this.email, password: this.password });
        alert("Account created successfully! You can now log in.");
        this.toggleCreateAccount();
      },
      loginUser() {
        const user = this.mockUsers.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (user) {
          alert("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", this.email);
          window.location.href = "index";
        } else {
          alert("Invalid email or password. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("../assets/css/styles.css");
  @import url("../assets/css/login.css");
  </style>
  