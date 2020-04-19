/** 
 * @Author: PengZhen
 * @Date: 2020/04/13
 * @Description: 登录
 * @UI: https://lanhuapp.com/web/#/item/project/board?pid=ce4d8d92-61c7-4cde-afed-380b8825379e
 */


<template>
  <div class="container">
    <div class="layout">
      <div class="layout-left"></div>
      <div class="layout-right">
        <div class="top">

        </div>

        <div class="center">
          <div class="logo">
            <el-image style="width: 80px; height: 80px;"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
          </div>
          <div class="title">
            <span>九州通智药云平台</span>
          </div>
        </div>

        <div class="bottom">
          <div class="body">
            <el-form v-bind:model="model"
                     v-bind:rules="rules"
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
                          placeholder="请输入密码">
                </el-input>
              </el-form-item>
            </el-form>

            <div class="control">
              <el-button size="large"
                         type="primary"
                         v-bind:loading="isLoging"
                         v-on:click="login">登录</el-button>
            </div>

            <div class="control-extend">

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'
import RouterPath from '@src/router/routerPath'

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
    login() {
      this.validateForm().then(() => {
        this.isLoging = true

        const params = Peace.util.deepClone(this.model)

        Service.doLogin(params)
          .then(res => {
            Util.user.setUserInfo(res.data)

            Peace.util.success(res.msg)

            this.$router.push(RouterPath.account.LAYOUT_MANAGER)
          })
          .finally(() => {
            this.isLoging = false
          })
      })
    },

    validateForm() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
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
  display: flex;
  justify-content: center;

  width: 100vw;
  min-height: 100vh;
  height: 100%;

  .layout {
    display: flex;
    width: 100%;

    .layout-left {
      background: linear-gradient(to bottom, #ffffff, #8595a4, #005f71);

      flex: 1;
    }

    .layout-right {
      width: 37.5%;
      max-width: 400px;

      .top {
        padding: 32px 36px;
        margin: 0 0 20% 0;

        .el-button {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
        }
      }

      .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 0 65px 0;

        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 0 22px 0;
          overflow: hidden;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .bottom {
        width: 60%;
        min-width: 272px;
        margin: 0 auto;

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
      }
    }
  }
}

::v-deep .el-form-item {
  border-bottom: 1px solid #e8e8e8;
  margin: 0 0 25px 0;

  &:focus-within {
    border-bottom: 1px solid $--color-primary;
  }

  &.is-required:not(.is-no-asterisk) > .el-form-item__label:before,
  &.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
    content: '';
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
    line-height: 36px;
    height: 36px;
  }

  .el-form-item__error {
    margin: 5px 0 0 0;
  }
}
</style>
