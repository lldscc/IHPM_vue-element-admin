// 角色管理
import request from '@/utils/request'
// 1.获取角色列表的请求接口模块
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}
// 2.新增角色的请求接口模块
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 3.根据ID更新角色的请求接口模块
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
