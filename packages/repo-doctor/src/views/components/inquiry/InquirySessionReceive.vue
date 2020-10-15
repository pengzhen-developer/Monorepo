<template>
  <div class="inquiry-session-receive">
    <div class="tip">
      <span>请在</span>
      <span class="count-down">{{ $peace.inquiryComponent.getIntervalValue($store.state.inquiry.session) }}</span>
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
    <peace-dialog :visible.sync="over.visible"
                  class="over-dialog"
                  title
                  top="25vh"
                  width="348px">
      <p style="margin: 0 0 16px 0; font-size: 16px; font-weight:400; color:rgba(51,51,51,1);">
        请选择您的退诊原因</p>

      <el-radio-group v-model="over.description">
        <el-radio label="不对症"
                  style="margin: 0 0 10px 0;">不对症</el-radio>
        <br />
        <el-radio label="需面诊"
                  style="margin: 0 0 10px 0;">需面诊</el-radio>
        <br />

        <el-radio label="其他"
                  style="margin: 0 0 10px 0;">其他</el-radio>
        <br />
      </el-radio-group>

      <el-input :rows="3"
                placeholder="请填写15字内原因"
                type="textarea"
                maxlength="15"
                ref="quitInput"
                @focus="getfocus"
                v-model="over.otherDescription"></el-input>

      <div style="text-align: center; margin: 10px 0 0 0;">
        <el-button @click="over.visible = false"
                   class="el-button-style"
                   type>取消</el-button>
        <el-button :disabled="canSubmit"
                   @click="overConfirmAgain"
                   class="el-button-style"
                   type="primary">确认</el-button>
      </div>
    </peace-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      over: {
        visible: false,
        description: '',
        otherDescription: ''
      }
    }
  },

  computed: {
    canSubmit() {
      if (this.over.description == '其他') {
        return peace.validate.isEmpty(this.over.otherDescription.trim())
      } else {
        return !this.over.description
      }
    }
  },

  watch: {
    'over.description'(value) {
      if (value === '其他') {
        this.$refs.quitInput.focus()
      }
    }
  },

  methods: {
    // 接诊
    receive() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
      }

      peace.service.inquiry.receiveInquiry(params).then((res) => {
        peace.util.alert(res.msg)
      })
    },

    getfocus() {
      this.over.description = '其他'
    },

    // 退诊
    refuse() {
      this.over.visible = true

      this.over.state = ''
      this.over.description = ''
      this.over.otherDescription = ''
    },

    overConfirmAgain() {
      const params = {
        inquiryNo: this.$store.getters['inquiry/inquiryInfo'].inquiryNo,
        overCause: this.over.description == '其他' ? this.over.otherDescription : this.over.description
      }
      peace.service.inquiry.quitInquiry(params).then((res) => {
        peace.util.alert(res.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry-session-receive {
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

.over-dialog {
  /deep/ .el-dialog__header {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding: 20px;
  }
}

.el-button-style {
  width: 89px;
  height: 28px;
}
</style>
