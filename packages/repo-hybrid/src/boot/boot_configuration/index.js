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
    layoutNavMenu: [
      {
        id: '1',
        parentId: null,
        menuRoute: null,
        menuRouteName: null,
        menuName: '用户管理',
        menuPath: null,
        menuIcon: 'AcUnit',
        iconType: 'Material Icons'
      },

      {
        id: '1-1',
        parentId: '1',
        menuRouteName: 'home/dashboard',
        menuRoute: 'home/dashboard',
        menuName: '账号管理',
        menuPath: 'views/home/dashboard',
        menuIcon: 'AcUnit',
        iconType: 'Material Icons',
        closable: true
      },
      {
        id: '1-2',
        parentId: '1',
        menuRouteName: 'not-found',
        menuRoute: 'not-found',
        menuName: '机构管理',
        menuPath: '',
        menuIcon: 'AcUnit',
        iconType: 'Material Icons',
        closable: true
      },

      {
        id: '2',
        parentId: null,
        menuRouteName: null,
        menuRoute: null,
        menuName: '审核管理',
        menuPath: null,
        menuIcon: 'el-icon-location',
        iconType: 'Element-UI Icons',
        closable: true
      },
      {
        id: '2-1',
        parentId: '2',
        menuRouteName: 'not-found',
        menuRoute: 'not-found',
        menuName: '资质认证',
        menuPath: '',
        menuIcon: 'AcUnit',
        iconType: 'Material Icons',
        closable: true
      },
      {
        id: '2-2',
        parentId: '2',
        menuRouteName: 'not-found',
        menuRoute: 'not-found',
        menuName: '服务开通',
        menuPath: '',
        menuIcon: 'AcUnit',
        iconType: 'Material Icons',
        closable: true
      }
    ],

    /**
     * hybrid nav 导航配置
     *
     */
    hybridNavMenu: [
      // hybrid - demo
      {
        menuRouteName: 'ctDetails',
        menuRoute: 'health/ctDetails/:platform?/:token?/:checkId?',
        menuPath: 'views/hybrid/health/ctDetails'
      },
      {
        menuRouteName: 'health',
        menuRoute: 'health/:platform?/:token?',
        menuPath: 'views/hybrid/health'
      },
      {
        menuRouteName: 'privacyAgreement',
        menuRoute: 'agreements/privacyAgreement/:platform?/:token?',
        menuPath: 'views/hybrid/agreements/privacyAgreement'
      },
      {
        menuRouteName: 'userAgreement',
        menuRoute: 'agreements/userAgreement/:platform?/:token?',
        menuPath: 'views/hybrid/agreements/userAgreement'
      },
      {
        menuRouteName: 'bloodRoutine',
        menuRoute: 'health/checkOrder/bloodRoutine/:platform?/:token?',
        menuPath: 'views/hybrid/health/checkOrder/bloodRoutine'
      }
    ]
  }
}
