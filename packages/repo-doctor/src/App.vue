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
    document.title = peace.config.system.title

    setImmediate(() => {
      // restore user info and user token
      if (util.user.isSignIn()) {
        const userInfo = util.user.getUserInfo()

        this.$store.commit('user/restoreUserInfo', userInfo)
        this.$store.commit('layout/restoreTab')

        // 加载 IM SDK
        $peace.NIM = util.IM.initIM()
        $peace.WebRTC = util.IM.initWebRTC($peace.NIM)
      } else {
        util.user.replaceToLogin()
      }
    })
  }
}
</script>

<style></style>
