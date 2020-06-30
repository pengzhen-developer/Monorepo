export default [
  {
    id: '2',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '平台管理',
    menuPath: null,
    menuIcon: 'toll',
    iconType: 'Material Icons',
    menuType: 'iframe',
    enable: true,
    closable: null
  },

  {
    id: '2-1',
    parentId: '2',
    menuRoute: null,
    menuRouteName: null,
    menuName: '用户管理',
    menuPath: null,
    menuIcon: 'supervisor_account',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '2-1-1',
    parentId: '2-1',
    menuRouteName: 'platform/user/account',
    menuRoute: 'platform/user/account',
    menuName: '账号管理',
    menuPath: 'views/platform/user/account',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-1-2',
    parentId: '2-1',
    menuPath: null,
    menuRouteName: null,
    menuRoute: null,
    menuName: '机构管理',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },

  {
    id: '2-2',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '审核管理',
    menuPath: null,
    menuIcon: 'how_to_reg',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-2-1',
    parentId: '2-2',
    menuRouteName: 'not-found',
    menuRoute: 'not-found',
    menuName: '资质认证',
    menuPath: '',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },
  {
    id: '2-2-2',
    parentId: '2-2',
    menuRouteName: 'not-found',
    menuRoute: 'not-found',
    menuName: '服务开通',
    menuPath: '',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },

  {
    id: '2-3',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '配置管理',
    menuPath: null,
    menuIcon: 'settings',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-3-1',
    parentId: '2-3',
    menuRouteName: 'platform/setting/drugFlowSetting',
    menuRoute: 'platform/setting/drugFlowSetting',
    menuName: '流向配置',
    menuPath: 'views/platform/setting/drugFlowSetting',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-2',
    parentId: '2-3',
    menuRouteName: 'not-found',
    menuRoute: 'not-found',
    menuName: '药企配置',
    menuPath: '',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },

  {
    id: '2-4',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '订单管理',
    menuPath: null,
    menuIcon: 'low_priority',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-4-1',
    parentId: '2-4',
    menuRouteName: 'order',
    menuRoute: 'order',
    menuName: '订单概览',
    menuPath: process.env.VUE_APP_MOCK_API + 'OrderManage/OrderManage?CustType=10',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-4-2',
    parentId: '2-4',
    menuRouteName: null,
    menuRoute: null,
    menuName: '订单明细',
    menuPath: '',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },
  {
    id: '2-4-3',
    parentId: '2-4',
    menuRouteName: null,
    menuRoute: null,
    menuName: '售后订单',
    menuPath: '',
    menuIcon: null,
    iconType: null,
    enable: false,
    closable: true
  },

  {
    id: '2-5',
    parentId: '2',
    menuRouteName: 'baidu',
    menuRoute: 'baidu',
    menuName: '测试',
    menuPath: 'https://www.baidu.com/',
    menuIcon: 'hourglass_empty',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },

  {
    id: '2-6',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '日志管理',
    menuPath: null,
    menuIcon: 'settings',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-6-1',
    parentId: '2-6',
    menuRouteName: 'platform/logger/recordList',
    menuRoute: 'platform/logger/recordList',
    menuName: '日志记录',
    menuPath: 'views/platform/logger/recordList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
]
