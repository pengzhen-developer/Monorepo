<template>
  <div>
    <div class="title">
      <span class="reset-password">重置密码</span>
    </div>

    <div class="body">
      <el-form v-bind:model="model"
               v-bind:rules="rules"
               label-width="70px"
               label-position="left"
               label-suffix="："
               ref="form">
        <el-form-item label="账号"
                      prop="tel">
          <el-input v-model="model.tel"
                    placeholder="请输入账号 / 手机号"></el-input>
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
                           v-bind:disabled="isVerifyTel"
                           v-on:click="sendCode">获取验证码</el-button>
              </template>
            </div>

          </el-input>
        </el-form-item>

        <el-form-item label="新密码"
                      prop="password">
          <el-input v-model="model.password"
                    show-password
                    placeholder="6-20位字母和数字的组合">
          </el-input>
        </el-form-item>
      </el-form>

      <div class="control">
        <el-button size="large"
                   type="primary"
                   v-bind:loading="isReseting"
                   v-on:click="reset">提交</el-button>
      </div>

      <div class="control-extend">
        <span>想起登录密码了，</span>
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goSignByUserName">返回登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'
import Constant from './../constant'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isReseting: false,

      model: {
        tel: '',
        verificationCode: '',
        password: ''
      },

      rules: {
        tel: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
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
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.password,
            message: '请输入6-30位数字字母的组合',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    isVerifyTel() {
      return Peace.validate.isEmpty(this.model.tel)
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },

  methods: {
    goSignByUserName() {
      this.$parent.changeMode(Constant.action.SIGN_BY_USERNAME)
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      const params = {
        tel: this.model.tel,
        smsType: 'updatePwd'
      }

      Service.sendCode(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    reset() {
      this.validateForm().then(() => {
        this.isReseting = true

        const params = Peace.util.deepClone(this.model)

        Service.resetPwd(params)
          .then((res) => {
            Peace.util.success(res.msg)
            this.goSignByUserName()
          })
          .finally(() => {
            this.isReseting = false
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
.title {
  display: flex;
  align-items: baseline;
  justify-content: center;

  width: 100%;
  min-width: 272px;

  margin: 0 0 34px 0;

  .reset-password {
    font-size: 36px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    display: flex;
    justify-content: center;
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
    align-items: center;

    .el-button {
      padding: 0;
    }
  }
}
</style>