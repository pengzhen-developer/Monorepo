/*
 * @Author: PengZhen
 * @Description: vue router
 * @Date: 2019-11-26
 */

// Import routes
import Vue from 'vue'
import VueRouter from 'vue-router'

import generateRoutes from './generateRoutes'
import { path } from './generateRoutes'
import Util from '@src/util'
export default function({ configuration }) {
  Vue.use(VueRouter)

  const routes = generateRoutes(configuration)

  const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_RELEASE_FLODER_PATH,
    routes: routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })
  const checkStatusArr = {
    未申请: 1,
    待审核: 2,
    已通过: 3,
    未通过: 4
  }
  router.beforeEach(async (to, from, next) => {
    // set title
    document.title = to.meta?.title ?? window.configuration.application.title
    //当前路由需要登录
    if (to.meta?.auth == true) {
      if (!Util.user.isSignIn()) {
        next(path.LOGIN)
      }
    } else {
      if (to.path === path.LOGIN && Util.user.isSignIn()) {
        next(path.HOME)
      }
    }
    next()
    //机构注册-如果审核状态为已通过，则回到首页
    //重新提交则不跳转
    const resubmit = Peace.cache.sessionStorage.get('resubmit') ?? false

    if (to.name.indexOf('/compliteInfo') != -1) {
      const info = await getAccountInfo()
      const checkStatus = info?.data?.checkStatus
      switch (checkStatus) {
        case checkStatusArr.待审核:
          next(path.CHECKWAITING)
          break
        case checkStatusArr.未通过:
          if (!resubmit) {
            next(path.CHECKFAILURE)
          } else {
            Peace.cache.sessionStorage.remove('resubmit')
          }
          break
        case checkStatusArr.未申请:
          next(path.ORGREGISTER)
          break
        default:
          Util.user.redirectToConsole()
          next(path.HOME)
          break
      }
    }
  })

  return router
}

const getAccountInfo = (params) => {
  const isMock = false

  const apiPath = 'hospital/v070/Account/getAccountInfo'
  const mockPath = process.env.VUE_APP_MOCK_API + apiPath
  const serverPath = process.env.VUE_APP_BASE_API + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}
