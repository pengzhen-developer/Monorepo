<template>
  <div class="user-info">
    <van-cell-group>
      <van-cell title="头像">
        <template>
          <van-image :src="require('@/assets/images/ic_personal.png')"
                     style="width: 50px;height: 50px;border-radius:50%;overflow: hidden;" />
        </template>
      </van-cell>
      <van-cell title="用户名"
                :value="model.realName"></van-cell>
      <van-cell title="昵称"
                is-link
                :value="model.nickName"
                @click="showNickNameDialog"></van-cell>
      <van-cell title="手机号码"
                is-link
                :value="model.tel"
                @click="showTelphoneDialog"></van-cell>
    </van-cell-group>
    <div class="footer">
      <van-button @click="signOut"
                  round
                  size="large"> 退出登录</van-button>
    </div>
    <!-- 修改昵称 -->
    <template v-if="nameDialog.visible">
      <div class="dialog name">
        <van-form error-message-align="right"
                  input-align="right"
                  label-width="2.4em">

          <van-field v-model="nameDialog.model.nickName"
                     label="昵称"
                     clearable
                     placeholder="6-20位文字、数字或字母、不可使用特殊符号"
                     :error-message="nameDialog.message" />
          <div style="margin: 15px;">
            <peace-button round
                          block
                          throttle
                          :throttleTime="1500"
                          type="primary"
                          native-type="submit"
                          :disabled="!canSubmitName||nameDialog.resultFlag"
                          @click="changeNickName">
              确认修改
            </peace-button>
          </div>
        </van-form>
      </div>
    </template>
    <!-- 修改手机号 -->
    <template v-if="telDialog.visible">
      <div class="dialog">

        <van-form error-message-align="right"
                  input-align="right">
          <van-field v-model="telDialog.model.oldTel"
                     label="当前手机号码"
                     type="tel"
                     readonly
                     placeholder="请输入"
                     :value="telDialog.model.oldTel" />
          <van-field v-model="telDialog.model.newTel"
                     label="新手机号"
                     type="tel"
                     maxlength="11"
                     placeholder="请输入"
                     clearable
                     :error-message="telDialog.message" />
          <van-field v-model="telDialog.model.code"
                     clearable
                     ref="sms"
                     maxlength="6"
                     pattern="\d*"
                     type="number"
                     label="验证码">
            <template #button
                      v-if="!countDownTime">
              <div @click="getCode"
                   :class="telDialog.model.newTel.length==11?'text-primary':'text-gery'">获取验证码</div>
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
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'UserInfomation',
  data() {
    return {
      model: {
        realName: '',
        nickName: '',
        tel: ''
      },
      nameDialog: {
        visible: false,
        resultFlag: false,
        message: '',
        model: {
          nickName: ''
        }
      },
      telDialog: {
        visible: false,
        resultFlag: false,
        message: '',
        model: {
          oldTel: '',
          newTel: '',
          code: ''
        }
      },
      countDownTime: undefined,
      hasSend: false,
      userInfo: undefined
    }
  },
  computed: {
    canSubmitName() {
      return this.nameDialog.model.nickName && this.nameDialog.model.nickName != this.model.nickName
    },
    canSubmitTelephone() {
      return this.telDialog.model.oldTel && this.telDialog.model.newTel && this.telDialog.model.code && this.telDialog.model.code.length == 6
    }
  },
  mounted() {
    this.userInfo = peace.cache.get(peace.type.USER.INFO)
    this.model.realName = this.userInfo.patientInfo.realName
    this.model.nickName = this.userInfo.patientInfo.nickName || this.userInfo.patientInfo.realName
    this.model.tel = this.userInfo.patientInfo.tel
  },
  methods: {
    countDownFinished() {
      this.countDownTime = undefined
    },
    showNickNameDialog() {
      this.nameDialog.visible = true
      this.nameDialog.model.nickName = this.model.nickName
    },
    showTelphoneDialog() {
      this.telDialog.visible = true
      this.telDialog.model.oldTel = this.model.tel
    },
    changeNickName() {
      const params = { nickname: this.nameDialog.model.nickName }
      peace.service.patient
        .editBaseInfo(params)
        .then((res) => {
          peace.util.alert(res.msg)
          this.userInfo.patientInfo.nickName = this.nameDialog.model.nickName
          this.model.nickName = this.nameDialog.model.nickName
          this.nameDialog.visible = false
          this.setUserInfo()
        })
        .catch((err) => {
          this.nameDialog.message = err.msg
        })
    },
    changeTelephone() {
      const params = { tel: this.telDialog.model.newTel, smsCode: this.telDialog.model.code }
      peace.service.patient
        .updateTel(params)
        .then((res) => {
          peace.util.alert(res.msg)
          this.userInfo.patientInfo.tel = this.telDialog.model.newTel
          this.model.tel = this.telDialog.model.newTel
          this.telDialog.visible = false
          this.telDialog.newTel = ''
          this.telDialog.code = ''
          this.setUserInfo()
        })
        .catch((err) => {
          this.telDialog.message = err.msg
        })
    },
    //修改成功之后缓存最新的用户信息
    setUserInfo() {
      // 存储用户信息
      this.$store.commit('user/setUserInfo', this.userInfo)
      peace.cache.set(peace.type.USER.INFO, this.userInfo)
    },
    getCode() {
      if (this.telDialog.model.newTel.length != 11) {
        return
      }
      // 正在倒计时中，不重复发送验证码
      if (this.countDownTime !== undefined) {
        return
      }
      // 验证
      if (!(this.telDialog.model.newTel && peace.validate.pattern.mobile.test(this.telDialog.model.newTel))) {
        this.telDialog.message = '您输入的手机号错误，请重新输入'
        return
      }
      if (this.hasSend) {
        return
      }
      this.hasSend = true
      // 发送验证码
      const params = {
        tel: this.telDialog.model.newTel
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
    },
    signOut() {
      // 清空登录缓存
      peace.cache.remove(peace.type.USER.INFO)
      peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)

      // 跳转登录页
      this.$router.replace(peace.config.system.loginPage)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

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
  .van-cell-group {
    flex: 1;

    .van-cell {
      padding: 15px;
      border-bottom: 1px solid #dedede;
      &::after {
        border-width: 0;
      }
      .van-cell__title {
        display: flex;
        align-items: center;
      }

      .van-cell__title,
      .van-cell__value {
        color: #000;
        font-size: 15px;
      }
    }
  }
  /deep/.van-hairline--top-bottom::after {
    height: 0;
  }

  .footer {
    padding: 12px 15px;
    /deep/.van-button__content {
      color: #666;
    }
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