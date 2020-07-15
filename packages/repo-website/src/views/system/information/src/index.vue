<template>
  <div>
    <el-container>
      <el-header height="52px">
        <div class="left"
             @click="backHome">
          <el-image style="width: 98px; height: 40px;"
                    :src="require('@src/assets/images/logo.png')">
          </el-image>
        </div>

        <div class="right">
          <template v-if="hasLogin">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link gary-color">
                {{info&&info.username}}<i class="el-icon-s-operation gary-color"></i>
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
      <el-main>
        <Component :is="mode"
                   v-bind:checkStatus='info.checkStatus'
                   v-bind:message='info.reasonsFailure'
                   @reSubmit="reSubmit"></Component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Constant from '../constant'
import Service from './../service'
import RouterPath from '@src/router/routerPath'
import CheckPending from './components/CheckPending'
import OrgRegister from './components/OrgRegister'
import CheckFailure from './components/CheckFailure'
import CheckWaiting from './components/CheckWaiting'
import { user } from '@src/util'
export default {
  components: {
    CheckPending,
    OrgRegister,
    CheckFailure,
    CheckWaiting
  },
  data() {
    return {
      info: {},
      checkStatus: Constant.checkStatus
    }
  },
  computed: {
    mode() {
      if (this.info && this.info.checkStatus == this.checkStatus.未申请) {
        return 'OrgRegister'
      } else if (this.info && this.info.checkStatus == this.checkStatus.待审核) {
        return 'CheckWaiting'
      } else if (this.info && this.info.checkStatus == this.checkStatus.未通过) {
        return 'CheckFailure'
      } else {
        return ''
      }
    },
    hasLogin() {
      return user.isSignIn()
    }
  },
  mounted() {
    this.getAccountInfo()
  },
  methods: {
    handleCommand(command) {
      if (command == 'loginOut') {
        user.removeUserInfo()
        this.$router.replace(RouterPath.system.LOGIN)
      }
    },
    backHome() {
      this.$router.replace(RouterPath.system.HOME)
    },
    getAccountInfo() {
      Service.getAccountInfo().then(res => {
        this.info = res.data
        if (this.info.checkStatus == this.checkStatus.已通过) {
          this.backHome()
        }
      })
    },
    reSubmit(flag) {
      if (flag) {
        this.info.checkStatus = this.checkStatus.未申请
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
}
.el-main {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 52px);
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>