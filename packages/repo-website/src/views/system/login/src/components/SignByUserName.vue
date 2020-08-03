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
             size="mini"
             ref="form">

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

      <el-form-item prop="password">
        <el-input v-model="model.password"
                  show-password
                  placeholder="6-20位字母和数字的组合">
          <div slot="prepend">
            <i class="zyy-icon zyy-mima"></i>
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
import Util from '@src/util'
import Peace from '@src/library'
import { path } from '@src/router/generateRoutes'
import Service from '../service'
import Constant from '../constant'

export default {
  data() {
    return {
      isLoging: false,
      isRegistering: false,
      showPassword: false,
      model: {
        tel: '',
        password: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: Peace.validate.pattern.mobile,
            message: '请输入正确的手机号码',
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
        ]
      },

      logoImage: require('@src/assets/img/logo_white.png')
    }
  },

  computed: {},

  methods: {
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

        const params = Peace.util.deepClone(this.model)

        Service.doLogin(params)
          .then((res) => {
            Util.user.setUserCDKey(res.data.cdkey)
            Util.user.setUserInfo(res.data)

            this.completeInfomation()
          })
          .finally(() => {
            this.isLoging = false
          })
      })
    },
    completeInfomation() {
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)

        if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          this.$router.replace(path.INFORMMATION)
        } else {
          this.$router.replace(path.HOME)

          Util.user.redirectToConsole()
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
.body {
  border-top: 1px solid #f5f5f5;
  padding: 20px 80px 40px;
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
}
</style>