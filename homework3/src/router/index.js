import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  // Add other routes here if needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
