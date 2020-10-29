<template>
  <div class="container">
    <div class="window-width window-height container-masker"></div>

    <div class="fixed-center form">
      <p class="text-white text-h6">
        {{ configuration.application.title }}
      </p>

      <el-form label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="doLogin"
               ref="form">
        <el-form-item class="q-mb-md"
                      prop="username">
          <el-input class="q-mb-md"
                    v-model.trim="model.username"
                    placeholder="请输入用户名"
                    maxlength="30">
            <template slot="prepend">
              <q-icon v-bind:name="usernameImage"
                      size="28px" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="q-mb-md"
                      prop="password">
          <el-input class="q-mb-md"
                    type="password"
                    show-password
                    v-model.trim="model.password"
                    placeholder="请输入密码"
                    maxlength="30">
            <template slot="prepend">
              <q-icon v-bind:name="passwordImage"
                      size="28px" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <q-btn class="full-width q-py-sm"
                 color="primary"
                 label="登 录"
                 v-bind:ripple="false"
                 v-bind:loading="isLoading"
                 v-on:click="doLogin">
          </q-btn>
        </el-form-item>
      </el-form>

    </div>

    <div class="fixed-bottom text-center text-white text-subtitle2 q-mb-md">
      全息云通健康科技（武汉）有限公司<br />鄂ICP备19008514
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
// import Service from './service'

export default {
  data() {
    return {
      isLoading: false,

      usernameImage: 'img:' + require('./assets/img/user.png'),
      passwordImage: 'img:' + require('./assets/img/pwd.png'),

      model: {
        username: Util.user.getUserInfo()?.username ?? '',
        password: ''
      },

      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.configuration = window.configuration
  },

  methods: {
    doLogin() {
      this.validateForm().then(() => {
        this.isLoading = true
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
          // 菜单类型 left：左菜单, top：顶菜单, button：按钮, 默认
          type: 'left',
          // 环境变量
          processEnv: process.env
        }

        Peace.identity.auth
          .workFlowAuth(params)
          .then(async () => {
            Util.user.setUserInfo(await Peace.identity.auth.getAccountInfo())
            this.$router.replace('/').then(() => window.location.reload())
          })
          .catch((error) => {
            Peace.util.error(error?.msg ?? '登录失败')
          })
          .finally(() => {
            this.isLoading = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
/* Change the white to any color ;) */
::v-deep input:-webkit-autofill,
::v-deep input:-webkit-autofill:hover,
::v-deep input:-webkit-autofill:focus,
::v-deep input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
}

.container {
  background: url('./assets/img/bg.png') no-repeat;
  background-size: 100% 100%;

  .container-masker {
    background: var(--q-color-primary);
    opacity: 0.6;
  }

  ::v-deep .el-form-item.is-error,
  ::v-deep .el-input__inner {
    border-color: transparent !important;
  }

  ::v-deep .el-form-item__error {
    display: flex;
    align-items: center;

    width: 200px;
    height: 48px;
    padding: 0 0 0 20px;
    font-size: 14px;

    background: var(--q-color-warning);
    color: white;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: auto;
    right: -220px;

    &::before {
      position: absolute;
      top: 21px;
      left: -4px;
      content: '';
      border-radius: 3px;
      border: 5px solid;
      border-color: var(--q-color-warning) transparent transparent var(--q-color-warning);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      display: block;
    }
  }

  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
    padding: 0 8px 0 0;
  }

  ::v-deep .el-input-group__prepend {
    padding: 0 16px;
    border: 0;
    background: var(--q-color-primary);
    border-color: var(--q-color-primary);
  }

  ::v-deep .el-input__inner {
    min-width: 250px;
    height: 48px;
    line-height: 48px;
  }
}
</style>
