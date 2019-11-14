<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'app',

  beforeCreate() {
    document.title = peace.config.system.title
  },

  created() {
    if (this.validateWxAuth()) {
      this.restoreUserInfo()
      this.initNIM()
    }
  },

  methods: {
    validateWxAuth() {
      if (this.$route.path === '/' || this.$route.path === '/redirect') {
        const channelId = peace.util.queryUrlParam('channelId')
        const netHospitalId = peace.util.queryUrlParam('netHospitalId')

        // 渠道发生变化（平台 < - > 渠道），清除登录信息，需要重新进行登录并授权
        if (
          peace.cache.get(peace.type.SYSTEM.CHANNELID) !== channelId ||
          peace.cache.get(peace.type.SYSTEM.NETHOSPITALID) !== netHospitalId
        ) {
          peace.cache.remove(peace.type.USER.INFO)
          peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)

          peace.cache.remove(peace.type.SYSTEM.NETHOSPITALID)
          peace.cache.remove(peace.type.SYSTEM.CHANNELID)

          return false
        }
      }

      return true
    },

    restoreUserInfo() {
      const userInfo = peace.cache.get(peace.type.USER.INFO)

      if (userInfo) {
        this.$store.commit('user/restoreUserInfo', userInfo)
      }
    },

    initNIM() {
      const userInfo = peace.cache.get(peace.type.USER.INFO)

      if (userInfo) {
        peace.service.IM.initNIM()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
</style>