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
      <div v-on:click="goHome">
        返回首页
      </div>
    </div>
    <div class="layout">
      <div class="layout-top">

        <Component v-bind:is="mode"></Component>
      </div>
    </div>
    <div class="container-bottom">
      Copyright &copy; 2020 九州通智药云平台出品
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
      logoImage: require('@src/assets/img/logo_login.png')
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
    color: var(--q-color-grey-333);
    padding: 0 20px 0 0;
    background-color: white;
    justify-content: space-between;
    .logo {
      width: 161px;
      height: 44px;
      margin: 0 25px;
      overflow: hidden;
    }
  }
  .layout {
    display: flex;
    flex-direction: column;
    width: 460px;
    .layout-top {
      background: #fff;
    }
  }
  .container-bottom {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    padding: 20px 0;
    width: 100%;
    background-color: white;
  }
}
</style>