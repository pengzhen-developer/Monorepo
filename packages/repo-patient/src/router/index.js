import Vue from 'vue'
import Router from 'vue-router'

import peace from '@src/library'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      meta: {
        auth: true
      },
      component: () => import('@src/views/components/layout/index.vue'),

      children: [
        // 首页
        {
          path: '/home/index',
          name: '/home/index',
          meta: {
            auth: true,
            tabBar: true
          },
          component: () => import('@src/views/home/index.vue')
        },
        // 消息
        {
          path: '/message/index',
          name: '/message/index',
          meta: {
            auth: true,
            tabBar: true
          },
          component: () => import('@src/views/message/index.vue')
        },

        // 健康档案
        {
          path: '/file/index',
          name: '/file/index',
          meta: {
            auth: true,
            tabBar: true
          },
          component: () => import('@src/views/file/index.vue')
        },
        // 我的
        {
          path: '/setting/index',
          name: '/setting/index',
          meta: {
            auth: true,
            tabBar: true
          },
          component: () => import('@src/views/setting/index.vue')
        },

        // 我的家人
        {
          path: '/setting/myFamilyMembers',
          name: '/setting/myFamilyMembers',
          meta: {
            auth: true,
            back: {
              title: '我的家人'
            }
          },
          component: () => import('@src/views/setting/MyFamilyMembers.vue')
        },

        // 医生列表
        {
          path: '/components/doctorList/:json',
          name: '/components/doctorList',
          meta: {
            auth: true,
            back: {
              title: '医生列表'
            }
          },
          component: () => import('@src/views/components/DoctorList.vue')
        },
        // 消息列表
        {
          path: '/components/messageList',
          name: '/components/messageList',
          meta: {
            auth: true,
            back: {
              visible: true,
              title: '消息列表'
            }
          },
          component: () => import('@src/views/components/MessageList.vue')
        },
        // 医生主页
        {
          path: '/components/doctorDetail',
          name: '/components/doctorDetail',
          meta: {
            auth: true,
            back: {
              title: '医生主页'
            }
          },
          component: () => import('@src/views/components/DoctorDetail.vue')
        },
        // 申请图文问诊
        {
          path: '/components/doctorInquiryApply',
          name: '/components/doctorInquiryApply',
          meta: {
            auth: true,
            back: {
              title: '图文咨询'
            }
          },
          component: () =>
            import('@src/views/components/DoctorInquiryApply.vue')
        },

        // 添加既往史
        {
          path: '/components/addIllnessHistory',
          name: '/components/addIllnessHistory',
          meta: {
            auth: true,
            back: {
              title: '添加过敏史'
            }
          },
          component: () => import('@src/views/components/AddIllnessHistory.vue')
        },
        // 添加过敏史
        {
          path: '/components/addAllergicHistory',
          name: '/components/addAllergicHistory',
          meta: {
            auth: true,
            back: {
              title: '添加过敏史'
            }
          },
          component: () =>
            import('@src/views/components/AddAllergicHistory.vue')
        },

        // 添加过敏史
        {
          path: '/components/informedConsent',
          name: '/components/informedConsent',
          meta: {
            auth: true,
            back: {
              title: '知情同意书'
            }
          },
          component: () => import('@src/views/components/InformedConsent.vue')
        }
      ]
    },

    {
      path: '/login',
      name: '/login',
      component: () => import('@src/views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  $peace.referrer = from

  // 默认开始 keepAlive, 根据 route 参数修改
  to.meta.keepAlive = true
  if (to.params.hasOwnProperty('keepAlive')) {
    to.meta.keepAlive = to.params.keepAlive
  }
  if (to.query.hasOwnProperty('keepAlive')) {
    to.meta.keepAlive = to.query.keepAlive
  }

  // 1. 是否需要验证权限
  if (!to.meta.hasOwnProperty('auth') || to.meta.auth === false) {
    return next()
  }

  // 2. 需要验证权限的情况下
  if (to.meta.auth === true) {
    // 记录 referrer
    peace.referrer = to

    // 验证权限
    if (
      peace.cache.get(
        peace.type.USER.INFO,
        peace.type.SYSTEM.CACHE.LOCAL_STORAGE
      )
    ) {
      return next()
    } else {
      return next(peace.config.system.noauthPage)
    }
  }
})

export default router
