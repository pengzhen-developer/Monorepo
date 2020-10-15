<template>
  <div class="fixed-center text-center">
    <p>
      <img v-bind:src="require('@src/assets/img/sad.svg')"
           style="width:30vw;max-width:150px;">
    </p>
    <p class="text-faded">
      对不起, 暂时没有权限访问...<strong>(401)</strong>
    </p>
    <q-btn color="secondary"
           style="width:200px;"
           label="返回"
           v-on:click="back" />
  </div>
</template>

<script >
export default {
  name: 'Error404',

  methods: {
    back() {
      // 清除登录信息
      // 清除缓存
      // 重定向到 /

      Peace.cache.sessionStorage.clear()
      Peace.cache.localStorage.clear()

      this.$router.push('/').then(() => window.location.reload())
    }
  }
}
</script>
