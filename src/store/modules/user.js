// 导入封装好的缓存方法
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login, getUserInfo } from '@/api/user'

// VueX state
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户信息
}

// VueX  mutations修改数据
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除token
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
// VueX actions
const actions = {
  // context上下文,参数(手机号，密码)
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回token
    context.commit('setToken', token)
  },

  // 获取用户信息的action
  async getUserInfo(context) {
    // 调用接口获取用户信息
    // console.log('获取用户信息')
    const result = await getUserInfo()
    context.commit('setUserInfo', result) // 提交到mutations,存储用户信息
  },
  // 退出登录
  logout(context) {
    // 清除token
    context.commit('removeToken') // 提交到mutations
    // 清除用户信息
    context.commit('setUserInfo', {}) // 提交到mutations
  }
}

export default {
  namespaced: true, // 开启命名空间，调用时带文件名
  state,
  mutations,
  actions
}
