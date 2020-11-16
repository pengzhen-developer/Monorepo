export default {
  /**
   * 应用程序设定
   *
   */
  application: {
    title: '医生工作台'
  },

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
      // .e.g
      // {
      //   title: 'title',
      //   menuRouteName: 'route name',
      //   menuRoute: 'health/pacs',
      //   menuPath: 'views/health/pacs'
      // }

      {
        id: 1,
        pid: null,
        closable: false,
        name: '首页',
        title: '首页',
        path: '/home',
        icon: 'icon_nav_icon_homecopy'
      },
      {
        id: 2,
        pid: null,
        closable: true,
        name: '诊室',
        title: '诊室',
        path: '',
        icon: 'icon_ic_consultingroom'
      },
      {
        id: 21,
        pid: 2,
        closable: true,
        name: '在线咨询',
        title: '在线咨询',
        path: '/clinic/inquiry'
      },
      {
        id: 21,
        pid: 2,
        closable: true,
        name: '复诊续方',
        title: '复诊续方',
        path: '/clinic/returnVisit'
      },
      {
        id: 23,
        pid: 2,
        closable: true,
        name: '我的会诊',
        title: '我的会诊',
        path: '/clinic/consultation'
      },
      {
        id: 3,
        pid: null,
        closable: true,
        name: '患者',
        path: '患者',
        icon: 'icon_ic_huanzhe'
      },
      {
        id: 31,
        pid: 3,
        closable: true,
        name: '我的患者',
        title: '我的患者',
        path: '/patient/myPatient'
      },
      {
        id: 32,
        pid: 3,
        closable: true,
        name: '私人医生',
        title: '私人医生',
        path: '/patient/privateDoctor'
      },
      {
        id: 33,
        pid: 3,
        closable: true,
        name: '患者随访',
        title: '患者随访',
        path: '/patient/follow'
      },
      {
        id: 4,
        pid: null,
        closable: true,
        name: '记录',
        path: '记录',
        icon: 'icon_ic_inquiry'
      },
      {
        id: 41,
        pid: 4,
        closable: true,
        name: '咨询记录',
        title: '咨询记录',
        path: '/record/inquiry'
      },
      {
        id: 42,
        pid: 4,
        closable: true,
        name: '复诊记录',
        title: '复诊记录',
        path: '/record/returnVisit'
      },
      {
        id: 43,
        pid: 4,
        closable: true,
        name: '处方记录',
        title: '处方记录',
        path: '/record/prescription'
      },
      {
        id: 44,
        pid: 4,
        closable: true,
        name: '转诊记录',
        title: '转诊记录',
        path: '/record/transfer'
      },
      {
        id: 45,
        pid: 4,
        closable: true,
        name: '会诊记录',
        title: '会诊记录',
        path: '/record/consultation'
      },
      {
        id: 5,
        pid: null,
        closable: true,
        name: '我的',
        path: '我的',
        icon: 'icon_ic_my'
      },
      {
        id: 51,
        pid: 5,
        closable: true,
        name: '信息查看',
        title: '信息查看',
        path: '/sys/myInfo'
      },
      {
        id: 52,
        pid: 5,
        closable: true,
        name: '我的介绍',
        title: '我的介绍',
        path: '/sys/myIntroduce'
      },
      {
        id: 53,
        pid: 5,
        closable: true,
        name: '出诊时间',
        title: '出诊时间',
        path: '/sys/myServiceTime'
      },
      {
        id: 54,
        pid: 5,
        closable: true,
        name: '服务设置',
        title: '服务设置',
        path: '/sys/myServiceSetting'
      },
      {
        id: 55,
        pid: 5,
        closable: true,
        name: '我的药房',
        title: '我的药房',
        path: '/sys/myPharmacy'
      },
      {
        id: 56,
        pid: 5,
        closable: true,
        name: '我的随访',
        title: '我的随访',
        path: '/sys/myFollow'
      }
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
