import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/layout/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      meta: { Auth: true },
      name: 'home',
      component: Home,
      children: [
        {
          path: 'home',
          meta: { Auth: true },
          name: 'home',
          component: () => import('./../views/Home.vue')
        },
        {
          path: 'clinic',
          meta: { Auth: true },
          name: 'clinic',
          component: () => import('./../views/clinic/Index.vue')
        },
        {
          path: 'about',
          meta: { Auth: true },
          name: 'about',
          component: () => import('./../views/About.vue')
        }
      ]
    },

    {
      path: '/login',
      meta: { Auth: false },
      name: 'login',
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
