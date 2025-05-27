import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    userInfo: {}
  }),
  actions: {
    setToken(info) {
      this.token = info.token
      this.userInfo = info.userInfo
    }
  },
  persist: true //开启路由缓存
})
