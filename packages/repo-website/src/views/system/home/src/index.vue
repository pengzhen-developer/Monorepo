<template>
  <div>
    <el-container>

      <el-main style="padding:0;">
        <Component :is="mode"></Component>
      </el-main>

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

import { path } from '@src/router/generateRoutes'
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
      this.$router.push(path.REGISTER)
    },
    goLogin() {
      this.$router.push(path.LOGIN)
    },
    goConsole() {
      //跳转前刷新一次checkStatus
      Service.getAccountInfo().then((res) => {
        Util.user.updateUserInfo(res.data)
        Util.user.replaceToCompliteInfo(res.data.checkStatus)
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
    background-color: var(--q-color-primary);
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
        border: 1px solid var(--q-color-primary);
        color: var(--q-color-primary);
        &.none {
          color: #333;
          border: 0;
        }
      }
      &:hover {
        .register-btn {
          border: 1px solid var(--q-color-primary);
          color: var(--q-color-primary);
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