<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title">手机快捷登录</h4>

      <van-field placeholder="请输入手机号" ref="tel" v-model="tel" />
      <van-field placeholder="请输入验证码" ref="smsCode" readonly
        clickable
        :value="smsCode"
        @touchstart.native.stop="showKeyboard = true">
        <span @click="sendSms" class="login-form-smsCode" slot="right-icon">{{ this.countDown === 60 ? '获取验证码' : this.countDown + 's' }}</span>
      </van-field>
      <van-number-keyboard v-model="smsCode" :show="showKeyboard" :maxlength="6" @blur="showKeyboard = false"/>

      <van-button @click="signIn" class="login-form-sign-in" type="primary">进入爱家医</van-button>
      <van-button @click="signInByMock" class="login-form-sign-in" type="primary">模拟登录 - 彭真的账号</van-button>
    </div>

    <div class="login-footer">
      <span class="gray">进入爱加医即代表你已同意</span>
      <span>用户协议及隐私策略</span>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      tel: '',
      smsCode: '',
      showKeyboard: false,
      countDown: 60
    }
  },

  methods: {
    sendSms() {
      if (!(this.tel && peace.validate.pattern.mobile.test(this.tel))) {
        this.$refs.tel.focus()
        return peace.util.alert('请输入正确的手机号')
      }

      const params = { tel: this.tel }
      peace.service.login.sendSms(params).then(res => {
        peace.util.alert(res.msg)
        this.$refs.smsCode.focus()

        const countDownInterval = setInterval(() => {
          if (this.countDown === 0) {
            this.countDown = 60
            window.clearInterval(countDownInterval)
          } else {
            this.countDown = this.countDown - 1
          }
        }, 1000)
      })
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
    },

    signInByMock() {
      // todo
      const mockLoginData = {
        patientInfo: { id: 'yhasfnnays', tel: '13007120720', realName: 'AJY49666111', regTime: '2019-07-10 11:26:13' },
        loginInfo: { tel: '13007120720', accessToken: '_83bf3489efda0de88996ff9041eb6a98' },
        registerInfo: { userId: 'yhasfnnays', imToken: '04236b23c334901c291fc6d593aa2215', nickname: 'AJY49666111' }
      }

      // 提示登录成功
      peace.util.alert('登录成功，正在跳转...')

      // 更新 vuex store
      this.$store.commit('user/setUserInfo', mockLoginData)

      // 存储到本地缓存
      peace.cache.set(peace.type.USER.INFO, mockLoginData, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)

      // 初始化 IM
      peace.service.IM.initNIM()

      setTimeout(() => {
        this.$router.push(peace.config.system.homePage)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .login-form {
    flex: 1;
    display: flex;
    flex-direction: column;

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
    height: 50px;
    text-align: center;
  }
}
</style>

