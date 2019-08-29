<template>
  <div class="header-container">
    <div class="header-left">
      <span class="header-left-title">{{ $store.state.user.userInfo.list.docInfo.netHospital_name }}</span>
    </div>
    <div class="header-right">
      <el-dropdown>
        <div class="header-right-message">
          <img src="~@src/assets/images/layout/top_icon_message.png" />
          <span>消息</span>
        </div>

        <el-dropdown-menu class="header-right-message-dropdown" slot="dropdown">
          <div class="header-right-message-dropdown-content">
            <h4>暂无消息</h4>
            <el-dropdown-item class="dropdown-item"></el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown>
        <div class="header-right-title">
          <img :src="$store.state.user.userInfo.list.docInfo.avartor" />
          <!-- <div class="circle online"></div> -->
          <span>欢迎您，</span>
          <span>{{ $store.state.user.userInfo.list.docInfo.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>

        <el-dropdown-menu class="header-right-title-dropdown" slot="dropdown">
          <div class="header-right-title-dropdown-content">
            <!-- <h4>出诊状态</h4>
              <el-dropdown-item class="dropdown-item" disabled readonly>
                <div class="circle online"></div>
                <span>上线</span>
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item" disabled readonly>
                <div class="circle offline"></div>
                <span>离线</span>
              </el-dropdown-item>
            <hr>-->
            <el-dropdown-item @click.native="signOut" class="dropdown-item">
              <div class="circle logout"></div>
              <span>退出登录</span>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  methods: {
    signOut() {
      // 清空所有缓存
      peace.cache.clear()

      // 重定向
      this.$router.replace(peace.config.system.loginPage)

      // 刷新页面，确保 vuex store 被清空
      setTimeout(() => {
        window.location.reload()
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 1200px;
  height: 100%;
  background: #00c6ae;
  margin: 0 auto;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    margin: 0 0 0 12px;

    .header-left-title {
      font-size: 22px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;

      &:before {
        content: '';
        margin: 0 16px 0 4px;
        width: 31px;
        height: 31px;
        background-image: url('~@src/assets/images/logo.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: bottom;
      }

      i {
        margin-right: 16px;
      }
    }
  }

  .header-right {
    display: flex;

    .header-right-message {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 48px;
      line-height: 48px;

      cursor: pointer;

      .el-badge {
        line-height: 20px;
      }

      i {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        height: 20px;
        line-height: 20px;
        margin: 0 0 0 20px;
      }

      &::after {
        display: inline-block;
        content: '';
        position: relative;
        left: 0;
        top: 0;
        width: 1px;
        height: 20px;
        background-color: #ffffff;
        z-index: 1;
        margin: 0 20px;
      }
    }

    .header-right-title {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 48px;
      line-height: 48px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 12px 0 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.circle {
  display: inline-flex;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  margin: 0 12px 0 0;

  &.online {
    background: #00e9cd;
  }

  &.offline {
    background: #666666;
  }

  &.logout {
    background: #fea356;
  }
}

.header-right-message-dropdown {
  width: 120px;

  display: flex;
  justify-content: center;

  .header-right-message-dropdown-content {
    width: 100%;
    padding: 0;

    text-align: center;

    h4 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 10px 0;
      padding: 0;
    }
  }
}

.header-right-title-dropdown {
  width: 120px;

  display: flex;
  justify-content: center;

  .header-right-title-dropdown-content {
    width: 100%;
    padding: 0;

    text-align: center;

    h4 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 0 0 10px 0;
      padding: 0;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #efefef;
      margin: 10px 0;
      padding: 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      line-height: 28px;

      &.active {
        background: #abb9b8;
      }

      span {
        width: 28px;
        height: 20px;
        padding: 0;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
    }
  }
}
</style>


