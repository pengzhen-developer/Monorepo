<template>
  <div class="container">
    <div class="window-width window-height container-masker"></div>

    <div class="fixed-center form">
      <p class="text-white text-h6">智药云平台运营中心</p>

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
          <el-input class="q-mb-md"
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

                <PeaceCountdown v-bind:time="countdownTime"
                                v-on:countdownend="onCountdownEnd">
                  <template slot-scope="props">
                    {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                  </template>
                </PeaceCountdown>
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
        </el-form-item>
      </el-form>

    </div>

    <div class="fixed-bottom text-center text-white text-subtitle2 q-mb-md">
      Copyright
    </div>
  </div>
</template>
 
<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,

      usernameImage: 'img:' + require('./assets/img/user.png'),
      passwordImage: 'img:' + require('./assets/img/pwd.png'),

      model: {
        tel: Util.user.getUserInfo()?.list?.docInfo?.tel ?? '',
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
      return !Peace.validate.isMobile(this.model.tel)
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
      Service.sendSms(this.model)
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

        Service.login(this.model)
          .then((res) => {
            // 储存用户信息
            Util.user.setUserInfo(res.data)
            this.$store.commit('user/setUserInfo', res.data)

            // 加载 IM SDK
            $peace.NIM = Util.im.initIM()
            $peace.WebRTC = Util.im.initWebRTC()

            // 登陆后跳转
            Util.user.replaceToReffer()
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
    }
  }
}
</script>

<style lang="scss" scoped>
/* Change the white to any color ;) */
::v-deep input:-webkit-autofill,
::v-deep input:-webkit-autofill:hover,
::v-deep input:-webkit-autofill:focus,
::v-deep input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
}

.container {
  background: url('./assets/img/bg.png') no-repeat;
  background-size: 100% 100%;

  .container-masker {
    background: var(--q-color-primary);
    opacity: 0.6;
  }

  ::v-deep .el-form-item.is-error,
  ::v-deep .el-input__inner {
    border-color: transparent !important;
  }

  ::v-deep .el-form-item__error {
    display: flex;
    align-items: center;

    width: 200px;
    height: 48px;
    padding: 0 0 0 20px;
    font-size: 14px;

    background: var(--q-color-warning);
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
      border-color: var(--q-color-warning) transparent transparent var(--q-color-warning);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      display: block;
    }
  }

  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
    padding: 0 8px 0 0;
  }

  ::v-deep .el-input-group__prepend {
    padding: 0 16px;
    border: 0;
    background: var(--q-color-primary);
    border-color: var(--q-color-primary);
  }

  ::v-deep .el-input__inner {
    min-width: 250px;
    height: 48px;
    line-height: 48px;
  }
}
</style>
