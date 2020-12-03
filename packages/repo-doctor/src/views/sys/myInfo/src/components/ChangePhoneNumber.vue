<template>
  <div>
    <el-steps simple
              v-bind:active="stepActive">
      <el-step title="验证手机号"
               icon="el-icon-key"></el-step>
      <el-step title="更换手机号"
               icon="el-icon-edit-outline"></el-step>
    </el-steps>

    <div v-show="stepActive === 0">

      <el-alert type="warning"
                v-bind:closable="false">
        <div style="padding: -10px;">
          <p class="text-grey-666">温馨提示：如果原手机号无法收到验证码，请联系工作人员处理!</p>
          <p class="text-grey-666">联系电话：<span class="text-warning">{{ workContact }}</span></p>
        </div>
      </el-alert>

      <el-form inline
               ref="form"
               class="q-px-xl q-py-md"
               label-width="120px"
               v-bind:model="model"
               v-bind:rules="rules">
        <el-form-item label="已绑定号码：">
          <span>{{ tel }}</span>
        </el-form-item>
        <el-form-item label="验证码："
                      prop="oldSmsCode">
          <el-input ref="smsCode"
                    style="width: 120px;"
                    class="q-mr-md"
                    v-model.trim="model.oldSmsCode"
                    v-bind:maxlength="6"
                    v-bind:minlength="6">
          </el-input>

          <template v-if="showCountdown">
            <PeaceCountdown v-bind:time="countdownTime"
                            v-on:end="onCountdownEnd">
              <template slot-scope="props">
                <el-button type="info"
                           disabled>
                  已发送({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s)
                </el-button>
              </template>
            </PeaceCountdown>
          </template>
          <template v-else>

            <el-button type="primary"
                       v-on:click="sendCode">{{ sendSmsCode ? '重新发送' : '发送验证码' }}</el-button>
          </template>
        </el-form-item>
      </el-form>

      <div class="text-center q-mb-lg">
        <el-button throttle
                   style="min-width: 80px;"
                   type="primary"
                   v-on:click="nextStep">下一步</el-button>
      </div>
    </div>

    <div v-show="stepActive === 1">
      <el-form ref="formForNewMobile"
               inline
               class="q-px-xl q-py-md"
               label-width="120px"
               v-bind:model="model"
               v-bind:rules="rules">
        <el-form-item label="新手机号码："
                      prop="tel">
          <el-input v-bind:maxlength="11"
                    v-bind:minlength="11"
                    v-model.trim="model.tel"></el-input>
        </el-form-item>

        <el-form-item label="验证码："
                      prop="smsCode">
          <el-input ref="smsCode"
                    style="width: 120px;"
                    class="q-mr-md"
                    v-model.trim="model.smsCode"
                    v-bind:maxlength="6"
                    v-bind:minlength="6">
          </el-input>

          <template v-if="showCountdownForNewMobile">
            <PeaceCountdown v-bind:time="countdownTimeForNewMobile"
                            v-on:end="onCountdownEndForNewMobile">
              <template slot-scope="props">
                <el-button type="info"
                           disabled>
                  已发送({{ parseInt(props.minutes * 60) + parseInt(props.seconds) }}s)
                </el-button>
              </template>
            </PeaceCountdown>
          </template>
          <template v-else>

            <el-button type="primary"
                       v-bind:disabled="isVerifyForNewMobile"
                       v-on:click="sendCodeForNewMobile">{{ sendSmsCodeForNewMobile ? '重新发送' : '发送验证码' }}</el-button>
          </template>
        </el-form-item>
      </el-form>

      <div class="text-center q-mb-lg">
        <el-button throttle
                   style="min-width: 80px;"
                   type="primary"
                   v-on:click="completeStep">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    tel: String
  },

  data() {
    return {
      workContact: '',

      stepActive: 0,
      countdownTime: 0,
      sendSmsCode: false,
      countdownInterval: 60 * 1000,

      countdownTimeForNewMobile: 0,
      sendSmsCodeForNewMobile: false,
      countdownIntervalForNewMobile: 60 * 1000,

      model: {
        oldSmsCode: '',

        tel: '',
        smsCode: ''
      },

      rules: {
        tel: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: Peace.validate.pattern.mobile, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],

        oldSmsCode: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          {
            validator: (rule, value, cb) => {
              if (value.length !== 6) {
                cb(new Error('请输入6位验证码'))
              }

              cb()
            }
          }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
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
    isVerifyForNewMobile() {
      return !Peace.validate.isMobile(this.model.tel)
    },

    showCountdown() {
      return this.countdownTime !== 0
    },

    showCountdownForNewMobile() {
      return this.countdownTimeForNewMobile !== 0
    }
  },

  created() {
    const config = Peace.cache.sessionStorage.get('config')
    this.workContact = config.workContact
  },

  methods: {
    onCountdownEnd() {
      this.countdownTime = 0
    },

    onCountdownEndForNewMobile() {
      this.countdownTimeForNewMobile = 0
    },

    sendCode() {
      Service.getSmsCode()
        .then((res) => {
          this.sendSmsCode = true

          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    sendCodeForNewMobile() {
      Service.getSmsCode({ newTel: this.model.tel })
        .then((res) => {
          this.sendSmsCodeForNewMobile = true

          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTimeForNewMobile = this.countdownIntervalForNewMobile
        })
    },

    nextStep() {
      this.$refs.form.validate().then(() => {
        Service.checkOldSmsCode({ smsCode: this.model.oldSmsCode }).then(() => {
          this.stepActive++
        })
      })
    },

    completeStep() {
      this.$refs.formForNewMobile.validate().then(() => {
        Service.updateTel({ newTel: this.model.tel, smsCode: this.model.smsCode }).then((res) => {
          Peace.util.success(res.msg)

          this.$emit('success')
        })
      })
    }
  }
}
</script>

<style>
</style>