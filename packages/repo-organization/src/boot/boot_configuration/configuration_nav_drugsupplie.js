/** 药品供应管理 - 机构端 */

export default [
  {
    id: '2-2',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '首页',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: false,
    closable: null
  },

  {
    id: '3-3',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药品管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '3-3-1',
    parentId: '3-3',
    menuRouteName: '药品目录',
    menuRoute: '药品目录',
    menuName: '药品目录',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'HospitalDrug/DrugList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-2',
    parentId: '3-3',
    menuRouteName: '药品配码',
    menuRoute: '药品配码',
    menuName: '药品配码',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'DrugsMapping/JntCustDrugsMapping',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '3-3-3',
    parentId: '3-3',
    menuRouteName: '药品审核',
    menuRoute: '药品审核',
    menuName: '药品审核',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'DrugsMapping/JntCustDrugsMappingExamine',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '4-4',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '药房管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '4-4-1',
    parentId: '4-4',
    menuRouteName: '药房列表',
    menuRoute: '药房列表',
    menuName: '药房列表',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Suborganization/StoreSuborganization',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  },
  {
    id: '5-5',
    parentId: null,
    menuRoute: null,
    menuRouteName: null,
    menuName: '订单管理',
    menuPath: null,
    menuIcon: 'dashboard',
    iconType: 'Material Icons',
    enable: null,
    closable: null
  },

  {
    id: '5-5-1',
    parentId: '5-5',
    menuRouteName: '订单列表',
    menuRoute: '订单列表',
    menuName: '订单列表',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'orderList/orderList',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
