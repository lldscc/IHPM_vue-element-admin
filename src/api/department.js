/* 组织架构相关的请求*/

import request from '@/utils/request'
// 1.获取部门列表的请求接口模块
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

// 2.获取部门负责人的请求接口模块
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

// 3.增加部门的请求接口模块
export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

// 4.修改部门详情的请求接口模块
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 5.更新部门的请求接口模块
export function updateDepartment(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}
