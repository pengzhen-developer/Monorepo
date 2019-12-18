<template>
  <div class="container">
    <el-form :model="view.model"
             @keyup.enter.native="login"
             class="login-card">
      <div class="title">医生工作站</div>
      <div class="row"
           label
           prop="username">
        <el-input placeholder="请输入手机号"
                  type="text"
                  v-model.trim="view.model.username"></el-input>
        <div class="tips"
             v-if="usernameError">{{ usernameError }}</div>
      </div>
      <div class="row"
           label
           prop="password">
        <el-input placeholder="请输入验证码"
                  ref="pwd"
                  maxlength="6"
                  v-model="view.model.password">
          <el-button :disabled="isDown"
                     @click="getValidCode"
                     slot="suffix"
                     type="text">
            <el-divider direction="vertical"
                        style="height: 1.6em; margin: 0 12px;"></el-divider>
            <span v-show="!isDown">获取验证码</span>
            <span v-show="isDown">{{ `(${ down })` }}</span>
          </el-button>
        </el-input>
        <div class="tips"
             v-if="passwordError">{{ passwordError }}</div>
      </div>
      <div class="row btn">
        <el-button :disabled="isLoging"
                   @click="login"
                   type="primary">登录</el-button>
      </div>
    </el-form>
    <div class="footer-text">Copyright @ 2018-2038 全息云通健康科技（武汉）有限公司版权所有</div>
  </div>
</template>
 
<script>
import peace from '@src/library'

export default {
  name: 'login',

  data() {
    return {
      view: {
        model: {
          username: peace.cache.get(peace.type.USER.PHONE) || '',
          password: ''
        }
      },

      isDown: false,
      down: 60,

      isLoging: false,
      usernameError: '',
      passwordError: ''
    }
  },

  methods: {
    // 获取验证码
    getValidCode() {
      this.usernameError = ''

      if (!this.view.model.username) {
        this.usernameError = '请输入手机号码'
        return
      }

      if (!peace.validate.pattern.mobile.test(this.view.model.username)) {
        this.usernameError = '请输入正确的手机号码'
        return
      }

      this.isDown = true

      let shutDownInterval = setInterval(() => {
        this.down--
      }, 1000)

      setTimeout(() => {
        this.down = 60
        this.isDown = false
        window.clearInterval(shutDownInterval)
      }, 60000)

      const param = {
        tel: this.view.model.username
      }

      peace.service.login
        .sendSms(param)
        .then(res => {
          this.$refs.pwd.focus()
          peace.validate.isEmpty('')
          peace.util.alert(res.msg, null, peace.type.SYSTEM.MESSAGE.SUCCESS)
        })
        .catch(() => {
          this.down = 60
          this.isDown = false
          window.clearInterval(shutDownInterval)
        })
    },

    // 登录
    login() {
      this.isLoging = true

      const res = this.valid()

      if (res.valid) {
        const params = {
          tel: this.view.model.username,
          smsCode: this.view.model.password
        }

        peace.service.login.login(params).then(res => {
          // 提示登录成功
          peace.util.alert('登录成功，正在跳转...', null, peace.type.SYSTEM.MESSAGE.SUCCESS)

          // 更新 vuex store
          this.$store.commit('user/setUserInfo', res.data)

          // 存储到本地缓存
          peace.cache.set(peace.type.USER.INFO, res.data, peace.type.SYSTEM.CACHE.LOCAL_STORAGE)

          // 储存登录手机号
          peace.cache.set(peace.type.USER.PHONE, res.data.list.docInfo.tel)

          // 初始化 IM
          peace.service.IM.initNIM()
          peace.service.IM.initWebRTC()

          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
      } else {
        this.usernameError = res.usernameError
        this.passwordError = res.passwordError
      }

      this.isLoging = false
    },

    // 验证
    valid() {
      this.usernameError = ''
      this.passwordError = ''

      let res = {
        valid: true,
        usernameError: '',
        passwordError: ''
      }

      if (!this.view.model.username) {
        res.valid = false
        res.usernameError = '请输入手机号码'

        return res
      }

      if (!peace.validate.pattern.mobile.test(this.view.model.username)) {
        res.valid = false
        res.usernameError = '请输入正确的手机号码'

        return res
      }

      if (!this.view.model.password) {
        res.valid = false
        res.passwordError = '请输入验证码'

        return res
      }

      return res
    },

    // 重新输入密码
    reInput() {
      this.$refs.pwd.focus()

      this.password = ''
      this.showTips = false
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped>
/* Change the white to any color ;) */
/deep/ input:-webkit-autofill,
/deep/ input:-webkit-autofill:hover,
/deep/ input:-webkit-autofill:focus,
/deep/ input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
}

.container {
  height: 100%;

  position: relative;
  z-index: 1;
  padding-bottom: 60px;
  background: url('~@src/assets/images/bg.png') no-repeat;
  background-size: 100% 100%;
  background-position: center;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 198, 174, 0.6);
  }
  .login-card {
    position: relative;
    top: 50%;
    margin: 0 auto;
    width: 320px;
    transform: translateY(-50%);
    .title {
      font-size: 20px;
      line-height: 28px;
      color: #fff;
    }
    .row {
      position: relative;
      margin-top: 30px;
      padding-left: 50px;
      padding-right: 5px;
      height: 50px;
      border: 1px solid $--color-primary;
      border-radius: 3px;
      line-height: 50px;
      background: linear-gradient(to right, $--color-primary 0, $--color-primary 50px, white 50px, white 100%);
      .close {
        position: absolute;
        top: 17px;
        right: 20px;
        width: 16px;
        height: 16px;
        font-size: 26px;
        text-align: center;
        line-height: 12px;
        color: $--color-primary;
        display: block;
        cursor: pointer;
      }
      .tips {
        position: absolute;
        top: 0;
        right: -233px;
        padding: 0 20px;
        width: 208px;
        height: 50px;
        color: white;
        line-height: 50px;
        border-radius: 10px;
        background-color: $--color-warning;
        &:before {
          position: absolute;
          top: 21px;
          left: -4px;
          content: '';
          border-radius: 3px;
          border: 5px solid;
          border-color: $--color-warning transparent transparent $--color-warning;
          transform: rotate(-45deg);
          display: block;
        }
      }
      .valid-code {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 9px;
        top: 9px;
        width: 32px;
        height: 32px;
        display: block;
        background-image: url('~@src/assets/images/login/user.png');
        background-repeat: no-repeat;
        background-size: 32px auto;
        background-position-x: 0;
      }
      &:nth-child(3):before {
        background-image: url('~@src/assets/images/login/pwd.png');
      }
      &.btn {
        margin-top: 40px;
        padding: 0;
        border: 0;
        background: none;
        &:before {
          display: none;
        }

        .el-button {
          width: 100%;
          height: 100%;
          font-size: 16px;
          border-radius: 4px;
        }
      }
    }
  }
  .footer-text {
    position: absolute;
    bottom: 20px;
    width: 100%;
    color: white;
    text-align: center;
    line-height: 20px;
    height: 20px;
  }
}
</style>
<style lang="scss">
.el-divider--vertical {
  height: 1.6em;
  margin: 0 12px;
}

.row {
  .el-input {
    height: 100%;
    display: block;
    &__inner {
      font-size: 14px;
      border: 0;
      height: 100%;
      vertical-align: top;
      box-shadow: none;
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #bcbcbc;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #bcbcbc;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #bcbcbc;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #bcbcbc;
  }
}
</style>
