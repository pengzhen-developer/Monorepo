/*
 * @Author: PengZhen
 * @Description: vue router
 * @Date: 2019-11-26
 */

// Import config
import config from '@src/config'

// Import vue router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Import routes
import routes from './routes'

// Import library
import peace from '@src/library'

// Import util
import { user } from '@src/util'

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_RELEASE_FLODER_PATH,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // Set Default Title
  document.title = to.meta.title || config.DEFAULT_TITLE

  // 验证是否能够无权限访问
  if (to.meta.requireAuth === true && !user.isSignIn()) {
    peace.util.alert('为保障你的数据安全，请登录后使用')

    return user.replaceToLogin(to.fullPath)
  }

  next()
})

export default {
  router
}
