import Vue from 'vue'
import Router from 'vue-router'

import peace from '@src/library'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/h5',
  routes: [
    {
      path: '/',
      name: '/',
      meta: {
        auth: false
      },
      component: () => import('@src/views/components/layout/index.vue'),

      children: [
        // 首页
        {
          path: '/home/index',
          name: '/home/index',
          meta: {
            auth: false,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '首页'
            }
          },
          component: () => import('@src/views/home/index.vue')
        },
        {
          path: '/home/index1',
          name: '/home/index1',
          meta: {
            auth: false,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '新首页'
            }
          },
          component: () => import('@src/views/home/indexNew.vue')
        },
        {
          path: '/home/map',
          name: '/home/map',
          meta: {
            auth: false,
            keepAlive: true,
            tabBar: true,
            navbar: {
              title: '地图',
              back: true
            }
          },
          component: () => import('@src/views/home/map.vue')
        },
        // 消息
        {
          path: '/message/index',
          name: '/message/index',
          meta: {
            auth: false,
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
            auth: false,
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
        // 用药建议
        {
          path: '/drug/list/:json',
          name: 'druglist',
          meta: {
            auth: true,
            navbar: {
              title: '药房列表',
              back: true
            }
          },
          component: () => import('@src/views/drug/DrugListPharmacy.vue')
        },
        // 地图选择
        {
          path: '/drug/selectMap/:json',
          name: 'DrugMapSelect',
          meta: {
            auth: true,
            navbar: {
              title: '选择地点',
              back: true
            }
          },
          component: () => import('@src/views/drug/DrugMapSelect.vue')
        },
        // 提交订单
        {
          path: '/drug/drugOrderBefore/:json',
          name: 'drugOrderBefore',
          meta: {
            auth: true,
            navbar: {
              title: '提交订单',
              back: true
            }
          },
          component: () => import('@src/views/drug/DrugOrderBefore.vue')
        },
        // 医生列表
        {
          path: '/components/doctorList/:json',
          name: '/components/doctorList',
          meta: {
            auth: false,
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
            auth: false
          },
          component: () => import('@src/views/components/MessageList.vue')
        },
        // 医生主页
        {
          path: '/components/doctorDetail/:json',
          name: '/components/doctorDetail',
          meta: {
            auth: false,
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
        // 申请图文问诊 - 订单支付
        {
          path: '/components/doctorInquiryPay/:json',
          name: '/components/doctorInquiryPay/:json',
          meta: {
            auth: true,
            navbar: {
              title: '支付方式',
              back: true
            }
          },
          component: () => import('@src/views/components/DoctorInquiryPay.vue')
        },
        // 申请图文问诊 - 订单支付结果
        {
          path: '/components/doctorInquiryPayResult/:json',
          name: '/components/doctorInquiryPayResult/:json',
          meta: {
            auth: true,
            navbar: {
              title: '支付结果',
              back: true
            }
          },
          component: () => import('@src/views/components/DoctorInquiryPayResult.vue')
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
          path: '/components/AddFoodAllergy',
          name: '/components/AddFoodAllergy',
          meta: {
            auth: true,
            navbar: {
              title: '添加过敏史',
              back: true
            }
          },
          component: () => import('@src/views/components/AddFoodAllergy.vue')
        },

        // 知情同意书
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
            auth: false,
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
            auth: false,
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
            auth: false,
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
            auth: false,
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
            auth: false,
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
            auth: false,
            keepAlive: true,
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
          path: '/setting/AdressManger',
          name: '/setting/AdressManger',
          meta: {
            auth: true,
            navbar: {
              title: '地址管理',
              back: true
            }
          },
          component: () => import('@src/views/setting/AdressManger.vue')

        },
        {
          path: '/setting/SelectAddressManger',
          name: '/setting/SelectAddressManger',
          meta: {
            auth: true,
            navbar: {
              title: '选择地址',
              back: true
            }
          },
          component: () => import('@src/views/setting/SelectAddressManger.vue')
          
        },
        {
          path: '/setting/userAddressEdit/:json',
          name: '/setting/userAddressEdit',
          meta: {
            auth: true,
            navbar: {
              title: '编辑地址',
              back: true
            }
          },
          component: () => import('@src/views/setting/userAddressEdit.vue')

        },
        {
          path: '/setting/userAddressEdit',
          name: '/setting/userAddressEdit',
          meta: {
            auth: true,
            navbar: {
              title: '添加新地址',
              back: true
            }
          },
          component: () => import('@src/views/setting/userAddressEdit.vue')

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
          path: '/setting/order/userDrugList',
          name: '/setting/order/userDrugList',
          meta: {
            auth: true,
            navbar: {
              title: '购药记录',
              back: true
            }
          },
          component: () => import('@src/views/setting/order/userDrugList.vue')
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
        },
        {
          path: '/record/recordCondition/:json',
          name: '/record/recordCondition',
          meta: {
            keepAlive: true,
            auth: false,
            navbar: {
              title: '查询报告',
              back: true
            }
          },
          component: () => import('@src/views/record/recordCondition.vue')
        },
        {
          path: '/record/recordHome/:json',
          name: '/record/recordHome',
          meta: {
            // keepAlive: true,
            auth: true,
            navbar: {
              title: '查询报告',
              back: true
            }
          },
          component: () => import('@src/views/record/recordHome.vue')
        },
        {
          path: '/diagnose/select/diagnoseSelectBody/:json',
          name: '/diagnose/select/diagnoseSelectBody',
          meta: {
            keepAlive: true,
            auth: false,
            navbar: {
              title: '选择症状',
              back: true
            }
          },
          component: () => import('@src/views/diagnose/select/diagnoseSelectBody.vue')
        },
        {
          path: '/diagnose/diagnoseHome/:json',
          name: '/diagnose/diagnoseHome',
          meta: {
            keepAlive: true,
            auth: false,
            navbar: {
              title: '疾病',
              back: true
            }
          },
          component: () => import('@src/views/diagnose/diagnoseHome.vue')
        },
        {
          path: '/diagnose/diagnoseGroup/:json',
          name: '/diagnose/diagnoseGroup',
          meta: {
            keepAlive: true,
            auth: false,
            navbar: {
              title: '疾病人群',
              back: true
            }
          },
          component: () => import('@src/views/diagnose/diagnoseGroup.vue')
        },
        {
          path: '/diagnose/select/diagnoseSelectHumen/:json',
          name: '/diagnose/select/diagnoseSelectHumen',
          meta: {
            keepAlive: true,
            auth: false,
            navbar: {
              title: '常见人群',
              back: true
            }
          },
          component: () => import('@src/views/diagnose/select/diagnoseSelectHumen.vue')
        },
        {
          path: '/diagnose/diagnoseName/:json',
          name: '/diagnose/diagnoseName',
          meta: {
            // keepAlive: true,
            auth: false,
            navbar: {
              title: '疾病描述',
              back: true
            }
          },
          component: () => import('@src/views/diagnose/diagnoseName.vue')
        },

        {
          path: '/inter/drugInterList/:json',
          name: '/inter/drugInterList',
          meta: {
            auth: false,
            navbar: {
              title: '说明书',
              back: true
            }
          },
          component: () => import('@src/views/inter/DrugInterList.vue')
        },
        {
          path: '/inter/drugInterDetail/:json',
          name: '/inter/drugInterDetail',
          meta: {
            auth: false,
            navbar: {
              title: '说明书',
              back: true
            }
          },
          component: () => import('@src/views/inter/DrugInterDetail.vue')
        },
        {
          path: '/order/userDrugDetail/:json',
          name: '/order/userDrugDetail',
          meta: {
            auth: false,
            navbar: {
              title: '订单详情',
              back: true
            }
          },
          component: () => import('@src/views/setting/order/userDrugDetail.vue')
        },
        {
          path: '/order/userDrugLogistics/:json',
          name: '/order/userDrugLogistics',
          meta: {
            auth: false,
            navbar: {
              title: '订单状态',
              back: true
            }
          },
          component: () => import('@src/views/setting/order/userDrugLogistics.vue')
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

// 临时记录登录后需要调整的Route信息；
let cacheRoute = null

router.beforeEach((to, from, next) => {
  $peace.routerStack = $peace.routerStack || []
  $peace.routerStack.push(to)
  $peace.referrer = from

  // 根据 route 参数修改 keepAlive
  if (to.params.hasOwnProperty('keepAlive')) {
    to.meta.keepAlive = to.params.keepAlive
  }
  if (to.query.hasOwnProperty('keepAlive')) {
    to.meta.keepAlive = to.query.keepAlive
  }

  //如果已经登录
  if (
    peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE) &&
    peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE).loginInfo
      .accessToken
  ) {
    if (from.name == peace.config.system.noAuthPage && cacheRoute != null) {
      //通过中间变量保存到需要跳转的Route信息
      const routerPath = cacheRoute.path
      //清空对应的Route;
      cacheRoute = null
      //登录后跳转到用户操作需要跳转的页面
      return next(routerPath)
    } else if (to.name == peace.config.system.noAuthPage) {
      //如果回退指向登录界面，跳到首页
      return next(peace.config.system.homePage)
    }
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
      peace.cache.get(peace.type.USER.INFO, peace.type.SYSTEM.CACHE.LOCAL_STORAGE).loginInfo
        .accessToken
    ) {
      return next()
    } else {
      //当切换到登录界面时，记录登录后应该跳转的界面；
      cacheRoute = to
      return next(peace.config.system.noAuthPage)
    }
  }
})

export default router
