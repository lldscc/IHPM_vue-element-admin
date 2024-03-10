// 组织架构相关的请求
import request from '@/utils/request'
// 1.获取部门列表的请求接口模块
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}
