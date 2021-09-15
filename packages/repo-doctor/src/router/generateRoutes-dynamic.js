import Util from '@src/util'

const getAccountMenu = () => {
  return window.configuration.routes.layoutNavMenu
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
          component: () => import(`@src/layouts/mini-side`),
          children: []
        }
      ]
    }
  ]

  accountMenu?.forEach((route) => {
    if (route.menuPath) {
      const component = () => import(`@src/${route.menuPath}/index.js`)

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
  if (Util.user.isSignIn()) {
    const accountMenu = await getAccountMenu()
    const dynamicRoutes = await getDynamicRoutes(accountMenu)

    return dynamicRoutes
  }

  return []
}
