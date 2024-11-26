<template>
  <header class="header">
    <div class="header-content">
      <nav>
        <ul>
          <li>
            <a href="login.html">
              <i class="fa-solid fa-right-to-bracket"></i> <span>Login</span>
            </a>
          </li>
          <li class="seperator">|</li>
          <li>
            <a href="addPost.html">
              <i class="fa-solid fa-plus"></i> <span>Add post</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="profile-pic">
        <h4 id="profileName">hkallaste</h4>
        <img
          id="profilePicture"
          :src="profilePic"
          @click="toggleDropdown"
        />
        <div
          class="dropdown-menu"
          id="dropdownMenu"
          :style="{ display: dropdownVisible ? 'block' : 'none' }"
        >
          <a>hkallaste</a>
          <a>hkallaste@hotmail.com</a>
          <a>Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import profilePic from '@/assets/images/profilepic.jpg';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      dropdownVisible: false,
      profilePic,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style>
  @import url('https://kit.fontawesome.com/9a2c1412cd.js');
  @import '@/assets/css/home.css';
</style>