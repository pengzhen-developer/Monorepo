import Peace from '@src/library'
import Util from '@src/util'

const getDynamicRoutes = () => {
  let dynamicLayoutRootRoutes = []
  let dynamicLayoutRoutes = []

  if (Util.user.isSignIn()) {
    // 获取缓存的权限菜单
    const accountMenuList = Util.user.getAccountMenuList()

    // 声明 layout root route
    dynamicLayoutRootRoutes = [
      {
        path: '/layout',
        name: '/layout',
        component: () => import('@src/layouts/default'),
        children: dynamicLayoutRoutes
      }
    ]

    // 遍历权限菜单，声明 dynamic route
    accountMenuList.menuList.forEach((menu) => {
      if (menu.menuPath && menu.menuRoute) {
        const component = Peace.validate.isUrl(menu.menuPath) ? () => import(`@src/views/iframe/index.js`) : () => import(`@src/${menu.menuPath}/index.js`)

        dynamicLayoutRoutes.push({
          path: menu.menuRoute,
          name: menu.menuAlias || menu.menuRoute,
          meta: menu,
          component
        })
      }
    })
  }

  return dynamicLayoutRootRoutes
}

export default function generateRoutes(/** configuration */) {
  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppIntercept'),
      children: getDynamicRoutes()
    },

    {
      path: '/login',
      name: '/login',
      component: () => import('@src/views/system/login')
    },

    {
      path: '/dataScreen',
      name: '/dataScreen',
      component: () => import('@src/views/home/src/components/DataScreen'),
      beforeEnter: (to, from, next) => {
        if (!Util.user.isSignIn()) {
          return next('*')
        }

        return next()
      }
    },

    {
      path: '*',
      name: 'not-found',
      component: () => import('@src/views/exception/404')
    }
  ]

  return rootRoutes
}
