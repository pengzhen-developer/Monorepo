const getAccountMenu = () => {
  const params = {
    // 产品编码
    productCode: '',
    // 菜单类型 left：左菜单, top：顶菜单, button：按钮, 默认
    type: 'left',
    // 环境变量
    processEnv: process.env
  }

  return Peace.identity.auth.getAccountMenu(params).catch((error) => {
    // 本应在 peace => http => interceptors 处理
    // 如下：
    // if (response.data.code === 401 || response.data.code === 403) {
    //   if (peace && peace.hasOwnProperty('$router')) {
    //     peace.$router.push('/401')
    //   }

    //   return Promise.reject(response)
    // }
    //
    // 但 generateRoutes-dynamic 在 new vue() 前，router 未生成
    // 因此自行处理 401 错误
    if (error.response.status === 401 || error.response.status === 403 || error.response.data.code === 401 || error.response.data.code === 403) {
      // 清理账户信息
      Peace.identity.auth.removeAuth()
      Peace.identity.auth.removeAccountInfo()

      // 跳转 401 提示页
      window.location.href = process.env.VUE_APP_RELEASE_FLODER_PATH + process.env.VUE_APP_ROUTE_EXCEPTION_401
    }
  })
}

const getDynamicRoutes = (accountMenu) => {
  const routeDynamic = [
    {
      path: '/AppIntercept',
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
  if (Peace.identity.auth.isLogin) {
    const accountMenu = await getAccountMenu()
    const dynamicRoutes = await getDynamicRoutes(accountMenu)

    return dynamicRoutes
  }

  return []
}
