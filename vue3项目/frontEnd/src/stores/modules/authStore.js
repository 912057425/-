import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  {
    state: () => ({
      token: null
    }),
    actions: {
      setToken(token) {
        this.token = token
      }
    }
  },
  {
    persist: true //开启路由缓存
  }
)
