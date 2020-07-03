<template>
  <div class="container">
    <div class="window-width window-height container-masker"></div>

    <div class="fixed-center form">
      <p class="text-white text-h6">
        {{ configuration.application.title }}
      </p>

      <el-form v-bind:model="model"
               v-bind:rules="rules"
               v-on:keyup.enter.native="login"
               ref="form">
        <el-form-item class="q-mb-md"
                      prop="username">
          <el-input class="q-mb-md"
                    v-model.trim="model.username"
                    placeholder="请输入用户名"
                    maxlength="11"
                    minlength="11">
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
                    maxlength="36"
                    minlength="6">
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
                 v-on:click="login">
          </q-btn>
        </el-form-item>
      </el-form>

    </div>

    <div class="fixed-bottom text-center text-white text-subtitle2 q-mb-md">
      全息云通健康科技（武汉）有限公司<br/>鄂ICP备19008514
    </div>
  </div>
</template>

<script>
import Util from '@src/util'
import Service from './service'

export default {
  data() {
    return {
      configuration: window.configuration,

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

  methods: {
    login() {
      this.validateForm().then(() => {
        this.isLoading = true

        Service.doLogin(this.model)
          .then((res) => {
            // 储存用户信息
            Util.user.setUserInfo(res.data)

            // 缓存
            this.$store.commit('user/setUserInfo', res.data)

            // 登陆后跳转
            this.$router.push('/layout')
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
