import Util from '@src/util'

const getAccountMenu = () => {
  // 根据 original-href，重新获取菜单
  const originalHref = Peace.cache.sessionStorage.get('original-href')
  const productId = Peace.util.queryUrlParam('productId', originalHref) || ''
  const params = {
    type: 'left',
    productCode: productId || 'kzt',
    processEnv: process.env
  }

  return Peace.identity.auth.getAccountMenu(params).then((res) => {
    Util.user.setAccountMenuList(res)

    return res
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
