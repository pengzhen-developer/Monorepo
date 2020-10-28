<template>
  <div class="container">
    <div class="container-header">
      <div class="logo">
        <el-image v-bind:src="logoImage">
        </el-image>
      </div>
      <div class="title text-grey-333">
        欢迎您登录
      </div>
    </div>

    <div class="layout">
      <div class="layout-top">

        <SignByPwd></SignByPwd>
      </div>
    </div>

    <div class="bottom">
    </div>

  </div>
</template>

<script>
import SignByPwd from './components/SignByPwd'

export default {
  components: {
    SignByPwd
  },

  data() {
    return {
      logoImage: require('./assets/img/logo.png')
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.container {
  background-image: url('./assets/img/login_regist_bgd.png');
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
    justify-content: space-between;
    background-color: white;
    .logo {
      width: 161px;
      height: 44px;
      margin: 0 25px;
      overflow: hidden;
    }
    .title {
      font-size: 18px;
      font-weight: 500;
      margin: 0 25px;
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
  .bottom {
    background: white;
    width: 100%;
    display: flex;
    padding: 25px 25px;
    justify-content: center;
    color: var(--q-color-grey-333);
    font-size: 14px;
    flex-direction: column;
    align-items: center;

    .bottom-top-item {
      display: flex;
      align-items: center;
    }

    .container-bottom {
      color: var(--q-color-grey-999);
      font-size: 12px;
    }
  }
}
</style>

