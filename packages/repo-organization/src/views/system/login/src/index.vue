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
// original-href => decodeURIComponent => [token=token]&[title=title]&[configuration=configuration]&[productId=productId]
// [token] 身份识别码
// [title] 子系统名称
// [configuration] 配置文件
// [productId] 服务 ID

import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'

// import configurationNavConsole from '@src/router/configuration_nav_console'
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
      const token = Peace.util.queryUrlParam('token', this.original)

      if (token) {
        Util.user.setUserToken(token)

        return Service.doLogin().then((res) => {
          Util.user.setUserInfo(res.data)

          return Promise.resolve()
        })
      } else {
        return Promise.reject('缺少必要参数【token】，请重新登录。')
      }
    },

    getAccountMenuList() {
      const productId = Peace.util.queryUrlParam('productId', this.original) || ''
      // 获取子系统
      const params = {
        type: 'left',
        productCode: productId || 'kzt'
      }
      return Service.userMenuOfList(params).then((res) => {
        const regx1 = /.*{|}.*/g
        const regx2 = /\{(.+?)\}/g
        const menuList = res.data

        menuList.forEach((menu) => {
          //处理菜单未配置路由
          if (menu.menuRoutes.length == 0) {
            menu.menuName = menu.name
            menu.id = menu.menuId.toString()
            menu.menuRoute = 'not-found'
            menu.menuRoute = 'not-found'
          } else {
            const route = menu.menuRoutes.find((route) => route.routeType == 1)

            //适配当前框架 menu
            menu.menuName = menu.name
            menu.menuIcon = menu.icon
            menu.menuRoute = route.routePath
            menu.menuPath = route.realPath
            menu.id = route.menuId.toString()
            menu.enable = route.enable == 1 ? true : false
            menu.closable = route.closable == 1 ? true : false

            // 处理 env
            // {env} => process.env.env
            const envKey = menu.menuPath?.replace(regx1, '')
            menu.menuPath = menu.menuPath?.replace(regx2, process.env[envKey])
          }
        })
        //sort排序
        menuList.sort((a, b) => {
          return a.sort - b.sort
        })

        Util.user.setAccountMenuList(res.data)

        return Promise.resolve()
      })
    },

    redirectToOriginal() {
      window.location.href = this.original
    }
  }
}
</script>

<style>
</style>