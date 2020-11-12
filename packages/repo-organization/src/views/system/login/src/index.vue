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

import Util from '@src/util'
import Service from './service'

export default {
  name: 'Login',

  data() {
    return {
      isLoading: true
    }
  },

  created() {
    // session cache to data
    this.original = Peace.cache.sessionStorage.get('original-href')
    this.token = Peace.util.queryUrlParam('token', this.original)
  },

  mounted() {
    this.doLogin()
  },

  methods: {
    // 静默登录
    doLogin() {
      if (!this.token) {
        throw new Error('缺少必要参数【token】，请重新登录。')
      }

      Peace.identity.auth.setAuth({ access_token: this.token })
      Peace.identity.auth.setHeaderAfterAuth(this.token)

      Service.doLogin()
        .then((res) => {
          Util.user.setUserInfo(res.data)
          Util.location.redirectToIndex()
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
</style>