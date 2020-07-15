<template>
  <div>
    <div class="title">
      <div class="title-item"></div>
      <div class="title-item login"><span>登录</span></div>
      <div class="title-item register">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goRegister">注册</el-link>
      </div>
    </div>

    <div class="body">
      <el-form v-bind:model="model"
               v-bind:rules="rules"
               @keyup.enter.native="login"
               label-width="70px"
               label-position="left"
               label-suffix="："
               ref="form">
        <el-form-item label="账号"
                      prop="username">
          <el-input v-model="model.username"
                    v-bind:minlength="4"
                    v-bind:maxlength="30"
                    placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="model.password"
                    show-password
                    :minlength="6"
                    :maxlength="20"
                    placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <div class="control">
          <el-button size="large"
                     type="primary"
                     v-bind:loading="isLoging"
                     v-on:click="login">登录</el-button>
        </div>
      </el-form>

      <div class="control-extend">
        <el-link type="primary"
                 v-bind:underline="false"
                 v-on:click="goSignByPhone">手机验证码登录</el-link>
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
import Service from './../service'
import RouterPath from '@src/router/routerPath'
import Constant from './../constant'

export default {
  data() {
    return {
      isLoging: false,

      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    goRegister() {
      this.$router.push(RouterPath.system.REGISTER)
    },

    goSignByPhone() {
      this.$parent.changeMode(Constant.action.SIGN_BY_PHONE)
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
          this.$router.replace(RouterPath.system.INFORMMATION)
        } else {
          this.$router.replace(RouterPath.system.HOME)

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
.title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: 100%;
  min-width: 272px;

  margin: 0 0 34px 0;

  .title-item {
    flex: 1;
  }

  .login {
    font-size: 36px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    display: flex;
    justify-content: center;
  }

  .register {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .el-link {
      text-decoration: underline;
    }
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
    justify-content: space-between;
  }
}
</style>