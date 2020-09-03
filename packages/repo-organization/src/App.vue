<template>
  <div id="app">
    <Timer></Timer>

    <router-view />
  </div>
</template>

<script>
// 定时任务
import Timer from './timer'

import Peace from '@src/library'

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

    const cdkey = Peace.util.queryUrlParam('cdkey')

    if (cdkey) {
      if (original !== window.location.href) {
        // 清理 session
        Peace.cache.sessionStorage.clear()

        // 记录初始链接
        Peace.cache.sessionStorage.set('original-href', window.location.href)
      }
    }
  }
}
</script>

<style>
</style>