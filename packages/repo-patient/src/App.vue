<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'app',

  created() {
    // todo
    // H5 暂不支持刷新后停留在当前页 (因为涉及到保存上一页的状态)
    // 因此每次刷新,都跳转首页
    this.$router.replace(peace.config.system.homePage)

    document.title = peace.config.system.title

    // restore user info and user token
    if (peace.cache.get(peace.type.USER.INFO)) {
      this.$store.commit('user/restoreUserInfo', peace.cache.get(peace.type.USER.INFO))

      peace.service.IM.initNIM()
    }
  }
}
</script>

<style>
</style>

