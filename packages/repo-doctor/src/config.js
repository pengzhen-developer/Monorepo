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
    title: '万家云医医生工作站',

    /**
     * 无权限访问页
     */
    noAuthPage: '/login',

    /**
     * 登录页
     */
    loginPage: '/login'
  },

  /**
   * 静态菜单配置项
   */
  menu: {
    /**
     * 菜单 array
     */
    menuList: [
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
    ]
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
  }
}

export default config
