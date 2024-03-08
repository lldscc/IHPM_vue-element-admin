// 导入封装好的缓存方法
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login } from '@/api/user'
const state = {
  token: getToken() // 从缓存中读取初始值
}

// mutations修改数据
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除token
    state.token = null
    removeToken()
  }
}

const actions = {
  // context上下文,参数(手机号，密码)
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回token
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true, // 开启命名空间，调用时带文件名
  state,
  mutations,
  actions
}
