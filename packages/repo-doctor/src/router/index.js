import Vue from 'vue'
import Router from 'vue-router'

import peace from '@src/library'

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
            component: () => import('@src/views/Home.vue')
          },

          // 诊室 - 我的问诊
          {
            path: '/clinic/inquiry',
            name: '/clinic/inquiry',
            meta: { Auth: true },
            component: () => import('@src/views/clinic/inquiry/index.vue')
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
            component: () => import('@src/views/patient/patientDetail/Report.vue')
          },

          // 记录 - 问诊记录
          {
            path: '/record/inquiry',
            name: '/record/inquiry',
            meta: { Auth: true },
            component: () => import('@src/views/record/inquiry/index.vue')
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
            component: () => import('@src/views/sys/myServiceTime/index.vue')
          },
          // 我的 - 服务设定
          {
            path: '/sys/myServiceSetting',
            name: '/sys/myServiceSetting',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myServiceSetting/index.vue')
          },
          // 我的 - 我的药房
          {
            path: '/sys/myPharmacy',
            name: '/sys/myPharmacy',
            meta: { Auth: true },
            component: () => import('@src/views/sys/myPharmacy/index.vue')
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
        component: () => import('@src/views/Login.vue')
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
      peace.referrer = to

      // 验证权限
      if (peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)) {
        return next()
      } else {
        return next(peace.config.system.noAuthPage)
      }
    }
  })

  return router
}
