<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title">手机快捷登录</h4>

      <van-field pattern="\d*"
                 placeholder="请输入手机号"
                 ref="tel"
                 type="number"
                 v-model="tel"></van-field>
      <van-field clickable
                 maxlength="6"
                 pattern="\d*"
                 placeholder="请输入验证码"
                 type="number"
                 v-model="smsCode">
        <span @click="sendSms"
              class="login-form-smsCode"
              slot="right-icon">{{ this.countDown === -1 ? '获取验证码' : this.countDown + 's' }}</span>
      </van-field>

      <van-button @click="signIn"
                  class="login-form-sign-in"
                  type="primary">进入万家云医</van-button>
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
      smsCodeDate: '',
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
            this.smsCodeDate = new Date()
            peace.util.alert(res.msg)
          })
          .finally(() => {
            this.countDownIntervalHandler()
          })
      }
    },

    countDownIntervalHandler() {
      const that = this
      this.countDown = 60

      const countDownIntervalFunc = () => {
        const down = Math.ceil((new Date().getTime() - that.smsCodeDate.getTime()) / 1000)

        if (down >= 60) {
          that.countDown = -1
          window.clearInterval(countDownInterval)
        } else {
          that.countDown = 60 - down
        }
      }

      countDownIntervalFunc()
      const countDownInterval = setInterval(countDownIntervalFunc, 1000)
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

        // 跳转 reffer
        this.$router.push($peace.referrer.fullPath || peace.config.system.homePage)
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

