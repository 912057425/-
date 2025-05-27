// src/utils/axios.js
import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000 // 超时时间
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如设置token、将数据转为JSON格式等
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const auth = JSON.parse(storedAuth) // 解析为对象
      config.headers['token'] = auth.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200) {
      return Promise.resolve(response.data.data)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject({ message: error })
  }
)

export default axiosInstance
