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
    },
    // 机构字典 - 药品目录
    {
      path: '/organization/drug',
      name: 'OrganizationDrug',
      component: () => import('@src/views/organization/drug'),
      children: []
    },
    // 机构字典 - 医院科室
    {
      path: '/organization/department',
      name: 'OrganizationDepartment',
      component: () => import('@src/views/organization/department'),
      children: []
    },
    // 机构字典 - 给药频次
    {
      path: '/organization/frequency',
      name: 'OrganizationFrequency',
      component: () => import('@src/views/organization/frequency'),
      children: []
    },
    // 机构字典 - 给药途径
    {
      path: '/organization/route',
      name: 'OrganizationRoute',
      component: () => import('@src/views/organization/route'),
      children: []
    },
    // 机构字典 - ICD 诊断
    {
      path: '/organization/icd',
      name: 'OrganizationICD',
      component: () => import('@src/views/organization/icd'),
      children: []
    }
  ]
}
