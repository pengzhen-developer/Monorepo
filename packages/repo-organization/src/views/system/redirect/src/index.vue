<template>
  <div class="redirect">{{ tips }}</div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import RouterPath from '@src/router/routerPath'
import Service from './service'

/** 获取 cdkey */
const cdKey = Peace.util.queryUrlParam('cdkey')
/** 获取来源站点 */
const referrerSite = document.referrer

Util.referrer.setReferrer(referrerSite)

export default {
  data() {
    return {
      tips: 'Loading ...'
    }
  },

  created() {
    if (this.valid()) {
      this.auth()
    }
  },

  methods: {
    valid() {
      if (Peace.validate.isEmpty(cdKey)) {
        this.cdKeyError('授权凭证无效')
        return false
      }

      return true
    },

    auth() {
      const param = { cdkey: cdKey }

      Service.auth(param)
        .then(res => {
          Util.user.setUserInfo(res.data)

          this.$router.push(RouterPath.account.LAYOUT_SERVICE_INFO)
        })
        .catch(res => {
          this.cdKeyError(res.msg)
        })
    },

    cdKeyError(reason) {
      Peace.util.warning('为保障你的数据安全，请重新登录后使用')

      this.tips = reason

      setTimeout(() => {
        // Util.referrer.replaceToReferrer()
      }, 3000)
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