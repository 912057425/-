import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import { useAuthStore } from '@/stores/modules/authStore.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const getAuthStore = useAuthStore()
      if (!getAuthStore.token) {
        // 如果没有token，就跳转到登录页
        next('/login')
      }
      next()
    },
    children: [
      {
        path: '/frontEndDevelopment', // 前端开发
        name: 'frontEndDevelopment',
        component: () => import('@/views/frontEndDevelopment/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
