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

    // 待优化项，当系统初始化时，延迟 3000ms 加载 IM
    // 避免在渠道发生变化时，会清空用户信息，导致无 token 访问接口
    setTimeout(() => {
      this.initNIM()
    }, 3000)
  },

  methods: {
    validateWxAuth() {
      // 当前页面是中转页，不需要验证授权（系统在中转页进行授权逻辑）
      if (this.$route.path === '/' || this.$route.path === '/redirect') {
        this.$router.push(peace.config.system.homePage)

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