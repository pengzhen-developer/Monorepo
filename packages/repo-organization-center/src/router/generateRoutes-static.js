export default function() {
  return [
    {
      path: '/',
      name: '/',
      component: () => import('@src/AppRedirect'),
      children: []
    },
    {
      path: '/orglist',
      name: 'orglist',
      component: () => import('@src/views/orglist'),
      children: []
    },
    {
      path: '/checklist',
      name: 'checklist',
      component: () => import('@src/views/checklist'),
      children: []
    }
  ]
}


