/** 
 * @Author: PengZhen
 * @Date: 2020/04/13
 * @Description: 注册
 * @UI: https://lanhuapp.com/web/#/item/project/board?pid=ce4d8d92-61c7-4cde-afed-380b8825379e
 */


<template>
  <div class="container">
    <div class="container-header">
      <div class="logo">
        <el-image v-bind:src="logoImage"
                  v-on:click="goHome">
        </el-image>
      </div>
      <div class="title">
        <span>智药云平台</span>
      </div>
    </div>
    <div class="layout">
      <div class="layout-top">
        <div class="title">
          <div class=" center">
            <span>注册</span>
          </div>
          <div class=" right">
            <span>已有账号，</span>
            <el-link type="primary"
                     v-bind:underline="false"
                     v-on:click="goLogin">登录</el-link>
          </div>
        </div>

        <div class="body">
          <el-form v-bind:model="model"
                   v-bind:rules="rules"
                   size="mini"
                   ref="form">
            <!-- <el-form-item label="用户名"
                          prop="username">
              <el-input v-model="model.username"
                        v-bind:minlength="4"
                        v-bind:maxlength="30"
                        placeholder="4-30位字母数字的组合"></el-input>
            </el-form-item> -->

            <el-form-item prop="tel">
              <el-input v-model="model.tel"
                        v-bind:minlength="11"
                        v-bind:maxlength="11"
                        placeholder="请输入手机号">
                <div slot="prepend">
                  <i class="zyy-icon zyy-shoujihao"></i>
                </div>
              </el-input>
            </el-form-item>

            <el-form-item class="code"
                          prop="verificationCode">
              <el-input v-model="model.verificationCode"
                        v-bind:minlength="6"
                        v-bind:maxlength="6"
                        placeholder="请输入验证码">
                <div slot="prepend">
                  <i class="zyy-icon zyy-yanzhengma"></i>
                </div>
              </el-input>

              <div class="btnCode">
                <template v-if="showCountdown">
                  <PeaceCountdown v-bind:time="countdownTime"
                                  v-on:end="onCountdownEnd">
                    <template slot-scope="props">
                      {{ parseInt(props.minutes * 60) + parseInt(props.seconds) }} s
                    </template>
                  </PeaceCountdown>
                </template>
                <template v-else>
                  <el-button type="primary"
                             v-bind:disabled="isVerifyPhone"
                             v-on:click="sendCode">获取验证码</el-button>
                </template>
              </div>

            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="model.password"
                        show-password
                        placeholder="6-20位字母和数字的组合">
                <div slot="prepend">
                  <i class="zyy-icon zyy-mima"></i>
                </div>
              </el-input>
              <!-- <template slot>
                <input :type="showPassword?'password':'text'"
                       placeholder="6-20位字母和数字的组合"
                       minlength="6"
                       maxlength="20"
                       v-model="model.password">
                <i class="el-icon-view"
                   @click="changeShowPassword"></i>
              </template> -->
            </el-form-item>

            <el-form-item prop="linkman">
              <el-input v-model="model.linkman"
                        v-bind:maxlength="10"
                        placeholder="请输入联系人姓名">
                <div slot="prepend">
                  <i class="zyy-icon zyy-yonghu"></i>
                </div>
              </el-input>
            </el-form-item>

            <el-form-item prop="email">
              <el-input v-model="model.email"
                        placeholder="请输入邮箱">
                <div slot="prepend">
                  <i class="zyy-icon zyy-icon_youxiang2"></i>
                </div>
              </el-input>
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
    <div class="container-bottom">
      Copyright &copy; 全息云通健康科技（武汉）有限公司
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Peace from '@src/library'
import { path } from '@src/router/generateRoutes'
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
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' },
        //   {
        //     pattern: Peace.validate.pattern.username,
        //     message: '请输入4-30位数字字母的组合',
        //     trigger: 'blur'
        //   }
        // ],
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

      logoImage: require('@src/assets/img/logo_white.png')
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
      this.$router.push(path.HOME)
    },
    goLogin() {
      this.$router.push(path.LOGIN)
    },

    goTerms() {
      window.open(process.env.VUE_APP_RELEASE_FLODER_PATH + path.TERMS.substring(1))
    },

    goPrivacy() {
      window.open(process.env.VUE_APP_RELEASE_FLODER_PATH + path.PRIVACY.substring(1))
    },

    onCountdownEnd() {
      this.countdownTime = 0
    },

    sendCode() {
      const params = {
        tel: this.model.tel,
        smsType: 'register'
      }

      Service.sendCode(params).then((res) => {
        Peace.util.success(res.msg)
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
        this.model.username = this.model.tel
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
          this.$router.replace(path.INFORMMATION)
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
  background-color: #fafafa;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  .container-header {
    display: flex;
    width: 100%;
    height: 64px;
    min-height: 64px;
    align-items: center;
    background-color: var(--q-color-primary);
    .logo {
      width: 140px;
      height: 40px;
      margin: 0 20px 0 30px;
      overflow: hidden;
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .layout {
    display: flex;
    flex-direction: column;

    width: 460px;

    margin: 64px 0 0 0;

    .layout-top {
      background: #fff;
      border-radius: 8px;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 80px;
        padding: 40px 80px 12px;

        .center {
          text-align: center;

          font-size: 24px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
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

      .body {
        border-top: 1px solid #f5f5f5;
        padding: 20px 80px 40px;
        .el-form-item {
          border-radius: 4px;
          border: 1px solid rgba(217, 217, 217, 1);
        }
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
  .container-bottom {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    padding: 20px 0;
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
    margin-bottom: 0;
    font-weight: 400;
    line-height: 40px !important;
    color: rgba(0, 0, 0, 0.85);
  }

  .el-input__inner {
    border-radius: 0;
    border: 0;
    padding: 0;
    line-height: 40px;
    height: 40px;
  }
  .el-input-group__prepend {
    background: #fff;
    border: none;
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
    color: #c0c4cc;
  }

  &.code {
    border: 0;
    width: 100%;
    border: 0px !important;
    display: flex;

    .el-form-item__content {
      display: flex;
      width: 100%;
    }

    .el-input {
      width: 70%;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    .btnCode {
      margin-left: 15px;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background: #f5f5f5;
      button {
        height: 100%;
      }
    }
  }
}
</style>