/** 互联网医院 - 机构端 */

export default [
  /** 首页 */

  {
    id: '3-1',
    parentId: null,
    menuRoute: 'home',
    menuRouteName: 'home',
    menuName: '首页',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'home',
    menuIcon: 'el-icon-s-home',
    iconType: 'Element-UI Icons',
    enable: null,
    closable: null
  },
  /**医院 */
  {
    id: '3-2',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '医院',
    menuPath: null,
    menuIcon: 'local_hospital',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-2-1',
    parentId: '3-2',
    menuRoute: 'hospital/info',
    menuRouteName: 'hospital/info',
    menuName: '基本信息',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'hospital/info',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-2-2',
    parentId: '3-2',
    menuRoute: 'hospital/department',
    menuRouteName: 'hospital/department',
    menuName: '科室信息',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'hospital/department',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-2-3',
    parentId: '3-2',
    menuRoute: 'hospital/doctor-list',
    menuRouteName: 'hospital/doctor-list',
    menuName: '医生列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'hospital/doctor-list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-2-4',
    parentId: '3-2',
    menuRoute: 'hospital/drug-list',
    menuRouteName: 'hospital/drug-list',
    menuName: '药品数据',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'hospital/drug-list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-2-5',
    parentId: '3-2',
    menuRoute: 'hospital/notice',
    menuRouteName: 'hospital/notice',
    menuName: '医院通知',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'hospital/notice',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**患者 */
  {
    id: '3-3',
    parentId: null,
    menuRoute: 'patient/list',
    menuRouteName: '患者列表',
    menuName: '患者',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'patient/list',
    menuIcon: 'el-icon-s-custom',
    iconType: 'Element-UI Icons',
    enable: true,
    closable: true
  },
  /**咨询 */
  {
    id: '3-4',
    parentId: null,
    menuRoute: 'inquiry/list',
    menuRouteName: 'inquiry/list',
    menuName: '问诊',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'inquiry/list',
    menuIcon: 'question_answer',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  /**处方 */
  {
    id: '3-5',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '处方',
    menuPath: null,
    menuIcon: 'el-icon-s-order',
    iconType: 'Element-UI Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-5-1',
    parentId: '3-5',
    menuRoute: 'prescription/list',
    menuRouteName: 'prescription/list',
    menuName: '处方记录',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'prescription/list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-5-2',
    parentId: '3-5',
    menuRoute: 'prescription/medicineList',
    menuRouteName: 'prescription/medicineList',
    menuName: '购药订单',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'prescription/medicineList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**转诊 */
  {
    id: '3-6',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '转诊',
    menuPath: null,
    menuIcon: 'shop_two',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-6-1',
    parentId: '3-6',
    menuRoute: 'referral/out',
    menuRouteName: 'referral/out',
    menuName: '转出列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'referral/out',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-6-2',
    parentId: '3-6',
    menuRoute: 'referral/in',
    menuRouteName: 'referral/in',
    menuName: '转入列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'referral/in',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**会诊 */
  {
    id: '3-7',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '会诊',
    menuPath: null,
    menuIcon: 'el-icon-s-platform',
    iconType: 'Element-UI Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-7-1',
    parentId: '3-7',
    menuRoute: 'consultation/apply',
    menuRouteName: 'consultation/apply',
    menuName: '发起列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'consultation/apply',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-7-2',
    parentId: '3-7',
    menuRoute: 'consultation/invite',
    menuRouteName: 'consultation/invite',
    menuName: '邀请列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'consultation/invite',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**挂号 */
  {
    id: '3-8',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '挂号',
    menuPath: null,
    menuIcon: 'note_add',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-8-1',
    parentId: '3-8',
    menuRoute: 'registered/scheduling',
    menuRouteName: 'registered/scheduling',
    menuName: '排班管理',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'registered/scheduling',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-8-2',
    parentId: '3-8',
    menuRoute: 'registered/source',
    menuRouteName: 'registered/source',
    menuName: '号源管理',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'registered/source',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-8-3',
    parentId: '3-8',
    menuRoute: 'registered/order',
    menuRouteName: 'registered/order',
    menuName: '挂号订单',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'registered/order',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**复诊 */
  {
    id: '3-9',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '复诊',
    menuPath: null,
    menuIcon: 'restore_page',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-9-1',
    parentId: '3-9',
    menuRoute: 'retalk/scheduling',
    menuRouteName: 'retalk/scheduling',
    menuName: '复诊排班',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'retalk/scheduling',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-9-2',
    parentId: '3-9',
    menuRoute: 'retalk/source',
    menuRouteName: 'retalk/source',
    menuName: '复诊号源',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'retalk/source',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-9-3',
    parentId: '3-9',
    menuRoute: 'retalk/order',
    menuRouteName: 'retalk/order',
    menuName: '预约订单',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'retalk/order',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**检查 */
  {
    id: '3-10',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '检查',
    menuPath: null,
    menuIcon: 'article',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-10-1',
    parentId: '3-10',
    menuRoute: 'examine/list',
    menuRouteName: 'examine/list',
    menuName: '项目检查',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'examine/list',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-10-2',
    parentId: '3-10',
    menuRoute: 'examine/order',
    menuRouteName: 'examine/order',
    menuName: '订单列表',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'examine/order',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  /**设置 */
  {
    id: '3-11',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '设置',
    menuPath: null,
    menuIcon: 'settings',
    iconType: 'Material Icons',
    enable: true,
    closable: true
  },
  {
    id: '3-11-1',
    parentId: '3-11',
    menuRoute: 'setup/config',
    menuRouteName: 'setup/config',
    menuName: '服务设置',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'setup/config',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-11-2',
    parentId: '3-11',
    menuRoute: 'setup/index',
    menuRouteName: 'setup/index',
    menuName: '系统设置',
    menuPath: process.env.VUE_APP_ORGANIZATION_SITE + 'setup/index',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
