const getAccountMenu = () => {
  const params = {
    // 菜单类型 left：左菜单, top：顶菜单, button：按钮, 默认
    type: 'left',
    // 环境变量
    processEnv: process.env
  }

  return Peace.identity.auth.getAccountMenu(params)
}

const getDynamicRoutes = (accountMenu) => {
  const routeDynamic = [
    {
      path: '/app-intercept',
      name: 'AppIntercept',
      component: () => import('@src/AppIntercept'),
      children: [
        {
          path: '/layout',
          name: 'Layout',
          component: () => import(`@src/layouts/${window.configuration.layout.type}`),
          children: []
        }
      ]
    }
  ]

  accountMenu?.forEach((route) => {
    if (route.menuPath) {
      routeDynamic[0].children[0].children.push({
        path: route.menuRoute,
        name: route.menuAlias,
        meta: Peace.util.deepClone(route),
        component: () => import(`@src/${route.menuPath}/index.js`)
      })
    }
  })

  return routeDynamic
}

export default async function() {
  if (Peace.identity.auth.isLogin()) {
    const accountMenu = await getAccountMenu()
    const dynamicRoutes = await getDynamicRoutes(accountMenu)

    return dynamicRoutes
  }

  return []
}
