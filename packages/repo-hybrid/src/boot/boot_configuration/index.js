export default {
  /**
   * 主题设定
   *
   * 可选： #00C6AE / #3099A6
   */
  theme: {
    primary: '#00C6AE'
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
    layoutNavMenu: [],

    /**
     * hybrid nav 导航配置
     *
     */
    hybridNavMenu: [
      // 健康档案 - 影像 PACS
      {
        title: '报告单',
        menuRouteName: 'pacs',
        menuRoute: 'health/pacs/:platform/:token/:checkId',
        menuPath: 'views/hybrid/health/pacs'
      },
      // 健康档案 - 检验 inspection
      {
        title: '报告单',
        menuRouteName: 'inspection',
        menuRoute: 'health/inspection/:platform/:token/:checkId',
        menuPath: 'views/hybrid/health/inspection'
      },

      // 健康档案处方记录
      {
        title: '处方记录',
        menuRouteName: 'inspection',
        menuRoute: 'health/firstOption/:platform/:token/:prescriptionCode',
        menuPath: 'views/hybrid/health/firstOption'
      },

      // 隐私协议
      {
        title: '隐私政策',
        menuRouteName: 'privacyAgreement',
        menuRoute: 'agreements/privacyAgreement/:platform',
        menuPath: 'views/hybrid/agreements/privacyAgreement'
      },
      // 用户协议
      {
        title: '用户协议',
        menuRouteName: 'userAgreement',
        menuRoute: 'agreements/userAgreement/:platform',
        menuPath: 'views/hybrid/agreements/userAgreement'
      },
      // 关于我们
      {
        title: '关于我们',
        menuRouteName: 'aboutUs',
        menuRoute: 'agreements/aboutUs/:platform',
        menuPath: 'views/hybrid/agreements/aboutUs'
      },
      // 关于我们
      {
        title: '宣传页',
        menuRouteName: 'transferPage',
        menuRoute: 'transferPage',
        menuPath: 'views/hybrid/transferPage'
      }
    ]
  }
}
