<template>
  <div id="app">
    <Timer></Timer>

    <router-view />
  </div>
</template>

<script>
import Util from '@src/util'
// 定时任务
import Timer from './timer'

export default {
  components: {
    Timer
  },

  beforeCreate() {
    // url params to cache
    const original = Peace.cache.sessionStorage.get('original-href')
    const title = Peace.util.queryUrlParam('title', original)

    // set title
    window.configuration.application.title = title || window.configuration.application.title

    // get token
    const token = Peace.util.queryUrlParam('token')

    if (token) {
      if (original !== window.location.href) {
        // 清理 storage
        Util.user.removeUserInfo()

        // 记录初始链接
        Peace.cache.sessionStorage.set('original-href', window.location.href)

        // 再次刷新，重新获取用户数据
        window.location.reload()
      }
    }
  }
}
</script>

<style>
</style>