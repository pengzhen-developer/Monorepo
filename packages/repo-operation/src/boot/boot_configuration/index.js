import configuration_nav_home from './configuration_nav_home'
import configuration_nav_platform from './configuration_nav_platform'
import configuration_nav_nethospital from './configuration_nav_nethospital'
import configuration_nav_rationaldruguse from './configuration_nav_rationaldruguse'
import configuration_nav_prescription from './configuration_nav_prescription'
import configuration_nav_drugsupplie from './configuration_nav_drugsupplie'

// 功能内部跳转，不依赖导航
import configuration_nav_nihility from './configuration_nav_nihility'

export default {
  /**
   * 应用程序设定
   *
   */
  application: {
    title: '运营中心'
  },

  /**
   * 主题设定
   *
   * 可选： #00C6AE / #3099A6
   */
  theme: {
    primary: '#3099A6'
  },

  /**
   * 路由设定
   *
   * webpack 要求明确的后缀文件，以支持 xxx-loader 解析
   * 本项目默认使用 index.js 作为组件入口文件
   * 在 generateRoutes.js 文件中，渲染动态路时，以 `${path}.js` 形式进行异步加载
   * 参考如下声明方式：
   *
   * // >>> index.js
   *
   * // 加载指定 vue 组件
   * // 默认导出 vue 组件
   * import index from './src/index.vue'
   * export default index
   *
   */
  routes: {
    /**
     * layout nav 导航配置
     *
     */
    layoutNavMenu: [
      /** 首页路由 */
      ...configuration_nav_home,

      /** 平台管理路由 */
      ...configuration_nav_platform,

      /** 互医管理路由 */
      ...configuration_nav_nethospital,

      /** 合理用药管理路由 */
      ...configuration_nav_rationaldruguse,

      /** 处方共享管理路由 */
      ...configuration_nav_prescription,

      /** 药品供应管理路由 */
      ...configuration_nav_drugsupplie
    ],

    /**
     * hybrid nav 导航配置
     *
     */
    hybridNavMenu: [
      // .e.g
      // {
      //   title: 'title',
      //   menuRouteName: 'route name',
      //   menuRoute: 'health/pacs',
      //   menuPath: 'views/hybrid/health/pacs'
      // }
    ],

    /**
     * nihility nav 导航配置
     *
     */
    nihilityNavMenu: [
      /** nihility 路由 */
      /** 该路由不会暴露在 nav 上，但可通过调用 addTab 显示在 LayoutTabs.vue 组件上*/
      /** 同样遵循 iframe or not iframe 规则 */
      ...configuration_nav_nihility
    ]
  }
}
