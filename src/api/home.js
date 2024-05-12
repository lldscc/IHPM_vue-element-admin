import request from '@/utils/request'

/** *
 * 首页企业数据
 */
export function getHomeData() {
  return request({
    url: '/home/data'
  })
}

/** *
 * 消息数据
 */
export function getMessageList() {
  return request({
    url: '/home/notice'
  })
}
