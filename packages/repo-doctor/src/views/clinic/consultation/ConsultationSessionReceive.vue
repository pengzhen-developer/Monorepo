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
  methods: {
    // 接诊
    receive() {
      const params = {
        consultationNo: this.$store.getters['consultation/consultationInfo'].consultationNo
      }

      peace.service.consultation.receiveconsultation(params).then(res => {
        peace.util.alert(res.msg)
      })
    },

    // 退诊
    refuse() {
      peace.util.confirm(
        '退诊后自动退还问诊费用，请再次确定是否退诊。',
        undefined,
        { type: 'warning', confirmButtonText: '退诊' },
        () => {
          const params = {
            consultationNo: this.$store.getters['consultation/consultationInfo'].consultationNo
          }

          peace.service.consultation.quitconsultation(params).then(res => {
            peace.util.alert(res.msg)
          })
        }
      )
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
    padding: 40px 0;
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
