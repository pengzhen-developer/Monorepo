import Vue from 'vue'
import Router from 'vue-router'

import peace from '@src/library'

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
          path: '/home/index',
          name: '/home/index',
          meta: {
            keepAlive: true
          },
          component: () => import('@src/views/home/index.vue')
        },
        // 首页-详情
        {
          path: '/home/detail',
          name: '/home/detail',
          meta: {
            back: {
              title: '详情页'
            }
          },
          component: () => import('@src/views/home/detail/index.vue')
        },

        // 消息
        {
          path: '/message/index',
          name: '/message/index',
          meta: {
            keepAlive: true
          },
          component: () => import('@src/views/message/index.vue')
        },
        // 消息 - 消息列表
        {
          path: '/message/messageList',
          name: '/message/messageList',
          meta: {
            back: {
              visible: true,
              title: '消息列表'
            },
            tabBar: {
              visible: false
            }
          },
          component: () => import('@src/views/message/MessageList.vue')
        },

        // 健康档案
        {
          path: '/file/index',
          name: '/file/index',
          meta: {
            keepAlive: true
          },
          component: () => import('@src/views/file/index.vue')
        },

        // 我的
        {
          path: '/setting/index',
          name: '/setting/index',
          meta: {
            keepAlive: true
          },
          component: () => import('@src/views/setting/index.vue')
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

export default router
