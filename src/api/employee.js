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
