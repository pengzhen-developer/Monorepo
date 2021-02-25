<template>
  <div class="full-width">

    <div class="q-px-md q-mb-lg">
      <el-steps simple=""
                v-bind:active="stepActive">
        <el-step title="身份验证">
          <div slot="icon">1</div>
        </el-step>
        <el-step title="设置新密码">
          <div slot="icon">2</div>
        </el-step>
        <el-step title="完成">
          <div slot="icon">3</div>
        </el-step>
      </el-steps>
    </div>

    <template v-if="stepActive === 0">

      <div class="flex justify-center q-pb-md">
        <div style="width: 280px">
          <el-form ref="step1Form"
                   label-width="auto"
                   v-bind:model="step1Model"
                   v-bind:rules="step1Rules">
            <el-form-item prop="tel"
                          label="">
              <el-input class="full-width"
                        clearable=""
                        placeholder="请输入手机号码"
                        v-model="step1Model.tel"></el-input>
            </el-form-item>
            <el-form-item label=""
                          prop="smsCode">
              <el-input ref="smsCode"
                        class="full-width"
                        placeholder="请输入短信验证码"
                        v-model.trim="step1Model.smsCode"
                        v-bind:maxlength="6"
                        v-bind:minlength="6">
                <template slot="suffix">
                  <template v-if="showCountdown">
                    <el-divider direction="vertical"></el-divider>

                    <div class="inline-block q-ml-xs q-mr-sm">
                      <PeaceCountdown v-bind:time="countdownTime"
                                      v-on:end="onCountdownEnd">
                        <template slot-scope="props">
                          已发送 ({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s)
                        </template>
                      </PeaceCountdown>
                    </div>
                  </template>
                  <template v-else>
                    <el-divider direction="vertical"></el-divider>

                    <div class="inline-block q-ml-xs q-mr-sm">
                      <el-button type="text"
                                 v-bind:disabled="!isVerifyPhone"
                                 v-on:click="sendCode">{{ sendSmsCode ? '重新发送' : '发送验证码' }}</el-button>
                    </div>
                  </template>
                </template>
              </el-input>

            </el-form-item>
          </el-form>

          <div class="q-mb-sm">
            <el-button class="full-width"
                       throttle
                       type="primary"
                       v-on:click="nextStep">下一步</el-button>
          </div>

          <div class="q-mb-lg text-right">
            <el-button class="text-grey-5"
                       throttle
                       type="text"
                       v-on:click="tooltip">收不到验证码？</el-button>
          </div>
        </div>
      </div>

    </template>

    <template v-if="stepActive === 1">
      <div class="flex justify-center q-pb-xl">
        <div style="width: 280px">
          <el-form ref="step2Form"
                   v-bind:model="step2Model"
                   v-bind:rules="step2Rules">
            <el-form-item prop="newPass"
                          label="">
              <el-input ref="password"
                        minlength="6"
                        maxlength="20"
                        placeholder="6-20位字母和数字的组合"
                        v-bind:type="this.showPassword1 ? 'text' : 'password'"
                        v-model.trim="step2Model.newPass">
                <div slot="prepend">
                  <i class="el-icon-lock"></i>
                </div>
                <div class="flex items-center full-height"
                     slot="suffix"
                     v-on:click="showPassword1 = !showPassword1">
                  <i v-if="this.showPassword1"
                     class="icon icon_xianshimima q-mr-xs cursor-pointer"></i>
                  <i v-else
                     class="icon icon_yincangmima q-mr-xs cursor-pointer"></i>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword"
                          label="">
              <el-input ref="password"
                        minlength="6"
                        maxlength="20"
                        placeholder="请再次输入新密码"
                        v-bind:type="this.showPassword2 ? 'text' : 'password'"
                        v-model.trim="step2Model.confirmPass">
                <div slot="prepend">
                  <i class="el-icon-lock"></i>
                </div>
                <div class="flex items-center full-height"
                     slot="suffix"
                     v-on:click="showPassword2 = !showPassword2">
                  <i v-if="this.showPassword2"
                     class="icon icon_xianshimima q-mr-xs cursor-pointer"></i>
                  <i v-else
                     class="icon icon_yincangmima q-mr-xs cursor-pointer"></i>
                </div>
              </el-input>
            </el-form-item>
          </el-form>

          <div class="q-mb-sm">
            <el-button class="full-width"
                       throttle
                       type="primary"
                       v-on:click="updateModify">提交</el-button>
          </div>
        </div>
      </div>

    </template>

    <template v-if="stepActive === 3">

      <div class="flex justify-center q-mt-md q-pb-xl">
        <div class="flex column justify-center items-center"
             style="width: 280px">
          <i style="font-size: 48px;"
             class="el-icon-circle-check text-primary"></i>

          <div>
            <span>设置成功，</span>
            <el-button v-on:click="goLogin"
                       type="text">返回登录页</el-button>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import Service from './../service'
import Util from '@src/util'

export default {
  data() {
    return {
      stepActive: 0,

      sendSmsCode: false,
      countdownTime: 0,
      countdownInterval: 60 * 1000,

      step1Model: {
        tel: '',
        smsCode: ''
      },

      step2Model: {
        checkValue: '',
        newPass: '',
        confirmPass: ''
      },

      step1Rules: {
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
      },

      step2Rules: {
        newPass: [
          { required: true, message: '请输入新密码' },
          { pattern: Peace.validate.pattern.password, message: '请输入6-20位数字或密码组合' }
        ],
        confirmPass: [
          { required: true, message: '请再次输入新密码' },
          { pattern: Peace.validate.pattern.password, message: '请输入6-20位数字或密码组合' },
          {
            validator: (rule, value, cb) => {
              if (value !== this.step2Model.newPass) {
                cb(new Error('2次密码输入不一致'))
              }

              cb()
            }
          }
        ]
      },

      showPassword1: false,
      showPassword2: false
    }
  },

  computed: {
    isVerifyPhone() {
      return this.step1Model.tel?.length === 11
    },

    showCountdown() {
      return this.countdownTime !== 0
    }
  },

  methods: {
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

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      Service.getSmsCodeByChangePassowrd(this.step1Model)
        .then((res) => {
          this.sendSmsCode = true

          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    nextStep() {
      this.$refs.step1Form.validate().then(() => {
        Service.checkSmsCodeByChangePassowrd(this.step1Model).then((res) => {
          this.step2Model.checkValue = res.data.checkValue
          this.stepActive++
        })
      })
    },

    updateModify() {
      this.$refs.step2Form.validate().then(() => {
        Service.updateModify(this.step2Model).then(() => {
          this.stepActive += 2

          Util.user.removeUserInfo()
        })
      })
    },

    goLogin() {
      Util.location.redirectToLogin()
    }
  }
}
</script>

<style>
</style>