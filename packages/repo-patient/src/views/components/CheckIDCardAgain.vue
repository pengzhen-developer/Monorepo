<template>
  <van-popup position="bottom"
             @click-overlay="cancelAgain"
             round
             class="popup-card"
             v-model="visible">
    <div class="header">提示</div>
    <div class="content">
      <div class="title">请核对您填写的{{model.type==='self'?'就诊人':'监护人'}}身份证号</div>
      <van-field label="身份证号"
                 :class="{'is__error':error.idcard}"
                 placeholder="请输入"
                 :error-message="error.idcard"
                 v-model="model.idcard"
                 @blur="checkIdCardAgain" />
    </div>
    <div class="footer">
      <van-button round
                  @click="cancelAgain">取消</van-button>
      <van-button round
                  @click="confirmAgain">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'check-idcard-again',
  model: {
    prop: 'visible',
    event: 'changeDialogVisible'
  },
  props: {
    visible: Boolean,
    info: Object
  },
  data() {
    return {
      model: {},
      error: {},
      hasClick: false
    }
  },
  watch: {
    info: {
      handler(info) {
        if (info) {
          this.model = info.model
          this.error = info.error
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getAgeByIdCard(identityCard) {
      var len = (identityCard + '').length
      if (len == 0) {
        return 0
      } else {
        if (len != 15 && len != 18) {
          //身份证号码只能为15位或18位其它不合法
          return 0
        }
      }
      var strBirthday = ''
      if (len == 18) {
        //处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
      }
      if (len == 15) {
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    checkIdCardAgain() {
      if (!this.model.idcard) {
        this.error.idcard = this.model.isGuardian ? '监护人身份证不能为空' : '身份证不能为空'
        return false
      } else {
        if (!peace.validate.idCard(this.model.idcard)) {
          this.error.idcard = this.model.isGuardian ? '监护人身份证格式错误' : '身份证格式错误'
          return false
        } else {
          if (this.model.isGuardian && this.getAgeByIdCard(this.model.idcard) < 18) {
            this.error.idcard = '监护人年龄不得小于18岁'
            return true
          } else {
            this.error.idcard = ''
            return true
          }
        }
      }
    },
    cancelAgain() {
      this.$emit('changeDialogVisible', false)
      this.$emit('cancelAgain', { model: this.model })
    },
    confirmAgain() {
      if (!this.checkIdCardAgain()) {
        return
      }
      if (this.hasClick) {
        return
      }
      this.hasClick = true
      const params = {
        idCard: this.model.idcard,
        name: this.model.name
      }
      peace.service.patient
        .CheckFamilyIdCard(params)
        .then((res) => {
          //1：正常  2：库中无此身份证号码
          this.$emit('changeDialogVisible', false)
          this.$emit('confirmAgain', { status: true, isReconfirm: res.data?.status == 2 ? 1 : 0, model: this.model })
        })
        .catch((err) => {
          if (err.data.code == '202') {
            this.error.idcard = err.data.msg
          } else {
            peace.util.alert(err.data.msg)
          }
          this.$emit('confirmAgain', { status: false })
        })
        .finally(() => {
          this.hasClick = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-card {
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(51, 51, 51, 0.16);
  border-radius: 16px 16px 0px 0px;
  padding: 20px 16px 24px;
  .header {
    height: 24px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    text-align: center;
  }
  .content {
    margin-top: 20px;
    margin-bottom: 16px;
    .title {
      height: 24px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }
    .van-field {
      padding-left: 0;
      padding-right: 0;

      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      ::v-deep.van-field__label {
        width: 6em;
        flex: unset;
      }
      ::v-deep.van-field__control {
        text-align: right;
      }
      &::after {
        left: 0;
        right: 0;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      width: 156px;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      &:first-child {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      &:last-child {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00c6ae;
        line-height: 24px;
      }
    }
  }
}
</style>