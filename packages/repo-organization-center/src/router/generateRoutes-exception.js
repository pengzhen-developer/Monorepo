export default function() {
  return [
    {
      path: '/401',
      name: 'Exception401',
      component: () => import('@src/views/exception/401')
    },
    {
      path: '/500',
      name: 'Exception500',
      component: () => import('@src/views/exception/500')
    },
    {
      path: '*',
      name: 'Exception404',
      component: () => import('@src/views/exception/404')
    }
  ]
}
