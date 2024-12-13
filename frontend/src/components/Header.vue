<template>
  <header class="header">
    <div class="header-content">
      <nav>
        <ul>
          <li v-if="isAuthenticated">
            <router-link to="/">
              <font-awesome-icon icon="house"/>
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <font-awesome-icon icon="circle-info"/>
              <span>Contacts</span>
            </router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login">
              <font-awesome-icon icon="right-to-bracket"/>
              <span>Login</span>
            </router-link>
          </li>
          <li v-if="isAuthenticated && !isAuthPage">
            <font-awesome-icon icon="right-from-bracket"/>
                <span @click="Logout" class="dropdown-logout">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import profilePic from '@/assets/images/profilepic.jpg'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faHeart, faRightToBracket, faHouse, faInfoCircle, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import auth from '@/auth'

// Add desired icons to the library
library.add(faHeart, faRightToBracket, faHouse, faInfoCircle, faRightFromBracket);

export default {
  name: 'HeaderComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      dropdownVisible: false,
      profilePic,
    }
  },
  computed: {
    isAuthPage() {
      return this.$route.path === '/login' || this.$route.path === '/signup'
    },
    isAuthenticated() {
      return auth.user.authenticated;
    },
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('jwt removed');
          this.$router.push("/login");
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
