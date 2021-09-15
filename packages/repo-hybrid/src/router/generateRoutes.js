export default function generateRoutes(configuration) {
  const dynamicLayoutNavRoutes = []
  const dynamicHybridNavRoutes = []

  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppIntercept'),

      children: [
        // hybrid is empty route
        // you can use '/[dynamicHybridNavRoutes]'
        {
          path: '',
          name: '',
          component: () => import('@src/layouts/hybrid'),

          // hybrid Nav
          children: dynamicHybridNavRoutes
        },

        {
          path: 'layout',
          name: 'layout',
          component: () => import('@src/layouts/default'),

          // layout Nav
          children: dynamicLayoutNavRoutes
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

  for (const item of configuration.routes.layoutNavMenu) {
    if (item.menuPath && item.menuRoute && item.menuRouteName) {
      const component = () => import(`@src/${item.menuPath}/index.js`)

      dynamicLayoutNavRoutes.push({
        path: item.menuRoute,
        name: item.menuRouteName,
        meta: item,
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
  }

  configuration.routes.hybridNavMenu.forEach((item) => {
    if (item.menuPath && item.menuRoute && item.menuRouteName) {
      const component = () => import(`@src/${item.menuPath}/index.js`)

      dynamicHybridNavRoutes.push({
        path: item.menuRoute,
        name: item.menuRouteName,
        meta: item,
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
