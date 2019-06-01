<template>
  <div>
    <el-dialog :title="video.title" :visible.sync="video.visible" center custom-class="video-class" width="500px">
      <!-- 己方视频 -->
      <div class="videoContaier" id="mainContaier"></div>

      <!-- 他人视频 -->
      <div :id="'remoteContaier' + item.account" :key="item.account" class="videoContaier" v-for="item in remoteList"></div>

      <template slot="footer">
        <el-button @click="leaveVideo" circle icon="el-icon-close" plain></el-button>
      </template>
    </el-dialog>

    <div class="tool">
      <div class="shortcut">
        <el-button @click="邀请医生" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">邀请医生
        </el-button>
        <el-button @click="sendVideo" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">发起视频
        </el-button>
        <el-button @click="joinVideoRoom" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">加入视频
        </el-button>
        <el-button @click="sendRemark" type="text">
          <img src="~@/assets/images/icons/clinic/chat_icon_video.png">会诊意见
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import WebRTC from '/public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.3.0'

export default {
  data() {
    return {
      remoteList: [],

      dialog: {
        visible: false
      },

      video: {
        visible: false,
        title: ''
      }
    }
  },

  computed: {
    ...mapState(['chat'])
  },

  created() {
    if ($peace.WebRTC) {
      // 在回调里监听对方加入通话，并显示对方的视频画面
      $peace.WebRTC.on('remoteTrack', this.remoteTrack)
      $peace.WebRTC.on('leaveChannel', this.leaveChannel)
    }
  },

  methods: {
    邀请医生() {
      this.dialog.visible = true
    },

    sendVideo() {
      // step 1. 创建群视频房间
      this.createVideoRoom().then(() => {
        // step 2. 加入群视频房间
        this.joinVideoRoom().then(() => {
          window.alert('需要发送开始了')

          // 开始视频
          const params = {
            consultNo: this.chat.team.custom.consultation.consultNo,
            action: 'start'
          }

          this.$http.post('client/v1/video/processConsult', params)
        })
      })
    },

    sendRemark() {
      const params = {
        consultNo: this.chat.team.custom.consultation.consultNo,
        consultSuggest: '建议测试'
      }

      this.$http.post('client/v1/consult/submitSuggest', params)
    },

    createVideoRoom() {
      return $peace.WebRTC.createChannel({
        //必填, 房间名
        channelName: 'channel-' + this.chat.team.id.replace('team-', ''),
        //可选
        custom: 'channel-' + this.chat.team.id.replace('team-', ''),
        // 是否支持WebRTC方式接入，可选，默认为不开启
        webrtcEnable: true
      })
        .then(obj => {
          console.log(obj)
        })
        .catch(obj => {
          console.log(obj)
        })
    },

    joinVideoRoom() {
      this.video.visible = true

      const sessionConfig = {
        videoQuality: WebRTC.CHAT_VIDEO_QUALITY_HIGH,
        videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_15,
        videoEncodeMode: WebRTC.CHAT_VIDEO_ENCODEMODE_NORMAL,
        videoBitrate: 0,
        recordVideo: false,
        recordAudio: false,
        highAudio: false,
        bypassRtmp: false,
        rtmpUrl: '',
        rtmpRecord: false,
        splitMode: WebRTC.LAYOUT_SPLITLATTICETILE
      }

      return $peace.WebRTC.joinChannel({
        channelName: 'channel-' + this.chat.team.id.replace('team-', ''), //必填
        type: WebRTC.NETCALL_TYPE_VIDEO,
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
              type: WebRTC.DEVICE_TYPE_AUDIO_IN
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
              type: WebRTC.DEVICE_TYPE_VIDEO,
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
      })
    },

    remoteTrack(obj) {
      console.log('other user join', obj)

      this.video.title = '这里显示通话时长 10:00'

      if (this.remoteList.findIndex(item => item.account === obj.account) === -1) {
        this.remoteList.push(obj)

        this.$nextTick(function() {
          console.log(document.getElementById('remoteContaier' + obj.account))

          // 播放对方声音
          $peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
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
    },

    leaveChannel(obj) {
      console.log('other user leave', obj)

      const index = this.remoteList.findIndex(item => item.account === obj.account)

      if (index !== -1) {
        this.remoteList.splice(index, 1)

        console.log(this.remoteList)
      }
    },

    leaveVideo() {
      $peace.WebRTC.leaveChannel().then(obj => {
        console.log('user leave', obj)

        console.log(this.remoteList)

        if (this.remoteList.length === 0) {
          // 开始视频
          const params = {
            consultNo: this.chat.team.custom.consultation.consultNo,
            action: 'over'
          }

          this.$http.post('client/v1/video/processConsult', params)
        }

        this.video.visible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tool {
  display: flex;
  justify-content: space-between;

  background: rgba(251, 251, 251, 1);
  height: 36px;
  align-items: center;
  margin: 0;
  padding: 0 5px;

  .shortcut {
    .el-button {
      min-width: 0;
      margin: 0 30px 0 0;
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

  /deep/ .el-upload-list__item {
    display: none;
  }
}
</style>
