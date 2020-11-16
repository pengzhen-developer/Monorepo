import Vue from 'vue'
import Router from 'vue-router'

import util from '@src/util'

export default function() {
  Vue.use(Router)

  const router = new Router({
    routes: [
      {
        path: '/',
        name: '/',
        meta: { Auth: true },
        component: () => import('@src/views/components/layout/index.vue'),
        children: [
          // 首页
          {
            path: '/home',
            name: '/home',
            meta: { Auth: true },
            component: () => import('@src/views/home')
          },

          // 诊室 - 在线咨询
          {
            path: '/clinic/inquiry',
            name: '/clinic/inquiry',
            meta: { Auth: true },
            component: () => import('@src/views/clinic/inquiry')
          },
          // 诊室 - 复诊续方
          {
            path: '/clinic/returnVisit',
            name: '/clinic/returnVisit',
            meta: { Auth: true },
            component: () => import('@src/views/clinic/returnVisit')
          },
          // 诊室 - 我的会诊
          {
            path: '/clinic/consultation',
            name: '/clinic/consultation',
            meta: { Auth: true },
            component: () => import('@src/views/clinic/consultation/index.vue')
          },

          // 患者 - 我的患者
          {
            path: '/patient/myPatient',
            name: '/patient/myPatient',
            meta: { Auth: true },
            component: () => import('@src/views/patient/myPatient/index.vue')
          },
          // 患者 - 私人医生
          {
            path: '/patient/privateDoctor',
            name: '/patient/privateDoctor',
            meta: { Auth: true },
            component: () => import('@src/views/patient/privateDoctor/index.vue')
          },
          // 患者 - 患者随访
          {
            path: '/patient/follow',
            name: '/patient/follow',
            meta: { Auth: true },
            component: () => import('@src/views/patient/follow/index.vue')
          },

          // 患者 - 患者详情
          {
            path: '/patient/patientDetail/:id',
            name: '/patient/patientDetail',
            meta: { Auth: true },
            component: () => import('@src/views/patient/patientDetail/index.vue')
          },
          // 患者 - 患者详情 - 患者报告
          {
            path: '/patient/patientDetail/Report/:dataId/:idCard/:serviceId/:type',
            name: '/patient/patientDetail/Report',
            meta: { Auth: true },
            component: () => import('@src/views/patient/patientDetail/components/Report.vue')
          },

          // 记录 - 问诊记录
          {
            path: '/record/inquiry',
            name: '/record/inquiry',
            meta: { Auth: true },
            component: () => import('@src/views/record/inquiry')
          },
          // 记录 - 复诊记录
          {
            path: '/record/returnVisit',
            name: '/record/returnVisit',
            meta: { Auth: true },
            component: () => import('@src/views/record/returnVisit')
          },
          // 记录 - 处方记录
          {
            path: '/record/prescription',
            name: '/record/prescription',
            meta: { Auth: true },
            component: () => import('@src/views/record/prescription/index.vue')
          },
          // 记录 - 转诊记录
          {
            path: '/record/transfer',
            name: '/record/transfer',
            meta: { Auth: true },
            component: () => import('@src/views/record/transfer/index.vue')
          },
          // 记录 - 会诊记录
          {
            path: '/record/consultation',
            name: '/record/consultation',
            meta: { Auth: true },
            component: () => import('@src/views/record/consultation/index.vue')
          },

          // 我的 - 信息查看
          {
            path: '/sys/myInfo',
            name: '/sys/myInfo',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myInfo/index.vue')
          },
          // 我的 - 我的介绍
          {
            path: '/sys/myIntroduce',
            name: '/sys/myIntroduce',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myIntroduce/index.vue')
          },
          // 我的 - 问诊时间
          {
            path: '/sys/myServiceTime',
            name: '/sys/myServiceTime',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myServiceTime')
          },
          // 我的 - 服务设定
          {
            path: '/sys/myServiceSetting',
            name: '/sys/myServiceSetting',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myServiceSetting')
          },
          // 我的 - 我的药房
          {
            path: '/sys/myPharmacy',
            name: '/sys/myPharmacy',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myPharmacy')
          },
          // 我的 - 我的随访
          {
            path: '/sys/myFollow',
            name: '/sys/myFollow',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myFollow/index.vue')
          }
        ]
      },
      {
        path: '/login',
        name: '/login',
        component: () => import('@src/views/login/index')
      },
      {
        path: '/noAuth',
        name: '/noAuth',
        component: () => import('@src/views/components/NoAuth.vue')
      },
      {
        path: '*',
        name: '*',
        component: () => import('@src/views/components/NotFound.vue')
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    // 1. 是否需要验证权限
    if (!to.meta.hasOwnProperty('Auth') || to.meta.Auth === false) {
      return next()
    }

    // 2. 需要验证权限的情况下
    if (to.meta.Auth === true) {
      // 记录 referrer
      Peace.referrer = to

      // 验证权限
      if (util.user.isSignIn()) {
        return next()
      } else {
        return next(Peace.config.system.noAuthPage)
      }
    }
  })

  return router
}
