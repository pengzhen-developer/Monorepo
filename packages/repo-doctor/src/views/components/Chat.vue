<template>
  <div class="chat">
    <div id="container"></div>
    <div id="remoteContainer"></div>

    <div class="chat-title"></div>

    <el-scrollbar class="chat-body-scrollbar">
      <div class="chat-body">
        <!-- <div class="chat-body-patient-info">
          <Patient :patient="patient"></Patient>
        </div>-->

        <template v-for="msg in msgList">
          <!-- talkState:{{ msg.custom.ext.talkState }}
          talkType:{{ msg.custom.ext.talkType }}
          inquiryStatus: {{ msg.custom.ext.inquiryStatus }}-->
          <!-- 系统消息 -->
          <template v-if="msg.content">
            <div :key="msg.time" class="chat-body-message center">
              <span class="msg" v-html="getContentInfo(msg)"></span>
            </div>
          </template>

          <!-- 患者信息 -->
          <template v-else-if="msg.flow === 'in'">
            <div :key="msg.time" class="chat-body-message left">
              <!-- 文件 -->
              <img :src="msg.file.url" class="msg img" v-if="msg.file">
              <!-- 消息 -->
              <span class="msg" v-else v-html="msg.text"></span>
            </div>
          </template>

          <!-- 医生消息 -->
          <template v-else-if="msg.flow === 'out'">
            <div :key="msg.time" class="chat-body-message right">
              <!-- 文件 -->
              <img :src="msg.file.url" class="msg img" v-if="msg.file">
              <!-- 消息 -->
              <span class="msg" v-else v-html="msg.text"></span>
            </div>
          </template>

          <!-- <div :key="msg.time">
            <h4>msg:</h4>
            <div style="width: 1000px;" v-html="msg"></div>
            <hr>
            <h4>content:</h4>
            {{ msg.content && JSON.parse(msg.content) }}
            <hr>
            <h4>custom:</h4>
            {{ msg.custom && JSON.parse(msg.custom) }}
          </div>-->

          <!-- <div
            :key="msg.time"
            class="chat-body-message center"
            v-if="msg.content && JSON.parse(msg.content).data.appMsg"
          >
            <span class="msg" v-html="JSON.parse(msg.content).data.appMsg">111</span>
          </div>

          <div :key="msg.time" class="chat-body-message center" v-else-if="msg.content">
            <span class="msg" v-html="JSON.parse(msg.content).wechatMsg"></span>
          </div>

          <div :key="msg.time" class="chat-body-message left" v-else-if="msg.flow === 'in'">
            <span class="msg" v-html="msg.text"></span>
          </div>
          <div :key="msg.time" class="chat-body-message right" v-else-if="msg.flow === 'out'">
            <span class="msg" v-html="msg.text"></span>
          </div>-->
        </template>

        <!-- <div class="chat-body-message center">
          <span class="msg time">2019-01-29 15:06:25</span>
        </div>-->
      </div>
    </el-scrollbar>

    <div class="chat-tools">
      <el-button type="text">
        <img src="./../../assets/images/icons/clinic/chat_icon_pic.png">图片
      </el-button>
      <el-button @click="sendVideo" type="text">
        <img src="./../../assets/images/icons/clinic/chat_icon_video.png">视频
      </el-button>
      <el-button type="text">
        <img src="./../../assets/images/icons/clinic/chat_icon_medical.png">写病历
      </el-button>
      <el-button type="text">
        <img src="./../../assets/images/icons/clinic/chat_icon_pr.png">开处方
      </el-button>
    </div>
    <div class="chat-input">
      <el-input :rows="6" placeholder type="textarea" v-model="currentMsg"></el-input>
    </div>
    <div class="chat-control">
      <el-button round>快速回复</el-button>
      <el-button @click="sendText" round type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
import Netcall from './../../../public/static/js/NIM_Web_SDK_v6.2.0/js/NIM_Web_Netcall_v6.2.0'
import WebRTC from './../../../public/static/js/NIM_Web_SDK_v6.2.0/js/NIM_Web_WebRTC_v6.2.0'

export default {
  props: {
    chat: Object
  },

  data() {
    return {
      currentMsg: ''
    }
  },

  computed: {
    msgList: function() {
      return this.chat && this.chat.msgs && this.chat.msgs
    }
  },

  mounted() {
    // 是否被叫中
    let beCalling = false
    // 呼叫类型
    // 被叫信息
    let beCalledInfo = null
    // 是否正忙
    let busy = false

    setTimeout(() => {
      // 开启监听
      $peace.netcall.on('beCalling', function(obj) {
        console.log('on beCalling', obj)
        const channelId = obj.channelId
        // 被叫回应主叫自己已经收到了通话请求
        $peace.netcall.control({
          channelId: channelId,
          command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
        })
        // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
        if (!$peace.netcall.calling && !beCalling) {
          // let type = null
          // type = obj.type
          beCalling = true
          beCalledInfo = obj
        } else {
          if ($peace.netcall.calling) {
            busy = $peace.netcall.notCurrentChannelId(obj)
          } else if (beCalling) {
            busy = beCalledInfo.channelId !== channelId
          }
          if (busy) {
            $peace.netcall.control({
              channelId: channelId,
              command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
            })
            // 拒绝通话
            $peace.netcall.response({
              accepted: false,
              beCalledInfo: obj
            })
          }
        }
      })
    }, 2000)
  },

  methods: {
    getContentInfo(msg) {
      const content = msg.content
      if (!content.data.appMsg && !content.wechatMsg) {
        console.log(msg)
      }
      return content.data.appMsg || content.wechatMsg
    },

    sendText() {
      $peace.nim.sendText({
        scene: 'p2p',
        to: this.msgList.concat([]).splice(this.msgList.length - 1, 1)[0].custom.patients.patientId,
        text: this.currentMsg,
        custom: JSON.stringify(this.msgList.concat([]).splice(this.msgList.length - 1, 1)[0].custom),
        done: function sendMsgDone(error, msg) {
          console.log(error)
          console.log(msg)
          console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient)
        }
      })
    },

    sendVideo() {
      const pushConfig = {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: '测试自定义数据',
        pushPayload: '',
        sound: '',
        forceKeepCalling: 0
      }
      const sessionConfig = {
        videoQuality: Netcall.CHAT_VIDEO_QUALITY_HIGH,
        videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
        videoBitrate: 0,
        recordVideo: false,
        recordAudio: false,
        highAudio: false,
        bypassRtmp: false,
        rtmpUrl: '',
        rtmpRecord: false,
        splitMode: Netcall.LAYOUT_SPLITLATTICETILE
      }

      // 主动发送
      $peace.netcall
        .call({
          type: Netcall.NETCALL_TYPE_VIDEO,
          account: 'qgzhbclcjf',
          pushConfig: pushConfig,
          sessionConfig: sessionConfig,
          webrtcEnable: true
        })
        .then(function(obj) {
          // 成功发起呼叫
          console.log('call success', obj)
        })
        .catch(function(err) {
          // 被叫不在线
          if (err.event.code === 11001) {
            console.log('callee offline', err)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;

  .chat-body-scrollbar {
    height: calc(100% - 250px);
  }

  .chat-body {
    padding: 0 20px;

    .chat-body-message {
      margin: 20px 0;

      .msg {
        padding: 6px 10px 6px 10px;
        background: rgba(243, 243, 243, 1);
        border-radius: 4px;

        &.img {
          padding: 2px;
          max-width: 400px;
          max-height: 400px;
        }

        &.time {
          background: none;
          padding: 0;
        }
      }

      &.left {
        display: flex;
        justify-content: flex-start;

        span {
          background: rgba(243, 243, 243, 1);
          color: rgba(51, 51, 51, 1);
        }
      }

      &.center {
        margin: 10px 10%;
        display: flex;
        justify-content: center;
        text-align: left;

        span {
          font-size: 12px;
          color: rgba(155, 155, 155, 1);
        }
      }

      &.right {
        display: flex;
        justify-content: flex-end;

        span {
          background: rgba(0, 198, 174, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .chat-body-status {
    }

    .chat-body-doctor {
    }
  }

  .chat-tools {
    background: rgba(251, 251, 251, 1);
    height: 30px;

    .el-button {
      color: rgba(153, 153, 153, 1);

      /deep/ span {
        display: inline-flex;
        justify-content: center;

        img {
          margin: 0 5px 0 0;
        }

        &:after {
          content: '';
          position: relative;
          right: -15px;
          top: 0;
          bottom: 0;
          width: 1px;
          height: 15px;
          background-color: #efefef;
          z-index: 1;
        }
      }
    }
  }

  .chat-input {
    margin: 0 0 10px 0;
    height: 120px;

    /deep/ textarea {
      border: none;
      resize: none;
    }
  }
  .chat-control {
    text-align: right;
    height: 30px;
  }
}
</style>


