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
    const currentHref = window.location.href
    const originalHref = Peace.cache.sessionStorage.get('original-href')
    const title = Peace.util.queryUrlParam('title', originalHref)

    // set title
    window.configuration.application.title = title || window.configuration.application.title
    document.title = window.configuration.application.title

    // get token
    const currentToken = Peace.util.queryUrlParam('token')
    const originalToken = Peace.util.queryUrlParam('token', originalHref)

    // 验证是否首次子系统
    // 每次进入子系统，需要保存子系统的 original-href，并重新获取菜单等数据
    if (currentToken) {
      // 验证是否刷新
      if (currentHref === originalHref) {
        return
      }

      // 验证是否需要清理 userInfo
      if (currentToken === originalToken) {
        // 需要清理 session storage (menu and tabs ...)
        // 不需清理 local storage 存储的用户信息（auth and user ...）
        Util.user.removeSessionUserInfo()
      } else {
        // 需要清理 local storage and session storage
        Util.user.removeUserInfo()
      }

      // 保存 original-href
      Peace.cache.sessionStorage.set('original-href', currentHref)

      // 再次刷新，重新获取用户数据
      window.location.reload()
    }
  }
}
</script>

<style>
</style>