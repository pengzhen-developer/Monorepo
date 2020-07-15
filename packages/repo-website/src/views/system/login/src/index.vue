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
          <el-button class="go-back"
                     type="text"
                     icon="el-icon-arrow-left"
                     v-on:click="goHome">返回首页</el-button>

        </div>

        <div class="center">
          <div class="logo">
            <el-image v-bind:src="logoImage"
                      v-on:click="goHome">
            </el-image>
          </div>
          <div class="title">
            <span>智药云平台</span>
          </div>
        </div>

        <div class="bottom">
          <Component v-bind:is="mode"></Component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignByPhone from './components/SignByPhone'
import SignByUserName from './components/SignByUserName'
import ResetPassword from './components/ResetPassword'

import RouterPath from '@src/router/routerPath'
import Constant from './constant'

export default {
  components: {
    SignByPhone,
    SignByUserName,
    ResetPassword
  },

  data() {
    return {
      mode: Constant.action.SIGN_BY_USERNAME,

      logoImage: require('@src/assets/logo-2.png')
    }
  },

  methods: {
    goHome() {
      this.$router.push(RouterPath.system.HOME)
    },

    changeMode(mode) {
      this.mode = mode
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

  .layout {
    display: flex;
    width: 100%;

    .layout-left {
      background-size: 100% 100%;
      background-image: url('./assets/img/bg_login.jpg');
      background-color: linear-gradient(to bottom, #ffffff, #8595a4, #005f71);

      flex: 1;
    }

    .layout-right {
      min-width: 400px;
      max-width: 800px;
      width: 30%;

      .top {
        padding: 32px 36px;
        margin: 0 0 10% 0;

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
        margin: 0 0 5% 0;

        .logo {
          width: 120px;
          height: 80px;
          margin: 0 0 12px 0;
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