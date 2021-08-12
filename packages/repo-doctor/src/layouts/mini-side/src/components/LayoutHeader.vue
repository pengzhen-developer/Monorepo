<template>
  <div class="header-container">
    <div class="header-content">
      <div class="header-left">
        <span class="header-left-title"> {{ netHospital_name }}</span>
      </div>
      <div class="header-right">
        <el-dropdown @command="handleNotice">
          <div class="header-right-message">
            <el-badge class="mark" v-bind:value="unread" v-bind:hidden="unread == 0">
              <img src="~@src/assets/images/layout/top_icon_message.png" />
            </el-badge>
            <span>消息</span>
          </div>

          <el-dropdown-menu class="header-right-message-dropdown" slot="dropdown">
            <div class="header-right-message-dropdown-content">
              <h4 v-if="messageList.length == 0">暂无消息</h4>
              <el-dropdown-item class="dropdown-item message" :command="item" v-for="(item, index) in messageList" :key="'item' + index">
                <el-badge :is-dot="item.isRead == 0">
                  <div :class="'icon icon-' + item.tag"></div>
                </el-badge>
                <div class="right">
                  <div class="title">
                    <span class="caption">{{ item.title }}</span>
                    <span class="time">{{ item.time }}</span>
                  </div>
                  <div class="content">
                    {{ item.detail }}
                  </div>
                </div>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown>
          <div class="header-right-title">
            <el-avatar class="q-mr-md" :size="30" :src="docInfo.avartor"></el-avatar>

            <img v-if="workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_work_checked.svg" />

            <img v-if="!workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_rest_checked.svg" />

            <span>欢迎您，</span>
            <span>{{ docInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right q-mr-md"></i>
          </div>

          <el-dropdown-menu class="header-right-title-dropdown" slot="dropdown">
            <div class="header-right-title-dropdown-content">
              <p class="text-h7 text-bold q-mb-sm">工作状态</p>
              <el-dropdown-item @click.native="setWorkstatus(1)" class="dropdown-item">
                <img v-if="workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_work_checked.svg" />
                <img v-if="!workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_work_unchecked.svg" />
                <span>工作中</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native="setWorkstatus(2)" class="dropdown-item">
                <img v-if="!workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_rest_checked.svg" />
                <img v-if="workStatus" class="q-mr-md" style="width: 20px; height: 20px;" src="./../assets/img/icon_rest_unchecked.svg" />
                <span>休息中</span>
              </el-dropdown-item>
              <hr />
              <el-dropdown-item @click.native="signOut" style="justify-content: center;" class="dropdown-item">
                <img class="q-mr-md" style="width: 18px; height: 20px;" src="./../assets/img/ic_sign_out.svg" />
                <span>退出登录</span>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <PeaceDialog v-bind:append-to-body="true" v-bind:visible.sync="dialogHZ.visible" title="会诊详情">
      <TheConsultationDetail :data="dialogHZ.data" @close="() => (dialogHZ.visible = false)"></TheConsultationDetail>
    </PeaceDialog>

    <PeaceDialog v-bind:append-to-body="true" v-bind:visible.sync="dialogNotice.visible" title="签名提醒">
      <SignNotice :num="dialogNotice.num" @close="() => (dialogNotice.visible = false)"></SignNotice>
    </PeaceDialog>

    <PeaceDialog v-bind:append-to-body="true" v-bind:visible.sync="dialogOrg.visible" title="详情">
      <OrgNotice :data="dialogOrg.data" @close="() => (dialogOrg.visible = false)"></OrgNotice>
    </PeaceDialog>
  </div>
</template>

<script>
import Util from '@src/util'
import TheConsultationDetail from '@src/views/components/consultation/ConsultationDetail'
import SignNotice from '@src/views/components/SignNotice'
import OrgNotice from '@src/views/components/OrgNotice'

export default {
  components: {
    TheConsultationDetail,
    SignNotice,
    OrgNotice
  },
  data() {
    return {
      messageList: [],
      unread: 0,
      interval: null,
      dialogHZ: {
        visible: false,
        data: null
      },
      dialogNotice: {
        visible: false,
        num: '0'
      },
      dialogOrg: {
        visible: false,
        data: {
          title: '',
          content: ''
        }
      }
    }
  },
  computed: {
    netHospital_name() {
      return this.$store.state.user?.userInfo?.list?.docInfo?.netHospital_name
    },

    docInfo() {
      return this.$store.state.user?.userInfo?.list?.docInfo ?? {}
    },

    workStatus() {
      return this.$store.state.user?.userInfo?.list?.docInfo?.workStatus === 1
    }
  },

  mounted() {
    this.getMsgList()
  },

  methods: {
    getMsgList() {
      let p = 1
      let size = 100
      let params = { p, size }
      this.get(params)
    },

    get(params) {
      Peace.service.personalCenter.getMsgList(params).then((res) => {
        this.messageList = res.data.list
        this.unread = res.data.unRead
      })
    },

    setWorkstatus(status) {
      Peace.service.personalCenter.updateWorkStatus({ workStatus: status }).then(() => {
        const userInfo = Util.user.getUserInfo()
        userInfo.list.docInfo.workStatus = status

        // 储存用户信息
        Util.user.setUserInfo(userInfo)
        // 更新 vuex
        this.$store.commit('user/setUserInfo', userInfo)
      })
    },

    handleNotice(item) {
      let tag = item.tag
      let sysId = item.sysId
      let params = { tag, sysId }
      // this.interval && this.clearInterval();
      Peace.service.personalCenter.getDetail(params).then((res) => {
        switch (item.tag) {
          case 'orgNotice':
            this.dialogOrg.visible = true
            this.dialogOrg.data.title = res.data.title
            this.dialogOrg.data.content = res.data.content
            break
          case 'DoctorSignNotice':
            this.dialogNotice.visible = true
            this.dialogNotice.num = res.data.prescriptionNum
            break
          case 'consultCooperation':
            this.dialogHZ.visible = true
            this.dialogHZ.data = res.data.info
            break
        }
      })
    },
    signOut() {
      Util.user.removeUserInfo()
      Util.location.redirectToLogin()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  margin: 0 auto;
  height: 100%;
  background: #3099a6;
  margin: 0 auto;
  padding: 0;

  .header-content {
    width: 100%;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

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
        width: 100px;
        height: 33px;
        background-image: url('~@src/assets/images/logo.png');
        background-size: contain;
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

  ::v-deep .header-right {
    display: flex;

    .el-badge {
      &.offline {
        .el-badge__content {
          background-color: #666;
        }
      }

      &.online {
        .el-badge__content {
          background-color: #3099a6;
        }
      }

      .el-badge__content.is-fixed.is-dot {
        top: 4px;
        right: 4px;
        border: 1px solid #ebebebb4;
      }

      .el-badge__content.is-dot {
        width: 12px;
        height: 12px;
      }
    }

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

      .el-avatar > img {
        height: 100%;
        width: 100%;
      }

      .el-badge {
        display: flex;
        align-items: center;
        justify-content: center;
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
  min-width: 120px;
  width: auto;
  .header-right-message-dropdown-content {
    width: 100%;
    padding: 0;
    max-height: 310px;
    overflow-y: auto;
    text-align: center;

    h4 {
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      color: rgba(102, 102, 102, 1);
      margin: 10px 0;
      padding: 0;
    }
    li.message {
      text-align: left;
      padding: 8px 15px 8px;
      .icon {
        width: 20px;
        height: 20px;
        background: url('../../../../assets/images/icon-hz.png') no-repeat;
        &.icon-DoctorSignNotice {
          background: url('../../../../assets/images/icon-msg.png') no-repeat;
        }
        &.icon-orgNotice {
          background: url('../../../../assets/images/icon-notice.png') no-repeat;
        }
      }
      display: flex;
      flex-direction: row;
      .right {
        width: 240px;
        margin-left: 10px;
        margin-top: -3px;
        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .caption {
            font-size: 14px;
            color: #333333;
          }
          .time {
            font-size: 12px;
            color: #999;
          }
        }
        .content {
          font-size: 12px;
          color: #666;
          line-height: 20px;
        }
      }
    }
  }
}

.header-right-title-dropdown {
  width: 120px;

  display: flex;
  justify-content: center;

  .header-right-title-dropdown-content {
    width: 100%;
    padding: 8px;

    h4 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      padding: 5px 0;
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
      justify-content: flex-start;
      height: 28px;
      line-height: 28px;
      padding: 0 5px;
      border-radius: 5px;

      &.active {
        background: #abb9b8;
      }

      h4 {
        line-height: 0;
        margin: 0;
      }

      span {
        height: 20px;
        padding: 0;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }

      .icon {
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
