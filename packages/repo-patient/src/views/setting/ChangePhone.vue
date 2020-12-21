<template>
  <div class="dialog">

    <van-form error-message-align="right"
              input-align="right">
      <van-field v-model="model.oldTel"
                 label="当前手机号码"
                 type="tel"
                 readonly
                 placeholder="请输入"
                 :value="model.oldTel" />
      <van-field v-model="model.newTel"
                 label="新手机号"
                 type="tel"
                 maxlength="11"
                 placeholder="请输入"
                 clearable
                 :error-message="message" />
      <van-field v-model="model.code"
                 clearable
                 ref="sms"
                 maxlength="6"
                 pattern="\d*"
                 type="number"
                 label="验证码">
        <template #button
                  v-if="!countDownTime">
          <div @click="getCode"
               :class="model.newTel.length==11?'text-primary':'text-gery'">获取验证码</div>
        </template>

      </van-field>
      <van-field class="noBorder">
        <template #button>
          <van-row v-if="countDownTime"
                   type="flex"
                   justify="end"
                   align="center">重新发送 <span class="text-primary"
                  style="display: flex;align-items:center;justify-content:flex-end;">(
              <van-count-down :time="countDownTime"
                              class="text-primary"
                              @finish="countDownFinished"
                              format="ss" />
              )s
            </span></van-row>
        </template>
      </van-field>
      <div style="margin: 15px;">
        <div class="tip">更换手机号后，下次登录可以使用新手机号登录。</div>
        <peace-button round
                      block
                      throttle
                      :throttleTime="1500"
                      type="primary"
                      native-type="submit"
                      :disabled="!canSubmitTelephone"
                      @click="changeTelephone">
          确认更改
        </peace-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'ChangePhone',

  data() {
    return {
      message: '',
      model: {
        oldTel: '',
        newTel: '',
        code: ''
      },
      countDownTime: undefined,
      hasSend: false
    }
  },
  computed: {
    canSubmitTelephone() {
      return this.model.oldTel && this.model.newTel && this.model.code && this.model.code.length == 6
    }
  },
  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.model.oldTel = params.oldTel
  },
  methods: {
    countDownFinished() {
      this.countDownTime = undefined
    },
    //修改成功之后缓存最新的用户信息
    setUserInfo(result) {
      const userInfo = peace.cache.get(peace.type.USER.INFO)
      if (result.tel) {
        userInfo.patientInfo.tel = result.tel
      }
      if (result.nickName) {
        userInfo.patientInfo.nickName = result.nickName
      }
      // 存储用户信息
      this.$store.commit('user/setUserInfo', userInfo)
      peace.cache.set(peace.type.USER.INFO, userInfo)
    },
    changeTelephone() {
      const params = { tel: this.model.newTel, smsCode: this.model.code }
      peace.service.patient
        .updateTel(params)
        .then((res) => {
          peace.util.alert(res.msg)
          this.setUserInfo({ tel: this.model.newTel })
        })
        .catch((err) => {
          this.message = err.msg
        })
    },
    getCode() {
      if (this.model.newTel.length != 11) {
        return
      }
      // 正在倒计时中，不重复发送验证码
      if (this.countDownTime !== undefined) {
        return
      }
      // 验证
      if (!(this.model.newTel && peace.validate.pattern.mobile.test(this.model.newTel))) {
        this.message = '您输入的手机号错误，请重新输入'
        return
      }
      if (this.hasSend) {
        return
      }
      this.hasSend = true
      // 发送验证码
      const params = {
        tel: this.model.newTel
      }
      peace.service.patient
        .getSmsCode(params)
        .then((res) => {
          // 开启倒计时
          this.countDownTime = 1000 * 60
          peace.util.alert(res.msg)
          setTimeout(() => {
            // 获取到焦点
            this.$refs.sms && this.$refs.sms.focus()
          }, 500)
        })
        .finally(() => {
          setTimeout(() => {
            this.hasSend = false
          }, 500)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-field {
  padding: 15px;
  border-bottom: 1px solid #dedede;
  &.noBorder {
    border-width: 0;
    padding: 2px 15px;
  }
  &::after {
    border-width: 0;
  }
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  .van-button {
    margin-top: 20px;
  }
  &.name {
    .van-button {
      margin-top: 194px;
    }
  }
  /deep/.van-field__clear {
    color: #dedede;
  }
  /deep/.van-field__control,
  /deep/.van-field__label {
    font-size: 15px;
    color: #000;
  }

  .tip {
    color: #999;
    // padding: 12px 0;
  }
  .van-button--disabled {
    color: #999;
    background: #e0e0e0;
    opacity: 1;
    border-color: #e0e0e0;
  }

  .text-primary {
    color: $primary;
  }
  .text-gery {
    color: #999;
  }
}
</style>