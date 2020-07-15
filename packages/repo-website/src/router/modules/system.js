export const path = {
  /** 欢迎页 */
  REDIRECT: '/',
  /** 首页 */
  HOME: '/home',
  /** 完善信息 */
  INFORMMATION: '/information',

  /** 注册 */
  REGISTER: '/register',
  /** 登录 */
  LOGIN: '/login',
  /** 服务条款 */
  TERMS: '/terms',
  /** 隐私权政策 */
  PRIVACY: '/privacy',
}

export default [
  {
    path: path.REDIRECT,
    name: path.REDIRECT,
    component: () => import('@src/views/system/redirect'),
  },
  {
    path: path.HOME,
    name: path.HOME,
    component: () => import('@src/views/system/home'),
  },
  {
    path: path.INFORMMATION,
    name: path.INFORMMATION,
    component: () => import('@src/views/system/information'),
  },
  {
    path: path.REGISTER,
    name: path.REGISTER,
    component: () => import('@src/views/system/register'),
  },
  {
    path: path.LOGIN,
    name: path.LOGIN,
    component: () => import('@src/views/system/login'),
  },
  {
    path: path.PRIVACY,
    name: path.PRIVACY,
    component: () => import('@src/views/system/privacy'),
  },
  {
    path: path.TERMS,
    name: path.TERMS,
    component: () => import('@src/views/system/terms'),
  },
]
