<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title">手机快捷登录</h4>

      <van-field placeholder="请输入手机号" ref="tel" v-model="tel"></van-field>
      <van-field :value="smsCode" @touchstart.native.stop="showKeyboard" clickable placeholder="请输入验证码" readonly>
        <span @click="sendSms" class="login-form-smsCode" slot="right-icon">{{ this.countDown === -1 ? '获取验证码' : this.countDown + 's' }}</span>
      </van-field>
      <van-number-keyboard :maxlength="6" :show="showKeyboardForSms" @blur="showKeyboardForSms = false" v-model="smsCode" />

      <van-button @click="signIn" class="login-form-sign-in" type="primary">进入爱家医</van-button>
    </div>

    <!-- <div class="login-footer">
      <span class="gray">进入爱加医即代表你已同意</span>
      <span>用户协议及隐私策略</span>
    </div>-->
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      tel: '',
      smsCode: '',
      showKeyboardForSms: false,
      countDown: -1
    }
  },

  methods: {
    sendSms() {
      if (!(this.tel && peace.validate.pattern.mobile.test(this.tel))) {
        this.$refs.tel.focus()
        return peace.util.alert('请输入正确的手机号')
      }

      if (this.countDown === -1) {
        this.countDown = 60

        const params = { tel: this.tel }
        peace.service.login
          .sendSms(params)
          .then(res => {
            peace.util.alert(res.msg)
          })
          .finally(() => {
            this.countDownIntervalHandler()
          })
      }
    },

    countDownIntervalHandler() {
      this.countDown = 60

      const countDownInterval = setInterval(() => {
        if (this.countDown === 0) {
          this.countDown = -1
          window.clearInterval(countDownInterval)
        } else {
          this.countDown = this.countDown - 1
        }
      }, 1000)
    },

    showKeyboard() {
      this.showKeyboardForSms = true
    },

    signIn() {
      const params = {
        tel: this.tel,
        smsCode: this.smsCode
      }

      peace.service.login.login(params).then(res => {
        // 提示登录成功
        peace.util.alert('登录成功，正在跳转...')

        // 更新 vuex store
        this.$store.commit('user/setUserInfo', res.data)

        // 存储到本地缓存
        peace.cache.set(peace.type.USER.INFO, res.data, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)

        // 初始化 IM
        peace.service.IM.initNIM()

        setTimeout(() => {
          this.$router.push(peace.config.system.homePage)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;

  .login-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    margin: 80px 10px 0 10px;

    .login-form-title {
      margin: 0 15px 25px 15px;
      font-size: 22px;
    }

    .login-form-smsCode {
      color: #333333;
    }

    .login-form-sign-in {
      margin: 30px 15px 15px 15px;
    }
  }

  .login-footer {
    margin: 0 0 10px 0;
    text-align: center;
  }
}
</style>

