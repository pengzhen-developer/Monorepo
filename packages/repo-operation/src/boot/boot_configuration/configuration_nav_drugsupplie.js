export default [
  {
    id: '6',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药品供应管理',
    menuPath: null,
    menuIcon: null,
    iconType: null,
    menuType: 'iframe',
    enable: true,
    closable: null
  },
  {
    id: '6-1',
    parentId: '6',
    menuRoute: '6-1',
    menuRouteName: '6-1',
    menuName: '药房审核',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'Customer/PharmacyReview',
    menuIcon: 'zyy-yfsh',
    iconType: 'Zyy Icons',
    enable: true,
    closable: true
  },
  {
    id: '6-2',
    parentId: '6',
    menuRouteName: '6-2',
    menuRoute: '6-2',
    menuName: '药房列表',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'DrugStore/DrugStore',
    menuIcon: 'zyy-yflb',
    iconType: 'Zyy Icons',
    enable: true,
    closable: true
  }
]
