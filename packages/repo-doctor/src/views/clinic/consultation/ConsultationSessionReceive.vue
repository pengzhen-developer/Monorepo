<template>
  <div class="consultation-session-receive">
    <div class="tip">
      <span>请在</span>
      <span class="count-down">{{ $peace.consultationComponent.getIntervalValue($store.state.consultation.session) }}</span>
      <span>内接诊，倒计时结束未接诊将自动退诊</span>
    </div>
    <div class="control">
      <div @click="refuse">
        <img src="~@src/assets/images/inquiry/ic_refuse.png">
        <span>退诊</span>
      </div>
      <div @click="receive">
        <img src="~@src/assets/images/inquiry/ic_accept.png">
        <span>接诊</span>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  inject: ['provideCall'],

  computed: {
    injectCall() {
      return this.provideCall
    }
  },

  methods: {
    // 接受
    receive() {
      const receiveHandler = () => {
        const params = {
          consultNo: this.$store.state.consultation.session.content.consultInfo.consultNo,
          action: 'accept'
        }

        return peace.service.consult.doctorAudit(params)
      }

      const receiveMessage = () => {
        const message = '您已接诊，是否立即开启视频。'
        const option = {
          type: 'warning',
          confirmButtonText: '开始视频',
          cancelButtonText: '暂不开始'
        }

        peace.util.confirm(message, undefined, option, () => {
          this.injectCall(this.$store.state.consultation.session, 'consult')
        })
      }

      receiveHandler().then(receiveMessage)
    },

    // 拒绝
    refuse() {
      const refuseMessage = (confirmCallback) => {
        this.$prompt('退诊后自动退还问诊费用，请输入退诊原因。', '提示', {
          confirmButtonText: '确认退诊',
          cancelButtonText: '取消退诊',
          inputType: 'textarea'
        }).then(({ value }) => {
          if (value) {
            confirmCallback(value)
          } else {
            peace.util.alert('请输入退诊原因')
          }
        })
      }

      const refuseHandler = (reason) => {
        const params = {
          reason: reason,
          consultNo: this.$store.state.consultation.session.content.consultInfo.consultNo,
          action: 'reject'
        }

        peace.service.consult.doctorAudit(params)
      }

      refuseMessage(refuseHandler)
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-session-receive {
  width: 100%;
  border-top: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tip {
    padding: 20px 0;
    color: #333333;

    .count-down {
      margin: 0 5px;
      font-weight: bold;
      color: #00c6ae;
    }
  }

  .control {
    width: 350px;
    text-align: center;
    display: inline-flex;
    justify-content: space-around;

    div {
      display: flex;
      align-items: center;
      flex-flow: column;

      cursor: pointer;
    }
  }
}
</style>
