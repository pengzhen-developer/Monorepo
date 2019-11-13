/*
 * @Author: PengZhen
 * @Description: 程序配置文件
 * @Date: 2017-12-05
 */

export const config = {
  /**
   * 系统配置项
   */
  system: {
    /**
     * 系统标题
     */
    title: '互联网医院',

    /**
     * 微信授权
     */
    authPage: '/WXAuth',

    /**
     * 错误页
     */
    errorPage: '/errorPage',

    /**
     * 登录页
     */
    loginPage: '/login',

    /**
     * 首页
     */
    homePage: '/home/index'
  },

  /**
   * 静态菜单配置项
   */
  menu: {
    /**
     * 菜单 array
     */
    menuList: []
  },

  /**
   * 健康档案配置项
   */
  file: {
    unit: {
      血压: 'mmHg',
      血糖: 'mmol/L',
      血氧: '%',
      体脂: '%'
    },

    type: {
      血压: '2',
      血糖: '1',
      血氧: '5',
      体脂: '8'
    },

    week: {
      血压: '304',
      血糖: '308'
    },

    month: {
      血压: '301',
      血糖: '302'
    }
  },

  /**
   * api 配置项
   */
  api: {
    base: process.env.VUE_APP_BASE_API
  },

  /**
   * IM 配置项
   */
  NIM: {
    key: process.env.VUE_APP_IM_KEY
  },

  /**
   * MAP 配置项
   */
  MAP: {
    key: process.env.VUE_APP_MAP_KEY
  },

  /**
   * 微信公众号 APPID
   */
  APPID: process.env.VUE_APP_APPID,

  /**
   * 渠道ID CHANNELID
   */
  CHANNELID: process.env.VUE_APP_CHANNELID
}

export default config
