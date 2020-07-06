export default [
  {
    id: '5',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '处方共享管理',
    menuPath: null,
    menuIcon: null,
    iconType: null,
    menuType: 'iframe',
    enable: true,
    closable: null
  },
  {
    id: '5-1',
    parentId: '5',
    menuRoute: '5-1',
    menuRouteName: '5-1',
    menuName: '流向配置',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'ConfigManagement/ConfigDrugStoreManagement',
    menuIcon: 'zyy-lxpz',
    iconType: 'Zyy Icons',
    enable: true,
    closable: true
  },
  {
    id: '5-2',
    parentId: '5',
    menuRouteName: '5-2',
    menuRoute: '5-2',
    menuName: '订单管理',
    menuPath: null,
    menuIcon: 'zyy-ddgl',
    iconType: 'Zyy Icons',
    enable: true,
    closable: true
  },
  {
    id: '5-2-1',
    parentId: '5-2',
    menuRouteName: '5-2-1',
    menuRoute: '5-2-1',
    menuName: '订单概览',
    menuPath: null,
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: false,
    closable: true
  },
  {
    id: '5-2-2',
    parentId: '5-2',
    menuRouteName: '5-2-2',
    menuRoute: '5-2-2',
    menuName: '订单明细',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'OrderManage/OrderManage',
    menuIcon: 'zyy-dingdan',
    iconType: 'Zyy Icons',
    enable: true,
    closable: true
  },
  {
    id: '5-2-3',
    parentId: '5-2',
    menuRouteName: '5-2-3',
    menuRoute: '5-2-3',
    menuName: '售后订单',
    menuPath: null,
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: false,
    closable: true
  }
]
