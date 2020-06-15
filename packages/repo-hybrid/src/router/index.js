/*
 * @Author: PengZhen
 * @Description: vue router
 * @Date: 2019-11-26
 */

// Import routes
import Vue from 'vue'
import VueRouter from 'vue-router'

import generateRoutes from './generateRoutes'

export default function({ configuration }) {
  Vue.use(VueRouter)

  const routes = generateRoutes(configuration)

  const Router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_RELEASE_FLODER_PATH,
    routes: routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })

  return Router
}
