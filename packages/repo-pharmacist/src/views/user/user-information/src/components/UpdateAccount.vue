<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="85px"
             v-bind:model="model"
             v-bind:rules="rules"
             class="q-pl-20 form-padding">
      <el-form-item prop="tel">
        <span slot="label"
              class="form-label">账号</span>
        <el-input maxlength="11"
                  v-model.trim="model.tel"
                  placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="smsCode">
        <span slot="label"
              class="form-label">验证码</span>
        <el-input ref="smsCode"
                  v-model.trim="model.smsCode"
                  v-bind:class="{ 'active': passwordActive }"
                  v-bind:maxlength="6"
                  v-bind:minlength="6"
                  v-on:focus="passwordFocus"
                  v-on:blur="passwordBlur"
                  placeholder="请输入验证码">
          <template slot="suffix">
            <template v-if="showCountdown">
              <el-divider direction="vertical"></el-divider>

              <PeaceCountdown v-bind:time="countdownTime"
                              v-on:end="onCountdownEnd">
                <template slot-scope="props">
                  已发送 ({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s)
                </template>
              </PeaceCountdown>
            </template>
            <template v-else>
              <el-divider direction="vertical"></el-divider>

              <el-button type="text"
                         v-bind:disabled="isVerifyPhone"
                         v-on:click="sendCode">{{ sendSmsCode ? '重新发送' : '发送验证码' }}</el-button>
            </template>
          </template>
        </el-input>
      </el-form-item>
      <div class="text-center q-pt-14">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="isLoading">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
import Util from '@src/util'
export default {
  name: 'UpdateAccount',
  props: {
    phone: String
  },
  data() {
    return {
      isLoading: false,

      sendSmsCode: false,
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isLoging: false,
      usernameActive: false,
      passwordActive: false,

      model: {
        tel: '',
        smsCode: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入正确的手机号码' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入正确的手机号码' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (value.length !== 4) {
                cb(new Error('请输入4位验证码'))
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
      return !Peace.validate.isMobile(this.model.tel) || this.model.tel === this.phone
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },
  created() {
    this.model.tel = this.phone
  },

  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            Phone: this.model.tel,
            SMSCode: this.model.smsCode
          }

          Service.modifyAccount(params).then(() => {
            Peace.util.success('账号修改成功')
            this.$emit('close')
            //this.$emit('refresh')
            this.logout()
          })
        } else {
          return false
        }
      })
    },

    logout() {
      Peace.identity.auth.logout().then(() => {
        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
      })
    },
    cancel() {
      this.$emit('close')
    },
    passwordFocus() {
      this.passwordActive = true
    },

    passwordBlur() {
      this.passwordActive = false
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      this.countdownTime = 60 * 1000
      Service.sendSms({ ManagerPhone: this.model.tel }).then(() => {
        Peace.util.success('验证码发送成功')
        this.$refs.smsCode.focus()
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
.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}

::v-deep .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  margin-right: 5px;
}

.form-padding {
  padding-right: 40px;
}
</style>
<style>
.accountDialog .el-form-item__label {
  padding-right: 0px;
}
</style>
