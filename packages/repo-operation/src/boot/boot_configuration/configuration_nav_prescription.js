export default [
  {
    id: '5',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '处方共享管理',
    menuPath: null,
    menuIcon: 'el-icon-s-finance',
    iconType: 'Element-UI Icons',
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
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '5-2',
    parentId: '5',
    menuRouteName: '5-2',
    menuRoute: '5-2',
    menuName: '订单管理',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'OrderManage/OrderManage',
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  }
]
