import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/loginPage.vue'
import SignupPage from '@/views/signupPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'signupPage',
    component: SignupPage,
  },
  // Add other routes here if needed
]

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