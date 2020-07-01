/** 处方共享管理 - 机构端 */

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
    enable: null,
    closable: null
  },

  {
    id: '2-2-1',
    parentId: '2-2',
    menuRouteName: 'demo - link',
    menuRoute: 'demo - link',
    menuName: 'demo - link',
    menuPath: process.env.VUE_APP_PRESCRIPTION_SITE + 'Pharmacy/Goods',
    menuIcon: null,
    iconType: null,
    enable: true,
    closable: true
  }
]
