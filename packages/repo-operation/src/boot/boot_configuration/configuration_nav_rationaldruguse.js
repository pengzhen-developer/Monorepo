export default [
  {
    id: '4',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '合理用药管理',
    menuPath: null,
    menuIcon: null,
    iconType: null,
    menuType: 'iframe',
    enable: true,
    closable: null
  },

  {
    id: '4-1',
    parentId: '4',
    menuRoute: '4-1',
    menuRouteName: '4-1',
    menuName: '审方配置',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'ConfigManagement/ConfigManagement',
    menuIcon: 'zyy-icon zyy-sfpz',
    iconType: 'Local Icons',
    enable: true,
    closable: true
  },

  {
    id: '4-2',
    parentId: '4',
    menuRouteName: '4-2',
    menuRoute: '4-2',
    menuName: '药师审核',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'Customer/PharmacistCustomer',
    menuIcon: 'zyy-icon zyy-ysgl',
    iconType: 'Local Icons',
    enable: true,
    closable: true
  },
  {
    id: '4-3',
    parentId: '4',
    menuRouteName: '4-3',
    menuRoute: '4-3',
    menuName: '处方管理',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'PrescriptionList/PrescriptionList',
    menuIcon: 'zyy-icon zyy-cfgl',
    iconType: 'Local Icons',
    enable: true,
    closable: true
  }
]
