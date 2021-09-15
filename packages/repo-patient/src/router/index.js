import Vue from 'vue'
import Router from 'vue-router'
import Routers from './routers.js'
import routeUtil from './util'

import peace from '@src/library'

/** 提醒消息-需要登录 */
const MESSAGE_USER_NEED_LOGIN = '为保障您的数据安全，请登录后使用。'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_RELEASE_FLODER_PATH,
  routes: Routers
})

router.beforeEach((to, from, next) => {
  // 优化 cancelToken ， 暂时频闭
  // $peace.cancelTokenList &&
  //   $peace.cancelTokenList.forEach(e => {
  //     e && e()
  //   })
  $peace.cancelTokenList = []

  // 1，当前路由不需要授权登录
  if (to.meta.auth === false) {
    return next()
  }

  // 2，当前路由需要授权登录
  if (to.meta.auth === true) {
    if (routeUtil.hasLogin()) {
      return next()
    } else {
      peace.util.alert(MESSAGE_USER_NEED_LOGIN)

      return next({
        name: peace.config.system.loginPage,
        query: { referrer: to.fullPath }
      })
    }
  }

  // 3，未考虑到的情况，直接跳过
  return next()
})

export default router
