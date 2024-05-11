import request from '@/utils/request'

// 获取员工管理的数据
export function getEmployeeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 导出员工excel表格的请求
 *  **/
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 二进制流 改变接收数据的类型
    responseType: 'blob'
  })
}
/**
 * 下载员工导入模板
 *  **/
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 二进制文件流
  })
}
/**
 * 上传用户的excel
 *  **/
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}
/**
 * 员工信息
 *  **/
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
/**
 * 删除员工
 *  **/
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
/**
 * 新增员工
 *  **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 获取可用的角色
 * **/

export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}
/**
 * 分配员工角色
 * ***/

export function assignRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
