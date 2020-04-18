const LAYOUT = '/account'

export const path = {
  /** 布局组件，根组件 */
  LAYOUT,

  /** 账号管理 */
  LAYOUT_MANAGER: LAYOUT + '/' + 'manager',
  MANAGER: 'manager',
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
        path: path.MANAGER,
        name: path.MANAGER,
        component: () => import('@src/views/account/manager'),
      },
    ],
  },
]
