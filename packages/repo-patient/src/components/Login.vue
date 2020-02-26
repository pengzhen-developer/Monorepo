<template>
  <div class="login">
    <div class="login-form">
      <h4 class="login-form-title"
          v-if="!fromPath">手机快捷登录</h4>
      <h4 class="login-form-title "
          v-else>
        <div class="other">为保证您的信息安全</div>
        <div class="other">请绑定手机号</div>
      </h4>
      <van-field pattern="\d*"
                 placeholder="请输入手机号"
                 ref="tel"
                 type="number"
                 v-model="model.tel">
      </van-field>

      <van-field clickable
                 ref="sms"
                 maxlength="6"
                 pattern="\d*"
                 placeholder="请输入验证码"
                 type="number"
                 v-model="model.smsCode">
        <div @click="sendSms"
             class="login-form-smsCode"
             slot="right-icon">

          <template v-if="countDownTime">
            <van-row type="flex"
                     justify="start"
                     align="center">
              <van-count-down :time="countDownTime"
                              @finish="countDownFinished"
                              format="ss" />
              <span>秒</span>
            </van-row>
          </template>
          <template v-else>
            获取验证码
          </template>
        </div>
      </van-field>

      <van-button @click="signIn"
                  class="login-form-sign-in"
                  type="primary">登录</van-button>
    </div>

    <div class="login-footer">
      <!-- <span class="gray">进入互联网诊疗服务平台即代表你已同意</span>
      <span>用户协议及隐私策略</span> -->
      <span class="gray">登录互联网诊疗服务平台</span>
      <span>即代表你已同意用户协议及隐私策略</span>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      model: {
        tel: '',
        smsCode: ''
      },
      hasLogin: false,
      hasSend: false,
      countDownTime: undefined,
      fromPath: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    let isEwm = peace.util.decode(from.params.json).isEwm ? 1 : 0
    next(vm => {
      if (isEwm && from.fullPath.indexOf('components/doctorDetai') != -1) {
        vm.fromPath = from.fullPath
      }
    })
  },
  mounted() {
    if (peace.cache.get(peace.type.USER.TEL) != null) {
      this.model.tel = peace.cache.get(peace.type.USER.TEL)
    } else {
      this.$nextTick(() => {
        this.$refs.tel.focus()
      })
    }
  },

  methods: {
    countDownFinished() {
      this.countDownTime = undefined
    },

    sendSms() {
      // 正在倒计时中，不重复发送验证码
      if (this.countDownTime !== undefined) {
        return
      }

      // 验证
      if (!(this.model.tel && peace.validate.pattern.mobile.test(this.model.tel))) {
        this.$refs.tel.focus()
        return peace.util.alert('请输入正确的手机号')
      }
      if (this.hasSend) {
        return
      }
      this.hasSend = true
      // 发送验证码
      peace.service.login
        .sendSms(this.model)
        .then(res => {
          // 开启倒计时
          this.countDownTime = 1000 * 60
          // 获取到焦点
          this.$refs.sms.focus()

          peace.util.alert(res.msg)
        })
        .finally(() => {
          setTimeout(() => {
            this.hasSend = false
          }, 500)
        })
    },

    signIn() {
      if (this.hasLogin) {
        return
      }
      this.hasLogin = true
      const params = {
        tel: this.model.tel,
        smsCode: this.model.smsCode
      }

      peace.service.login
        .login(params)
        .then(res => {
          // 存储用户信息
          this.$store.commit('user/setUserInfo', res.data)
          peace.cache.set(peace.type.USER.INFO, res.data)
          //缓存登录手机号
          peace.cache.set(peace.type.USER.TEL, this.model.tel)

          // 初始化 IM
          peace.service.IM.initNIM()

          // 微信环境下授权
          this.WXAuth()
        })
        .finally(() => {
          setTimeout(() => {
            this.hasLogin = false
          }, 500)
        })
    },

    WXAuth() {
      const UA = window.navigator.userAgent.toLowerCase()
      if (UA.match(/MicroMessenger/i) == 'micromessenger') {
        return this.$router.replace({
          path: peace.config.system.authPage,
          query: {
            referrer: this.fromPath || this.$route.query.referrer || peace.config.system.homePage
          }
        })
      } else {
        peace.util.alert('当前不是微信环境')

        return this.$router.replace({
          path: this.fromPath || this.$route.query.referrer || peace.config.system.homePage
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.login {
  height: 100%;
  min-height: 100%;
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
      .other {
        text-align: center;
      }
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
    span {
      width: 100%;
      display: block;
    }
  }
}
</style>

