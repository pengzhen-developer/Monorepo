/*
 * @Author: PengZhen
 * @Description: vue router
 * @Date: 2019-11-26
 */

// Import routes
import Vue from 'vue'
import VueRouter from 'vue-router'

import generateRoutes from './generateRoutes'

export default async function({ configuration }) {
  Vue.use(VueRouter)

  const routes = await generateRoutes(configuration)

  const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_RELEASE_FLODER_PATH,
    routes: routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })

  router.beforeEach((to, from, next) => {
    // set title
    document.title = to.meta?.title ?? window.configuration.application.title

    next()
  })

  return router
}
