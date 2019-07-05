<template>
  <div class="consultation-video">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="consultation.title"
      :visible.sync="consultation.visible"
      center
      custom-class="consultation-video-dialog"
      v-drag
      width="520px"
    >
      <!-- 视频 -->
      <div :id="'remoteContainer' + item.account" :key="item.account" class="videoContaier" v-for="item in consultation.remoteUserList">
        <div style="position: absolute; text-align: center;">
          <p style="font-size: 14px;">{{ item.doctorName }}</p>
          <p style="font-size: 14px;">等待加入中</p>
          <i class="el-icon-loading" style="font-size: 20px; text-align: center;"></i>
        </div>
      </div>

      <div class="dialog-footer" slot="footer">
        <el-button @click="leaveChannel" circle class="hang_up">
          <span class="video-bottom-text">挂断</span>
        </el-button>
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

export default {
  data() {
    return {
      currentSession: {},

      notifyList: [],

      consultation: {
        visible: false,
        title: '',

        remoteUserList: [],
        remoteUserJoinedList: [],

        consultation: undefined
      }
    }
  },

  watch: {
    // 监听 sessions 变化
    // 当存在新的视频时，提示相关人
    '$store.state.consultation.sessions': {
      handler(sessions) {
        sessions.forEach(session => {
          if (session.content.consultInfo.channel) {
            this.currentSession = session

            // 将参与视频的所有人保存起来, 生成 html, 用于挂载视频流
            const remoteUserList = session.content.consultInfo.startDoctor
              .concat(session.content.consultInfo.receiveDoctor)
              .concat(session.content.consultInfo.cooperationDoctors)

            remoteUserList.forEach(item => {
              item.account = item.doctorId
            })

            this.consultation.remoteUserList = remoteUserList

            // 提示相关人
            if (!this.notifyList.includes(session.content.consultInfo.channel)) {
              this.notifyList.push(session.content.consultInfo.channel)

              this.showNotify(session)
            }
          }
        })
      },
      immediate: true
    },

    'consultation.visible': {
      handler() {
        this.consultation.title = '正在进行视频会议'
        let interval = undefined

        if (this.consultation.visible) {
          setInterval(() => {
            if (this.currentSession.content.consultInfo.channelTime) {
              // 避免服务器与本地时间不一致，导致时间格式化为 "0-1:59:59"
              this.consultation.title = peace.util.formatDuration(new Date(this.currentSession.content.consultInfo.channelTime), new Date())
            }
          }, 1000)
        } else {
          window.clearInterval(interval)
        }
      },
      immediate: true
    }
  },

  created() {
    $peace.consultationVideoComponent = this

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

          $peace.WebRTC.on('remoteTrack', this.onRemoteTrack)
          $peace.WebRTC.on('leaveChannel', this.onLeaveChannel)

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

    // 监听到用户离开频道
    onLeaveChannel(leaveChannelObject) {
      console.warn('【 WebRTC 】【 onLeaveChannel 】', new Date(), leaveChannelObject)

      $peace.WebRTC.stopRemoteStream(leaveChannelObject.account)

      // 当远端用户离开频道， 更新频道人数列表
      const index = this.consultation.remoteUserJoinedList.findIndex(item => item.account === leaveChannelObject.account)
      if (index !== -1) {
        this.consultation.remoteUserJoinedList.splice(index, 1)
      }

      const leaveUser = this.consultation.remoteUserList.find(item => item.account === leaveChannelObject.account)
      if (leaveUser && leaveUser.account !== this.$store.state.user.userInfo.list.docInfo.doctor_id) {
        peace.util.alert(`${leaveUser.doctorName}已退出本次会诊`)
      }
    },

    // 收到远程轨道信息
    onRemoteTrack(remoteTrackObject) {
      console.warn('【 WebRTC 】【 onRemoteTrack 】', new Date(), remoteTrackObject)

      // 区分 remoteTrack 是问诊还是会诊
      if (!($peace.inquiryVideoComponent && $peace.inquiryVideoComponent.beCallState === peace.type.INQUIRY.BE_CALL_STATE.接听)) {
        // 当远端用户进入频道， 更新频道人数列表
        if (this.consultation.remoteUserJoinedList.findIndex(item => item.account === remoteTrackObject.account) === -1) {
          this.consultation.remoteUserJoinedList.push(remoteTrackObject)
        }

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
          const joinUser = this.consultation.remoteUserList.find(item => item.account === remoteTrackObject.account)
          if (joinUser) {
            // Firefox 兼容性问题, 再未找到合适方法之前, 暂时关闭
            // peace.util.alert(`${joinUser.doctorName}进入频道`)
          }

          // 预览加入的视频流
          $peace.WebRTC.startRemoteStream({
            account: remoteTrackObject.account,
            node: document.getElementById('remoteContainer' + remoteTrackObject.account)
          })

          // 设置对方预览画面大小
          $peace.WebRTC.setVideoViewRemoteSize({
            account: remoteTrackObject.account,
            width: 250,
            height: 250,
            cut: true
          })
        }
      }
    },

    sendVideo(session) {
      this.closeNotify()

      session = session || this.currentSession

      const channelName = session.content.consultInfo.channel || session.id + '-' + new Date().getTime()
      const consultNo = session.content.consultInfo.consultNo

      const params = {
        consultNo: consultNo,
        channel: channelName,
        action: 'join'
      }

      // 发送通知
      // scene 1, code: 801 发起方: 创建频道频道（同一个会诊推送多次，每次新的视频邀请都会触发通知）
      // 通知相关人，收到视频邀请
      // scene 2, code: 810 会诊中（同一个会诊推送一次）
      // 会诊正式开始， 更新会诊状态
      peace.service.video.processConsult(params).then(() => {
        // 优先创建频道, 即使频道已存在
        this.createChannel(channelName)
          .then(() => this.joinChannel(channelName))
          .then(() => this.startRtc())
          .catch(error => {
            if (error.code === 20110 || error.code === 20111 || error.code === 20112) {
              this.joinChannel(channelName).then(() => this.startRtc())
            }
          })
      })
    },

    createChannel(channelName) {
      return $peace.WebRTC.createChannel({
        channelName: channelName,
        custom: channelName,
        webrtcEnable: true
      })
        .then(createChannel => {
          console.warn('【 WebRTC 】【 createChannel 】', new Date(), createChannel)

          return createChannel
        })
        .catch(createChannel => {
          console.error('【 WebRTC 】【 startDevice 】', new Date(), createChannel)

          return createChannel
        })
    },

    joinChannel(channelName) {
      return $peace.WebRTC.joinChannel({
        type: WebRTC.NETCALL_TYPE_VIDEO,
        sessionConfig: sessionConfig,
        channelName: channelName
      })
        .then(joinChannel => {
          console.warn('【 WebRTC 】【 joinChannel 】', new Date(), joinChannel)

          return joinChannel
        })
        .then(joinChannel => {
          // 当本地用户进入频道， 更新频道人数列表
          if (this.consultation.remoteUserJoinedList.findIndex(item => item.account === joinChannel.account) === -1) {
            this.consultation.remoteUserJoinedList.push(joinChannel)
          }

          return joinChannel
        })
    },

    refuseChannel() {
      const consultNo = this.currentSession.content.consultInfo.consultNo

      const params = {
        consultNo: consultNo,
        action: 'refuse'
      }

      // 发送通知
      // code: 813 退出频道（单方退出）
      // 显示 xxx 已离开
      peace.service.video.processConsult(params)

      this.closeNotify()
    },

    leaveChannel() {
      $peace.WebRTC.leaveChannel().then(() => {
        this.consultation.visible = false

        // 当本地用户离开频道， 更新频道人数列表
        const index = this.consultation.remoteUserJoinedList.findIndex(item => item.account === this.$store.state.user.userInfo.list.docInfo.doctor_id)
        if (index !== -1) {
          this.consultation.remoteUserJoinedList.splice(index, 1)
        }

        // 验证当前频道是否还存在用户, 用以结束当次视频会诊
        if (this.consultation.remoteUserJoinedList.length === 0) {
          const consultNo = this.currentSession.content.consultInfo.consultNo

          const params = {
            consultNo: consultNo,
            action: 'over'
          }

          // 发送通知
          // code: 814 解散频道（全部退出）
          // 显示会诊时长
          peace.service.video.processConsult(params)
        }
      })
    },

    startRtc() {
      this.consultation.visible = true

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
            width: 250,
            height: 250
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
          $peace.WebRTC.startLocalStream(document.getElementById('remoteContainer' + this.$store.state.user.userInfo.list.docInfo.doctor_id))

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
        .catch(startRtc => {
          console.error('【 WebRTC 】【 startRtc 】', new Date(), startRtc)

          return startRtc
        })
    },

    showNotify(session) {
      this.closeNotify()

      if (session.content.consultInfo.channelFromId !== this.$store.state.user.userInfo.list.docInfo.doctor_id) {
        const messageBody = (
          <div>
            <el-button type="success" onclick={() => this.sendVideo(session)}>
              接受
            </el-button>
            <el-button type="danger" onclick={() => this.refuseChannel()}>
              忽略
            </el-button>
          </div>
        )

        this.channelMessage = this.$notify.success({
          title: '你收到一个视频会诊邀请，是否接入',
          message: messageBody,
          position: 'bottom-right',
          duration: 0,
          showClose: false
        })

        setTimeout(() => {
          this.closeNotify()
        }, 1000 * 30)
      }
    },

    closeNotify() {
      this.channelMessage && this.channelMessage.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-video {
  /deep/ .consultation-video-dialog {
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
      width: 250px;
      height: 250px;
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
