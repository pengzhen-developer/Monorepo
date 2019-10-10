<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'app',

  beforeCreate() {
    const params = peace.util.queryUrlParam('params')

    if (params) {
      if (params === 'PLATEFORM') {
        peace.cache.remove(peace.type.SYSTEM.PARAMS)
      } else {
        peace.cache.set(peace.type.SYSTEM.PARAMS, peace.util.queryUrlParam('params'))
      }
    }
  },

  created() {
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

