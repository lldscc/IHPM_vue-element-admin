import request from '@/utils/request'
// 登录的请求接口模块
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息的请求接口模块
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}
