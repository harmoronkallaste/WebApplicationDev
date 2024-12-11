import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/loginPage.vue' // Import the LoginPage view

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
  // Add other routes here if needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router