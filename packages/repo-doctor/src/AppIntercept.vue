/** 
 * AppIntercept
 * 应用程序拦截器
 * 做为权限的动态路由 root component
 * 可控制其所有 children 的访问权限

 * 场景 ：
 * 从 /router/a 跳转 /router/b
 * 触发 beforeRouteEnter
 * 验证 to 是否可访问
 * 跳转 next() 或者 next(vm => vm.$router.push('/redirect'))
 */

<template>
  <div class="window-width window-height overflow-hidden">
    <q-spinner v-if="showLoading"
               class="absolute-center"
               size="24"
               color="primary"></q-spinner>

    <router-view></router-view>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  data() {
    return {
      showLoading: false
    }
  },

  watch: {
    '$route.path'() {
      if (this.$route.name === 'AppIntercept') {
        this.showLoading = true
      } else {
        this.showLoading = false
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    if (Util.user.isSignIn()) {
      if (to.name === 'AppIntercept') {
        next((vm) => vm.$router.replace({ name: 'Layout' }))
      } else {
        next()
      }
    } else {
      if (to.name !== 'Login') {
        next((vm) => vm.$router.replace({ name: 'Login' }))
      }
    }

    next()
  },

  beforeRouteUpdate(to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>