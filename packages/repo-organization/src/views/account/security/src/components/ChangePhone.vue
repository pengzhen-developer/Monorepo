<template>
  <div class="content-bgd">

    <Steps v-bind:list='list'
           v-bind:active="active"
           v-on:increase='increase'></Steps>

    <div class="tab1"
         v-if="showTab1">
      <div class="content-tips"
           v-show="tipsIsShow">
        <i class="icon el-icon-info"></i>
        <p>为了保证您的账号安全，更换绑定手机前请先进行安全验证。</p>
        <i class="icon el-icon-close"
           @click="hidTips"></i>
      </div>
      <el-form ref="pointOne"
               class="tab-content"
               :rules="rules"
               :model="pointOne"
               label-width="110px">

        <el-form-item label="手机号码：">
          <el-input v-model="pointOne.tel"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="手机验证码："
                      prop="oldCode">
          <div class="phone-code">
            <el-input v-model="pointOne.oldCode"
                      v-bind:minlength="6"
                      v-bind:maxlength="6"
                      placeholder="请输入验证码"></el-input>

            <div slot="suffix">
              <template v-if="showCountdown">
                <div class="count-down">
                  <PeaceCountdown v-bind:time="countdownTime"
                                  v-on:end="onCountdownEnd">
                    <template slot-scope="props">
                      {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                    </template>
                  </PeaceCountdown>
                </div>

              </template>
              <template v-else>
                <el-button type="primary"
                           v-bind:disabled="isVerifyPhone"
                           class="btn-getcode"
                           @click="getCodeOld()">获取验证码</el-button>
              </template>
            </div>

          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="btn"
                     @click="cancel()">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     @click="increase('pointOne')">下一步</el-button>

        </el-form-item>
      </el-form>

    </div>

    <div class="tab2"
         v-else>
      <el-form ref="form"
               :rules="rules"
               :model="pointTwo"
               class="tab-content"
               label-width="110px">

        <el-form-item label="新手机号："
                      prop="newPhone">
          <el-input v-model="pointTwo.tel"
                    placeholder="请输入新手机号"></el-input>
        </el-form-item>

        <el-form-item label="手机验证码："
                      prop="newCode">
          <div class="phone-code">
            <el-input v-model="pointTwo.newCode"
                      v-bind:minlength="6"
                      v-bind:maxlength="6"
                      placeholder="请输入验证码"></el-input>

            <div slot="suffix">
              <template v-if="showCountdown">
                <div class="count-down">
                  <PeaceCountdown v-bind:time="countdownTime"
                                  v-on:end="onCountdownEnd">
                    <template slot-scope="props">
                      {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                    </template>
                  </PeaceCountdown>
                </div>

              </template>
              <template v-else>
                <el-button type="primary"
                           class="btn-getcode"
                           v-bind:disabled="isVerifyPhoneNew"
                           @click="getCodeNew()">获取验证码</el-button>
              </template>
            </div>

          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     class="btn-confirm"
                     @click="onSuccess('form')">完成</el-button>

        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Steps from './steps'
import Service from '.././service'
import Peace from '@src/library'

export default {
  components: { Steps },

  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      showTab1: true,
      tipsIsShow: true,
      pointOne: {
        tel: '',
        smsType: 'updateTel',
        oldCode: ''
      },
      pointTwo: {
        tel: '',
        smsType: 'updateTel',
        newCode: ''
      },
      active: 0,
      list: [
        {
          title: '验证身份'
        },
        {
          title: '修改手机号'
        },
        {
          title: '完成'
        }
      ],
      rules: {
        oldCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              console.log(value)
              if (value.length !== 6) {
                cb(new Error('请输入6位验证码'))
              }
              cb()
            },
            trigger: 'blur'
          }
        ],
        newPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              console.log(value)
              if (!Peace.validate.isMobile(value)) {
                cb(new Error('请输入正确的手机号码'))
              }
              cb()
            },
            trigger: 'blur'
          }
        ],
        newCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              console.log(value)
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

  created() {
    this.getUserData()
  },

  computed: {
    showCountdown() {
      return this.countdownTime !== 0
    },
    isVerifyPhone() {
      return !Peace.validate.isMobile(this.pointOne.tel)
    },
    isVerifyPhoneNew() {
      return !Peace.validate.isMobile(this.pointTwo.tel)
    }
  },

  methods: {
    getUserData() {
      Service.getAccountDetailInfo().then((res) => {
        this.pointOne.tel = res?.data?.accountInfo?.tel
      })
    },
    //修改手机号第一步取消
    cancel() {
      this.$emit('onCancel')
    },
    //第一步的下一步
    increase(pointOne) {
      this.$refs[pointOne].validate((valid) => {
        if (valid) {
          const params = this.pointOne
          Service.checkOldCode(params).then(() => {
            if (this.active == this.list.length - 1) return
            this.$emit('increase', this.active++)
            this.showTab1 = false
            this.countdownTime = 0
          })
        } else {
          return false
        }
      })
    },
    getCodeOld() {
      const params = this.pointOne
      Service.sendCode(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },
    getCodeNew() {
      const params = this.pointTwo
      Service.sendCode(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },
    //完成
    onSuccess(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            newCode: this.pointTwo.newCode,
            newTel: this.pointTwo.tel
          }
          Service.changeModifyTel(params).then((res) => {
            if (this.active == this.list.length - 1) return
            Peace.util.success(res.msg)
            this.$emit('onSuccess')
          })
        } else {
          return false
        }
      })
    },
    onCountdownEnd() {
      this.countdownTime = 0
    },
    hidTips() {
      this.tipsIsShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.content-bgd {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.steps {
  width: 744px;
}

.tab1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-tips {
  width: 744px;
  height: 40px;
  margin-top: 60px;
  background: #eaf4f6;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border: 1px var(--q-color-primary) solid;
  border-radius: 2px;
}

.content-tips p {
  flex: 1;
  color: #333333;
  font-size: 14px;
  margin-left: 8px;
}

.tab-content {
  width: 400px;
  margin-top: 50px;
}

.btn {
  font-size: 14px;
  margin-top: 30px;
  width: 120px;
}
.count-down {
  width: 104px;
  height: 28px;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  border-radius: 3px;
  border: 1px var(--q-color-primary) solid;
}

.btn-confirm {
  font-size: 14px;
  color: white;
  margin-top: 30px;
  width: 280px;
}

.btn-getcode {
  padding: 6px 16px;
  margin-left: 10px;
}
.phone-code {
  display: flex;
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #000;
}
</style>