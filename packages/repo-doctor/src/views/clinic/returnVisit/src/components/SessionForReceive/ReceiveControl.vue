<template>
  <div class="flex column justify-center items-center full-height full-width">
    <div class="q-mb-lg">
      <span>请在</span>
      <PeaceCountdown v-bind:time="1000 * 60 * 60 * 24 * 365">
        <template slot-scope="props">
          <span class="text-primary">
            {{ getCountdown(props) }}
          </span>
        </template>
      </PeaceCountdown>
      <span>内接诊，倒计时结束未接诊将自动退诊</span>
    </div>

    <div class="row flex justify-around full-width">
      <div class="col-6 flex justify-around">
        <div class="flex column justify-center items-center cursor-pointer">
          <q-icon style="font-size: 40px;"
                  class="q-mb-sm"
                  v-bind:name="`img:${require('./../../assets/img/ic_refuse@2x.png')}`"
                  v-on:click="refuse"></q-icon>
          <span>退诊</span>
        </div>
        <div class="flex column justify-center items-center cursor-pointer">
          <q-icon style="font-size: 40px;"
                  class="q-mb-sm"
                  v-bind:name="`img:${require('./../../assets/img/ic_accept@2x.png')}`"
                  v-on:click="receive"></q-icon>
          <span>接诊</span>
        </div>
      </div>
    </div>

    <!-- 模态框 - 填写拒绝原因 -->
    <peace-dialog width="348px"
                  top="25vh"
                  class="no-header"
                  v-if="refuseVisible"
                  v-bind:visible.sync="refuseVisible">
      <RefuseInquiry v-on:close="refuseVisible = false"></RefuseInquiry>
    </peace-dialog>
  </div>
</template>

<script>
import RefuseInquiry from './RefuseInquiry'

import Type from '@src/type'

import Service from './../../service'

export default {
  components: {
    RefuseInquiry
  },

  data() {
    return {
      refuseVisible: false
    }
  },

  computed: {
    session() {
      return this.$store?.state?.inquiry.session ?? {}
    },

    inquiryInfo() {
      return this.session?.content?.inquiryInfo ?? {}
    }
  },

  methods: {
    // 格式化
    formatDuration(beginDate, overDate) {
      const duration = Peace.util.getDuration(beginDate, overDate)

      if (duration.dd) {
        return `${duration.dd}天${duration.HH}小时`
      }

      if (duration.HH) {
        return `${duration.HH}小时${duration.mm}分钟`
      }

      if (duration.mm) {
        return `${duration.mm}分钟${duration.ss}秒`
      }
    },

    getCountdown() {
      if (this.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.待接诊) {
        const timerEnd = this.inquiryInfo?.startTime?.toDate()?.getTime() + Type.INQUIRY.自动退诊时间 * 60 * 60 * 1000

        return this.formatDuration(new Date(), timerEnd)
      }
    },

    refuse() {
      this.refuseVisible = true
    },

    receive() {
      const params = {
        inquiryNo: this.inquiryInfo.inquiryNo
      }

      Service.receiveInquiry(params).then((res) => {
        Peace.util.success(res.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-header {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
</style>