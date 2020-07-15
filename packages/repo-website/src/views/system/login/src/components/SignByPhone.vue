<template>
  <div>
    <div class="title">
      <div class="title-item"></div>
      <div class="title-item login"><span>登录</span></div>
      <div class="title-item register">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goRegister">注册</el-link>
      </div>
    </div>

    <div class="body">
      <el-form v-bind:model="model"
               @keyup.enter.native="login"
               v-bind:rules="rules"
               label-width="70px"
               label-position="left"
               label-suffix="："
               ref="form">
        <el-form-item label="手机号"
                      prop="tel">
          <el-input v-model="model.tel"
                    v-bind:minlength="11"
                    v-bind:maxlength="11"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="验证码"
                      prop="verificationCode">
          <el-input v-model="model.verificationCode"
                    v-bind:minlength="6"
                    v-bind:maxlength="6"
                    placeholder="请输入验证码">

            <div slot="suffix">
              <template v-if="showCountdown">
                <PeaceCountdown v-bind:time="countdownTime"
                                v-on:end="onCountdownEnd">
                  <template slot-scope="props">
                    {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                  </template>
                </PeaceCountdown>
              </template>
              <template v-else>
                <el-button type="text"
                           v-bind:disabled="isVerifyPhone"
                           v-on:click="sendCode">获取验证码</el-button>
              </template>
            </div>

          </el-input>
        </el-form-item>
        <div class="control">
          <el-button size="large"
                     type="primary"
                     v-bind:loading="isLoging"
                     v-on:click="login">登录</el-button>
        </div>
      </el-form>

      <div class="control-extend">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goSignByUserName">账号密码登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@src/util/index'
import Peace from '@src/library'
import RouterPath from '@src/router/routerPath'
import Service from './../service'
import Constant from './../constant'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,

      model: {
        tel: '',
        verificationCode: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.mobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (value.length !== 6) {
                cb(new Error('请输入6位验证码'))
              }

              cb()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    isVerifyPhone() {
      return !Peace.validate.isMobile(this.model.tel)
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },

  methods: {
    goRegister() {
      this.$router.push(RouterPath.system.REGISTER)
    },

    goSignByUserName() {
      this.$parent.changeMode(Constant.action.SIGN_BY_USERNAME)
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      const params = {
        tel: this.model.tel,
        smsType: 'login'
      }

      Service.sendCode(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        const params = Peace.util.deepClone(this.model)

        Service.telLogin(params)
          .then((res) => {
            Util.user.setUserCDKey(res.data.cdkey)
            Util.user.setUserInfo(res.data)

            this.completeInfomation()
          })
          .finally(() => {
            this.isLoging = false
          })
      })
    },
    completeInfomation() {
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)

        if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          this.$router.replace(RouterPath.system.INFORMMATION)
        } else {
          this.$router.replace(RouterPath.system.HOME)

          Util.user.redirectToConsole()
        }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: 100%;
  min-width: 272px;

  margin: 0 0 34px 0;

  .title-item {
    flex: 1;
  }

  .login {
    font-size: 36px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    display: flex;
    justify-content: center;
  }

  .register {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .el-link {
      text-decoration: underline;
    }
  }
}

.body {
  .control {
    margin: 0 0 16px 0;

    .el-button {
      width: 100%;
    }
  }

  .control-extend {
    display: flex;
    justify-content: center;
  }
}
</style>