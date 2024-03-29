import request from '@/utils/request'

export function getEmployeeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
