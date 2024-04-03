import layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  component: layout, // 一级路由： 布局组件
  children: [
    {
      path: '', // 二级路由 什么都不写 作为二级路由的默认组件
      component: () => import('@/views/department'), // 懒加载
      name: 'department', // 路由的名字
      meta: {
        title: '组织架构', // 元信息
        icon: 'tree'
      }
    }
  ]
}
