<template>
  <div class="inquiry-video" v-if="$store.state.inquiry.session && $store.state.inquiry.session.id">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="inquriy.title"
      :visible.sync="inquriy.visible"
      center
      custom-class="inquriy-video-dialog"
      v-drag
      width="1020px"
    >
      <div class="videoContaier" id="localContainer">
        <div style="position: absolute; text-align: center;">
          <p style="font-size: 14px;">{{ $store.state.user.userInfo.list.docInfo.name }}</p>
          <p style="font-size: 14px;">等待加入中</p>
          <i class="el-icon-loading" style="font-size: 20px; text-align: center;"></i>
        </div>
      </div>
      <div class="videoContaier" id="remoteContainer">
        <div style="position: absolute; text-align: center;">
          <p style="font-size: 14px;">{{ $store.state.inquiry.session.content.patientInfo.familyName }}</p>
          <p style="font-size: 14px;">等待加入中</p>
          <i class="el-icon-loading" style="font-size: 20px; text-align: center;"></i>
        </div>
      </div>

      <div class="dialog-footer" slot="footer" style="height: 40px;">
        <template v-if="beCallState === $peace.type.INQUIRY.BE_CALL_STATE.邀请">
          <el-button @click="hangupVideo(true)" circle class="hang_up">
            <span class="video-bottom-text">挂断</span>
          </el-button>
        </template>

        <template v-if="beCallState === $peace.type.INQUIRY.BE_CALL_STATE.收到">
          <el-button @click="hangupVideo(true)" circle class="hang_up">
            <span class="video-bottom-text">挂断</span>
          </el-button>
          <el-button @click="acceptVideo" circle class="answer">
            <span class="video-bottom-text">接听</span>
          </el-button>
        </template>

        <template v-if="beCallState === $peace.type.INQUIRY.BE_CALL_STATE.接听">
          <el-button @click="hangupVideo(true)" circle class="hang_up">
            <span class="video-bottom-text">挂断</span>
          </el-button>
          <el-button @click="muteVideo" circle class="mute" v-if="!isMute">
            <span class="video-bottom-text">静音</span>
          </el-button>
          <el-button @click="unMuteVideo" circle class="mute-not" v-if="isMute">
            <span class="video-bottom-text">取消静音</span>
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import WebRTC from '/public/static/IM/NIM_Web_WebRTC_v6.5.5'

const sessionConfig = {
  videoQuality: WebRTC.CHAT_VIDEO_QUALITY_HIGH,
  videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_15,
  videoBitrate: 0,
  recordVideo: false,
  recordAudio: false,
  highAudio: false,
  bypassRtmp: false,
  rtmpUrl: '',
  rtmpRecord: false,
  splitMode: WebRTC.LAYOUT_SPLITLATTICETILE
}

export default {
  data() {
    return {
      isMute: false,

      beCallState: '',
      beCalling: false,
      beCalledInfo: {},
      beCalledTime: '',
      busy: false,

      hangupTimeout: 0,

      inquriy: {
        visible: false,
        title: ''
      }
    }
  },

  watch: {
    beCallState() {
      if (
        this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.邀请 ||
        this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.收到 ||
        this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.接听
      ) {
        this.inquriy.visible = true

        if (this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.邀请) {
          this.inquriy.title = '视频邀请中······'
        }
      } else {
        this.inquriy.visible = false
      }
    },

    beCalledTime() {
      window.clearInterval(this.beCalledTimeInterval)

      if (this.beCalledTime) {
        this.beCalledTimeInterval = setInterval(() => {
          this.inquriy.title = peace.util.formatDuration(this.beCalledTime, new Date())
        }, 500)
      }
    }
  },

  created() {
    $peace.inquiryVideoComponent = this

    this.initWebRTC()
  },

  methods: {
    initWebRTC() {
      // peace.service.IM.initWebRTC()

      // WebRTC 初始化完成后
      // 监听对方加入通话
      // 监听对方离开通话
      const interval = setInterval(() => {
        if ($peace.WebRTC) {
          this.loadingFullPage && this.loadingFullPage.close()

          $peace.WebRTC.on('beCalling', this.onBeCalling)
          $peace.WebRTC.on('callRejected', this.onCallRejected)
          $peace.WebRTC.on('callAccepted', this.onCallAccepted)
          $peace.WebRTC.on('remoteTrack', this.onRemoteTrack)
          $peace.WebRTC.on('control', this.onControl)
          $peace.WebRTC.on('hangup', this.onHangup)
          $peace.WebRTC.on('callerAckSync', this.onCallerAckSync)

          window.clearInterval(interval)
        } else {
          this.loadingFullPage = $peace.$loading({
            lock: true,
            text: '正在初始化通讯插件，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.05)'
          })
        }
      }, 100)
    },

    onBeCalling(beCallingObject) {
      console.warn('【 WebRTC 】【 onBeCalling 】', new Date(), beCallingObject)

      const channelId = beCallingObject.channelId
      $peace.WebRTC.control({
        channelId: channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
      })

      // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
      if (!$peace.WebRTC.calling && !this.beCalling) {
        this.beCalling = true
        this.beCalledInfo = beCallingObject
        this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.收到

        $peace.$store.commit('chat/setBeCall', '收到')
      } else {
        if ($peace.WebRTC.calling) {
          this.busy = $peace.WebRTC.notCurrentChannelId(beCallingObject)
        } else if (this.beCalling) {
          this.busy = this.beCalledInfo.channelId !== channelId
        }

        if (this.busy) {
          // 通知对方正忙
          $peace.WebRTC.control({
            channelId: channelId,
            command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
          })
          // 拒绝通话
          $peace.WebRTC.response({
            accepted: false,
            beCalledInfo: beCallingObject
          })

          this.hangupVideo()
        }
      }
    },

    onCallRejected(callRejectedObject) {
      console.warn('【 WebRTC 】【 onCallRejected 】', new Date(), callRejectedObject)

      $peace.util.warning('对方已拒绝')

      this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.拒绝
      this.hangupVideo()
    },

    onCallAccepted(callAcceptedObject) {
      console.warn('【 WebRTC 】【 onCallAccepted 】', new Date(), callAcceptedObject)

      const params = {
        inquiryNo: this.$store.state.inquiry.session.content.inquiryInfo.inquiryNo,
        action: 'start'
      }
      peace.service.video.process(params)

      // 记录接听时间
      this.beCalledTime = new Date()

      // 取消呼叫倒计时
      this.clearHangupTimeout()

      // 设定呼叫状态
      this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.接听
      this.beCallingInfo = callAcceptedObject

      // 开启视频流
      this.startRtc()
    },

    onRemoteTrack(remoteTrackObject) {
      console.warn('【 WebRTC 】【 onRemoteTrack 】', new Date(), remoteTrackObject)

      // 区分 remoteTrack 是问诊还是会诊
      if (this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.接听) {
        // 音频：播放对方的音频
        if (remoteTrackObject.track.kind === 'audio') {
          // 播放对方声音
          $peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
          }).catch(err => {
            console.log('播放对方的声音失败')
            console.error(err)
          })
        }

        // 视频：展示对方的画面
        if (remoteTrackObject.track.kind === 'video') {
          // 预览加入的视频流
          $peace.WebRTC.startRemoteStream({
            account: remoteTrackObject.account,
            node: document.getElementById('remoteContainer')
          })

          // 设置对方预览画面大小
          $peace.WebRTC.setVideoViewRemoteSize({
            account: remoteTrackObject.account,
            width: 500,
            height: 500,
            cut: true
          })
        }
      }
    },

    onControl(controlObject) {
      console.warn('【 WebRTC 】【 onControl 】', new Date(), controlObject)

      // 如果不是当前通话的指令, 直接丢掉
      if ($peace.WebRTC.notCurrentChannelId(controlObject)) {
        return
      }

      switch (controlObject.type) {
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
          console.warn('【 WebRTC 】【 onControl 】【 对方打开了麦克风 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
          console.warn('【 WebRTC 】【 onControl 】【 对方关闭了麦克风 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
          console.warn('【 WebRTC 】【 onControl 】【 对方打开了摄像头 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
          console.warn('【 WebRTC 】【 onControl 】【 对方关闭了摄像头 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
          console.warn('【 WebRTC 】【 onControl 】【 对方拒绝从音频切换到视频通话 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
          console.warn('【 WebRTC 】【 onControl 】【 对方请求从音频切换到视频通话 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
          console.warn('【 WebRTC 】【 onControl 】【 对方同意从音频切换到视频通话 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
          console.warn('【 WebRTC 】【 onControl 】【 对方请求从视频切换为音频 】', new Date(), controlObject)
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_BUSY:
          console.warn('【 WebRTC 】【 onControl 】【 对方占线 】', new Date(), controlObject)

          $peace.util.warning('对方占线')

          this.hangupVideo()
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
          console.warn('【 WebRTC 】【 onControl 】【 对方摄像头不可用 】', new Date(), controlObject)
          break

        default:
          break
      }
    },

    onHangup(hangupObject) {
      console.warn('【 WebRTC 】【 onHangup 】', new Date(), hangupObject)

      // 判断需要挂断的通话是否是当前正在进行中的通话
      if (!this.beCalledInfo || this.beCalledInfo.channelId === hangupObject.channelId) {
        $peace.util.warning('对方已挂断')

        // 接听情况下，才需要记录通话时间
        if (this.beCallState === peace.type.INQUIRY.BE_CALL_STATE.接听) {
          this.hangupVideo(true)
        } else {
          this.hangupVideo()
        }
      }
    },

    onCallerAckSync(callerAckObject) {
      console.warn('【 WebRTC 】【 onCallerAckSync 】', new Date(), callerAckObject)

      if (this.beCalledInfo && callerAckObject.channelId === this.beCalledInfo.channelId) {
        // 清空状态
        this.clearState()

        $peace.util.warning('当前通话已经其它端处理')
      }
    },

    startRtc() {
      return $peace.WebRTC.startRtc()
        .then(() => {
          return $peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_IN
          })
            .then(startDevice => {
              console.warn('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
            .catch(startDevice => {
              console.error('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
        })
        .then(() => {
          // 设置采集音量
          $peace.WebRTC.setCaptureVolume(255)
          // 开启摄像头
          return $peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_VIDEO,
            width: 500,
            height: 500
          })
            .then(startDevice => {
              console.warn('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
            .catch(startDevice => {
              console.error('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
        })
        .then(() => {
          //预览本地画面
          $peace.WebRTC.startLocalStream(document.getElementById('localContainer'))

          // 设置本地预览画面大小
          $peace.WebRTC.setVideoViewSize({
            width: 500,
            height: 500,
            cut: true
          })
        })
        .catch(startRtc => {
          console.error('【 WebRTC 】【 startRtc 】', new Date(), startRtc)

          return startRtc
        })
    },

    sendVideo(session) {
      const custom = JSON.stringify({
        name: this.$store.state.user.userInfo.list.docInfo.name,
        idcard: '',
        phone: '',
        id: ''
      })

      const pushConfig = {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: custom,
        pushPayload: '',
        sound: '',
        forceKeepCalling: 0
      }

      // 设置 超时 30s，主叫挂断
      this.setHangupTimeout()

      $peace.WebRTC.call({
        type: WebRTC.NETCALL_TYPE_VIDEO,
        account: session.content.patientInfo.patientId,
        pushConfig: pushConfig,
        sessionConfig: sessionConfig,
        webrtcEnable: true
      })
        .then(callObject => {
          console.warn('【 WebRTC 】【 call 】', new Date(), callObject)

          this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.邀请
          this.beCalledInfo = callObject
        })
        .catch(callObject => {
          // 被叫不在线
          if (callObject.code === 11000) {
            $peace.util.warning('对方离线，通话不可达')
          }

          this.hangupVideo()
        })
    },

    acceptVideo() {
      this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.接听

      $peace.WebRTC.response({
        accepted: true,
        beCalledInfo: this.beCalledInfo,
        sessionConfig: this.sessionConfig
      }).catch(function(callObject) {
        console.warn('【 WebRTC 】【 response - accepted 】', new Date(), callObject)
      })
    },

    rejectVideo() {
      this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.拒绝

      // 存在通话消息, 通知对方
      if (this.beCalledInfo) {
        // 通知主叫正忙
        $peace.WebRTC.control({
          channelId: this.beCalledInfo.channelId,
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
        })
        // 通知主叫拒绝通话
        $peace.WebRTC.response({
          accepted: false,
          beCalledInfo: this.beCalledInfo
        })
      }

      // 挂断
      this.hangupVideo()
    },

    muteVideo() {
      $peace.WebRTC.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_IN).then(() => {
        this.isMute = true

        // 通知对方自己关闭了麦克风
        $peace.WebRTC.control({
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
        })
      })
    },

    unMuteVideo() {
      $peace.WebRTC.startDevice({
        type: WebRTC.DEVICE_TYPE_AUDIO_IN
      }).then(() => {
        this.isMute = false

        // 通知对方开启了麦克风
        $peace.WebRTC.control({
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
        })

        $peace.WebRTC.setCaptureVolume(255)
      })
    },

    hangupVideo(needRecord = false) {
      this.beCallState = peace.type.INQUIRY.BE_CALL_STATE.挂断

      // 清空定时器
      this.clearHangupTimeout()

      // 清空状态
      this.clearState()

      // 挂断视频流
      $peace.WebRTC.hangup()

      // 记录视频时长, 并推送消息
      if (needRecord) {
        const params = {
          inquiryNo: this.$store.state.inquiry.session.content.inquiryInfo.inquiryNo,
          action: 'over'
        }

        peace.service.video.process(params)
      }
    },

    setHangupTimeout() {
      this.hangupTimeout = setTimeout(() => {
        if (!$peace.WebRTC.callAccepted) {
          $peace.util.warning('呼叫超时')

          this.hangupVideo()
        }
      }, 1000 * 30)
    },

    clearHangupTimeout() {
      window.clearTimeout(this.hangupTimeout)
    },

    clearState() {
      this.isMute = false

      this.beCalling = false
      this.beCalledInfo = {}
      this.busy = false

      this.beCalledTime = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry-video {
  /deep/ .inquriy-video-dialog {
    .el-dialog__header {
      background: linear-gradient(#1a1b1d, #2b2d2f);
      text-align: center;

      justify-content: center;

      .el-dialog__title {
        color: #b9b9b9;
      }
    }

    .el-dialog__body,
    .el-dialog__footer {
      background: #2b2d2f;
    }

    .el-dialog__body {
      display: flex;
      justify-content: space-between;
    }

    .videoContaier {
      width: 500px;
      height: 500px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;
      background: #000;
    }

    .el-button {
      width: 30px;
      height: 30px;
      background-size: 30px auto;
      background-repeat: no-repeat;
      background-position: center;
      background-color: transparent;
      border: 0;
      display: inline-flex;
      justify-content: center;

      &.hang_up {
        background-image: url('~@/assets/images/inquiry/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('~@/assets/images/inquiry/btn_answer@2x.png');
      }
      &.mute {
        background-image: url('~@/assets/images/inquiry/btn_mute_click@2x.png');
      }
      &.mute-not {
        background-image: url('~@/assets/images/inquiry/btn_mute_not clickable@2x.png');
      }

      & + .el-button {
        margin-left: 95px;
      }

      .el-button {
        /deep/ i {
          font-size: 28px;
        }
      }

      .video-bottom-text {
        line-height: 1;
        font-size: 12px;
        position: relative;
        top: 25px;
        color: #efefef;
      }
    }
  }
}
</style>
