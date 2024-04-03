import axios from 'axios'
// 导入token工具函数
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
// 一 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 区分开发环境和生产环境
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
  // 判断是不是Blob
  if (response.data instanceof Blob) return response.data

  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    // 错误，终止promise链
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({ type: 'error', message: '登录状态无效，请重新登录' })
    // token过期,清除token
    await store.dispatch('user/logout') // 调用退出登录的action
    // 跳转到登录页
    router.push('/login')
    return Promise.reject(error)
  }
  // 对响应错误做点什么
  Message({ type: 'error', message: error.message })
})

export default service
