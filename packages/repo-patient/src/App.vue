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
    this.validateWxAuth()

    this.restoreUserInfo()
    this.initNIM()
  },

  methods: {
    validateWxAuth() {
      // 当前页面是中转页，不需要验证授权（系统在中转页进行授权逻辑）
      if (this.$route.path === '/' || this.$route.path === '/redirect') {
        return true
      }

      // 当前是微信环境，并且进入业务页
      // 先验证授权
      // 未获取到授权信息，需要提示用户退出
      if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
        const CHANNELID = peace.cache.get(peace.type.SYSTEM.CHANNELID)
        const WX_AUTH_CHANNEL_OPEN_ID = peace.cache.get(peace.type.SYSTEM.WX_AUTH_CHANNEL_OPEN_ID)
        const WX_AUTH_PLATEFORM_OPEN_ID = peace.cache.get(
          peace.type.SYSTEM.WX_AUTH_PLATEFORM_OPEN_ID
        )

        if (WX_AUTH_PLATEFORM_OPEN_ID && (CHANNELID && WX_AUTH_CHANNEL_OPEN_ID)) {
          console.warn('【 WX 】【 WX AUTH 】completed', new Date())
        } else {
          console.warn('【 WX 】【 WX AUTH 】not completed', new Date())
          console.warn('【 WX 】【 CHANNELID 】', new Date(), CHANNELID)
          console.warn('【 WX 】【 WX_AUTH_CHANNEL_OPEN_ID 】', new Date(), WX_AUTH_CHANNEL_OPEN_ID)
          console.warn(
            '【 WX 】【 WX_AUTH_PLATEFORM_OPEN_ID 】',
            new Date(),
            WX_AUTH_PLATEFORM_OPEN_ID
          )

          this.$router.replace('/noAuth')
        }
      }
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