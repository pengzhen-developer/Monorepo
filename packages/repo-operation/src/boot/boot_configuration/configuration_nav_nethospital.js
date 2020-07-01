export default [
  {
    id: '3',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '互医管理',
    menuPath: null,
    menuIcon: 'toll',
    iconType: 'Material Icons',
    enable: true,
    closable: null
  },

  {
    id: '3-1',
    parentId: '3',
    menuRoute: null,
    menuRouteName: null,
    menuName: '医生管理',
    menuPath: null,
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '3-1-1',
    parentId: '3-1',
    menuRouteName: '3-1-1',
    menuRoute: '3-1-1',
    menuName: '医生列表',
    menuPath: 'http://localhost:8083/#/doctor/list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-1-2',
    parentId: '3-1',
    menuRouteName: '3-1-2',
    menuRoute: '3-1-2',
    menuName: '入驻列表',
    menuPath: 'http://localhost:8083/#/doctor/settled',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
