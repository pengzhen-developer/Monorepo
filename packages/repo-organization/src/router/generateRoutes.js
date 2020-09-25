import Peace from '@src/library'
import Util from '@src/util'

const getDynamicRoutes = () => {
  let dynamicLayoutRootRoutes = []
  let dynamicLayoutRoutes = []

  if (Util.user.isSignIn()) {
    // 获取缓存的权限菜单
    const accountMenuList = Util.user.getAccountMenuList()

    // 验证菜单
    // 声明 layout root route
    dynamicLayoutRootRoutes = [
      {
        path: '/layout',
        name: '/layout',
        component: () => import('@src/layouts/default'),
        children: dynamicLayoutRoutes
      }
    ]
    const regx1 = /.*{|}.*/g
    const regx2 = /\{(.+?)\}/g
    // 遍历权限菜单，声明 dynamic route
    accountMenuList.forEach((menu) => {
      menu.menuRoutes.forEach((route) => {
        route.id = route.routeId.toString()
        route.menuName = route.name
        route.menuIcon = route.icon || ''
        route.menuRoute = route.routePath
        route.menuPath = route.realPath
        route.enable = route.enable == 1 ? true : false
        route.closable = route.closable == 1 ? true : false
        // 处理 env
        // {env} => process.env.env
        const envKey = route.menuPath?.replace(regx1, '')
        route.menuPath = route.menuPath?.replace(regx2, process.env[envKey])

        const component = Peace.validate.isUrl(route.menuPath) ? () => import(`@src/views/iframe/index.js`) : () => import(`@src/${route.menuPath}/index.js`)

        if (route.routePath && (route.routePath !== 'null' || route.routePath !== '/')) {
          dynamicLayoutRoutes.push({
            path: route.routePath,
            name: route.routeName || route.name,
            meta: route,
            component
          })
        }
      })
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
      path: '*',
      name: 'not-found',
      component: () => import('@src/views/exception/404')
    }
  ]

  return rootRoutes
}
