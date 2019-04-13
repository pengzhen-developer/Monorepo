<template>
  <div class="clinic">
    <div class="clinic-left">
      <div class="header">
        <h4>
          <img src="./../../assets/images/icons/clinic/inquirylist_icon.png">问诊列表
        </h4>
      </div>

      <el-scrollbar class="clinic-list-scrollbar">
        <div
          :key="message.id"
          @click="getMessageHistory(message)"
          class="msg-list"
          v-for="message in msgList"
        >
          <div class="title">
            <div class="info">
              <el-badge :value="message.unread" class="item">
                <span>{{ message.lastMsg.custom.patients.familyName }}</span>
              </el-badge>
              <span class="item">{{ message.lastMsg.custom.patients.gender }}</span>
              <span class="item">{{ message.lastMsg.custom.patients.age }}岁</span>
            </div>

            <div class="status">
              <el-button type="success">{{ message.lastMsg.custom.ext.talkState }}</el-button>
            </div>
          </div>
          <div class="msg">
            <span>{{ message.lastMsg.text }}</span>
          </div>
          <div class="status">
            <span>
              <i class="el-icon-menu"></i>图文咨询
            </span>
            <span>已等待30分钟</span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="clinic-center">
      <div class="header">
        <div class="left">
          <h4>{{ chatMsg && chatMsg.lastMsg && chatMsg.lastMsg.custom.patients.familyName }}</h4>
        </div>
        <div class="right">
          <h4>00:10:45</h4>
          <el-button type>结束问诊</el-button>
        </div>
      </div>

      <Chat :chat="chatObject"></Chat>

      <div id="container" style="width: 100px; height: 100px;"></div>
      <div id="remoteContainer" style="width: 100px; height: 100px;"></div>
      <div id="localContainer" style="width: 100px; height: 100px;"></div>
    </div>

    <div class="clinic-right">
      <div class="header">
        <h4>电子病历</h4>
      </div>

      <el-scrollbar class="clinic-list-scrollbar">
        <el-tabs class="clinic-right-tab">
          <el-tab-pane class="health" label="健康档单">
            <div class="health-item">
              <div class="health-item-title">
                <img src="../../assets/images/icons/clinic/archives_icon_marry.png">
                <h4>婚育史：</h4>
              </div>
              <div class="health-item-description">
                <span>暂无</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="../../assets/images/icons/clinic/archives_icon_marry copy.png">
                <h4>手术和外伤：</h4>
              </div>
              <div class="health-item-description">
                <span>暂无</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="../../assets/images/icons/clinic/archives_icon_medical.png">
                <h4>家族病史：</h4>
              </div>
              <div class="health-item-description">
                <span>暂无</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="../../assets/images/icons/clinic/archives_icon_allergy.png">
                <h4>过敏史：</h4>
              </div>
              <div class="health-item-description">
                <span>暂无</span>
              </div>
            </div>
            <div class="health-item">
              <div class="health-item-title">
                <img src="../../assets/images/icons/clinic/archives_icon_habit.png">
                <h4>个人习惯：</h4>
              </div>
              <div class="health-item-description">
                <span>暂无</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="就诊记录"></el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SDK from './../../../public/static/js/NIM_Web_SDK_v6.2.0/js/NIM_Web_SDK_v6.2.0'
import Netcall from './../../../public/static/js/NIM_Web_SDK_v6.2.0/js/NIM_Web_Netcall_v6.2.0'

import Chat from './../components/Chat'

export default {
  components: { Chat },

  data() {
    return {
      nim: undefined,

      msgList: [],

      chatMsg: {},
      chatObject: {}
    }
  },

  mounted() {
    this.getNIMInstance()
  },

  methods: {
    getNIMInstance() {
      const userInfo = $peace.cache.get('USER')

      $peace.nim = SDK.NIM.getInstance({
        appKey: '987faa06038223aa9151e8e6e974314e',
        account: userInfo.list.registerInfo.user_id,
        token: userInfo.list.registerInfo.token,
        onfriends(friends) {
          console.log('收到好友列表', friends)
        },
        onconnect: () => {
          $peace.util.alert('SDK 连接成功')
          console.log('SDK 连接成功')
          console.log($peace.nim)

          SDK.NIM.use(Netcall)

          $peace.netcall = Netcall.getInstance({
            kickLast: false,
            nim: $peace.nim,
            container: document.getElementById('container'),
            remoteContainer: document.getElementById('remoteContainer'),
            mirror: true,
            mirrorRemote: true,
            // 是否开启日志打印
            debug: true
          })

          console.log($peace.netcall)
        },
        ondisconnect(obj) {
          $peace.util.warning('SDK 连接断开')
          console.log('SDK 连接断开', obj)
        },
        onerror(error) {
          $peace.util.warning('SDK 连接失败')
          console.log('SDK 连接失败', error)
        },
        onsessions: sessions => {
          console.log('收到会话列表', sessions)
          this.updateSessionsUI(sessions)
        },
        onupdatesession: session => {
          console.log('会话更新了', session)
          this.updateSessionsUI(session)
        }
      })
    },

    getMessageHistory(message) {
      this.chatMsg = message

      $peace.nim.getHistoryMsgs({
        scene: 'p2p',
        to: message.to,
        done: (error, obj) => {
          console.log(obj)

          obj.msgs.forEach(item => {
            if (item.custom) {
              item.custom = JSON.parse(item.custom)
            }
            if (item.content) {
              item.content = JSON.parse(item.content)
            }
          })

          // 获取状态为待接诊 (talkState === 1) 的最后一条记录
          let notReciveindex = obj.msgs.findIndex(item => item.custom && item.custom.ext.talkState === 1)
          let hasReciveindex = obj.msgs
            .concat([])
            .splice(notReciveindex, obj.msgs.length - notReciveindex)
            .findIndex(item => item.custom && item.custom.ext.talkState !== 1)

          notReciveindex = notReciveindex === -1 ? 0 : notReciveindex
          hasReciveindex = hasReciveindex === -1 ? 0 : hasReciveindex

          obj.msgs = obj.msgs
            .concat([])
            .splice(0, notReciveindex + hasReciveindex)
            .reverse()

          this.chatObject = obj
        }
      })
    },

    updateSessionsUI(session) {
      console.log(session)
      session.forEach(item => {
        if (item.lastMsg.content) {
          item.lastMsg.content = JSON.parse(item.lastMsg.content)
        }
        if (item.lastMsg.custom) {
          item.lastMsg.custom = JSON.parse(item.lastMsg.custom)
        }
      })

      this.msgList = session.filter(item => item.lastMsg.custom)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


<style lang="scss" scoped>
.clinic {
  padding: 0 !important;
  display: flex;

  .clinic-left,
  .clinic-right {
    width: 214px;
    border: 1px solid #f2f2f2;
    height: calc(100vh - 100px);

    .header {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 50px;
      border-bottom: 1px solid #f2f2f2;

      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
    }
  }

  .clinic-center {
    flex: 1;
    border-top: 1px solid #f2f2f2;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 50px;
      border-bottom: 1px solid #f2f2f2;
      background: rgba(249, 249, 249, 1);

      .left {
        h4 {
          margin: 0 0 0 20px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0 20px 0 0;

        h4 {
          margin: 0 20px 0 0;
          font-size: 18px;
          font-weight: 400;
          color: rgba(0, 198, 174, 1);
        }
      }
    }
  }

  .clinic-right {
    .clinic-right-tab {
      /deep/ .el-tabs__active-bar {
        top: 0;
        width: 50%;
      }

      /deep/ .el-tabs__nav {
        width: 100%;
      }

      /deep/ .el-tabs__item {
        width: 50%;
        padding: 0;
        text-align: center;
      }

      /deep/ {
        .el-tabs__nav-wrap::after {
          display: none;
        }
      }

      .health {
        padding: 10px;

        .health-item {
          margin: 0 0 20px 0;

          .health-item-title {
            display: inline-flex;
            justify-content: center;

            img {
              display: inline-block;
              width: 20px;
              margin-right: 10px;
            }

            h4 {
              display: inline-block;
              margin: 0;
              color: rgba(51, 51, 51, 1);
            }
          }

          .health-item-description {
            span {
              margin: 0 0 0 30px;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
  }

  .clinic-list-scrollbar {
    height: calc(100% - 50px);

    .msg-list {
      display: flex;
      flex-flow: column;
      padding: 20px 10px;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 10px 0;

        .info {
          .item {
            font-size: 12px;
            margin: 0 10px 0 0;

            & :first-child {
              font-size: 14px;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 20px;
            }
          }
        }

        .status {
          .el-button {
            padding: 0;
            margin: 0;
            width: 52px;
            min-width: auto;
            height: 19px;
            border-radius: 10px;
          }
        }
      }

      .msg {
        margin: 0 0 20px 0;

        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 17px;
        }
      }

      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }

      &:hover,
      &.active {
        cursor: pointer;
        background: rgba(244, 244, 244, 1);
      }
    }
  }
}
</style>
