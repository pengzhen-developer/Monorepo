export default function generateRoutes() {
  const rootRoutes = [
    {
      path: '/',
      name: '/',
      component: () => import('@src/views/home')
    },
    {
      path: '/home',
      name: '/home',
      component: () => import('@src/views/home')
    },

    {
      path: '/login',
      name: '/login',
      component: () => import('@src/views/system/login')
    }
  ]

  return rootRoutes
}
