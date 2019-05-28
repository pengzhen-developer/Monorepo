import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/layout/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      meta: { Auth: true },
      name: '/',
      component: Home,
      children: [
        {
          path: '/home',
          meta: { Auth: true },
          name: '/home',
          component: () => import('./../views/Home.vue')
        },

        {
          path: '/clinic/inquiry',
          meta: { Auth: true },
          name: '/clinic/inquiry',
          component: () => import('./../views/clinic/inquiry/Index.vue')
        },
        {
          path: '/clinic/consultation',
          meta: { Auth: true },
          name: '/clinic/consultation',
          component: () => import('./../views/clinic/consultation/Index.vue')
        },

        {
          path: '/prescription/myPrescription',
          meta: { Auth: true },
          name: '/prescription/myPrescription',
          component: () => import('./../views/prescription/myPrescription/Index.vue')
        },

        {
          path: '/record/inquiry',
          meta: { Auth: true },
          name: '/record/inquiry',
          component: () => import('./../views/record/inquiry/Index.vue')
        },
        {
          path: '/record/prescription',
          meta: { Auth: true },
          name: '/record/prescription',
          component: () => import('./../views/record/prescription/Index.vue')
        },
        {
          path: '/record/transfer',
          meta: { Auth: true },
          name: '/record/transfer',
          component: () => import('./../views/record/transfer/Index.vue')
        },
        {
          path: '/record/consultation',
          meta: { Auth: true },
          name: '/record/consultation',
          component: () => import('./../views/record/consultation/Index.vue')
        },

        {
          path: '/sys/myInfo',
          meta: { Auth: true },
          name: '/sys/myInfo',
          component: () => import('./../views/sys/myInfo/Index.vue')
        },
        {
          path: '/sys/myIntroduce',
          meta: { Auth: true },
          name: '/sys/myIntroduce',
          component: () => import('./../views/sys/myIntroduce/Index.vue')
        },
        {
          path: '/sys/myTime',
          meta: { Auth: true },
          name: '/sys/myTime',
          component: () => import('./../views/sys/myTime/Index.vue')
        },
        {
          path: '/sys/myService',
          meta: { Auth: true },
          name: '/sys/myService',
          component: () => import('./../views/sys/myService/Index.vue')
        }
      ]
    },

    {
      path: '/login',
      meta: { Auth: false },
      name: '/login',
      component: () => import('./../Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 1. 是否需要验证权限
  if (to.meta.Auth === false) {
    return next()
  }

  // 2. 需要验证权限的情况下
  if (to.meta.Auth === true) {
    // 记录 referrer
    $peace.referrer = to

    // TODO:
    // 验证权限
    if ($peace.cache.get('USER')) {
      // 验证通过 ?
      return next()
    } else {
      // 验证不通过 ?
      return next('/Login')
    }
  }
})

export default router
