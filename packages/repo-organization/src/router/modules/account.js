export const path = {
  /** 布局组件，根组件 */
  LAYOUT: '/account',

  /** 服务中心 */
  SERVICE_INFO: 'service-info',
  /** 基本信息 */
  BASE_INFO: 'base-info',
  /** 安全信息 */
  SECURITY_INFO: 'security-info'
}

export default [
  {
    path: path.LAYOUT,
    name: path.LAYOUT,
    component: () => import('@src/views/system/layout'),
    children: [
      {
        path: path.SERVICE_INFO,
        name: path.SERVICE_INFO,
        component: () => import('@src/views/account/service')
      },
      {
        path: path.BASE_INFO,
        name: path.BASE_INFO,
        component: () => import('@src/views/account/base')
      },
      {
        path: path.SECURITY_INFO,
        name: path.SECURITY_INFO,
        component: () => import('@src/views/account/security')
      }
    ]
  }
]
