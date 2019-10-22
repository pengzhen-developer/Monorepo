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
     * 无权限访问页
     */
    noAuthPage: '/login',

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
  APPID: process.env.VUE_APP_APPID
}

export default config
