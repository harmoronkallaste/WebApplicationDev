<template>
  <header class="header">
    <div class="header-content">
      <nav>
        <ul>
          <li>
            <router-link to="/">
                <font-awesome-icon icon="house" /> <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/login">
              <font-awesome-icon icon="right-to-bracket" /> <span>Login</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="profile-pic">
        <h4 id="profileName">hkallaste</h4>
        <img id="profilePicture" :src="profilePic" @click="toggleDropdown" />
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

  import profilePic from '@/assets/images/profilepic.jpg'

  export default {
    name: 'HeaderComponent',
    data() {
      return {
        dropdownVisible: false,
        profilePic,
      }
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible
      },
    },
  }

</script>

<style>
  @import url('https://kit.fontawesome.com/9a2c1412cd.js');
  @import '@/assets/css/home.css';
</style>
