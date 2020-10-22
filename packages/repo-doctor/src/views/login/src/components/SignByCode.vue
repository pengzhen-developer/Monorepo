<template>
  <div class="body">
    <div class="title">
      <div class="center">
        <span>{{ Peace.config.system.title }}</span>
      </div>
    </div>

    <el-form v-bind:model="model"
             v-bind:rules="rules"
             class="form-content"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="tel">
        <el-input v-model.trim="model.tel"
                  v-bind:class="{ 'active': usernameActive }"
                  v-bind:minlength="11"
                  v-bind:maxlength="11"
                  v-on:focus="usernameFocus"
                  v-on:blur="usernameBlur"
                  placeholder="请输入手机号">
          <div slot="prepend">
            <i class="zyy-icon zyy-shouji"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="smsCode">
        <el-input ref="smsCode"
                  v-model.trim="model.smsCode"
                  v-bind:class="{ 'active': passwordActive }"
                  v-bind:maxlength="6"
                  v-bind:minlength="6"
                  v-on:focus="passwordFocus"
                  v-on:blur="passwordBlur"
                  placeholder="请输入验证码">
          <div slot="prepend">
            <i class="zyy-icon zyy-mima"></i>
          </div>

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

    </el-form>
    <div class="control">
      <peace-button size="large"
                    type="primary"
                    v-bind:loading="isLoging"
                    v-on:click="login">登录</peace-button>
    </div>

  </div>
</template>

<script>
import util from '@src/util'
import Service from './../service'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,
      usernameActive: false,
      passwordActive: false,

      model: {
        tel: Peace.cache.localStorage.get(peace.type.USER.PHONE) ?? '',
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

    sendCode() {
      Service.sendSms(this.model)
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

        Service.login(this.model)
          .then((res) => {
            const userInfo = res.data

            // 储存用户信息
            util.user.setUserInfo(userInfo)

            // 储存登录手机号
            peace.cache.localStorage.set(peace.type.USER.PHONE, userInfo.list.docInfo.tel)

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
.body {
  padding: 20px 80px 40px;
  border: 6px solid rgba(14, 136, 150, 0.3);

  .el-form-item {
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
  }

  .control {
    .el-button {
      width: 100%;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    .center {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #309aa6;
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

  .form-content {
    margin-top: 15px;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 0px;

    .center {
      text-align: center;

      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    .bottom_item {
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

::v-deep .el-form-item {
  border-bottom: 1px solid #e8e8e8;
  margin: 0 0 25px 0;

  &:focus-within {
    border: 1px solid var(--q-color-primary);
    box-shadow: 1px 5px 10px 0px rgba(52, 186, 204, 0.2);
  }

  .el-form-item__label {
    padding: 0;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 40px !important;
    color: rgba(0, 0, 0, 0.85);
  }

  .el-input__inner {
    border-radius: 0;
    border: 0;
    padding: 2px 16px;
    line-height: 40px;
    height: 40px;
    border-radius: 0 4px 4px 0;
  }

  .el-input-group__prepend {
    border: none;
    padding: 0 15px;
  }

  .el-form-item__error {
    margin: 5px 0 0 0;
  }

  .el-input__suffix {
    border: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    outline: none;
    border: none;
    &::placeholder {
      color: #c0c4cc;
      font-size: 12px;
    }
  }

  i {
    color: #c0c4cc;
  }

  .el-input {
    padding: 1px;
    &.active {
      .el-input-group__prepend {
        background: var(--q-color-primary-light-2) !important;
      }

      i {
        color: var(--q-color-primary) !important;
      }
    }
  }
}
.eyes {
  cursor: pointer;
}
</style>