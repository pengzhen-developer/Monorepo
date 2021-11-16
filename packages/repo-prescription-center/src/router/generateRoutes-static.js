export default function() {
  return [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppRedirect'),
      children: []
    },
    {
      path: '/prescriptionlist',
      name: 'prescriptionlist',
      component: () => import('@src/views/prescriptionlist'),
      children: []
    },
    {
      path: '/exceptionloglist',
      name: 'exceptionloglist',
      component: () => import('@src/views/exceptionloglist'),
      children: []
    }
  ]
}
