import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
