// 角色管理
import request from '@/utils/request'
// 1.获取角色列表的请求接口模块
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}
