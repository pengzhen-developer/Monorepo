<template>
  <div class="window-width window-height overflow-hidden bg-grey-2">
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
             label="返回登录"
             replace
             v-on:click="back" />
    </div>
  </div>
</template>

<script >
export default {
  name: 'Error403',

  methods: {
    back() {
      Peace.cache.localStorage.clear()
      Peace.cache.sessionStorage.clear()

      this.$router.replace({ name: 'Login' }).then(() => window.location.reload())
    }
  }
}
</script>
