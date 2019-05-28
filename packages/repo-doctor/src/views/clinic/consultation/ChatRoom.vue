<template>
  <div class="chat-room">
    <div class="header">
      <div class="left">
        <h4>TODO 徐鑫</h4>
      </div>
      <div class="right">
        <el-button plain type="success">TODO 等待会诊</el-button>
      </div>
    </div>

    <div class="body">
      <el-scrollbar class="scrollbar">
        <div class="consultation-status">
          <div class="consultation-status-content">
            <div class="clock">
              <img src="~@/assets/images/icons/clinic/electronicmedical_icon.png">
            </div>
            <div class="count-down">
              <span>距会诊开始时间还剩</span>
              <span class="count-down-time">TODO 1天5时12分</span>
            </div>
            <div class="count-down-msg">
              <span>请在</span>
              <span class="count-down-msg-time">TODO 2019-05-30 10:00-10:30</span>
              <span>发起视频会诊，超期系统将自动关闭会诊单</span>
            </div>
          </div>
        </div>
        <div class="consultation-session-list">
          <ul>
            <li>
              <div class="msg-body system system-time">TODO: 发送消息时间</div>

              <div class="msg-body system">
                <div class="msg-detail">
                  <span>已邀请王贝贝、张坤坤 医生参与协同会诊</span>
                </div>
              </div>
            </li>
            <li>
              <div class="msg-body system system-time">TODO: 发送消息时间</div>

              <div class="msg-body out">
                <div class="msg-detail video">
                  <span>TODO: 通话时长</span>
                  <img src="~@/assets/images/icons/clinic/ic_video_left@2x.png">
                </div>
              </div>
            </li>
          </ul>
        </div>

        <el-button @click="init" type="primary">0. 初始化</el-button>
        <el-button @click="createRoom" type="primary">1. 创建房间</el-button>
        <el-button @click="joinRoom" type="primary">2. 加入房间</el-button>
      </el-scrollbar>
    </div>

    <div>
      <el-dialog :title="video.title" :visible.sync="video.visible" center custom-class="video-class" width="500px">
        <!-- 己方视频 -->
        <div class="videoContaier" id="mainContaier"></div>

        <!-- 他人视频 -->
        <div :id="'remoteContaier' + item.account" :key="item.account" class="videoContaier" v-for="item in remoteList"></div>

        <template slot="footer">
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button circle icon="el-icon-edit" plain type></el-button>
          <el-button @click="leaveChannel" circle icon="el-icon-close" plain></el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import NIM from '/public/static/NIM_Web_SDK/NIM_Web_NIM_v6.3.0'
import WebRTC from '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.3.0'
NIM.use(WebRTC)

export default {
  mounted() {},

  data() {
    return {
      remoteList: [{ account: 1 }],

      video: {
        visible: false,

        title: ''
      }
    }
  },

  methods: {
    init() {
      const appKey = $peace.config.nim[process.env.VUE_APP_MODE || process.env.NODE_ENV].appKey
      const account = $peace.cache.get('USER').list.registerInfo.user_id
      const token = $peace.cache.get('USER').list.registerInfo.token

      $peace.NIM = NIM.getInstance({
        appKey,
        account,
        token,

        db: false
      })

      $peace.WebRTC = WebRTC.getInstance({
        nim: $peace.NIM,
        chromeId: '',
        // 是否开启日志打印
        debug: false
      })
    },

    createRoom() {
      $peace.WebRTC.createChannel({
        //必填, 房间名
        channelName: 'testChannelName',
        //可选
        custom: '测试自定义数据',
        // 是否支持WebRTC方式接入，可选，默认为不开启
        webrtcEnable: true
      })
        .then(obj => {
          // 预定房间成功后的上层逻辑操作
          // eg: 初始化房间UI显示
          // eg: 加入房间

          console.log(obj)
        })
        .catch(obj => {
          console.log(obj)
        })
    },

    joinRoom() {
      this.video.visible = true
      this.video.title = '10:00'

      this.$nextTick(function() {
        const sessionConfig = {
          videoQuality: window.WebRTC.CHAT_VIDEO_QUALITY_HIGH,
          videoFrameRate: window.WebRTC.CHAT_VIDEO_FRAME_RATE_15,
          videoEncodeMode: window.WebRTC.CHAT_VIDEO_ENCODEMODE_NORMAL,
          videoBitrate: 0,
          recordVideo: false,
          recordAudio: false,
          highAudio: false,
          bypassRtmp: false,
          rtmpUrl: '',
          rtmpRecord: false,
          splitMode: window.WebRTC.LAYOUT_SPLITLATTICETILE
        }
        $peace.WebRTC.joinChannel({
          channelName: 'testChannelName', //必填
          type: window.WebRTC.NETCALL_TYPE_VIDEO,
          sessionConfig: sessionConfig
        }).then(obj => {
          // 加入房间成功后的上层逻辑操作
          // eg: 开启摄像头
          // eg: 开启麦克风
          // eg: 开启本地流
          // eg: 设置音量采集、播放
          // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式

          console.log('加入成功', obj)

          $peace.WebRTC.startRtc()
            .then(() => {
              // 开启麦克风
              return $peace.WebRTC.startDevice({
                type: window.WebRTC.DEVICE_TYPE_AUDIO_IN
              }).catch(err => {
                console.log('启动麦克风失败')
                console.error(err)
              })
            })
            .then(() => {
              // 设置采集音量
              $peace.WebRTC.setCaptureVolume(255)
              // 开启摄像头
              return $peace.WebRTC.startDevice({
                type: window.WebRTC.DEVICE_TYPE_VIDEO,
                width: 640,
                height: 480
              }).catch(err => {
                console.log('启动摄像头失败')
                console.error(err)
              })
            })
            .then(() => {
              //预览本地画面
              $peace.WebRTC.startLocalStream(document.getElementById('mainContaier'))
              // 设置本地预览画面大小
              $peace.WebRTC.setVideoViewSize({
                width: 250,
                height: 250,
                cut: true
              })
            })
            .then(() => {
              // 设置互动者角色
              $peace.WebRTC.changeRoleToPlayer()
            })
            .catch(err => {
              console.log('发生错误')
              console.log(err)
              $peace.WebRTC.hangup()
            })

          // 在回调里监听对方加入通话，并显示对方的视频画面
          $peace.WebRTC.on('remoteTrack', obj => {
            console.log('user join', obj)

            if (this.remoteList.findIndex(item => item.account === obj.account) === -1) {
              this.remoteList.push(obj)

              this.$nextTick(function() {
                console.log(document.getElementById('remoteContaier' + obj.account))

                // 播放对方声音
                $peace.WebRTC.startDevice({
                  type: window.WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
                }).catch(err => {
                  console.log('播放对方的声音失败')
                  console.error(err)
                })
                // 预览对方视频画面
                $peace.WebRTC.startRemoteStream({
                  account: obj.account,
                  node: document.getElementById('remoteContaier' + obj.account)
                })
                // 设置对方预览画面大小
                $peace.WebRTC.setVideoViewRemoteSize({
                  account: obj.account,
                  width: 250,
                  height: 250,
                  cut: true
                })
              })
            }
          })
        })
      })
    },

    leaveChannel() {
      $peace.WebRTC.leaveChannel().then(obj => {
        console.log(obj)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .video-class {
  video {
    height: 250px !important;
    width: auto !important;
  }

  .el-dialog__header {
    background: #2b2d2f;

    .el-dialog__title {
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 0;
    background: #2b2d2f;
    color: #fff;

    .videoContaier {
      position: relative;
      display: inline-flex;
      width: 250px;
      height: 250px;

      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        background: linear-gradient(180deg, rgba(200, 200, 200, 0.1) 0%, rgba(51, 51, 51, 0) 15%, rgba(76, 76, 76, 0) 83%, rgba(200, 200, 200, 0.1) 100%);
      }
    }
  }

  .el-dialog__footer {
    background: #2b2d2f;
    color: #fff;
    padding: 0;
    height: 60px;
    line-height: 60px;
  }
}
</style>

<style lang="scss" scoped>
.chat-room {
  .header {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #f2f2f2;
    background: #f9f9f9;

    .left {
      img {
        margin-right: 10px;
      }

      h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 0 10px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 0 10px 0 0;

      h4 {
        margin: 0 20px 0 0;
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 198, 174, 1);
      }
    }
  }

  .body {
    height: calc(100% - 50px);

    .scrollbar {
      height: 100%;
      overflow: hidden;
    }

    .consultation-status {
      display: flex;
      justify-content: center;
      padding: 40px 30px;

      &-content {
        width: 100%;
        height: 160px;
        background: rgba(240, 252, 250, 1);
        border-radius: 6px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .clock img {
          width: 35px;
          height: 35px;
          margin: 0 0 20px 0;
        }

        .count-down {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin: 0 0 10px 0;

          .count-down-time {
            margin: 0 5px;
            color: #00c6ae;
          }
        }

        .count-down-msg {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          .count-down-msg-time {
            margin: 0 5px;
            color: #00c6ae;
          }
        }
      }
    }

    .consultation-session-list {
      ul,
      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .msg-body {
        display: flex;
        align-items: center;

        margin: 10px 0 20px;

        &.system {
          justify-content: center;

          .msg-detail {
            background: rgba(242, 242, 242, 1);
            border-radius: 4px;
            padding: 2px 10px;

            font-size: 14px;
            font-weight: 400;
            color: rgba(184, 184, 184, 1);
            line-height: 20px;
          }
        }

        &.system-time {
          color: #9b9b9b;
          font-size: 12px;
          margin: 0;
          padding: 0;
        }

        &.in {
          margin-left: 5px;
          justify-content: flex-start;

          .msg-detail {
            background: rgba(243, 243, 243, 1);
            color: rgba(51, 51, 51, 1);
            border-radius: 4px;
            padding: 6px 10px 6px 10px;
            margin: 6px 0;
            display: inline-block;
            max-width: 400px;
            word-break: break-all;
            white-space: normal;
          }
        }

        &.out {
          margin-right: 10px;
          justify-content: flex-end;

          .msg-detail {
            background: #00c6ae;
            color: #ffffff;
            border-radius: 4px;
            padding: 6px 10px 6px 10px;
            margin: 6px 0;
            display: inline-block;
            max-width: 400px;
            word-break: break-all;
            white-space: normal;

            &.medical,
            &.prescription {
              background: #fff;
              border: 1px solid #f2f2f2;
              padding: 10px 12px;
              cursor: pointer;
              display: inline-flex;

              p {
                margin: 0 0 2px 10px;
                font-size: 12px;
                color: #333333;
              }
            }

            &.video {
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                margin: 0 0 0 10px;
                width: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>