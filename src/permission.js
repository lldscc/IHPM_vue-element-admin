/*
主页权限的验证
1.访问主页，有token进入主页，没有token进入登录页
2.访问登录页，有token进入主页，没有token进入登录页
实现思路：
1.在路由前置守卫中，开启进度条，判断是否有token，有token进入主页，没有token进入登录页，设置白名单，不需要验证的页面
2.在路由后置守卫中，关闭进度条
*/

import router from './router'
import nProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import store from './store'
// 白名单
const whiteList = ['/login', '/404']
/*
* 路由前置守卫：路由跳转之前进行的操作
 */
router.beforeEach(async(to, from, next) => {
  nProgress.start() // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 访问登录页，有token，进入主页
      nProgress.done() // 关闭进度条
      next('/')
    } else {
      // 访问其他页面，有token，放行
      // 通过vuex中userId判断是否有用户信息
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo') // 获取用户信息
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 访问白名单页面，没有token，放行
      next()
    } else {
      // 访问其他页面，没有token，进入登录页
      nProgress.done() // 关闭进度条
      next('/login')
    }
  }
})

/*
* 路由后置守卫
 */
router.afterEach((to, from, next) => {
  nProgress.done() // 关闭进度条
})
