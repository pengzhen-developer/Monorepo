<template>
  <div class="container">
    <div class="window-width window-height container-masker"></div>

    <div class="fixed-center form">
      <p class="text-white text-h6">医生工作站</p>

      <el-form v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="login"
               ref="form">
        <el-form-item class="q-mb-md"
                      prop="tel">
          <el-input class="q-mb-md"
                    v-model="model.tel"
                    placeholder="请输入手机号"
                    maxlength="11"
                    minlength="11">
            <template slot="prepend">
              <q-icon v-bind:name="usernameImage"
                      size="28px" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="q-mb-md"
                      prop="smsCode">
          <el-input ref="smsCode"
                    class="q-mb-md"
                    v-model="model.smsCode"
                    placeholder="请输入验证码"
                    maxlength="6"
                    minlength="6">
            <template slot="prepend">
              <q-icon v-bind:name="passwordImage"
                      size="28px" />
            </template>

            <template slot="suffix">
              <template v-if="showCountdown">
                <el-divider direction="vertical"></el-divider>

                <peaceCountdown v-bind:time="countdownTime"
                                v-on:end="onCountdownEnd">
                  <template slot-scope="props">
                    {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                  </template>
                </peaceCountdown>
              </template>
              <template v-else>
                <el-divider direction="vertical"></el-divider>

                <el-button type="text"
                           v-bind:disabled="isVerifyPhone"
                           v-on:click="sendCode">获取验证码</el-button>
              </template>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <q-btn class="full-width q-py-sm"
                 color="primary"
                 label="登 录"
                 v-bind:ripple="false"
                 v-bind:loading="isLoging"
                 v-on:click="login">
          </q-btn>

          <div class="text-grey-3 q-mt-sm">
            <span>登录即代表你已同意</span>
            <span>《</span>
            <span class="cursor-pointer"
                  style="text-decoration: underline;"
                  v-on:click="goProtocal">用户协议</span>
            <span>》</span>
            <span>《</span>
            <span class="cursor-pointer"
                  style="text-decoration: underline;"
                  v-on:click="goPrivacy">隐私政策</span>
            <span>》</span>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="fixed-bottom text-center text-white text-subtitle2 q-mb-md">
      Copyright @ 2018-2038 全息云通健康科技（武汉）有限公司版权所有
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from '@src/util'
import service from './service'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,

      usernameImage: 'img:' + require('./assets/img/user.png'),
      passwordImage: 'img:' + require('./assets/img/pwd.png'),

      model: {
        tel: peace.cache.get(peace.type.USER.PHONE) ?? '',
        smsCode: ''
      },

      rules: {
        tel: [
          { required: true, message: '请输入手机号' },
          { pattern: peace.validate.pattern.mobile, message: '请输入手机号' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (value.length !== 6) {
                cb(new Error('请输入6位验证码'))
              }

              cb()
            }
          }
        ]
      }
    }
  },

  computed: {
    isVerifyPhone() {
      return !peace.validate.isMobile(this.model.tel)
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },

  methods: {
    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      service
        .sendSms(this.model)
        .then((res) => {
          peace.util.success(res.msg)

          this.$refs.smsCode.focus()
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        service
          .login(this.model)
          .then((res) => {
            const userInfo = res.data

            // 储存用户信息
            util.user.setUserInfo(userInfo)

            // 储存登录手机号
            peace.cache.set(peace.type.USER.PHONE, userInfo.list.docInfo.tel)

            // 更新 vuex
            this.$store.commit('user/setUserInfo', res.data)

            // 加载 IM SDK
            $peace.NIM = util.IM.initIM()
            $peace.WebRTC = util.IM.initWebRTC($peace.NIM)

            // 登陆后跳转
            util.user.replaceToReffer()
          })
          .finally(() => {
            this.isLoging = false
          })
      })
    },

    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },

    goProtocal() {
      window.open(`${process.env.VUE_APP_HYBRID_API}hybrid/agreements/userAgreement/PC`)
    },

    goPrivacy() {
      window.open(`${process.env.VUE_APP_HYBRID_API}hybrid/agreements/privacyAgreement/PC`)
    }
  }
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
  background: url('./assets/img/bg.png') no-repeat;
  background-size: 100% 100%;

  .container-masker {
    background: $--color-primary;
    opacity: 0.6;
  }

  /deep/ .el-form-item.is-error,
  /deep/ .el-input__inner {
    border-color: transparent !important;
  }

  /deep/ .el-form-item__error {
    display: flex;
    align-items: center;

    width: 200px;
    height: 48px;
    padding: 0 0 0 20px;
    font-size: 14px;

    background: $--color-warning;
    color: white;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: auto;
    right: -220px;

    &::before {
      position: absolute;
      top: 21px;
      left: -4px;
      content: '';
      border-radius: 3px;
      border: 5px solid;
      border-color: $--color-warning transparent transparent $--color-warning;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      display: block;
    }
  }

  /deep/ .el-input__suffix {
    display: flex;
    align-items: center;
    padding: 0 8px 0 0;
  }

  /deep/ .el-input-group__prepend {
    padding: 0 16px;
    border: 0;
    background: $--color-primary;
    border-color: $--color-primary;
  }

  /deep/ .el-input__inner {
    min-width: 250px;
    height: 48px;
    line-height: 48px;
  }
}

.container1 {
  height: 100%;

  position: relative;
  z-index: 1;
  padding-bottom: 60px;
  background: url('./assets/img/bg.png') no-repeat;
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
        background-image: url('./assets/img/user.png');
        background-repeat: no-repeat;
        background-size: 32px auto;
        background-position-x: 0;
      }
      &:nth-child(3):before {
        background-image: url('./assets/img/pwd.png');
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
