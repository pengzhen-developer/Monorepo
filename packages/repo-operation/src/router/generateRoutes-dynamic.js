const getAccountMenu = () => {
  const params = {
    // 产品编码
    productCode: '',
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
        },
        //数据大屏
        {
          path: '/dataScreen',
          name: 'DataScreen',
          component: () => import('@/src/views/business-overview/data-screen')
        }
      ]
    }
  ]

  accountMenu?.forEach((route) => {
    if (route.menuPath) {
      const component = Peace.validate.isUrl(route.menuPath) ? () => import(`@src/views/iframe/index.js`) : () => import(`@src/${route.menuPath}/index.js`)
      routeDynamic[0].children[0].children.push({
        path: route.menuRoute,
        name: route.menuAlias,
        meta: Peace.util.deepClone(route),
        component
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
