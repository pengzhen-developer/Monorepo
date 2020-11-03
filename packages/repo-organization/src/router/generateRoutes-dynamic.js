import Util from '@src/util'

const getAccountMenu = () => {
  // 根据 original-href，重新获取菜单
  const original = Peace.cache.sessionStorage.get('original-href')
  const productId = Peace.util.queryUrlParam('productId', original) || ''
  const params = {
    type: 'left',
    productCode: productId || 'kzt',
    processEnv: process.env
  }

  return Peace.identity.auth
    .getAccountMenu(params)
    .then((res) => {
      Util.user.setAccountMenuList(res)

      return res
    })
    .catch((error) => {
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
      path: '/app-intercept',
      name: 'AppIntercept',
      component: () => import('@src/AppIntercept'),
      children: [
        {
          path: '/layout',
          name: 'Layout',
          component: () => import(`@src/layouts/default`),
          children: []
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
