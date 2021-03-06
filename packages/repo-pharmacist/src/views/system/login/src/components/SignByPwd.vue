<template>
  <div class="body">
    <div class="title">
      <div class="center">
        <span>{{ $window.configuration.application.title }}</span>
      </div>
    </div>

    <el-form v-bind:model="model"
             v-bind:rules="rules"
             class="form-content"
             v-on:keyup.enter.native="login"
             size="mini"
             ref="form">

      <el-form-item prop="username">
        <el-input v-model.trim="model.username"
                  v-bind:class="{ 'active' : usernameActive }"
                  v-on:focus="usernameFocus"
                  v-on:blur="usernameBlur"
                  placeholder="请输入手机号">
          <div slot="prepend">
            <i class="zyy-icon zyy-yonghuming"></i>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model.trim="model.password"
                  v-on:focus="passwordFocus"
                  v-on:blur="passwordBlur"
                  v-bind:class="{ 'active' : passwordActive }"
                  v-bind:minlength="6"
                  v-bind:maxlength="20"
                  type="password"
                  placeholder="请输入密码">
          <div slot="prepend">
            <i class="zyy-icon zyy-mima"></i>
          </div>

        </el-input>
      </el-form-item>

    </el-form>
    <div class="control">
      <peace-button size="large"
                    type="primary"
                    v-bind:loading="isLoging"
                    v-on:click="login">登录</peace-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoging: false,
      usernameActive: false,
      passwordActive: false,

      model: {
        username: '',
        password: ''
      },

      rules: {
        username: [
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
            message: '请输入6-20位数字或字母',
            trigger: 'blur'
          }
        ]
      }
    }
  },

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

    login() {
      this.isLoging = true

      this.validateForm()
        .then(() => {
          const params = {
            // 登录模式 password:密码  mobile:手机
            grant_type: 'password',
            // 终端id
            client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
            // 终端secret
            client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
            // 用户名（grant_type=password 时必填）
            username: this.model.username,
            // 密码（grant_type=password 时必填）
            password: this.model.password,
            // 加密key（grant_type=password 时必填）
            encryption_key: process.env.VUE_APP_AUTH_ENCRYPTION_KEY,
            // 产品编码
            productCode: '',
            // 菜单类型 left：左菜单, top：顶菜单, button：按钮, 默认
            type: 'left',
            // 环境变量
            processEnv: process.env
          }

          Peace.identity.auth
            .workFlowAuth(params)
            .then(() => {
              this.$router.replace('/').then(() => window.location.reload())
            })
            .catch((error) => {
              Peace.util.error(error?.msg ?? '登录失败')
            })
        })
        .finally(() => {
          this.isLoging = false
        })
    },

    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
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