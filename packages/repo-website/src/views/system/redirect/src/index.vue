<template>
  <div class="redirect">{{tips}}</div>
</template>

<script>
import Util from '@src/util'

import Service from './service'
import { path } from '@src/router/generateRoutes'
// import Constant from './constant'
export default {
  data() {
    return {
      tips: 'Loading ...'
    }
  },
  created() {
    const cdKey = Util.user.getUserCDKey()

    if (cdKey) {
      const params = { cdkey: cdKey }

      Service.getBaseInfo(params)
        .then((res) => {
          Util.user.replaceToCompliteInfo(res.data.checkStatus)
          // if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          //   this.$router.replace(path.INFORMMATION)
          // } else {
          //   this.$router.replace(path.HOME)
          // }
        })
        .catch(() => {
          Util.user.removeUserInfo()

          Util.user.replaceToLogin()
        })
    } else {
      this.$router.replace(path.system.HOME)
    }
  }
}
</script>

<style lang="scss" scoped>
.redirect {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
}
</style>