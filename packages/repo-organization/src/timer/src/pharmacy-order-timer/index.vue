
//  定时任务 - 药品供应服务 - 药房接单

<template>
  <div>
    <audio id="ding">
      <source v-bind:src="require('./assets/ding.mp3')"
              type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'

const generalDelay = 30000
const initialDelay = 1000
const duration = 10000

export default {
  created() {
    const original = Peace.cache.sessionStorage.get('original-href')
    const configuration = Peace.util.queryUrlParam('configuration', original)

    if (configuration === 'drugsupplie') {
      this.initialDelayId = setTimeout(() => {
        this.notify()
      }, initialDelay)

      this.generalDelayId = setInterval(() => {
        this.notify()
      }, generalDelay)
    }
  },

  methods: {
    notify() {
      const params = {
        tel: Util.user.getUserInfo().tel
      }

      Service.HasWaitReceiveOrder(params).then((res) => {
        // 非系统接单才能进行提示
        if (res.data.list.IsSysReceive) {
          window.clearInterval(this.generalDelayId)

          return
        }

        if (res.data.list.HasWaitOrder) {
          this.notifyObejct = this.$notify({
            duration: duration,
            title: '',
            dangerouslyUseHTMLString: true,
            message: (
              <div class="flex q-mb-md">
                <div class="q-mr-md">
                  <i class="el-icon-bell text-orange text-h4"></i>
                </div>
                <div class="col flex column">
                  <div class="text-orange text-h6 text-weight-bold q-mb-sm">来单提醒</div>
                  <div class="flex justify-between items-center">
                    <div class="q-mr-lg">您有新的订单，请及时处理</div>
                    <div class="text-primary cursor-pointer" on-click={this.gotoPharmacyOrderList}>
                      查看详情
                    </div>
                  </div>
                </div>
              </div>
            )
          })

          this.playDing()
        }
      })
    },

    playDing() {
      var ding = this.$el.querySelector('#ding')

      ding?.play()
    },

    gotoPharmacyOrderList() {
      this.notifyObejct?.close()

      this.$router.push('/pharmacy/pharmacy-order-list')
    }
  },

  render() {
    return ''
  }
}
</script>

<style>
</style>