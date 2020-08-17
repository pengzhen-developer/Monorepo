/** 
 * @Author: PengZhen
 * @Date: 2020/04/13
 * @Description: 登录
 * @UI: https://lanhuapp.com/web/#/item/project/board?pid=ce4d8d92-61c7-4cde-afed-380b8825379e
 */


<template>
  <div class="container">
    <div class="container-header">
      <div class="logo">
        <el-image v-bind:src="logoImage"
                  v-on:click="goHome">
        </el-image>
      </div>
      <div class="title">
        <span>智药云平台</span>
      </div>
    </div>
    <div class="layout">
      <div class="layout-top">

        <Component v-bind:is="mode"></Component>
      </div>
    </div>
    <div class="container-bottom">
      Copyright &copy; 全息云通健康科技（武汉）有限公司
    </div>
  </div>
</template>

<script>
import { path } from '@src/router/generateRoutes'
import SignByPhone from './components/SignByPhone'
import SignByUserName from './components/SignByUserName'
import ResetPassword from './components/ResetPassword'
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
      isPasswordILogin: true,
      logoImage: require('@src/assets/img/logo_white.png')
    }
  },

  methods: {
    goHome() {
      this.$router.push(path.HOME)
    },

    changeMode(mode) {
      this.mode = mode
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: url('./assets/img/login_regist_bgd.png') no-repeat;
  background-size: cover;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  .container-header {
    display: flex;
    width: 100%;
    height: 64px;
    min-height: 64px;
    align-items: center;
    background-color: var(--q-color-primary);
    .logo {
      width: 140px;
      height: 40px;
      margin: 0 20px 0 20px;
      overflow: hidden;
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .layout {
    display: flex;
    flex-direction: column;
    width: 460px;
    margin: 64px 0 0 0;
    .layout-top {
      background: #fff;
      border-radius: 8px;
    }
  }
  .container-bottom {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    padding: 20px 0;
  }
}
</style>