<template>
  <div class="body">
    <div class="title">
      <div class="center">
        <span>{{ window.configuration.application.title }}</span>
      </div>
    </div>

    <el-form space-none
             v-bind:model="model"
             v-bind:rules="rules"
             class="form form-content"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="tel"
                    space-md>
        <el-input v-model.trim="model.tel"
                  v-bind:class="{ 'active': usernameActive }"
                  v-on:focus="usernameFocus"
                  v-on:blur="usernameBlur"
                  placeholder="请输入手机号">
          <div class="flex justify-center items-center"
               slot="prepend">
            <i class="icon_shouji"
               style="font-size: 18px;"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="smsCode"
                    space-lg>
        <el-input ref="smsCode"
                  v-model.trim="model.smsCode"
                  v-bind:class="{ 'active': passwordActive }"
                  v-bind:maxlength="6"
                  v-bind:minlength="6"
                  v-on:focus="passwordFocus"
                  v-on:blur="passwordBlur"
                  placeholder="请输入验证码">
          <div class="flex justify-center items-center"
               slot="prepend">
            <i class="icon_yanzhengma"
               style="font-size: 22px;"></i>
          </div>

          <template slot="suffix">
            <div class="flex items-center justify-center full-height"
                 v-if="showCountdown">
              <el-divider direction="vertical"></el-divider>

              <PeaceCountdown class="q-mx-12"
                              v-bind:time="countdownTime"
                              v-on:end="onCountdownEnd">
                <template slot-scope="props">
                  已发送 ({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s)
                </template>
              </PeaceCountdown>
            </div>
            <div class="flex items-center justify-center full-height"
                 v-else>
              <el-divider direction="vertical"></el-divider>

              <el-button class="q-mx-12"
                         type="text"
                         v-bind:disabled="!isVerifyPhone"
                         v-on:click="sendCode">{{ sendSmsCode ? '重新发送' : '发送验证码' }}</el-button>
            </div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <PeaceButton class="full-width"
                     style="height: 48px; font-size: 20px;"
                     type="primary"
                     v-bind:loading="isLoging"
                     v-on:click="login">登录</PeaceButton>
      </el-form-item>

      <el-form-item>
        <div class="flex justify-between">
          <PeaceButton class="text-grey-5"
                       type="text"
                       v-on:click="changeSignByPassword">密码登录</PeaceButton>
          <PeaceButton class="text-grey-5"
                       type="text"
                       v-on:click="tooltip">收不到验证码?</PeaceButton>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from './../service'

export default {
  props: {
    signBy: String
  },

  data() {
    return {
      sendSmsCode: false,
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,
      usernameActive: false,
      passwordActive: false,

      model: {
        tel: Util.user.getUserPhone(),
        smsCode: ''
      },

      rules: {
        tel: [
          { required: true, message: '请输入手机号' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入手机号' }
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
      return this.model.tel?.length === 11
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },

  methods: {
    passwordFocus() {
      this.passwordActive = true
    },

    passwordBlur() {
      this.passwordActive = false
    },

    usernameFocus() {
      this.usernameActive = true
    },

    usernameBlur() {
      this.usernameActive = false
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    changeSignByPassword() {
      this.$emit('update:signBy', 'password')
    },

    tooltip() {
      const message = (
        <div>
          <p>如您未收到短信，请参考以下方式进行：</p>
          <p>1、短信可能被拦截进垃圾箱，请打开垃圾短信箱读取短信，并将其添加为白名单 </p>
          <p>2、运营商通道故障导致发送延迟，请稍等片刻或重新获取验证码</p>
          <p>3、若上述方式均未解决请联系平台运营人员</p>
        </div>
      )

      this.$alert(message, '提示', {
        confirmButtonText: '知道了'
      })
    },

    sendCode() {
      Service.sendSms(this.model)
        .then((res) => {
          this.sendSmsCode = true

          Peace.util.success(res.msg)

          this.$refs.smsCode.focus()
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        Service.login(this.model)
          .then((res) => {
            // 储存用户信息
            Util.user.setUserInfo(res.data)
            Util.user.setUserPhone(res.data.list.docInfo.tel)

            // 重定向
            Util.location.redirectToIndex()
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
      window.open(`${process.env.VUE_APP_API_HYBRID}hybrid/agreements/userAgreement/PC`)
    },

    goPrivacy() {
      window.open(`${process.env.VUE_APP_API_HYBRID}hybrid/agreements/privacyAgreement/PC`)
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  padding: 32px 48px;
  border: 8px solid rgba(14, 136, 150, 0.3);

  .title {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 0 24px 0;

    .center {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #309aa6;
      line-height: 33px;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      color: #000;
      font-size: 16px;
      span {
        font-size: 14px;
      }
    }
  }
}

::v-deep .el-form {
  .el-input__inner {
    height: 48px;
    line-height: 48px;

    &:focus-within {
      box-shadow: 1px 5px 10px 0px rgba(52, 186, 204, 0.2);
    }
  }

  .el-input-group__prepend {
    width: 48px;
    height: 48px;
    padding: 0;
    color: #dddddd;
  }

  .el-input__suffix {
    right: 0;
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus {
    border-color: var(--q-color-primary);
  }
}

.el-divider--vertical {
  margin: 0;
}
</style>