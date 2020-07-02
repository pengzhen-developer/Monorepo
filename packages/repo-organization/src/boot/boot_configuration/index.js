import Peace from '@src/library'

import configuration_nav_console from './configuration_nav_console'
import configuration_nav_organization from './configuration_nav_organization'
import configuration_nav_prescription from './configuration_nav_prescription'
import configuration_nav_rationaldruguse from './configuration_nav_rationaldruguse'
import configuration_nav_drugsupplie from './configuration_nav_drugsupplie'

/** 控制台 - 加载子系统 */
/** 思路： */
/** 通过 url 参数加载子系统配置文件 */
/** 通过 document.referrer 验证， document.referrer 为控制台则需要缓存 url 信息，便于刷新后重载 */

if (document.referrer.indexOf(window.location.origin) !== -1) {
  const ORIGINAL_HREF = window.sessionStorage.getItem('ORIGINAL_HREF')

  /** 子站，首次进入 */
  // 清理必要信息
  if (ORIGINAL_HREF === null) {
    window.sessionStorage.clear()
  }

  window.sessionStorage.setItem('ORIGINAL_HREF', ORIGINAL_HREF || window.location.href)
}

/** 动态菜单 */
const dynamicTitle = () => {
  const title = Peace.util.queryUrlParam('title', window.sessionStorage.getItem('ORIGINAL_HREF'))

  return title ?? '智药云控制台'
}

/** 动态配置 */
const dynimicRoutes = () => {
  const configuration = Peace.util.queryUrlParam('configuration', window.sessionStorage.getItem('ORIGINAL_HREF'))

  switch (configuration) {
    case 'prescription':
      return configuration_nav_prescription

    case 'organization':
      return configuration_nav_organization

    case 'rationaldruguse':
      return configuration_nav_rationaldruguse

    case 'drugsupplie':
      return configuration_nav_drugsupplie

    default:
      return configuration_nav_console
  }
}

export default {
  /**
   * 应用程序设定
   *
   */
  application: {
    title: dynamicTitle()
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
      /** 动态路由 */
      ...dynimicRoutes()
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
    ]
  }
}
