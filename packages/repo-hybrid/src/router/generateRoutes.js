export default function generateRoutes(configuration) {
  const dynamicLayoutNavRoutes = []
  const dynamicHybridNavRoutes = []

  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppIntercept'),

      children: [
        {
          path: 'layout',
          name: 'layout',
          component: () => import('@src/layouts/default'),

          // layout Nav
          children: dynamicLayoutNavRoutes
        },

        {
          path: 'hybrid',
          name: 'hybrid',
          component: () => import('@src/layouts/hybrid'),

          // hybrid Nav
          children: dynamicHybridNavRoutes
        }
      ]
    },

    {
      path: 'login',
      name: 'login',
      component: () => import('@src/views/system/login')
    },

    {
      path: '*',
      component: () => import('@src/views/exception/404')
    }
  ]

  configuration.routes.layoutNavMenu.forEach((item) => {
    if (item.menuPath && item.menuRoute && item.menuRouteName) {
      const component = () => import(`@src/${item.menuPath}/index.js`)

      dynamicLayoutNavRoutes.push({
        path: item.menuRoute,
        name: item.menuRouteName,
        component: component
      })
    } else {
      const notFound = () => import(`@src/views/exception/404`)

      dynamicLayoutNavRoutes.push({
        path: 'not-found',
        name: 'not-found',
        component: notFound
      })
    }
  })

  configuration.routes.hybridNavMenu.forEach((item) => {
    if (item.menuPath && item.menuRoute && item.menuRouteName) {
      const component = () => import(`@src/${item.menuPath}/index.js`)

      dynamicHybridNavRoutes.push({
        path: item.menuRoute,
        name: item.menuRouteName,
        component: component
      })
    } else {
      const notFound = () => import(`@src/views/exception/404`)

      dynamicLayoutNavRoutes.push({
        path: 'not-found',
        name: 'not-found',
        component: notFound
      })
    }
  })

  return rootRoutes
}
