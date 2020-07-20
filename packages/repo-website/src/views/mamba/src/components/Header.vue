<template>
  <header id="header">
    <div class="container">

      <div class="logo float-left">
        <a href="#">
          <el-image style="width: 160px; height: 40px;"
                    :src="require('@src/assets/img/logo.png')">
          </el-image>
        </a>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="./assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>
      <div class="login d-none d-sm-block">

        <template v-if="hasLogin">
          <el-button type="text"
                     class="console-btn"
                     v-on:click="goConsole">控制台</el-button>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link gary-color">
              {{ userName }}<i class="el-icon-s-operation gary-color"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <div>
            <el-button class="button"
                       type="primary"
                       @click="goLogin"
                       plain>登录</el-button>
            <el-button type="primary"
                       @click="goRegister"
                       class="button">注册</el-button>
          </div>
        </template>

      </div>
      <nav class="nav-menu float-right d-none d-lg-block">
        <ul>
          <li class="active"><a href="/">首页</a></li>
          <li><a href="#about-lists">产品服务</a></li>
          <li><a href="#portfolio">解决方案</a></li>

          <li class="drop-down"><a>开放赋能</a>
            <ul>
              <li><a href="https://docs.qq.com/doc/DZkp4dWZUTWV1TFZJ"
                   target="blank">处方审核服务接口</a></li>
              <li><a href="https://docs.qq.com/doc/DWG9OaVdubElGQXpj"
                   target="blank">处方共享服务接口</a></li>
              <li><a href="https://docs.qq.com/doc/DWHZod0lJWGdMY0pa"
                   target="blank">互联网医院处方共享接口</a></li>
              <li><a href="https://docs.qq.com/doc/DZnNqTmdMb2JwZHdo"
                   target="blank">药品供应服务接口</a></li>
            </ul>
          </li>
          <li><a href="#services">合作案例</a></li>
          <li><a href="#team">新闻动态</a></li>
          <li><a href="#myfooter">关于我们</a></li>
        </ul>
      </nav><!-- .nav-menu -->

    </div>
  </header>
</template>

<script>
import { path } from '@src/router/generateRoutes'
import Util from '@src/util/index'
import Service from '../service'
import Constant from '../constant'

export default {
  methods: {
    goLogin() {
      this.$router.push(path.LOGIN)
    },
    goRegister() {
      this.$router.push(path.REGISTER)
    },
    goToText1() {
      window.open(process.env.VUE_APP_1)
    },
    goConsole() {
      //跳转前刷新一次checkStatus
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)

        if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          this.$router.replace(path.INFORMMATION)
        } else {
          this.$router.replace(path.HOME)

          Util.user.redirectToConsole()
        }
      })
    },
    handleCommand(command) {
      if (command == 'loginOut') {
        Util.user.removeUserInfo()
        window.location.reload()
      }
    }
  },

  computed: {
    hasLogin() {
      return Util.user.isSignIn()
    },
    userName() {
      return Util.user.getUserInfo()?.username
    },
    checkStatus() {
      return Util.user.getUserInfo()?.checkStatus
    }
  }
}
</script>

<style scoped>
.login {
  height: 45px;
  float: right;
  width: 200px;
  margin-left: 30px;
  line-height: 45px;
}
.button {
  height: 30px;
  width: 80px;
}
button:active {
  border: none;
}
.console-btn {
  width: 80px;
}
</style>