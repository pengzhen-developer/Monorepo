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
      <div class="login">
        <template v-if="hasLogin">
          <el-button type="text"
                     class="console-btn"
                     v-on:click="goConsole">控制台</el-button>
          <el-dropdown @command="handleCommand">
            <div>
              <span class="username">{{username}}</span>
              <i class="el-icon-s-operation"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut"
                                class="menu-out">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <div class="login-button">
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
          <li class="active"><a :href="honePath">首页</a></li>
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

export default {
  methods: {
    goLogin() {
      this.$router.push(path.LOGIN)
    },
    goRegister() {
      this.$router.push(path.REGISTER)
    },
    goConsole() {
      //跳转前刷新一次checkStatus
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)
        Util.location.redirectToCompliteInfo(res.data.checkStatus)
      })
    },
    handleCommand(command) {
      if (command == 'loginOut') {
        this.peace.identity.auth.logout().then(() => {
          Util.user.removeUserInfo()
          Util.location.redirectToLogin()
        })
      }
    }
  },

  computed: {
    hasLogin() {
      return Util.user.isSignIn()
    },
    username() {
      debugger
      return Util.user.getUserInfo()?.username
    },
    checkStatus() {
      return Util.user.getUserInfo()?.checkStatus
    },
    honePath() {
      return process.env.VUE_APP_RELEASE_FLODER_PATH
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: flex-end;
  width: 200px;
  height: 45px;
  float: right;
  line-height: 45px;
}

.el-dropdown {
  font-size: 12px;
}

.username {
  font-size: 14px;
  padding: 0 8px 0 16px;
}

.el-icon-s-operation {
  font-size: 14px;
  color: var(--q-color-primary);
}

.login-button {
  float: right;
}

.button {
  height: 30px;
  width: 80px;
}
button:active {
  border: none;
}
.console-btn {
  font-size: 14px;
  width: 42px;
  padding: 0 !important;
}
.nav-menu {
  margin: 0 20px;
}
.nav-menu a:hover,
.nav-menu .active > a,
.nav-menu li:hover > a {
  color: var(--q-color-primary);
}
.nav-menu a {
  color: var(--q-color-grey-333);
}
@media (min-width: 992px) and (max-width: 1200px) {
  .nav-menu {
    margin: 0 10px;
  }
  .nav-menu a {
    padding: 12px;
  }
  .login {
    width: 20%;
  }
}
@media (max-width: 992px) {
  .login {
    margin-right: 20px;
  }
}

.menu-out {
  padding: 5px 20px;
}
</style>