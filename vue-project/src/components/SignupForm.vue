<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordError: ''
    };
  },
  methods: {
    validatePassword(password) {
      const rules = [
        { test: /^[A-Z]/, message: "should start with an uppercase letter" },
        { test: /[A-Z].*[a-z].*[a-z]/, message: "should include at least two lowercase letters" },
        { test: /\d/, message: "should include at least one numeric value" },
        { test: /_/, message: "should include the character '_'" },
        { test: /.{8,15}/, message: "should be between 8 and 15 characters" }
      ];

      for (let rule of rules) {
        if (!rule.test.test(password)) {
          this.passwordError = `Password is not valid - ${rule.message}`;
          return false;
        }
      }
      this.passwordError = '';
      return true;
    },
    submitForm() {
      if (this.validatePassword(this.password)) {
        // Handle form submission
      }
    }
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="email">Email</label>
    <input type="email" v-model="email" required />

    <label for="password">Password</label>
    <input type="password" v-model="password" required />
    <span v-if="passwordError">{{ passwordError }}</span>

    <button type="submit">Signup</button>
  </form>
</template>

<style scoped>
/* Add signup-specific styles */
</style>
