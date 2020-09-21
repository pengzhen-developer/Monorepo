<template>
  <div class="fixed-center">
    <q-spinner color="primary"
               size="4em"
               v-bind:thickness="2" />
  </div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './service/index'

export default {
  data() {
    return {
      result: {},
      params: {}
    }
  },
  created() {
    let result, params, resultData, paramsData

    try {
      result = Peace.util.queryUrlParam('result')
      params = Peace.util.queryUrlParam('params')
      resultData = JSON.parse(decodeURIComponent(result))
      paramsData = JSON.parse(decodeURIComponent(params))
    } catch (err) {
      console.log(err)
      this.errBack('返回结果解析错误！')
    }

    this.result = resultData
    this.params = paramsData
    this.init()
  },

  methods: {
    init() {
      if (this.result.code == 200) {
        Peace.util.success(this.result.msg)

        Util.token.setToken(this.result.data)
        this.completeInfomation()
      } else {
        this.errBack(this.result.msg)
      }
    },
    completeInfomation() {
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)
        Util.user.replaceToCompliteInfo(res.data.checkStatus)
      })
    },
    errBack(message) {
      Peace.util.error(message)

      Util.user.removeUserInfo()
      setTimeout(() => {
        Util.user.replaceToLogin()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>