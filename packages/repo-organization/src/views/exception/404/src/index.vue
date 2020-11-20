<template>
  <div class="window-width window-height overflow-hidden bg-grey-2">
    <div class="fixed-center text-center">
      <p>
        <img v-bind:src="require('@src/assets/img/sad.svg')"
             style="width:30vw;max-width:150px;">
      </p>
      <p class="text-faded">
        对不起, 这里没有任何东西...<strong>(404)</strong>
      </p>
      <q-btn color="secondary"
             style="width:200px;"
             label="返回"
             replace
             v-on:click="back" />
    </div>
  </div>
</template>

<script >
import Util from '@src/util'

export default {
  name: 'Error404',

  methods: {
    back() {
      if (Peace.identity.auth.isLogin()) {
        Util.location.redirectToIndex()
      } else {
        Util.user.removeUserInfo()
        Util.location.redirectToLoginAndClear()
      }
    }
  }
}
</script>
