<template>
  <div class="full-width full-height overflow-hidden bg-grey-2">
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
import Util from '@src/util'

export default {
  name: 'Error401',

  created() {
    Util.user.removeUserInfo()
  },

  methods: {
    back() {
      Util.location.redirectToLogin()
    }
  }
}
</script>
