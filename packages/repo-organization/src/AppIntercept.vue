/** 
 * 应用程序拦截器
 * 一般作为 '/' 根路由
 * 控制访问权限与链接跳转
 */

<template>
  <div>
    <div class="fixed-center"
         v-if="processing">
      <q-spinner color="primary"
                 size="4em"
                 v-bind:thickness="2" />
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'

const Service = {
  /**
   * 认证授权
   *
   * @param {*} params 参数列表
   * @returns
   */
  auth(params) {
    const isMock = false

    const apiPath = 'console/Account/auth'
    const mockPath = process.env.VUE_APP_MOCK_API + apiPath
    const serverPath = process.env.VUE_APP_BASE_API + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}

// 1, 拦截
// 1.1 拦截 '/'，跳转 layout / 验证身份 (初始化)
// 1.2 拦截 '/xx/xx ...' ，跳转 xx/xx / login (刷新时)

export default {
  // 1, 拦截
  beforeRouteEnter(to, from, next) {
    console.log('AppIntercept beforeRouteEnter')

    if (to.path === '/') {
      if (Util.user.isSignIn()) {
        next('/layout')
      } else {
        next((vm) => {
          vm.setData()
          vm.authentication()
        })
      }
    } else {
      if (Util.user.isSignIn()) {
        next()
      } else {
        next((vm) => {
          vm.cdKeyError()
        })
      }
    }
  },

  data() {
    return {
      processing: undefined,

      cdKey: undefined,
      referrerSite: undefined
    }
  },

  methods: {
    setData() {
      /** 获取 cdkey */
      this.cdKey = Peace.util.queryUrlParam('cdkey') || Util.user.getUserCDKey()
      /** 获取来源站点 */
      this.referrerSite = document.referrer

      Util.referrer.setReferrer(this.referrerSite)
    },

    authentication() {
      if (!Util.user.isSignIn()) {
        this.processing = true

        const param = { cdkey: this.cdKey }

        Service.auth(param)
          .then((res) => {
            Util.user.setUserCDKey(this.cdKey)
            Util.user.setUserInfo(res.data)

            this.$router.push('/layout')
          })
          .catch(() => {
            this.cdKeyError()
          })
          .finally(() => {
            this.processing = false
          })
      }
    },

    cdKeyError() {
      Peace.util.warning('为保障你的数据安全，请重新登录后使用')

      setTimeout(() => {
        Util.referrer.redirectToReferrer()
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>