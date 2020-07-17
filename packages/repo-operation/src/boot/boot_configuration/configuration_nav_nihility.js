export default [
  {
    id: '2',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药品供应管理',
    menuPath: null,
    menuIcon: null,
    iconType: null,
    enable: null,
    closable: null
  },
  {
    id: '999-1',
    parentId: '2',
    menuRouteName: '999-1',
    menuRoute: '999-1',
    menuName: '服务详情',
    menuPath: process.env.VUE_APP_NETHOSPITAL + '/organization/details/',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },

  {
    id: '4',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '合理用药管理',
    menuPath: null,
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: null
  },

  {
    id: '44-1',
    parentId: '4',
    menuRoute: '44-1',
    menuRouteName: '44-1',
    menuName: '审方方案',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'PrescriptionProject/ProjectListZyy',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
