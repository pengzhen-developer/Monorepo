export default function() {
  return [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppRedirect'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@src/views/system/login')
        }
      ]
    }
  ]
}
