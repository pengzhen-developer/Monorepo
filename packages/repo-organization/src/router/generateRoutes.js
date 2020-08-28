import Peace from '@src/library'
import configuration_nav_console from '@src/boot/boot_configuration/configuration_nav_console'

const getConfiguration = (params) => {
  const url = process.env.VUE_APP_BASE_API + '/console/Service/getServiceSettingMenu'
  return Peace.http.post(url, params)
}

export default async function generateRoutes(configuration) {
  const dynamicLayoutNavRoutes = []

  await getRouterList(configuration)

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

  return rootRoutes
}

async function getRouterList(configuration) {
  const ORIGINAL_HREF = window.sessionStorage.getItem('ORIGINAL_HREF')

  const isSecondSystem = ORIGINAL_HREF ? true : false
  const serviceId = Peace.util.queryUrlParam('serviceId', ORIGINAL_HREF)

  if (serviceId && isSecondSystem) {
    const params = {
      serviceId
    }

    const configurationByService = await getConfiguration(params)

    const reg = /[^{}]*{(.*)}[^}]*/
    configurationByService.data.menuArr.map((value) => {
      const route = value.menuPath && value.menuPath.replace(reg, '$1')
      if (process.env[route] !== undefined) {
        value.menuPath = value.menuPath && value.menuPath.replace('{' + route + '}', '')
        value.menuPath = value.menuPath && route && process.env[route] + value.menuPath
      }
    })

    configuration.routes.layoutNavMenu = configurationByService.data.menuArr
  } else {
    configuration.routes.layoutNavMenu = configuration_nav_console
  }
}
