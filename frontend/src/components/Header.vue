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
      <div class="profile-pic" v-if="!isAuthPage">
        <h4 id="profileName">hkallaste</h4>
        <img id="profilePicture" :src="profilePic" @click="toggleDropdown" />
        <div
          class="dropdown-menu"
          id="dropdownMenu"
          :style="{ display: dropdownVisible ? 'block' : 'none' }"
        >
          <a>hkallaste</a>
          <a>hkallaste@hotmail.com</a>
          <button @click="Logout" class="dropdown-logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import profilePic from '@/assets/images/profilepic.jpg'

  export default {
    name: 'HeaderComponent',
    data() {
      return {
        dropdownVisible: false,
        profilePic,
      }
    },
    computed: {
      isAuthPage() {
        return this.$route.path === '/login' || this.$route.path === '/signup';
      },
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible
      },
      Logout() {
        fetch("http://localhost:3000/auth/logout", {
            credentials: 'include', //  Don't forget to specify this if you need cookies
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('jwt removed');
          //console.log('jwt removed:' + auth.authenticated());
          this.$router.push("/login");
          //location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
        });
      },
    },
  }

  

</script>

<style>
  @import url('https://kit.fontawesome.com/9a2c1412cd.js');
  @import '@/assets/css/home.css';
</style>
