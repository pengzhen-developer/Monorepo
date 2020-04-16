const LAYOUT = '/account'

export const path = {
  /** 布局组件，根组件 */
  LAYOUT,

  /** 服务中心 */
  LAYOUT_SERVICE_INFO: LAYOUT + '/' + 'service-info',
  SERVICE_INFO: 'service-info',
  /** 基本信息 */
  LAYOUT_BASE_INFO: LAYOUT + '/' + 'base-info',
  BASE_INFO: 'base-info',
  /** 安全信息 */
  LAYOUT_SECURITY_INFO: LAYOUT + '/' + 'security-info',
  SECURITY_INFO: 'security-info',
}

export default [
  {
    path: path.LAYOUT,
    name: path.LAYOUT,
    meta: {
      requireAuth: true,
    },
    component: () => import('@src/views/system/layout'),
    children: [
      {
        path: path.SERVICE_INFO,
        name: path.SERVICE_INFO,
        meta: {
          requireAuth: true,
        },
        component: () => import('@src/views/account/service'),
      },
      {
        path: path.BASE_INFO,
        name: path.BASE_INFO,
        component: () => import('@src/views/account/base'),
      },
      {
        path: path.SECURITY_INFO,
        name: path.SECURITY_INFO,
        component: () => import('@src/views/account/security'),
      },
    ],
  },
]
