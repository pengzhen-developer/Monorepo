/** 
 * 应用程序拦截器
 * 一般作为 '/' 根路由
 * 控制访问权限与链接跳转
 */

<template>
  <div>
    <div class="fixed-center"
         v-if="processing">
      <q-spinner color="primary"
                 size="4em"
                 v-bind:thickness="2" />
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  data() {
    return {
      processing: true
    }
  },

  watch: {
    '$route.path'() {
      if (this.$route.path === '/') {
        this.authentication()
      }
    }
  },

  created() {
    this.authentication()
  },

  methods: {
    authentication() {
      this.processing = true

      this.dosomething()
        .then(() => {
          if (Util.user.isSignIn()) {
            if (this.$route.path === '/') {
              this.$router.push('/layout')
            }
          } else {
            this.$router.push('/login')
          }
        })
        .finally(() => {
          this.processing = false
        })
    },

    dosomething() {
      return Promise.resolve()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>