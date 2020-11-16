<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from '@src/util'

export default {
  name: 'app',

  created() {
    document.title = Peace.config.system.title

    setImmediate(() => {
      // restore user info and user token
      if (util.user.isSignIn()) {
        const userInfo = util.user.getUserInfo()

        this.$store.commit('user/restoreUserInfo', userInfo)
        this.$store.commit('layout/restoreTab')

        // 加载 IM SDK
        Peace.NIM = util.IM.initIM()
        Peace.WebRTC = util.IM.initWebRTC(Peace.NIM)
      } else {
        util.user.replaceToLogin()
      }
    })
  }
}
</script>

<style></style>
