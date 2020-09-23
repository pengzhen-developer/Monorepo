<template>
  <el-header height="64px">
    <div class="left"
         @click="backHome">
      <el-image style="width: 160px; height: 40px;"
                :src="require('@src/assets/img/logo_white.png')">
      </el-image>
      <span>智药云平台</span>
    </div>

    <div class="right">
      <template v-if="hasLogin">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link white-color">
            {{tel}}<i class="el-icon-s-operation white-color"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button class="login-btn"
                   v-on:click="goLogin"
                   round>登录</el-button>
        <el-button class="register-btn"
                   v-on:click="goRegister"
                   round>注册</el-button>
      </template>

    </div>
  </el-header>
</template>

<script>
import Util from '@/src/util'
import { path } from '@src/router/generateRoutes'
export default {
  name: 'info-header',
  computed: {
    hasLogin() {
      return Util.user?.isSignIn()
    },
    tel() {
      return Util.user?.getUserInfo()?.tel
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'loginOut') {
        // Util.user.logout().then(() => {
        Util.user.removeUserInfo()
        this.$router.replace(path.LOGIN)
        // })
      }
    },
    backHome() {
      this.$router.replace(path.HOME)
    },
    goLogin() {
      this.$router.push(path.LOGIN)
    },
    goRegister() {
      this.$router.push(path.REGISTER)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--q-color-primary);
  height: 100%;
  color: #fff;
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      font-size: 18px;
    }
  }
  .white-color {
    color: #fff;
  }
}
@media (max-width: 992px) {
  .right {
    margin-right: 40px;
  }
}
</style>