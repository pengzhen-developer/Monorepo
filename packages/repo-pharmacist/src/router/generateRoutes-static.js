export default function() {
  return [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppRedirect'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@src/views/Home')
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@src/views/system/login')
        }
      ]
    }
  ]
}
