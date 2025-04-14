// src/utils/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://3.129.23.19:3000',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000 // 超时时间
})

// 请求拦截器
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做些什么，例如设置token、将数据转为JSON格式等
//     config.headers['token'] = 'Bearer your-token'
//     return config
//   },
//   (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.status === 200
      ? Promise.reslove(response)
      : Promise.reject(response)
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axiosInstance
