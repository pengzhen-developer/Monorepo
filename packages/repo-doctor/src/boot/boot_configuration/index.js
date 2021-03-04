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
      {
        id: '1',
        closable: false,
        menuIcon: 'icon_nav_icon_homecopy',
        menuName: '首页',
        menuRoute: '/home',
        menuPath: 'views/home',
        enable: true,
        menuAlias: 'Home',
        virtual: 0
      },
      {
        id: '2',
        closable: true,
        menuIcon: 'icon_ic_consultingroom',
        menuName: '诊室',
        menuRoute: '',
        enable: true,
        menuAlias: '',
        virtual: 0,
        menuPath: ''
      },
      {
        id: '21',
        closable: true,
        menuName: '在线咨询',
        menuRoute: '/clinic/inquiry',
        menuPath: 'views/clinic/inquiry',
        parentId: '2',
        enable: true,
        menuAlias: 'ClinicInquiry',
        virtual: 0
      },
      {
        id: '22',
        closable: true,
        menuName: '复诊续方',
        menuRoute: '/clinic/returnVisit',
        menuPath: 'views/clinic/returnVisit',
        parentId: '2',
        enable: true,
        menuAlias: 'ClinicReturnVisit',
        virtual: 0
      },
      {
        id: '23',
        closable: true,
        menuName: '面诊开方',
        menuRoute: '/clinic/faceToFace',
        menuPath: 'views/clinic/faceToFace',
        parentId: '2',
        enable: true,
        menuAlias: 'ClinicfaceToFace',
        virtual: 0
      },
      // {
      //   id: '24',
      //   closable: true,
      //   menuName: '我的会诊',
      //   menuRoute: '/clinic/consultation',
      //   menuPath: 'views/clinic/consultation',
      //   parentId: '2',
      //   enable: true,
      //   menuAlias: 'ClinicConsultation',
      //   virtual: 0
      // },
      {
        id: '3',
        closable: true,
        menuIcon: 'icon_ic_huanzhe',
        menuName: '患者',
        menuRoute: '患者',
        enable: true,
        menuAlias: '',
        virtual: 0,
        menuPath: '患者'
      },
      {
        id: '31',
        closable: true,
        menuName: '我的患者',
        menuRoute: '/patient/myPatient',
        menuPath: 'views/patient/myPatient',
        parentId: '3',
        enable: true,
        menuAlias: 'MyPatient',
        virtual: 0
      },
      {
        id: '32',
        closable: true,
        menuName: '私人医生',
        menuRoute: '/patient/privateDoctor',
        menuPath: 'views/patient/privateDoctor',
        parentId: '3',
        enable: true,
        menuAlias: 'PrivateDoctor',
        virtual: 0
      },
      {
        id: '33',
        closable: true,
        menuName: '患者随访',
        menuRoute: '/patient/follow',
        menuPath: 'views/patient/follow',
        parentId: '3',
        enable: true,
        menuAlias: 'Follow',
        virtual: 0
      },
      {
        // 患者 - 患者详情
        id: '34',
        closable: true,
        menuName: '患者详情',
        menuRoute: '/patient/patientDetail/:id',
        menuPath: 'views/patient/patientDetail',
        parentId: '3',
        enable: true,
        menuAlias: 'PatientDetail',
        virtual: 1
      },
      {
        id: '4',
        closable: true,
        menuIcon: 'icon_ic_inquiry',
        menuName: '记录',
        menuRoute: '记录',
        enable: true,
        menuAlias: '',
        virtual: 0,
        menuPath: '记录'
      },
      {
        id: '41',
        closable: true,
        menuName: '咨询记录',
        menuRoute: '/record/inquiry',
        menuPath: 'views/record/inquiry',
        parentId: '4',
        enable: true,
        menuAlias: 'Inquiry',
        virtual: 0
      },
      {
        id: '42',
        closable: true,
        menuName: '复诊记录',
        menuRoute: '/record/returnVisit',
        menuPath: 'views/record/returnVisit',
        parentId: '4',
        enable: true,
        menuAlias: 'ReturnVisit',
        virtual: 0
      },
      {
        id: '43',
        closable: true,
        menuName: '处方记录',
        menuRoute: '/record/prescription',
        menuPath: 'views/record/prescription',
        parentId: '4',
        enable: true,
        menuAlias: 'Prescription',
        virtual: 0
      },
      {
        id: '35',
        closable: true,
        menuName: '质疑处方',
        menuRoute: '/record/prescription-doubt/:id',
        menuPath: 'views/record/prescription-doubt',
        parentId: '3',
        enable: true,
        menuAlias: 'PrescriptionDoubt',
        virtual: 1
      },
      {
        id: '44',
        closable: true,
        menuName: '转诊记录',
        menuRoute: '/record/transfer',
        menuPath: 'views/record/transfer',
        parentId: '4',
        enable: true,
        menuAlias: 'Transfer',
        virtual: 0
      },
      // {
      //   id: '45',
      //   closable: true,
      //   menuName: '会诊记录',
      //   menuRoute: '/record/consultation',
      //   menuPath: 'views/record/consultation',
      //   parentId: '4',
      //   enable: true,
      //   menuAlias: 'Consultation',
      //   virtual: 0
      // },
      {
        id: '5',
        closable: true,
        menuIcon: 'icon_ic_my',
        menuName: '我的',
        menuRoute: '我的',
        enable: true,
        menuAlias: '',
        virtual: 0,
        menuPath: '我的'
      },
      {
        id: '51',
        closable: true,
        menuName: '信息管理',
        menuRoute: '/sys/myInfo',
        menuPath: 'views/sys/myInfo',
        parentId: '5',
        enable: true,
        menuAlias: 'MyInfo',
        virtual: 0
      },
      {
        id: '52',
        closable: true,
        menuName: '我的介绍',
        menuRoute: '/sys/myIntroduce',
        menuPath: 'views/sys/myIntroduce',
        parentId: '5',
        enable: true,
        menuAlias: 'MyIntroduce',
        virtual: 0
      },
      {
        id: '53',
        closable: true,
        menuName: '出诊时间',
        menuRoute: '/sys/myServiceTime',
        menuPath: 'views/sys/myServiceTime',
        parentId: '5',
        enable: true,
        menuAlias: 'MyServiceTime',
        virtual: 0
      },
      {
        id: '54',
        closable: true,
        menuName: '服务设置',
        menuRoute: '/sys/myServiceSetting',
        menuPath: 'views/sys/myServiceSetting',
        parentId: '5',
        enable: true,
        menuAlias: 'MyServiceSetting',
        virtual: 0
      },
      {
        id: '55',
        closable: true,
        menuName: '我的药房',
        menuRoute: '/sys/myPharmacy',
        menuPath: 'views/sys/myPharmacy',
        parentId: '5',
        enable: true,
        menuAlias: 'MyPharmacy',
        virtual: 0
      },
      {
        id: '56',
        closable: true,
        menuName: '我的随访',
        menuRoute: '/sys/myFollow',
        menuPath: 'views/sys/myFollow',
        parentId: '5',
        enable: true,
        menuAlias: 'MyFollow',
        virtual: 0
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
