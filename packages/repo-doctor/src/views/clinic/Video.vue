<template>
  <div class="video">
    <audio id="senderMusic"
           loop="loop">
      <source :src="require('@public/static/mp3/video_chat_tip_sender.mp3')"
              type="audio/mp3">
    </audio>
    <audio id="receiverMusic"
           loop="loop">
      <source :src="require('@public/static/mp3/video_chat_tip_receiver.mp3')"
              type="audio/mp3">
    </audio>

    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :show-close="false"
                 :title="video.title"
                 :visible.sync="video.visible"
                 :modal="false"
                 center
                 custom-class="video-dialog"
                 v-drag
                 width="800px">
      <div class="video-container">
        <div id="localContainer"></div>
        <div id="remoteContainer"></div>
      </div>
      <div class="video-control">
        <el-button @click="hangUp"
                   circle
                   class="hang_up"></el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import WebRTC from '/public/static/IM/NIM_Web_WebRTC_v7.0.0'

export default {
  data() {
    return {
      /** 挂断方 */
      hangUpBy: undefined,
      /** 是否主叫 */
      isCalling: undefined,
      /** 是否静音 */
      isMute: false,
      /** 是否正忙 */
      busy: false,
      /** 是否正在被呼叫中 */
      beCalling: false,
      /** 当前呼叫状态操作者 */
      sponsor: '',
      /** 当前呼叫状态 */
      beCallState: '',
      /** 当前呼叫时长 */
      beCalledTime: '',
      /** 当前呼叫信息 */
      beCalledInfo: undefined,

      video: {
        visible: false,
        title: ''
      },

      pushConfig: {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: '',
        pushPayload: '',
        sound: '',
        forceKeepCalling: 0
      },

      sessionConfig: {
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
    }
  },

  created() {
    Peace.videoComponent = this

    this.initWebRTCEventListener()
  },

  watch: {
    beCallState() {
      window.clearInterval(this.beCalledTimeInterval)

      // 发起视频邀请
      if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.邀请) {
        this.video.title = '正在为您呼叫，请稍后......'
        this.video.visible = true

        this.startRtc()
        this.playSenderAudio()
      }
      // 收到视频邀请
      else if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.收到) {
        this.video.title = ''
        this.video.visible = false

        this.setHangupTimeout()
        this.showMeesageNotify()
        this.playReceiverAudio()
      }
      // 同意视频邀请
      else if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.接听) {
        if (this.beCalledTime) {
          this.beCalledTimeInterval = setInterval(() => {
            this.video.title = Peace.util.formatDuration(this.beCalledTime, new Date())
          }, 500)
        }

        this.video.visible = true
        this.pauseAudio()
      }
      // 拒绝视频邀请
      else if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.拒绝) {
        this.video.title = ''
        this.video.visible = false

        // 问诊
        if (this.custom.type === 'inquiry') {
          this.processHangup()
        }
        // 会诊
        else if (this.custom.type === 'consult') {
          this.processConsultHangup()
        }

        this.hangupVideo()
      }
      // 挂断视频
      else if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.挂断) {
        this.video.title = ''
        this.video.visible = false

        this.processExit()
        this.hangupVideo()
      }
      // 呼叫超时
      else if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.超时) {
        this.video.title = ''
        this.video.visible = false

        // 问诊
        if (this.custom.type === 'inquiry') {
          this.processHangup()
        }
        // 会诊
        else if (this.custom.type === 'consult') {
          this.processConsultHangup()
        }

        this.hangupVideo()
      }
    }
  },

  methods: {
    /**
     * Web RTC Event
     */
    initWebRTCEventListener() {
      if (Peace.WebRTC && Peace.WebRTC.hadAddEventListener) {
        return
      }

      Peace.WebRTC.on('beCalling', this.onBeCalling)
      Peace.WebRTC.on('callAccepted', this.onCallAccepted)
      Peace.WebRTC.on('callRejected', this.onCallRejected)
      Peace.WebRTC.on('remoteTrack', this.onRemoteTrack)
      Peace.WebRTC.on('control', this.onControl)
      Peace.WebRTC.on('hangup', this.onHangup)
      Peace.WebRTC.on('callerAckSync', this.onCallerAckSync)
      Peace.WebRTC.on('error', this.onError)

      console.log('监听监听!!!!!!!!!!!!!!!!!!!!!!!')
      Peace.WebRTC.hadAddEventListener = true
    },

    playSenderAudio() {
      var audio = this.$el.querySelector('#senderMusic')

      audio.play()
    },

    playReceiverAudio() {
      var audio = this.$el.querySelector('#receiverMusic')

      audio.play()
    },

    pauseAudio() {
      var senderAudio = this.$el.querySelector('#senderMusic')
      var receiverAudio = this.$el.querySelector('#receiverMusic')

      senderAudio.pause()
      senderAudio.currentTime = 0
      receiverAudio.pause()
      receiverAudio.currentTime = 0
    },

    /**
     * 主叫发起通话请求
     *
     * type: inquiry
     * type: consult
     */
    call(session, type) {
      if (this.beCallState !== '') {
        return Peace.util.success('当前正在通话中')
      }

      // 当前为主叫
      this.isCalling = true

      this.custom = { type, session }

      let toAccount = ''

      if (type === 'inquiry') {
        toAccount = session.content.patientInfo.familyId
      }

      if (type === 'consult') {
        toAccount =
          session.content.consultInfo.receiveDoctor[0].doctorId === this.$store.state.user.userInfo.list.docInfo.doctor_id
            ? session.content.consultInfo.startDoctor[0].doctorId
            : session.content.consultInfo.receiveDoctor[0].doctorId
      }

      this.pushConfig.custom = JSON.stringify({
        id: this.$store.state.user.userInfo.list.docInfo.doctor_id,
        name: this.$store.state.user.userInfo.list.docInfo.name,
        idcard: this.$store.state.user.userInfo.list.docInfo.id_card,
        phone: this.$store.state.user.userInfo.list.docInfo.tel,
        type: type,
        session: session
      })

      Peace.WebRTC.call({
        type: WebRTC.NETCALL_TYPE_VIDEO,
        account: toAccount,
        pushConfig: this.pushConfig,
        sessionConfig: this.sessionConfig,
        webrtcEnable: true
      })
        .then((callObject) => {
          // 设置 超时 30s，主叫挂断
          this.setHangupTimeout()

          // 发起呼叫成功
          console.warn('【 WebRTC 】【 call success】', new Date(), callObject)

          this.beCalledInfo = callObject
          this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.邀请
        })
        .catch((callObject) => {
          // 发起呼叫失败
          console.warn('【 WebRTC 】【 call error】', new Date(), callObject)

          // 被叫不在线
          if (callObject.code === 11000) {
            Peace.util.warning('对方已离线')
          }

          this.hangupVideo()
        })
    },

    /**
     * 被叫接受呼叫请求
     */
    accept() {
      Peace.WebRTC.response({
        accepted: true,
        beCalledInfo: this.beCalledInfo,
        sessionConfig: this.sessionConfig
      }).catch(function(callObject) {
        console.warn('【 WebRTC 】【 response - accepted 】', new Date(), callObject)
      })
    },

    /**
     * 拒绝呼叫请求
     */
    reject() {
      this.hangUpBy = 'Doctor'
      this.hangUpConsultBy = 'Own'
      this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.拒绝

      if (this.beCalledInfo) {
        // 通知主叫拒绝通话
        Peace.WebRTC.response({
          accepted: false,
          beCalledInfo: this.beCalledInfo
        })

        // 通知主叫正忙
        Peace.WebRTC.control({
          channelId: this.beCalledInfo.channelId,
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
        })
      }
    },

    /**
     * 中断视频
     */
    hangUp() {
      if (this.beCalledInfo === undefined) {
        this.hangUpBy = 'Doctor'
        this.hangUpConsultBy = 'Own'
        this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.拒绝
      } else {
        this.hangUpBy = 'Doctor'
        this.hangUpConsultBy = 'Own'
        this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.挂断
      }
    },

    /**
     * 被叫收到呼叫通知
     */
    onBeCalling(beCallingObject) {
      console.warn('【 WebRTC 】【 onBeCalling 】', new Date(), beCallingObject)

      // 当前为被叫
      this.isCalling = false

      this.custom = JSON.parse(beCallingObject.pushConfig.custom)
      const channelId = beCallingObject.channelId

      // 被叫回应主叫自己已经收到了通话请求
      Peace.WebRTC.control({
        channelId: channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
      })

      // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
      if (!Peace.WebRTC.calling && !this.beCalling) {
        this.beCalling = true
        this.beCalledInfo = beCallingObject
        this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.收到
      } else {
        if (Peace.WebRTC.calling) {
          this.busy = Peace.WebRTC.notCurrentChannelId(beCallingObject)
        } else if (this.beCalling) {
          this.busy = this.beCalledInfo.channelId !== channelId
        }

        if (this.busy) {
          this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.拒绝

          // 通知对方正忙
          Peace.WebRTC.control({
            channelId: channelId,
            command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
          })
          // 拒绝通话
          Peace.WebRTC.response({
            accepted: false,
            beCalledInfo: beCallingObject
          })
        }
      }
    },

    /**
     * 被叫同意，双方建立连接
     */
    onCallAccepted(callAcceptedObject) {
      console.warn('【 WebRTC 】【 onCallAccepted 】', new Date(), callAcceptedObject)

      // 取消呼叫倒计时
      this.clearHangupTimeout()

      // 记录视频开始时间
      this.beCalledTime = new Date()

      // 设定呼叫状态
      this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.接听
      this.beCalledInfo = callAcceptedObject

      // 养老端
      // 接听后，发起接口请求
      if (this.custom.type === 'inquiry' && !(this.custom.session && this.custom.session.id)) {
        this.processJoin()
      }

      this.startRtc()
    },

    /**
     * 主叫收到被叫拒绝请求
     */
    onCallRejected(callRejectedObject) {
      console.warn('【 WebRTC 】【 onCallRejected 】', new Date(), callRejectedObject)

      this.hangUpBy = 'Patient'
      this.hangUpConsultBy = 'Other'
      this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.拒绝
    },

    /**
     * 收到视频流
     */
    onRemoteTrack(remoteTrackObject) {
      console.warn('【 WebRTC 】【 onRemoteTrack 】', new Date(), remoteTrackObject)

      if (this.beCallState === Peace.type.VIDEO.BE_CALL_STATE.接听) {
        // 音频：播放对方的音频
        if (remoteTrackObject.track.kind === 'audio') {
          // 播放对方声音
          Peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
          }).catch((err) => {
            console.log('播放对方的声音失败')
            console.error(err)
          })
        }

        // 视频：展示对方的画面
        if (remoteTrackObject.track.kind === 'video') {
          // 预览加入的视频流
          Peace.WebRTC.startRemoteStream({
            account: remoteTrackObject.account,
            node: document.getElementById('remoteContainer')
          })

          // 设置对方预览画面大小
          Peace.WebRTC.setVideoViewRemoteSize({
            account: remoteTrackObject.account,
            width: 800,
            height: 600,
            cut: true
          })
        }
      }
    },

    /**
     * 收到信道通知
     */
    onControl(controlObject) {
      console.warn('【 WebRTC 】【 onControl 】', new Date(), controlObject)

      // 如果不是当前通话的指令, 直接丢掉
      if (Peace.WebRTC.notCurrentChannelId(controlObject)) {
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

          Peace.util.warning('对方正忙')

          this.hangupVideo()
          break
        case WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
          console.warn('【 WebRTC 】【 onControl 】【 对方摄像头不可用 】', new Date(), controlObject)
          break

        default:
          break
      }
    },

    /**
     * 收到挂断通知
     */
    onHangup(hangupObject) {
      console.warn('【 WebRTC 】【 onHangup 】', new Date(), hangupObject)

      // 判断需要挂断的通话是否是当前正在进行中的通话
      if (!this.beCalledInfo || this.beCalledInfo.channelId === hangupObject.channelId) {
        Peace.util.warning('通话已结束')

        this.hangupVideo()
      }
    },

    /**
     * 呼入的通话已经被该帐号其他端处理回调
     */
    onCallerAckSync(callerAckObject) {
      console.warn('【 WebRTC 】【 onCallerAckSync 】', new Date(), callerAckObject)

      if (this.beCalledInfo && callerAckObject.channelId === this.beCalledInfo.channelId) {
        Peace.util.warning('当前通话已经其它终端处理')

        this.closeMessageNofity()
        this.hangupVideo()
      }
    },

    /**
     * sdk内部出现错误或者服务器反馈一些通知（无法继续进行通话）时，会触发该回调通知事件，这时开发者可以根据需要调用方法获取信息
     */
    onError(errorObject) {
      console.warn('【 WebRTC 】【 onCallerAckSync 】', new Date(), errorObject)

      this.hangupVideo()
    },

    /**
     * 建立视频连接流
     */
    startRtc() {
      return Peace.WebRTC.startRtc()
        .then(() => {
          return Peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_IN
          })
            .then((startDevice) => {
              console.warn('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
            .catch((startDevice) => {
              console.error('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
        })
        .then(() => {
          // 设置采集音量
          Peace.WebRTC.setCaptureVolume(255)
          // 开启摄像头
          return Peace.WebRTC.startDevice({
            type: WebRTC.DEVICE_TYPE_VIDEO,
            width: 200,
            height: 125
          })
            .then((startDevice) => {
              console.warn('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
            .catch((startDevice) => {
              console.error('【 WebRTC 】【 startDevice 】', new Date(), startDevice)

              return startDevice
            })
        })
        .then(() => {
          //预览本地画面
          Peace.WebRTC.startLocalStream(document.getElementById('localContainer'))

          // 设置本地预览画面大小
          Peace.WebRTC.setVideoViewSize({
            width: 200,
            height: 125,
            cut: true
          })
        })
        .catch((startRtc) => {
          console.error('【 WebRTC 】【 startRtc 】', new Date(), startRtc)

          return startRtc
        })
    },

    showMeesageNotify() {
      const accept = () => {
        this.closeMessageNofity()
        this.processJoin()
        this.accept()
      }
      const reject = () => {
        this.closeMessageNofity()
        this.reject()
      }

      const messageContent = (
        <div>
          <div style="display: flex; align-items: center;">
            <div style="margin: 0 10px 0 0;">
              <el-avatar>{this.custom.name.substring(0, 1)}</el-avatar>
            </div>
            <div>
              <h4>{this.custom.name}</h4>
              <p>邀请您进行视频会诊</p>
            </div>
          </div>
          <hr />
          <div style="text-align: right;">
            <el-button onClick={reject}>拒绝</el-button>
            <el-button onClick={accept} type="primary">
              接听
            </el-button>
          </div>
        </div>
      )

      this.$NotifyContent = this.$notify({
        duration: 30000,
        customClass: 'video-class',
        dangerouslyUseHTMLString: true,
        message: messageContent,
        showClose: false,
        position: 'bottom-right'
      })
    },

    closeMessageNofity() {
      this.$NotifyContent && this.$NotifyContent.close()
    },

    hangupVideo() {
      console.log('挂断，挂断!!!!!!!!!!!!!!!!!!!!!!!')

      // 停止声音播放
      this.pauseAudio()

      // 清空定时器
      this.clearHangupTimeout()

      // 清空状态
      this.clearState()

      // 挂断视频流
      Peace.WebRTC.hangup()
    },

    setHangupTimeout() {
      this.hangupTimeout = setTimeout(() => {
        if (!Peace.WebRTC.callAccepted) {
          this.beCallState = Peace.type.VIDEO.BE_CALL_STATE.超时

          this.hangUpBy = 'System'
          this.hangUpConsultBy = 'System'
        }
      }, 1000 * 30)
    },

    clearHangupTimeout() {
      window.clearTimeout(this.hangupTimeout)
    },

    clearState() {
      this.hangUpBy = undefined
      this.hangUpConsultBy = undefined
      this.isCalling = undefined
      this.isMute = false

      this.beCalling = false
      this.busy = false
      this.beCallState = ''
      this.beCalledTime = ''
      this.beCalledInfo = undefined

      this.video.title = ''
      this.video.visible = false

      this.closeMessageNofity()
    },

    /** 视频正常开始 */
    processJoin() {
      // 问诊开始
      if (this.custom.type === 'inquiry') {
        const inquiryNo = this.custom.session.content.inquiryInfo.inquiryNo

        const params = {
          inquiryNo: inquiryNo,
          action: 'start'
        }
        Peace.service.video.process(params)
      }

      // 会诊开始
      else if (this.custom.type === 'consult') {
        const consultNo = this.custom.session.content.consultInfo.consultNo

        const params = {
          consultNo: consultNo,
          action: 'start'
        }

        Peace.service.video.processConsult(params).then((res) => {
          if (res.code !== 200) {
            this.hangupVideo()
          }
        })
      }
    },

    /** 视频正常结束 */
    processExit() {
      // 问诊结束
      if (this.custom.type === 'inquiry') {
        const inquiryNo = this.custom.session.content.inquiryInfo.inquiryNo

        const params = {
          inquiryNo: inquiryNo,
          action: 'over'
        }

        Peace.service.video.process(params)
      }

      // 会诊结束
      else if (this.custom.type === 'consult') {
        const consultNo = this.custom.session.content.consultInfo.consultNo

        const params = {
          consultNo: consultNo,
          action: 'over'
        }

        return Peace.service.video.processConsult(params)
      }
    },

    /**
     * 问诊
     * 视频未接通
     *
     * state 1，未接通前 => 医生主叫 && 医生拒绝 => 【医生端调用】
     * state 2，未接通前 => 患者主叫 && 医生拒绝 => 【医生端调用】
     * state 3，未接通前 => 医生主叫 && 系统超时 => 【医生端调用】
     * state 4，未接通前 => 医生主叫 && 患者拒绝 => 【患者端调用】 No Code
     * state 5，未接通前 => 患者主叫 && 患者拒绝 => 【患者端调用】 No Code
     * state 6，未接通前 => 患者主叫 && 系统超时 => 【患者端调用】 No Code
     */
    processHangup() {
      const params = {}
      params.inquiryNo = this.custom.session.content.inquiryInfo.inquiryNo

      // state 1
      if (this.isCalling === true && this.hangUpBy === 'Doctor') {
        params.action = 'doctorHangup'
        params.sponsor = 'doctor'
      }
      // state 2
      else if (this.isCalling === false && this.hangUpBy === 'Doctor') {
        params.action = 'doctorHangup'
        params.sponsor = 'patient'
      }
      // state 3
      else if (this.isCalling === true && this.hangUpBy === 'System') {
        params.action = 'systemHangup'
        params.sponsor = 'doctor'
      }

      if (params.action && params.sponsor) {
        return Peace.service.video.process(params)
      }
    },

    /**
     * 会诊
     * 视频未接通
     *
     * state 1，未接通前 => 会诊医生主叫 && 会诊医生拒绝 => 【会诊医生调用】
     * state 2，未接通前 => 会诊医生主叫 && 被会诊医生拒绝 => 【被会诊医生调用】
     * state 3，未接通前 => 被会诊医生主叫 && 会诊医生拒绝 => 【会诊医生调用】
     * state 4，未接通前 => 被会诊医生主叫 && 被会诊医生拒绝 => 【被会诊医生调用】
     * state 5，未接通前 => 会诊医生主叫 && 系统超时拒绝 => 【会诊医生调用】
     * state 6，未接通前 => 被会诊医生主叫 && 系统超时拒绝 => 【被会诊医生调用】
     */
    processConsultHangup() {
      const params = {}
      params.consultNo = this.custom.session.content.consultInfo.consultNo
      params.action = 'hangup'

      // 会诊医生调用情况
      if (this.getHangupConsultRole() === 'from') {
        // state 1
        if (this.isCalling === true && this.hangUpConsultBy === 'Own') {
          params.sonAction = 'fromHangup'
          params.role = 'from'
        }
        // state 3
        else if (this.isCalling === false && this.hangUpConsultBy === 'Own') {
          params.sonAction = 'fromHangup'
          params.role = 'to'
        }
        // state 5
        else if (this.isCalling === true && this.hangUpConsultBy === 'System') {
          params.sonAction = 'systemHangup'
          params.role = 'from'
        }
      }
      // 被会诊医生调用情况
      else if (this.getHangupConsultRole() === 'to') {
        // state 2
        if (this.isCalling === false && this.hangUpConsultBy === 'Own') {
          params.sonAction = 'toHangup'
          params.role = 'from'
        }
        // state 4
        else if (this.isCalling === true && this.hangUpConsultBy === 'Own') {
          params.sonAction = 'toHangup'
          params.role = 'to'
        }
        // state 6
        else if (this.isCalling === true && this.hangUpConsultBy === 'System') {
          params.sonAction = 'systemHangup'
          params.role = 'to'
        }
      }

      if (params.sonAction && params.role) {
        return Peace.service.video.processConsult(params)
      }
    },

    getHangupConsultRole() {
      const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id
      const startDoctorList = this.custom.session.content.consultInfo.startDoctor
      const receiveDoctorList = this.custom.session.content.consultInfo.receiveDoctor

      if (startDoctorList.find((item) => item.doctorId === doctorId)) {
        return 'from'
      }

      if (receiveDoctorList.find((item) => item.doctorId === doctorId)) {
        return 'to'
      }

      return new Error('当前医生未找到角色')
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  ::v-deep .el-dialog__wrapper {
    position: unset !important;

    .el-dialog {
      position: fixed;
      z-index: 2222;
    }
  }

  .video-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .video-control {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    .el-button {
      width: 40px;
      height: 40px;
      background-size: 40px auto;
      background-repeat: no-repeat;
      background-position: center;
      background-color: transparent;
      border: 0;
      display: inline-flex;
      justify-content: center;
      margin: 0 10px;

      &.hang_up {
        background-image: url('~@/assets/images/inquiry/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('~@/assets/images/inquiry/btn_answer@2x.png');
      }
    }
  }

  #localContainer {
    position: absolute;
    top: 60px;
    right: 10px;
    width: 200px;
    height: 125px;
    z-index: 1;
  }

  #remoteContainer {
    width: 800px;
    height: 600px;
  }
}
</style>

<style lang="scss">
.video-dialog {
  .el-dialog__header {
    position: absolute;
    z-index: 1;
    width: 100%;
    background: linear-gradient(180deg, #33333350 0%, #00000000 100%);

    .el-dialog__title {
      width: 100%;
      color: #ffffff;
      text-align: center;
    }
  }
  .el-dialog__body {
    padding: 0;
    background: #000;
  }
}

.video-class {
  .el-notification__group {
    width: 100%;
  }
}
</style>
