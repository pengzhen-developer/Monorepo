/** 
 * @Author: PengZhen
 * @Date: 2020/04/13
 * @Description: 注册
 * @UI: https://lanhuapp.com/web/#/item/project/board?pid=ce4d8d92-61c7-4cde-afed-380b8825379e
 */


<template>
  <div class="container">
    <div class="layout">
      <div class="layout-top">
        <div class="logo">
          <el-image v-bind:src="logoImage"
                    v-on:click="goHome">
          </el-image>
        </div>
        <div class="title">
          <span>智药云平台</span>
        </div>
      </div>

      <div class="layout-bottom">
        <div class="title">

          <div class="title-column"></div>
          <div class="title-column center">
            <span>注册</span>
          </div>
          <div class="title-column right">
            <span>已有账号，</span>
            <el-link type="primary"
                     v-bind:underline="false"
                     v-on:click="goLogin">登录</el-link>
          </div>
        </div>

        <div class="body">
          <el-form v-bind:model="model"
                   v-bind:rules="rules"
                   label-width="85px"
                   label-position="left"
                   label-suffix="："
                   size="mini"
                   ref="form">
            <el-form-item label="用户名"
                          prop="username">
              <el-input v-model="model.username"
                        v-bind:minlength="4"
                        v-bind:maxlength="30"
                        placeholder="4-30位字母数字的组合"></el-input>
            </el-form-item>

            <el-form-item label="手机号码"
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

            <el-form-item label="密码"
                          prop="password">
              <!-- <el-input v-model="model.password"
                        show-password
                        placeholder="6-20位字母和数字的组合">
              </el-input> -->
              <template slot>
                <input :type="showPassword?'password':'text'"
                       placeholder="6-20位字母和数字的组合"
                       minlength="6"
                       maxlength="20"
                       v-model="model.password">
                <i class="el-icon-view"
                   @click="changeShowPassword"></i>
              </template>
            </el-form-item>

            <el-form-item label="联系人"
                          prop="linkman">
              <el-input v-model="model.linkman"
                        v-bind:maxlength="10"
                        placeholder="请输入联系人姓名"></el-input>
            </el-form-item>

            <el-form-item label="邮箱"
                          prop="email">
              <el-input v-model="model.email"
                        placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-form>

          <div class="terms-layout">
            <div class="check">
              <el-checkbox label=""
                           v-model="isAgree"></el-checkbox>
            </div>
            <div class="terms">
              <span>同意以下条款</span>
              <span class="terms-item"
                    v-on:click="goTerms">《智药云平台网站服务条款》</span>
              <span class="terms-item"
                    v-on:click="goPrivacy">《隐私权政策》</span>
            </div>
          </div>

          <div class="control">
            <el-button size="large"
                       type="primary"
                       v-bind:disable="!isAgree"
                       v-bind:loading="isRegistering"
                       v-on:click="register">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Peace from '@src/library'
import RouterPath from '@src/router/routerPath'
import Service from './service'
import Constant from './constant'

export default {
  data() {
    return {
      countdownTime: 0,
      countdownInterval: 60 * 1000,
      isAgree: true,
      isRegistering: false,
      showPassword: false,
      model: {
        username: '',
        tel: '',
        password: '',
        linkman: '',
        email: '',
        verificationCode: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.username,
            message: '请输入4-30位数字字母的组合',
            trigger: 'blur'
          }
        ],
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
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.password,
            message: '请输入6-20位数字字母的组合',
            trigger: 'blur'
          }
        ],
        linkman: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.email,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ]
      },

      logoImage: require('@src/assets/logo.png')
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
    changeShowPassword() {
      this.showPassword = !this.showPassword
    },
    goHome() {
      this.$router.push(RouterPath.system.HOME)
    },
    goLogin() {
      this.$router.push(RouterPath.system.LOGIN)
    },

    goTerms() {
      window.open(process.env.VUE_APP_RELEASE_FLODER_PATH + RouterPath.system.TERMS.substring(1))
    },

    goPrivacy() {
      window.open(process.env.VUE_APP_RELEASE_FLODER_PATH + RouterPath.system.PRIVACY.substring(1))
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      const params = {
        tel: this.model.tel,
        smsType: 'register'
      }

      Service.sendCode(params)
        .then((res) => {
          Peace.util.success(res.msg)
        })
        .finally(() => {
          this.countdownTime = this.countdownInterval
        })
    },

    register() {
      this.validateForm().then(() => {
        if (!this.isAgree) {
          Peace.util.warning('请先勾选同意服务条款')
          return
        }
        this.isRegistering = true

        const params = Peace.util.deepClone(this.model)

        Service.register(params)
          .then((res) => {
            Util.user.setUserCDKey(res.data.cdkey)
            Util.user.setUserInfo(res.data)

            this.completeInfomation()
          })
          .finally(() => {
            this.isRegistering = false
          })
      })
    },
    completeInfomation() {
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)

        if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          this.$router.replace(RouterPath.system.INFORMMATION)
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
.container {
  background-size: 100% 100%;
  background-image: url('./assets/img/bg_register.jpg');
  background-color: linear-gradient(to bottom, #ffffff, #8595a4, #005f71);
  display: flex;
  justify-content: center;

  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;

  .layout {
    display: flex;
    flex-direction: column;

    width: 412px;

    margin: 64px 0 0 0;

    .layout-top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .logo {
        width: 120px;
        height: 40px;
        margin: 0 0 10px 0;
        overflow: hidden;
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 33px 0;
      }
    }

    .layout-bottom {
      background: #fff;
      border-radius: 8px;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 80px;
        padding: 40px 0 16px 0;

        background: rgba(250, 250, 250, 1);
        border-radius: 8px 8px 0px 0px;

        .title-column {
          flex: 1;
          width: 33%;
          min-width: 33%;
        }

        .center {
          text-align: center;

          font-size: 21px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .right {
          display: flex;
          justify-content: flex-end;
          padding: 0 40px 0 0;
          span {
            font-size: 14px;
          }
          .el-link {
            text-decoration: underline;
          }
        }
      }

      .body {
        padding: 20px 40px 40px;

        .terms-layout {
          display: flex;
          margin: 0 0 30px 0;

          .check {
            margin: 0 20px 0 0;

            .el-checkbox {
              padding: 0;
            }
          }

          .terms {
            font-size: 12px;

            .terms-item {
              font-size: 12px;
              color: var(--q-color-primary);

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .control {
          .el-button {
            width: 100%;
          }
        }
      }
    }
  }
}

::v-deep .el-form-item {
  border-bottom: 1px solid #e8e8e8;
  margin: 0 0 25px 0;

  &:focus-within {
    border-bottom: 1px solid var(--q-color-primary);
  }

  .el-form-item__label {
    padding: 0;

    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }

  .el-input__inner {
    border-radius: 0;
    border: 0;
    padding: 0;
    line-height: 24px;
    height: 24px;
  }

  .el-form-item__error {
    margin: 5px 0 0 0;
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
    margin-left: 20px;
    color: #c0c4cc;
  }
}
</style>