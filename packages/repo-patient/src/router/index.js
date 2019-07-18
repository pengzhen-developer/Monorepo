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
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '首页'
            }
          },
          component: () => import('@src/views/home/index.vue')
        },
        // 消息
        {
          path: '/message/index',
          name: '/message/index',
          meta: {
            auth: true,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '消息'
            }
          },
          component: () => import('@src/views/message/index.vue')
        },

        // 健康档案
        {
          path: '/file/index',
          name: '/file/index',
          meta: {
            auth: true,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '健康档案'
            }
          },
          component: () => import('@src/views/file/index.vue')
        },
        // 我的
        {
          path: '/setting/index',
          name: '/setting/index',
          meta: {
            auth: true,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '个人中心'
            }
          },
          component: () => import('@src/views/setting/index.vue')
        },

        // 我的家人
        {
          path: '/setting/myFamilyMembers',
          name: '/setting/myFamilyMembers',
          meta: {
            auth: true,
            navbar: {
              title: '我的家人',
              back: true
            }
          },
          component: () => import('@src/views/setting/MyFamilyMembers.vue')
        },

        // 我的咨询
        {
          path: '/setting/userConsultList',
          name: '/setting/userConsultList',
          meta: {
            auth: true,
            navbar: {
              title: '我的咨询',
              back: true
            }
          },
          component: () => import('@src/views/setting/UserConsultList.vue')
        },

        // 用药建议
        {
          path: '/components/theRecipeList/:json',
          name: '/components/theRecipeList/:json',
          meta: {
            auth: true,
            navbar: {
              title: '用药建议',
              back: true
            }
          },
          component: () => import('@src/views/components/TheRecipeList.vue')
        },

        // 医生列表
        {
          path: '/components/doctorList/:json',
          name: '/components/doctorList',
          meta: {
            auth: true,
            navbar: {
              title: '医生列表',
              back: true
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
            navbar: {
              title: '消息列表',
              back: true
            }
          },
          component: () => import('@src/views/components/MessageList.vue')
        },
        // 医生主页
        {
          path: '/components/doctorDetail/:json',
          name: '/components/doctorDetail',
          meta: {
            auth: true,
            navbar: {
              title: '医生主页',
              back: true
            }
          },
          component: () => import('@src/views/components/DoctorDetail.vue')
        },
        // 申请图文问诊
        {
          path: '/components/doctorInquiryApply/:json',
          name: '/components/doctorInquiryApply',
          meta: {
            auth: true,
            navbar: {
              title: '图文咨询',
              back: true
            }
          },
          component: () => import('@src/views/components/DoctorInquiryApply.vue')
        },

        // 添加既往史
        {
          path: '/components/addIllnessHistory',
          name: '/components/addIllnessHistory',
          meta: {
            auth: true,
            navbar: {
              title: '添加过敏史',
              back: true
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
            navbar: {
              title: '添加过敏史',
              back: true
            }
          },
          component: () => import('@src/views/components/AddAllergicHistory.vue')
        },

        // 添加过敏史
        {
          path: '/components/informedConsent',
          name: '/components/informedConsent',
          meta: {
            auth: true,
            navbar: {
              title: '知情同意书',
              back: true
            }
          },
          component: () => import('@src/views/components/InformedConsent.vue')
        },

        // 医院列表
        {
          path: '/hospital/HospitalList/:json',
          name: '/hospital/HospitalList',
          meta: {
            auth: true,
            navbar: {
              title: '医院列表',
              back: true
            }
          },
          component: () => import('@src/views/hospital/HospitalList.vue')
        },
        // 医院主页
        {
          path: '/hospital/HospitalHome/:json',
          name: '/hospital/HospitalHome',
          meta: {
            auth: true,
            navbar: {
              title: '医院主页',
              back: true
            }
          },
          component: () => import('@src/views/hospital/HospitalHome.vue')
        },
        // 医院科室二联动
        {
          path: '/hospital/depart/hospitalDepartSelect/:json',
          name: '/hospital/depart/hospitalDepartSelect',
          meta: {
            auth: true,
            keepAlive: true,
            navbar: {
              title: '科室选择',
              back: true
            }
          },
          component: () => import('@src/views/hospital/depart/hospitalDepartSelect.vue')
        },
        // 预约挂号医生列表
        {
          path: '/appoint/doctor/appointDoctorList/:json',
          name: '/appoint/doctor/appointDoctorList',
          meta: {
            auth: true,
            navbar: {
              title: '选择医生',
              back: true
            }
          },
          component: () => import('@src/views/appoint/doctor/appointDoctorList.vue')
        },
        {
          path: 'hospital/depart/HospitalDepartList',
          meta: {
            auth: true,
            navbar: {
              title: '选择科室',
              back: true
            }
          },
          component: () => import('@src/views/hospital/depart/HospitalDepartList.vue')
        },
        {
          path: '/appoint/doctor/appointDoctorSelect/:json',
          name: '/appoint/doctor/appointDoctorSelect',
          meta: {
            auth: true,
            navbar: {
              title: '选择就诊时间',
              back: true
            }
          },
          component: () => import('@src/views/appoint/doctor/appointDoctorSelect.vue')
        },
        {
          path: '/appoint/order/appointOrderSubmit/:json',
          name: '/appoint/order/appointOrderSubmit',
          meta: {
            auth: true,
            keepAlive: true,
            navbar: {
              title: '预约信息',
              back: true
            }
          },
          component: () => import('@src/views/appoint/order/appointOrderSubmit.vue')
        },
        {
          path: '/setting/userDoctorList',
          name: '/setting/userDoctorList',
          meta: {
            auth: true,
            navbar: {
              title: '我的医生',
              back: true
            }
          },
          component: () => import('@src/views/setting/userDoctorList.vue')
        },
        {
          path: '/setting/order/userOrderList',
          name: '/setting/order/userOrderList',
          meta: {
            auth: true,
            navbar: {
              title: '我的订单',
              back: true
            }
          },
          component: () => import('@src/views/setting/order/userOrderList.vue')
        },
        {
          path: '/setting/order/userOrderDetail/:json',
          name: '/setting/order/userOrderDetail',
          meta: {
            auth: true,
            navbar: {
              title: '订单详情',
              back: true
            }
          },
          component: () => import('@src/views/setting/order/userOrderDetail.vue')
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

  // 根据 route 参数修改 keepAlive
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
      peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE) &&
      peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE).loginInfo.accessToken
    ) {
      return next()
    } else {
      return next(peace.config.system.noAuthPage)
    }
  }
})

export default router
