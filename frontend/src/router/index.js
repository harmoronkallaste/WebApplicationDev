import {createRouter, createWebHistory} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/loginPage.vue'
import SignupPage from '@/views/signupPage.vue';
import AddPost from '@/views/AddPost.vue';
import APost from '@/views/APost.vue';
import auth from '../auth';

const routes = [{
  path: "/",
  name: "LandingPage",
  component: LandingPage,
  beforeEnter: async (to, from, next) => {
    let authResult = await auth.authenticated();
    if (!authResult) {
      next('/login')
    } else {
      next();
    }
  }
},
  {
    path: "/signup",
    name: "signupPage",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage,
  },
  {
    path: "/addpost",
    name: "AddPost",
    component: AddPost,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: "/apost/:id",
    name: "APost",
    component: APost,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "AboutView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

/*
const routes = [{
  path: "/",
  name: "LandingPage",
  component: LandingPage,
  beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
},
{
  path: "/signup",
  name: "SignUpPage",
  component: SignupPage,
},
{
  path: "/login",
  name: "LoginPage",
  component: LoginPage,
},
{
  path: "/about",
  name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
      import (  webpackChunkName: "about"  "../views/AboutView.vue"),
},
];
*/

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
