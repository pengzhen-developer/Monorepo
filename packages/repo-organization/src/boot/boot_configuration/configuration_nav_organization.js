/** 互联网医院 - 机构端 */

export default [
  {
    id: '3-3',
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
    id: '3-3-1',
    parentId: '3-3',
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
