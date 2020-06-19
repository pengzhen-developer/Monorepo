import Peace from '@src/library'

export default function generateRoutes(configuration) {
  const dynamicLayoutNavRoutes = []

  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppIntercept'),

      children: [
        // hybrid is empty route
        // you can use '/[dynamicHybridNavRoutes]'
        // .e.g
        // {
        //   path: '',
        //   name: '',
        //   component: () => import('@src/layouts/hybrid'),

        //   // hybrid Nav
        //   children: dynamicHybridNavRoutes
        // },

        {
          path: 'layout',
          name: 'layout',
          component: () => import('@src/layouts/default'),

          // layout Nav
          children: dynamicLayoutNavRoutes
        }
      ]
    },

    // 控制台没有登录 (￣▽￣)""
    // {
    //   path: '/login',
    //   name: '/login',
    //   component: () => import('@src/views/system/login')
    // },

    {
      path: '*',
      component: () => import('@src/views/exception/404')
    }
  ]

  configuration.routes.layoutNavMenu.forEach((item) => {
    if (item.menuPath && item.menuRoute && item.menuRouteName) {
      let component = null

      if (Peace.validate.isUrl(item.menuPath)) {
        component = () => import(`@src/views/iframe/index.js`)
      } else {
        component = () => import(`@src/${item.menuPath}/index.js`)
      }

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
  })

  return rootRoutes
}
