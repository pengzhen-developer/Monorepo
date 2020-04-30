<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  import peace from '@src/library'

  export default {
    name: 'app',

    created() {
      document.title = peace.config.system.title

      // restore user info and user token
      if (peace.cache.get(peace.type.USER.INFO)) {
        this.$store.commit('user/restoreUserInfo', peace.cache.get(peace.type.USER.INFO))
        this.$store.commit('layout/restoreTab')

        peace.service.IM.initNIM()
        peace.service.IM.initWebRTC()
      }
    }
  }
</script>

<style>
</style>
