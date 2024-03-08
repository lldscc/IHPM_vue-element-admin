import axios from 'axios'
// 导入token工具函数
import store from '@/store'
import { Message } from 'element-ui'
// 一 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})
// 二 请求拦截器
service.interceptors.request.use(
  (config) => {
  // 在发送请求之前做些什么
    // store.getters.token => 设置到请求头里面
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  }, (error) => {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

// 三、响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    // 错误，终止promise链
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // 对响应错误做点什么
  Message({ type: 'error', message: error.message })
})
export default service
