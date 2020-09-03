export default [
  {
    id: '1',
    parentId: null,
    menuRoute: '/home/dashboard',
    menuRouteName: 'home/dashboard',
    menuName: '首页',
    menuPath: 'views/home/dashboard',
    menuIcon: 'el-icon-s-home',
    iconType: 'Element-UI Icons',
    enable: null,
    closable: null
  },

  {
    id: '2',
    parentId: null,
    menuRouteName: null,
    menuRoute: null,
    menuName: '账号中心',
    menuPath: null,
    menuIcon: 'el-icon-s-custom',
    iconType: 'Element-UI Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-1',
    parentId: '2',
    menuRouteName: 'account/base',
    menuRoute: '/account/base',
    menuName: '基本信息',
    menuPath: 'views/account/base',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },

  {
    id: '2-2',
    parentId: '2',
    menuRouteName: 'account/security',
    menuRoute: '/account/security',
    menuName: '安全信息',
    menuPath: 'views/account/security',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },

  {
    id: '3',
    parentId: null,
    menuRouteName: null,
    menuRoute: null,
    menuName: '我的服务',
    menuPath: null,
    menuIcon: 'el-icon-menu',
    iconType: 'Element-UI Icons',
    enable: null,
    closable: null
  },

  {
    id: '3-1',
    parentId: '3',
    menuRouteName: 'service/list',
    menuRoute: '/service/list',
    menuName: '服务列表',
    menuPath: 'views/service/list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },

  {
    id: '3-2',
    parentId: '3',
    menuRouteName: 'service/certificate',
    menuRoute: '/service/certificate',
    menuName: '服务凭证',
    menuPath: 'views/service/certificate',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
