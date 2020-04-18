export const path = {
  /** 欢迎页 */
  REDIRECT: '/',

  /** 登录 */
  LOGIN: '/login',
}

export default [
  {
    path: path.REDIRECT,
    name: path.REDIRECT,
    component: () => import('@src/views/system/redirect'),
  },
  {
    path: path.LOGIN,
    name: path.LOGIN,
    component: () => import('@src/views/system/login'),
  },
]
