<template>
  <div class="body">
    <div class="title">
      <div class="center">
        <span>{{ window.configuration.application.title }}</span>
      </div>
    </div>

    <el-form space-none
             v-bind:model="model"
             v-bind:rules="rules"
             class="form form-content"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="tel"
                    space-md>
        <el-input v-model.trim="model.tel"
                  placeholder="请输入手机号">
          <div class="flex justify-center items-center"
               slot="prepend">
            <i class="icon_shouji"
               style="font-size: 18px;"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="password"
                    space-lg>
        <el-input ref="password"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入登录密码"
                  v-bind:type="this.showPassword ? 'text' : 'password'"
                  v-model.trim="model.password">
          <div class="flex justify-center items-center"
               slot="prepend">
            <i class="icon_mima"
               style="font-size: 18px;"></i>
          </div>
          <div class="flex justify-center items-center q-px-12 full-width full-height"
               slot="suffix"
               v-on:click="showPassword = !showPassword">
            <i v-if="this.showPassword"
               class="icon_xianshimima q-mr-sm cursor-pointer"
               style="font-size: 18px;"></i>
            <i v-else
               class="icon_yincangmima1 q-mr-sm cursor-pointer"
               style="font-size: 18px;"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item>
        <PeaceButton class="full-width"
                     style="height: 48px; font-size: 20px;"
                     type="primary"
                     v-bind:loading="isLoging"
                     v-on:click="login">登录</PeaceButton>
      </el-form-item>

      <el-form-item>
        <div class="flex justify-between">
          <PeaceButton class="text-grey-5"
                       type="text"
                       v-on:click="changeSignBySmsCode">验证码登录</PeaceButton>
          <PeaceButton class="text-grey-5"
                       type="text"
                       v-on:click="showChangePasswordDialog">忘记密码?</PeaceButton>
        </div>
      </el-form-item>

    </el-form>

    <PeaceDialog absolute-center
                 title="找回密码"
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
  padding: 32px 48px;
  border: 8px solid rgba(14, 136, 150, 0.3);

  .title {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 0 24px 0;

    .center {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #309aa6;
      line-height: 33px;
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
}

::v-deep .form {
  .el-input__inner {
    height: 48px;
    line-height: 48px;

    &:focus-within {
      box-shadow: 1px 5px 10px 0px rgba(52, 186, 204, 0.2);
    }
  }

  .el-input-group__prepend {
    width: 48px;
    height: 48px;
    padding: 0;
    color: #dddddd;
  }

  .el-input__suffix {
    right: 0;
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus {
    border-color: var(--q-color-primary);
  }
}

.el-divider--vertical {
  margin: 0;
}
</style>