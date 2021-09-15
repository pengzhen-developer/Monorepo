/** 
 * @Author: PengZhen
 * @Date: 2020/04/13
 * @Description: 注册
 * @UI: https://lanhuapp.com/web/#/item/project/board?pid=ce4d8d92-61c7-4cde-afed-380b8825379e
 */


<template>
  <div class="body">
    <div class="title">
      <div class=" center">
        <span>登录</span>
      </div>
      <div class=" right">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goRegister">注册</el-link>
      </div>
    </div>

    <div class="line"> </div>

    <el-form v-bind:model="model"
             v-bind:rules="rules"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="tel">
        <el-input v-model.trim="model.tel"
                  v-bind:class="{ 'active' : usernameActive }"
                  v-on:focus="usernameFocus"
                  v-on:blur="usernameBlur"
                  placeholder="请输入手机号">
          <div slot="prepend">
            <i class="zyy-icon zyy-shouji"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model.trim="model.password"
                  :type="this.showPassword ? 'text' : 'password'"
                  v-on:focus="passwordFocus"
                  v-on:blur="passwordBlur"
                  v-bind:minlength="6"
                  v-bind:maxlength="20"
                  v-bind:class="{ 'active' : passwordActive }"
                  placeholder="请输入密码">
          <div slot="prepend">
            <i class="zyy-icon zyy-mima"></i>
          </div>
          <div slot="suffix"
               v-on:click="changePasswordStatus">
            <i v-if="this.showPassword"
               class="eyes zyy-icon zyy-xianshimima1"></i>
            <i v-else
               class="eyes zyy-icon zyy-yincangmima"></i>
          </div>
        </el-input>
      </el-form-item>

    </el-form>
    <div class="control">
      <el-button size="large"
                 type="primary"
                 v-bind:loading="isLoging"
                 v-on:click="login">登录</el-button>
    </div>
    <div class="bottom">
      <div class="bottom_item">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goSignByPhone">手机验证码登录</el-link>
      </div>
      <div class="bottom_item">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goResetPassword">忘记密码</el-link>
      </div>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
import Util from '@src/util'
import { path } from '@src/router/generateRoutes'
import Constant from '../constant'

export default {
  data() {
    return {
      isLoging: false,
      isRegistering: false,
      showPassword: false,
      usernameActive: false,
      passwordActive: false,
      model: {
        tel: '',
        password: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: this.peace.validate.pattern.mobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: this.peace.validate.pattern.password,
            message: '请输入6-20位数字或字母',
            trigger: 'blur'
          }
        ]
      },

      logoImage: require('@src/assets/img/logo_white.png')
    }
  },

  computed: {},

  methods: {
    passwordFocus() {
      this.passwordActive = true
    },

    passwordBlur() {
      this.passwordActive = false
    },

    usernameFocus() {
      this.usernameActive = true
    },

    usernameBlur() {
      this.usernameActive = false
    },
    goSignByPhone() {
      this.$parent.changeMode(Constant.action.SIGN_BY_PHONE)
    },

    goRegister() {
      this.$router.push(path.REGISTER)
    },

    goResetPassword() {
      this.$parent.changeMode(Constant.action.RESET_PASSWORD)
    },

    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        let params = {
          grant_type: 'password',
          client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
          client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
          username: this.model.tel,
          password: this.model.password,
          encryption_key: process.env.VUE_APP_AUTH_ENCRYPTION_KEY
        }

        this.peace.identity.auth
          .login(params)
          .then(() => {
            this.completeInfomation()
          })
          .catch((err) => {
            this.peace.util.error(err.msg)
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
    completeInfomation() {
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)
        Util.location.redirectToCompliteInfo(res.data.checkStatus)
      })
    },
    changePasswordStatus() {
      this.showPassword = !this.showPassword
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
    justify-content: space-between;

    height: 50px;
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

  .line {
    width: calc(100% + 160px);
    background: #f5f5f5;
    height: 1px;
    margin-bottom: 38px;
    margin-left: -80px;
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

::v-deep .el-form-item {
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
    padding: 0 16px;
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
    width: 30px;
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