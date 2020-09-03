// 静默登录

<template>
  <div class="fixed-center">
    <q-spinner color="primary"
               size="4em"
               v-if="isLoading"
               v-bind:thickness="2" />
  </div>
</template>

<script>
// url params 决定所属系统和所属用户
// .e.g
// host:port?[original-href=encodeURIComponent(original-href)]
// original-href => decodeURIComponent => [cdkey=cdkey]&[title=title]&[configuration=configuration]&[serviceId=serviceId]
// [cdkey] 身份识别码
// [title] 子系统名称
// [configuration] 配置文件
// [serviceId] 服务 ID

import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'

import configurationNavConsole from '@src/router/configuration_nav_console'

export default {
  name: 'Login',

  data() {
    return {
      original: '',

      isLoading: false
    }
  },

  created() {
    // session cache to data
    this.original = Peace.cache.sessionStorage.get('original-href')

    // 静默登录
    this.doLogin()
  },

  methods: {
    doLogin() {
      this.isLoading = true

      this.login()
        .then(this.getAccountMenuList)
        .then(this.redirectToOriginal)
        .catch((error) => {
          Peace.util.error(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    login() {
      const cdkey = Peace.util.queryUrlParam('cdkey', this.original)

      if (cdkey) {
        const params = { cdkey }

        return Service.doLogin(params).then((res) => {
          Util.user.setUserCDKey(cdkey)
          Util.user.setUserInfo(res.data)

          return Promise.resolve()
        })
      } else {
        return Promise.reject('缺少必要参数【cdkey】，请重新登录。')
      }
    },

    getAccountMenuList() {
      const configuration = Peace.util.queryUrlParam('configuration', this.original)
      const serviceId = Peace.util.queryUrlParam('serviceId', this.original)

      // 获取子系统
      if (configuration && serviceId) {
        const params = { serviceId }

        return Service.getAccountMenuList(params).then((res) => {
          const regx1 = /.*{|}.*/g
          const regx2 = /\{(.+?)\}/g

          res.data.menuArr.forEach((menu) => {
            // 处理 env
            // {env} => process.env.env
            const envKey = menu.menuPath?.replace(regx1, '')
            menu.menuPath = menu.menuPath?.replace(regx2, process.env[envKey])

            // 处理 route route
            menu.menuRoute = '/' + menu.menuRoute
          })

          Util.user.setAccountMenuList(res.data.menuArr)

          return Promise.resolve()
        })
      } else {
        Util.user.setAccountMenuList(configurationNavConsole)

        return Promise.resolve()
      }
    },

    redirectToOriginal() {
      window.location.href = this.original
    }
  }
}
</script>

<style>
</style>