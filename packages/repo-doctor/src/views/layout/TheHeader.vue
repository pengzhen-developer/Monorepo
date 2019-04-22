<template>
  <div class="header">
    <div class="header-container">
      <div class="header-left">
        <span class="header-left-title">{{ $peace.cache.get('USER').list.docInfo.netHospital_name }}</span>
      </div>
      <div class="header-right">
        <el-dropdown>
          <div class="header-right-message">
            <!-- <el-badge :value="0" class="item"> -->
            <img src="./../../assets/images/icons/top_icon_message.png">
            <!-- </el-badge> -->

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
            <div class="circle online"></div>
            <span>欢迎您，</span>
            <span>{{ user.userInfo.list.docInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>

          <el-dropdown-menu class="header-right-title-dropdown" slot="dropdown">
            <div class="header-right-title-dropdown-content">
              <h4>出诊状态</h4>
              <el-dropdown-item class="dropdown-item" disabled readonly>
                <div class="circle online"></div>
                <span>上线</span>
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item" disabled readonly>
                <div class="circle offline"></div>
                <span>离线</span>
              </el-dropdown-item>
              <hr>
              <el-dropdown-item @click.native="signOut" class="dropdown-item">
                <div class="circle logout"></div>
                <span>登出</span>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },

  methods: {
    ...mapActions('user', ['removeUserInfo']),

    signOut() {
      this.removeUserInfo()

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  min-width: 1200px;
  padding: 0 12px;
  height: 56px;
  background: rgba(0, 198, 174, 1);
  display: flex;
  align-items: center;

  .header-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 12px;

    display: flex;
    align-items: center;

    .header-left {
      width: 500px;

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
          background-image: url('~@/assets/images/icons/logo.png');
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
      text-align: right;
      flex: 1;

      display: flex;
      justify-content: flex-end;
      align-items: center;

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
  width: 170px;

  display: flex;
  justify-content: center;

  .header-right-message-dropdown-content {
    width: 100%;
    padding: 0 10px;

    text-align: center;

    h4 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 10px 0;
      padding: 0;
    }

    .dropdown-item {
    }
  }
}

.header-right-title-dropdown {
  width: 170px;

  display: flex;
  justify-content: center;

  .header-right-title-dropdown-content {
    width: 100%;
    padding: 0 10px;

    text-align: center;

    h4 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 10px 0;
      padding: 0;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #efefef;
      margin: 5px 0;
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


