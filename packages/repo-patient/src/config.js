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
    base: 'https://devpatient.hp.aijiayi.com/'
  },

  /**
   * IM 配置项
   */
  NIM: {
    //987faa06038223aa9151e8e6e974314e
    //a5b5212d7ff034b508d6e889040ffdf7
    key: '987faa06038223aa9151e8e6e974314e'
  }
}

export default config
