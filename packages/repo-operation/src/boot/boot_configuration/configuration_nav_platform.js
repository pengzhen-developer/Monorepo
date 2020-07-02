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
    menuRouteName: 'platform/user/organization',
    menuRoute: 'platform/user/organization',
    menuName: '机构列表',
    menuPath: 'views/platform/user/organization',
    menuIcon: null,
    iconType: null,
    enable: true,
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
    menuRouteName: 'platform/check/qualification',
    menuRoute: 'platform/check/qualification',
    menuName: '资质认证',
    menuPath: 'views/platform/check/qualification',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-2-2',
    parentId: '2-2',
    menuRouteName: 'platform/check/service',
    menuRoute: 'platform/check/service',
    menuName: '服务开通',
    menuPath: 'views/platform/check/service',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },

  {
    id: '2-3',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '基础数据',
    menuPath: null,
    menuIcon: 'el-icon-s-shop',
    iconType: 'Element-UI Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-3-1',
    parentId: '2-3',
    menuRouteName: '2-3-1',
    menuRoute: '2-3-1',
    menuName: '药品目录',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'DrugData/DrugData',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-2',
    parentId: '2-3',
    menuRouteName: '2-3-2',
    menuRoute: '2-3-2',
    menuName: '给药途径',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'DrugData/Route',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-3',
    parentId: '2-3',
    menuRouteName: '2-3-3',
    menuRoute: '2-3-3',
    menuName: '给药频次',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'DrugData/Frequency',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-4',
    parentId: '2-3',
    menuRouteName: '2-3-4',
    menuRoute: '2-3-4',
    menuName: '药品单位',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'DrugData/Unit',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-5',
    parentId: '2-3',
    menuRouteName: '2-3-5',
    menuRoute: '2-3-5',
    menuName: '药品说明书',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'knowledgebase/web?uri=knowledgeBaseManage/drugsInstructions/drugsInstructionList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-3-6',
    parentId: '2-3',
    menuRouteName: '2-3-6',
    menuRoute: '2-3-6',
    menuName: '药品说明书审核',
    menuPath: process.env.VUE_APP_OPERATION_SITE + 'knowledgebase/web?uri=knowledgeBaseExamine/drugsInstructions/instructionExamineList.html',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '2-4',
    parentId: '2',
    menuRouteName: null,
    menuRoute: null,
    menuName: '日志管理',
    menuPath: null,
    menuIcon: 'archive',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },
  {
    id: '2-4-1',
    parentId: '2-4',
    menuRouteName: 'platform/logger/recordList',
    menuRoute: 'platform/logger/recordList',
    menuName: '日志记录',
    menuPath: 'views/platform/logger/recordList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
