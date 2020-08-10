export const path = {
  /** No Access */
  ['EXCEPTION-403']: '/exception/403',
  /** Not Exist */
  ['EXCEPTION-404']: '/exception/404',
  /** Server Error */
  ['EXCEPTION-500']: '/exception/500',
  /** 欢迎页 */
  REDIRECT: '/',
  /** 首页 */
  HOME: '/home',
  /** 完善信息-机构注册 */
  ORGREGISTER: '/compliteInfo/OrgRegister',
  /** 完善信息-等待审核 */
  CHECKWAITING: '/compliteInfo/CheckWaiting',
  /** 完善信息-审核失败 */
  CHECKFAILURE: '/compliteInfo/CheckFailure',
  /** 注册 */
  REGISTER: '/register',
  /** 登录 */
  LOGIN: '/login',
  /** 服务条款 */
  TERMS: '/terms',
  /** 隐私权政策 */
  PRIVACY: '/privacy'
}

export default function generateRoutes() {
  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/views/home')
    },

    {
      path: path.LOGIN,
      name: path.LOGIN,
      component: () => import('@src/views/system/login')
    },
    {
      path: path.REDIRECT,
      name: path.REDIRECT,
      component: () => import('@src/views/system/redirect')
    },
    {
      path: path.ORGREGISTER,
      name: path.ORGREGISTER,
      meta: {
        auth: true
      },
      component: () => import('@src/views/compliteInfo/orgRegister')
    },
    {
      path: path.CHECKWAITING,
      name: path.CHECKWAITING,
      meta: {
        auth: true
      },
      component: () => import('@src/views/compliteInfo/orgCheckWaiting')
    },
    {
      path: path.CHECKFAILURE,
      name: path.CHECKFAILURE,
      meta: {
        auth: true
      },
      component: () => import('@src/views/compliteInfo/orgChackFailure')
    },
    {
      path: path.REGISTER,
      name: path.REGISTER,
      component: () => import('@src/views/system/register')
    },
    {
      path: path.PRIVACY,
      name: path.PRIVACY,
      component: () => import('@src/views/system/privacy')
    },
    {
      path: path.TERMS,
      name: path.TERMS,
      component: () => import('@src/views/system/terms')
    },
    {
      path: '*',
      name: path['EXCEPTION-404'],
      component: () => import('@src/views/home')
    }
  ]

  return rootRoutes
}
