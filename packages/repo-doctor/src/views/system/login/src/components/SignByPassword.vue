<template>
  <div class="body">
    <div class="title">
      <div class="center">
        <span>{{ window.configuration.application.title }}</span>
      </div>
    </div>

    <el-form v-bind:model="model"
             v-bind:rules="rules"
             class="form form-content"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="tel">
        <el-input v-model.trim="model.tel"
                  placeholder="请输入手机号">
          <div slot="prepend">
            <i class="el-icon-mobile-phone"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input ref="password"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入登录密码"
                  v-bind:type="this.showPassword ? 'text' : 'password'"
                  v-model.trim="model.password">
          <div slot="prepend">
            <i class="el-icon-lock"></i>
          </div>
          <div slot="suffix"
               v-on:click="showPassword = !showPassword">
            <i v-if="this.showPassword"
               class="icon icon_xianshimima q-mr-sm cursor-pointer"></i>
            <i v-else
               class="icon icon_yincangmima q-mr-sm cursor-pointer"></i>
          </div>
        </el-input>
      </el-form-item>

    </el-form>
    <div class="control q-mb-xs">
      <peace-button size="large"
                    type="primary"
                    v-bind:loading="isLoging"
                    v-on:click="login">登录</peace-button>
    </div>

    <div class="flex justify-between">
      <el-button class="text-grey-5"
                 type="text"
                 v-on:click="changeSignBySmsCode">验证码登录</el-button>
      <el-button class="text-grey-5"
                 type="text"
                 v-on:click="showChangePasswordDialog">忘记密码？</el-button>
    </div>

    <PeaceDialog title="找回密码"
                 width="580px"
                 append-to-body
                 v-if="changePasswordDialog.visible"
                 v-bind:visible.sync="changePasswordDialog.visible">
      <ChangePassword v-on:success="changePhoneNumberSuccess"></ChangePassword>
    </PeaceDialog>

  </div>
</template>

<script>
import ChangePassword from './ChangePassword'

import Util from '@src/util'
import Service from './../service'

export default {
  props: {
    signBy: String
  },

  components: {
    ChangePassword
  },

  data() {
    return {
      isLoging: false,
      usernameActive: false,

      changePasswordDialog: {
        visible: false
      },

      model: {
        tel: Util.user.getUserPhone(),
        password: ''
      },

      rules: {
        tel: [
          { required: true, message: '请输入手机号' },
          { pattern: Peace.validate.pattern.mobile, message: '请输入手机号' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: Peace.validate.pattern.password, message: '请输入6-20位数字或密码组合' }
        ]
      },

      showPassword: false
    }
  },

  methods: {
    changeSignBySmsCode() {
      this.$emit('update:signBy', 'smsCode')
    },

    showChangePasswordDialog() {
      this.changePasswordDialog.visible = true
    },

    changePhoneNumberSuccess() {},

    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        Service.loginByPass(this.model)
          .then((res) => {
            // 储存用户信息
            Util.user.setUserInfo(res.data)
            Util.user.setUserPhone(res.data.list.docInfo.tel)

            // 重定向
            Util.location.redirectToIndex()
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
      window.open(`${process.env.VUE_APP_API_HYBRID}hybrid/agreements/userAgreement/PC`)
    },

    goPrivacy() {
      window.open(`${process.env.VUE_APP_API_HYBRID}hybrid/agreements/privacyAgreement/PC`)
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

::v-deep .form .el-form-item {
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