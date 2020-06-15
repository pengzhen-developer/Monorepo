<template>
  <div>
    <template v-if="errorMessage">
      {{ errorMessage }}
    </template>

    <template v-else>
      <transition appear
                  mode="out-in"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeIn">
        <router-view class="bg-white"></router-view>
      </transition>
    </template>
  </div>
</template>

<script>
const platformMap = ['iOS', 'Android', 'H5', 'Wechat']

export default {
  data() {
    return {
      errorMessage: null
    }
  },

  created() {
    // 验证必选参数
    // 平台来源
    if (!platformMap.includes(this.$route.params.platform)) {
      this.errorMessage = '参数验证失败'
    }
  }
}
</script>

<style>
</style>