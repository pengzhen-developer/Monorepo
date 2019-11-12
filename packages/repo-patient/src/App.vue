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