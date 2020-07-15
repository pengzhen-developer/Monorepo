<template>
  <div>
    <el-container>
      <div class="upper">
        <el-button class="up-btn"
                   @click="gotoDoctorWorkbench"> 我是医生 </el-button>
        <el-button class="up-btn"
                   @click="gotoPharmacistWorkbench"> 我是药师 </el-button>
      </div>
      <el-header class="header max-width"
                 height="52px">
        <div class="left">
          <a href="">
            <el-image style="width: 98px; height: 40px;"
                      :src="require('./assets/images/logo.png')"
                      lazy>
            </el-image>
          </a>
        </div>
        <div class="main">
          <el-tabs v-model="mode">
            <el-tab-pane v-for="item in menu"
                         :key="item.index"
                         :label="item.title"
                         :name="item.name">
            </el-tab-pane>

          </el-tabs>
        </div>
        <div class="right">
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
            <div class="bth-hover">
              <el-button class="login-btn"
                         :class="active&&'none'"
                         v-on:click="goLogin">登录</el-button>
            </div>
            <div class="bth-hover"
                 @mousemove="active=1"
                 @mouseout="active=0">
              <el-button class="register-btn "
                         v-on:click="goRegister">注册</el-button>
            </div>
          </template>
        </div>
      </el-header>
      <el-main style="padding:0;">
        <Component :is="mode"></Component>
      </el-main>
      <el-footer class="footer "
                 height="363px">
        <div class="max-width">
          <div class="left">
            <div>
              <el-image style="width: 109px; height: 35px;"
                        :src="require('./assets/images/logo_footer.png')"
                        lazy>
              </el-image>
            </div>
            <div class="title">智药云</div>
            <!-- <div class="dd"><span>电话：</span><span>4008004488</span></div>
            <div class="dd"><span>网址：</span><span>http://jztzzy.jk.com</span></div> -->
            <div class="dd"><span>地址：</span><span>武汉市洪山区光谷新发展国际中心A座2301室</span></div>
          </div>
          <div class="main">
            <span>全息云通健康科技（武汉）有限公司 </span> <span>鄂ICP备19008514</span>
          </div>
          <div class="right">
            <div>
              <div class="title">系统</div>
              <div class="dd"><a href="">多店云仓</a></div>
              <div class="dd"><a href="">多点健康</a></div>
              <!-- <div class="dd"><a href="">好德医</a></div> -->
              <div class="dd"><a href="">智药云</a></div>
            </div>
            <div>
              <div class="title">智药云</div>
              <div class="dd"
                   v-on:click="changMode('Home')">首页</div>
              <div class="dd"
                   v-on:click="changMode('Produce')">产品</div>
              <div class="dd"
                   v-on:click="changMode('Solutions')">解决方案</div>
              <div class="dd"
                   v-on:click="changMode('Around')">关于我们</div>
            </div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Constant from './constant'
import Home from './components/Home'
import Produce from './components/Produce'
import Solutions from './components/Solutions'
import Around from './components/Around'
import Service from './service'

import RouterPath from '@src/router/routerPath'
import Util from '@src/util'
export default {
  components: {
    Home,
    Produce,
    Solutions,
    Around
  },
  data() {
    return {
      mode: Constant.HeaderMenu[0].name,
      menu: Constant.HeaderMenu,
      active: 0
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
  },

  methods: {
    gotoDoctorWorkbench() {
      Util.user.redirectToDoctorWorkbench()
    },
    gotoPharmacistWorkbench() {
      Util.user.redirectTOPharmacistWorkbench()
    },
    goRegister() {
      this.$router.push(RouterPath.system.REGISTER)
    },
    goLogin() {
      this.$router.push(RouterPath.system.LOGIN)
    },
    goConsole() {
      //跳转前刷新一次checkStatus
      Service.getAccountInfo().then(res => {
        Util.user.updateUserInfo(res.data)

        if (res.data.checkStatus !== Constant.ENUM_CHECK_STATUS.已通过) {
          this.$router.replace(RouterPath.system.INFORMMATION)
        } else {
          this.$router.replace(RouterPath.system.HOME)

          Util.user.redirectToConsole()
        }
      })
    },

    handleCommand(command) {
      if (command == 'loginOut') {
        Util.user.removeUserInfo()
        window.location.reload()
      }
    },
    changMode(mode) {
      if (this.mode != mode) {
        this.mode = mode
      }
    },
    registerHover() {
      this.flag = true
    }
  }
}
</script>

<style lang="scss" scoped>
.gary-color {
  color: #707070;
}
.max-width {
  width: 980px;
  margin: 0 auto;
}
.upper {
  display: flex;
  justify-content: flex-end;
  padding: 3px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  .el-button {
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 5px 10px;
  }
}
::v-deep .el-tabs__header {
  margin: 0;
}
::v-deep .el-tabs__nav-wrap::after,
::v-deep .el-tabs__active-bar {
  height: 0;
}
::v-deep .el-tabs__item {
  padding: 0 20px !important;
  text-align: center;
  height: 52px;
  line-height: 52px;
  &.is-active {
    color: #fff;
    background-color: $--color-primary;
  }
}
.header {
  background-color: #fff;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    height: 52px;
  }
  .left {
    display: flex;
    align-items: center;
    margin-right: 52px;
    span {
      font-size: 20px;
      margin-left: 8px;
    }
  }
  .main {
    flex: 1;
  }
  .right {
    display: flex;
    align-items: center;
    .el-button {
      margin-left: 10px;
      width: 46px;
      height: 24px;
      font-size: 12px;
      padding: 0;
      display: block;
      text-align: center;
    }
    .console-btn {
      margin-right: 20px;
    }
    .login-btn,
    .register-btn {
      background-color: #fff;
      border: 0;
    }

    .bth-hover {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        border-radius: 0;
      }
      .login-btn {
        border: 1px solid $--color-primary;
        color: $--color-primary;
        &.none {
          color: #333;
          border: 0;
        }
      }
      &:hover {
        .register-btn {
          border: 1px solid $--color-primary;
          color: $--color-primary;
        }
      }
    }
  }
}
.footer {
  background-color: #002329;
  width: 100%;
  .max-width {
    display: flex;
    height: 363px;
    padding: 60px 0 30px 0;
    box-sizing: border-box;
    color: #fff;
    > div {
      flex: 1;
      height: 100%;
    }

    .title {
      font-size: 16px;
      line-height: 42px;
    }
    .dd {
      margin-top: 16px;
      cursor: pointer;
      display: flex;
      width: 100%;
      span {
        &:first-child {
          width: 13%;
        }
        &:last-child {
          flex: 1;
        }
      }
    }
  }
  .main {
    display: flex;
    align-items: center;
    font-size: 12px;
    flex-direction: column;
    justify-content: flex-end;
    // padding-right: 5%;
    box-sizing: border-box;
  }
  .right {
    display: flex;
    > div {
      flex: 1;
    }
  }
}
</style>