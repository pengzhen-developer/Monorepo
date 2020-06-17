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

      this.doSomething()
        .then(() => {
          // 页面被刷新 ？ 交由各组件自行处理
          if (this.$route.path === '/') {
            Util.route.replaceToHome()
          }
        })
        .finally(() => {
          this.processing = false
        })
    },

    /**
     * 模拟处理一些事情
     *
     */
    doSomething() {
      return new Promise((resolve) => {
        // 最小等待时间
        const MINIMUM_WAITING_TIME = 1500
        // 开始处理时间
        const BEGIN_TIME = performance.now()

        // Do Something

        // 结束处理时间
        const END_TIME = performance.now()

        setTimeout(() => {
          resolve()
        }, MINIMUM_WAITING_TIME - (END_TIME - BEGIN_TIME))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>