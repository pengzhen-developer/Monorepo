<template>
  <div class="login"
       id="login">
    <div class="login-form">
      <h4 class="login-form-title"
          v-if="!isEwm">
        <div class="title">手机快捷登录</div>
        <div class="tip">手机验证码直接登录，无须注册</div>
      </h4>
      <h4 class="login-form-title "
          v-else>
        <div class="other">为保证您的信息安全</div>
        <div class="other">请绑定手机号</div>
      </h4>
      <van-field pattern="\d*"
                 placeholder="请输入手机号"
                 ref="tel"
                 maxlength="11"
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
             :class="!countDownTime&&'theme'"
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
      <div class="login-form-sign-in">
        <van-button @click="signIn"
                    size="large"
                    :disabled="!CanSignIn"
                    round
                    type="primary">登录</van-button>
      </div>

    </div>

    <div class="login-footer">
      登录即代表你已同意<span class="theme"
            @click="gotoAgreementPage('userAgreement')">《用户协议》</span>及<span class="theme"
            @click="gotoAgreementPage('privacyAgreement')">《隐私政策》</span>
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
      isEwm: false
    }
  },

  activated() {
    this.isEwm = peace.cache.get('isEwm') ? true : false
  },
  mounted() {
    //处理安卓机键盘弹出使布局错乱
    document.body.querySelector('#login').style.height = window.innerHeight + 'px'

    if (peace.cache.get(peace.type.USER.TEL) != null) {
      this.model.tel = peace.cache.get(peace.type.USER.TEL)
    } else {
      this.$nextTick(() => {
        this.$refs.tel && this.$refs.tel.focus()
      })
    }
  },
  computed: {
    CanSignIn() {
      return this.model.tel && this.model.smsCode && this.model.tel.length == 11 && this.model.smsCode.length == 6
    }
  },
  methods: {
    gotoAgreementPage(type) {
      const params = peace.util.encode({ type })
      this.$router.push(`/components/agreement/${params}`)
    },

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
        setTimeout(() => {
          this.$refs.tel && this.$refs.tel.focus()
          peace.util.alert('请输入正确的手机号')
        }, 500)
        return
      }
      if (this.hasSend) {
        return
      }
      this.hasSend = true
      // 发送验证码
      peace.service.login
        .sendSms(this.model)
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
        .then((res) => {
          // 存储用户信息
          this.$store.commit('user/setUserInfo', res.data)
          peace.cache.set(peace.type.USER.INFO, res.data)
          //缓存登录手机号
          peace.cache.set(peace.type.USER.TEL, this.model.tel)

          this.$nextTick(() => {
            // 初始化 IM
            peace.service.IM.initNIMS()
            // 微信环境下授权
            this.WXAuth()
          })
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
            referrer: this.$route.query.referrer || peace.config.system.homePage
          }
        })
      } else {
        return this.$router.replace({
          path: this.$route.query.referrer || peace.config.system.homePage
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

    margin: 32px 16px 0 16px;

    .login-form-title {
      margin: 0 0 20px 0;

      .other {
        text-align: center;
        font-size: 18px;
      }
      .title {
        font-size: 27px;
      }
      .tip {
        font-size: 11px;
        line-height: normal;
        color: #999;
        font-weight: 400;
        margin-top: 3px;
      }
    }

    .login-form-smsCode {
      color: #333333;
      font-size: 13px;
    }

    .login-form-sign-in {
      width: 100%;
      margin: 30px 0 15px 0;
    }
  }

  .login-footer {
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .theme {
    color: $primary !important;
    font-size: 13px;
  }
  /deep/ .van-cell {
    height: 50px;
    padding: 0;
    align-items: center;
    margin-top: 11px;
    &::after {
      left: 0;
      width: 100%;
    }
  }
  /deep/ .van-cell__value {
    font-size: 17px;
  }
  /deep/ .van-button--disabled {
    opacity: 0.4;
  }
}
</style>

