import Vue from 'vue'
import Router from 'vue-router'
import departmentRouter from './modeules/department' // 引入组织架构
import approvalRouter from './modeules/approval' // 引入审批
import attendanceRouter from './modeules/attendance' // 引入考勤
import employeeRouter from './modeules/employee' // 引入员工
import permissionRouter from './modeules/permission' // 引入权限
import roleRouter from './modeules/role' // 引入角色
import salaryRouter from './modeules/salary' // 引入工资
import socialRouter from './modeules/social' // 引入社保
Vue.use(Router)
/* Layout */
import Layout from '@/layout'

// 声明静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }

  // 404 page must be placed at the end !!!
]

// 声明动态路由
export const asyncRouter = [
  departmentRouter, // 组织架构
  roleRouter, // 审批
  employeeRouter, // 员工
  permissionRouter, // 权限
  attendanceRouter, // 考勤
  approvalRouter, // 审批
  salaryRouter, // 工资
  socialRouter // 社保
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes // 静态路由
})

const router = createRouter()

// 重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
