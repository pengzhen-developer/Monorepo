<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title">手机快捷登录</h4>

      <van-field placeholder="请输入手机号" ref="tel" v-model="tel"></van-field>
      <van-field :value="smsCode" @touchstart.native.stop="showKeyboardForSms = true" clickable placeholder="请输入验证码" readonly ref="smsCode">
        <span @click="sendSms" class="login-form-smsCode" slot="right-icon">{{ this.countDown === 60 ? '获取验证码' : this.countDown + 's' }}</span>
      </van-field>
      <van-number-keyboard :maxlength="6" :show="showKeyboardForSms" @blur="showKeyboardForSms = false" v-model="smsCode" />

      <van-button @click="signIn" class="login-form-sign-in" type="primary">进入爱家医</van-button>
      <van-button @click="signInByMock" class="login-form-sign-in" type="primary">模拟登录 - 彭真的账号</van-button>
      <!-- <van-button @click="signInByMockForSISI" class="login-form-sign-in" type="primary">模拟登录 - 思思的账号</van-button> -->
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
      showKeyboardForTel: false,
      showKeyboardForSms: false,
      countDown: 60
    }
  },

  methods: {
    sendSms() {
      if (!(this.tel && peace.validate.pattern.mobile.test(this.tel))) {
        this.$refs.tel.focus()
        this.showKeyboardForSms = false
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
        patientInfo: { id: 'mbnbxzzdzl', tel: '13007120720', realName: 'AJY49666111', regTime: '2019-07-10 11:26:13' },
        loginInfo: { tel: '13007120720', accessToken: '_d62e776641c43f02f16be0390cb09a88' },
        registerInfo: { userId: 'mbnbxzzdzl', imToken: 'a29093276850b6c45e1011045dc2842a', nickname: 'AJY49666111' }
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
    },

    signInByMockForSISI() {
      const mockLoginData = {
        patientInfo: { id: 'rjgqjjxfle', tel: '18674052544', realName: 'AJY93445475', regTime: '2019-07-10 14:56:03' },
        loginInfo: { tel: '18674052544', accessToken: '_ce682229e4e803f035b9d5d6d29c7700' },
        registerInfo: { userId: 'rjgqjjxfle', imToken: 'fb40659d78920e9a5cfc2ebf29bbf741', nickname: 'AJY93445475' }
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

