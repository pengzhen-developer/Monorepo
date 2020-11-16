// 视频通讯、音频通讯组件
// 请注意，保持单例模式
// 主流程线：
// 1，    【主叫】发起视频通话请求
// 2.1，  【被叫】收到呼叫请求通知
// 2.2，  【主叫】中断呼叫请求通知
// 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
********************************************************
// 3.1.1，【被叫】接受通话请求
// 3.1.2，【主叫，被叫】双方同意，准备建立通话连接
// 3.1.3, 【主叫，被叫】建立媒体网关，预览本地视频通讯
// 3.1.4，【主叫，被叫】监听远端媒体网关，预览远端视频通讯
--------------------------------------------------------
// 3.2.1，【被叫】拒绝通话请求，清理通讯信息
// 3.2.2，【主叫】收到被叫响应通知-拒绝，清理通讯信息
********************************************************
// 4，    【主叫，被叫】挂断通话请求，清理通讯信息
// 5，    【主叫，被叫】异常

<template>
  <div class="video">
    <slot name="default"></slot>

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

    <el-dialog custom-class="video-dialog"
               width="800px"
               top="auto"
               center
               v-drag
               v-bind:close-on-click-modal="false"
               v-bind:close-on-press-escape="false"
               v-bind:show-close="false"
               v-bind:modal="true"
               v-bind:title="title"
               v-bind:visible.sync="visible">
      <div class="video-container">
        <div id="local"></div>
        <div id="remote"></div>
      </div>

      <div class="video-control">
        <!-- 挂断 -->
        <el-button v-if="canShowHangupButton"
                   v-on:click="hangup"
                   circle
                   class="hang-up"
                   type="primary"></el-button>

        <el-button v-if="canShowRejectButton"
                   v-on:click="reject"
                   circle
                   class="hang-up"
                   type="primary"></el-button>
      </div>
      <!-- 
      <el-button v-if="canShowCallButton"
                 v-on:click="call('wwrihbgikw')"
                 type="primary">A发起</el-button>
      <el-button v-if="canShowCallButton"
                 v-on:click="call('unayuzpaar')"
                 type="primary">B发起</el-button>

      <el-button v-if="canShowAcceptButton"
                 v-on:click="accept"
                 type="primary">接听</el-button>
      -->
    </el-dialog>
  </div>
</template>

<script>
import WebRTC from '@public/static/IM/NIM_Web_WebRTC_v7.0.0'

export default {
  provide() {
    return {
      provideCall: this.call
    }
  },

  data() {
    return {
      /** 自定义数据 */
      custom: null,

      /** 模态框显示状态 */
      visible: false,

      /** 模态框标题 */
      title: 'title',

      /** 是否正忙 */
      busy: false,

      /** 呼叫者角色 主叫 / 被叫 */
      beCalledRole: null,

      /** 主叫呼叫超时定时器 */
      beCalledTimer: null,

      /** 通话信息 */
      beCalledInfo: null,

      /** 记录视频时长定时器 */
      beCalledLogTimer: null,

      /** 是否呼叫叫中 */
      beCalling: false,

      // 呼叫类型
      type: null,

      /** IM WebRTC 实例 */
      netcall: undefined,

      /** IM WebRTC 推送配置文件 */
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

      /** IM WebRTC 会话配置文件 */
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

  computed: {
    canShowRejectButton() {
      return this.beCalledRole === '主叫' && this.beCalling
    },

    canShowHangupButton() {
      return !this.beCalling && this.beCalledInfo
    }
  },

  created() {
    this.netcall = Peace.WebRTC
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.netcall.addEventListener) {
        return false
      }

      this.netcall.on('beCalling', this.onBeCalling)
      this.netcall.on('callAccepted', this.onCallAccepted)
      this.netcall.on('callRejected', this.onCallRejected)
      this.netcall.on('remoteTrack', this.onRemoteTrack)
      this.netcall.on('hangup', this.onHangup)

      this.netcall.addEventListener = true
    })
  },

  methods: {
    /**
     * 1，  【主叫】发起视频通话请求
     *
     * session : 会话
     * type: inquiry
     * type: consult
     */
    call(session, type) {
      if (this.beCalling || this.beCalledInfo) {
        return Peace.util.warning('存在正在进行中的视频通讯，请勿重复发起')
      }

      // 设定主叫 custom
      this.custom = { session, type }

      let toAccount = ''

      if (type === 'inquiry') {
        toAccount = session?.content?.patientInfo?.familyId
      } else if (type === 'consult') {
        // 当前登陆人是会诊发起者
        if (session?.content?.consultInfo?.receiveDoctor?.[0].doctorId === this.$store.state.user?.userInfo?.list?.docInfo?.doctor_id) {
          toAccount = session.content.consultInfo.startDoctor[0].doctorId
        }
        // 当前登陆人是会诊受邀者
        else if (session?.content?.consultInfo?.startDoctor?.[0].doctorId === this.$store.state.user?.userInfo?.list?.docInfo?.doctor_id) {
          toAccount = session.content.consultInfo.receiveDoctor[0].doctorId
        }
      }

      this.pushConfig.custom = JSON.stringify({
        id: this.$store.state.user?.userInfo?.list?.docInfo?.doctor_id,
        name: this.$store.state.user?.userInfo?.list?.docInfo?.name,
        idcard: this.$store.state.user?.userInfo?.list?.docInfo?.id_card,
        phone: this.$store.state.user?.userInfo?.list?.docInfo?.tel,
        type: type,
        session: session
      })

      this.netcall
        .call({
          type: WebRTC.NETCALL_TYPE_VIDEO,
          account: toAccount,
          pushConfig: this.pushConfig,
          sessionConfig: this.sessionConfig,
          webrtcEnable: true
        })
        .then((callObject) => {
          // 成功发起呼叫
          console.warn('【 WebRTC 】【 call - then 】', new Date(), callObject)

          this.title = '正在呼叫'
          this.beCalledRole = '主叫'
          this.beCalling = true

          this.playSenderAudio()
          this.openVideoView()

          this.startRtc()
        })
        .catch((callObject) => {
          console.warn('【 WebRTC 】【 call - catch - NETCALL_TYPE_VIDEO 】', new Date(), callObject)

          this.resetStatus()
          this.netcall.hangup()

          // 被叫不在线
          if (callObject?.code === 11000) {
            console.warn('【 WebRTC 】【 call - catch - offline 】', new Date(), callObject)

            Peace.util.warning('对方已离线')
          }
        })

      // 设置超时计时器
      // 超时计时器，在被叫操作后，应该停止
      this.beCalledTimer = setTimeout(() => {
        if (!this.netcall.callAccepted) {
          console.warn('【 WebRTC 】【 call - timeout 】', new Date())

          this.logExceptionVodeoTimeToServer('system')
          this.resetStatus()
          this.netcall.hangup()
        }
      }, 1000 * 30)
    },

    /**
     * 2，  【被叫】收到呼叫请求通知
     */
    onBeCalling(beCallingObject) {
      console.warn('【 WebRTC 】【 onBeCalling 】', new Date(), beCallingObject)

      // 设定被叫 custom
      this.custom = JSON.parse(beCallingObject.pushConfig.custom)

      // 被叫回应主叫自己已经收到了通话请求
      this.netcall.control({
        channelId: beCallingObject.channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
      })

      // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
      if (!this.netcall.calling && !this.beCalling) {
        this.type = beCallingObject.type
        this.beCalling = true
        this.beCalledInfo = beCallingObject

        this.playReceiverAudio()
        this.openCallerNotify()
      } else {
        if (this.netcall.calling) {
          this.busy = this.netcall.notCurrentChannelId(beCallingObject)
        } else if (this.beCalling) {
          this.busy = this.beCalledInfo?.channelId !== beCallingObject.channelId
        }

        if (this.busy) {
          this.netcall.control({
            channelId: beCallingObject.channelId,
            command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
          })
          // 拒绝通话
          this.netcall.response({
            accepted: false,
            beCalledInfo: beCallingObject
          })
        }
      }
    },

    /**
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.1.1，【被叫】接受通话请求
     */
    accept() {
      this.netcall
        .response({
          accepted: true,
          beCalledInfo: this.beCalledInfo,
          sessionConfig: this.sessionConfig
        })
        .then((acceptObject) => {
          console.warn('【 WebRTC 】【 accept - then - response 】', new Date(), acceptObject)

          this.logVodeoTimeToServer('start')
        })
        .catch((acceptObject) => {
          console.warn('【 WebRTC 】【 accept - catch - response 】', new Date(), acceptObject)

          this.resetStatus()
          this.netcall.hangup()
        })
        .finally(() => {
          this.beCalling = false

          this.openVideoView()
          this.closeCallNotify()
        })
    },

    /**
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.1.2，【主叫，被叫】双方同意，准备建立通话连接
     */
    onCallAccepted(callAcceptedObject) {
      console.warn('【 WebRTC 】【 onCallAccepted 】', new Date(), callAcceptedObject)

      // 主叫
      // 取消呼叫倒计时定时器（rtc 在 call 时已开启）
      if (this.beCalledRole === '主叫') {
        console.log('我是主叫，被叫同意，开始建立连接')

        window.clearTimeout(this.beCalledTimer)

        this.beCalledTimer = null
        this.beCalling = false

        this.beCalledInfo = callAcceptedObject
      }
      // 被叫
      // 开启 rtc
      else {
        console.log('我是被叫，我已同意，开始建立连接')

        this.startRtc()
      }

      // 记录视频时长
      this.logVideoTime()
      // 暂停播放音频提醒
      this.pauseAudio()
    },

    /**
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.1.3, 【主叫，被叫】建立本媒体网关，预览本地视频通讯
     */
    startRtc() {
      console.warn('【 WebRTC 】【 startRtc 】', new Date())

      this.netcall
        .startRtc()
        .then(() => {
          // 开启麦克风
          return this.netcall
            .startDevice({
              type: WebRTC.DEVICE_TYPE_AUDIO_IN
            })
            .catch((errorObject) => {
              console.warn('【 WebRTC 】【 startRtc - catch - DEVICE_TYPE_AUDIO_IN 】', new Date(), errorObject)
            })
        })
        .then(() => {
          // 设置采集音量
          this.netcall.setCaptureVolume(255)
          // 开启摄像头
          return this.netcall
            .startDevice({
              type: WebRTC.DEVICE_TYPE_VIDEO
            })
            .catch((errorObject) => {
              console.warn('【 WebRTC 】【 startRtc - catch - DEVICE_TYPE_VIDEO 】', new Date(), errorObject)
            })
        })
        .then(() => {
          //预览本地画面
          this.netcall.startLocalStream(document.getElementById('local'))

          // 设置本地预览画面大小
          this.netcall.setVideoViewSize({
            width: 200,
            height: 125,
            cut: true
          })
        })
        .catch((errorObject) => {
          console.warn('【 WebRTC 】【 startRtc - catch 】', new Date(), errorObject)

          this.resetStatus()
          this.netcall.hangup()
        })
    },

    /**
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.1.4，【主叫，被叫】监听远端媒体网关，预览远端视频通讯
     */
    onRemoteTrack(remoteTrackObject) {
      console.warn('【 WebRTC 】【 onRemoteTrack 】', new Date(), remoteTrackObject)

      // 当前模式为音频
      if (remoteTrackObject.track.kind === 'audio') {
        // 播放对方声音
        this.netcall
          .startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
          })
          .catch((startDeviceErrorObject) => {
            console.warn('【 WebRTC 】【 onRemoteTrack - startDevice - DEVICE_TYPE_AUDIO_OUT_CHAT 】', new Date(), startDeviceErrorObject)
          })
      }

      // 当前模式为视频
      if (remoteTrackObject.track.kind === 'video') {
        // 预览远端的视频流
        this.netcall.startRemoteStream({
          account: remoteTrackObject.account,
          node: document.getElementById('remote')
        })

        // 设置对方预览画面大小
        this.netcall.setVideoViewRemoteSize({
          account: remoteTrackObject.account,
          width: 800,
          height: 600,
          cut: true
        })
      }
    },

    /**
     * 2.2，  【主叫】中断呼叫请求通知
     *
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.2.1，【被叫】拒绝通话请求，清理通讯信息
     */
    reject() {
      if (this.beCalledRole === '主叫') {
        console.log('我是主叫，我中断通话')

        this.logExceptionVodeoTimeToServer('doctor')

        this.resetStatus()
        this.netcall.hangup()
      } else {
        console.log('我是被叫，我拒绝接受通话')

        this.logExceptionVodeoTimeToServer('doctor')

        // 通知主叫正忙
        this.netcall.control({
          channelId: this.beCalledInfo?.channelId,
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
        })

        this.netcall
          .response({
            accepted: false,
            beCalledInfo: this.beCalledInfo
          })
          .then((rejectObject) => {
            console.warn('【 WebRTC 】【 reject - then 】', new Date(), rejectObject)
          })
          .catch((rejectObject) => {
            console.warn('【 WebRTC 】【 reject - catch 】', new Date(), rejectObject)
          })
          .finally(() => {
            this.closeCallNotify()
            this.resetStatus()

            this.netcall.hangup()
          })
      }
    },

    /**
     * 3，    【被叫】响应通话请求(3.1.X 接受；3.2.X 拒绝)
     * 3.2.2，【主叫】收到被叫响应通知-拒绝，清理通讯信息
     */
    onCallRejected(callRejectedObject) {
      console.warn('【 WebRTC 】【 onCallRejected 】', new Date(), callRejectedObject)

      this.resetStatus()
      this.netcall.hangup()

      Peace.util.warning('对方正忙')
    },

    /**
     * 4，    【主叫，被叫】挂断视频通话请求
     */
    hangup() {
      if (this.beCalledRole === '主叫') {
        console.log('我是主叫，我主动关闭，准备清理通讯信息')
      } else {
        console.log('我是被叫，我主动关闭，准备清理通讯信息')
      }

      this.logVodeoTimeToServer('over')
      this.resetStatus()
      this.netcall.hangup()
    },

    /**
     * 4，    【主叫，被叫】收到对方挂断视频通话请求
     */
    onHangup(hangupObject) {
      console.warn('【 WebRTC 】【 onHangup 】', new Date(), hangupObject)

      // 判断需要挂断的通话是否是当前正在进行中的通话
      // 官网示例 demo，有此判断，是否需要验证？ 存疑，暂时屏蔽
      // if (this.beCalledInfo?.channelId === hangupObject.channelId) {
      if (this.beCalledRole === '主叫') {
        console.log('我是主叫，被叫关闭了通话，准备清理通讯信息')
      } else {
        console.log('我是被叫，主叫通话关闭了，准备清理通讯信息')
      }

      // 正在通话中，才提示通话结束，未接通不提示消息
      if (!this.beCalling && this.beCalledInfo) {
        Peace.util.warning('通话结束')
      }

      this.resetStatus()
      this.netcall.hangup()
      // }
    },

    /**
     * 清理通讯信息
     */
    resetStatus() {
      window.clearTimeout(this.beCalledTimer)
      window.clearTimeout(this.beCalledLogTimer)

      this.title = ''
      this.visible = false
      this.busy = false
      this.beCalling = null
      this.beCalledTimer = null
      this.beCalledLogTimer = null
      this.beCalledRole = null
      this.beCalledInfo = null

      this.closeCallNotify()
      this.closeVideoView()
      this.pauseAudio()
    },

    /**
     * 开启视频中模态框
     * 根据视频状态，设定 title
     */
    openVideoView() {
      this.visible = true
    },

    /**
     * 关闭视频中模态框
     */
    closeVideoView() {
      this.visible = false
    },

    /**
     * 开启右下角视频邀请提醒
     */
    openCallerNotify() {
      this.closeCallNotify()

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
            <el-button onClick={this.reject}>拒绝</el-button>
            <el-button onClick={this.accept} type="primary">
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

    /**
     * 关闭右下角视频邀请提醒
     */
    closeCallNotify() {
      this.$NotifyContent && this.$NotifyContent.close()
      this.$NotifyContent = null
    },

    /**
     * 播放发起者音频提醒
     */
    playSenderAudio() {
      var audio = this.$el.querySelector('#senderMusic')

      audio.play()
    },

    /**
     * 播放接收者音频提醒
     */
    playReceiverAudio() {
      var audio = this.$el.querySelector('#receiverMusic')

      audio.play()
    },

    /**
     * 停止播放音频提醒
     */
    pauseAudio() {
      var senderAudio = this.$el.querySelector('#senderMusic')
      var receiverAudio = this.$el.querySelector('#receiverMusic')

      senderAudio.pause()
      senderAudio.currentTime = 0
      receiverAudio.pause()
      receiverAudio.currentTime = 0
    },

    /**
     * 记录视频时长 【客户端】
     */
    logVideoTime() {
      this.title = ''

      const beCalledLogTime = new Date()

      this.beCalledLogTimer = setInterval(() => {
        this.title = Peace.util.formatDuration(beCalledLogTime, new Date())
      }, 500)
    },

    /**
     * 记录视频时长 【服务端】
     *
     * @param {string} action start: 开始；over: 结束
     */
    logVodeoTimeToServer(action) {
      // 问诊
      if (this.custom.type === 'inquiry') {
        const params = {
          inquiryNo: this.custom?.session?.content?.inquiryInfo?.inquiryNo,
          action: action
        }

        Peace.service.video.process(params)
      }
      // 会诊
      else if (this.custom.type === 'consult') {
        const params = {
          consultNo: this.custom?.session?.content?.consultInfo?.consultNo,
          action: action
        }

        Peace.service.video.processConsult(params)
      }
    },

    /**
     * 记录视频时长 【服务端】【为接通前】
     *
     * 问诊
     * 视频未接通
     *
     * state 1，未接通前 => 医生主叫 && 医生拒绝 => 【医生端调用】
     * state 2，未接通前 => 患者主叫 && 医生拒绝 => 【医生端调用】
     * state 3，未接通前 => 医生主叫 && 系统超时 => 【医生端调用】
     * state 4，未接通前 => 医生主叫 && 患者拒绝 => 【患者端调用】 No Code
     * state 5，未接通前 => 患者主叫 && 患者拒绝 => 【患者端调用】 No Code
     * state 6，未接通前 => 患者主叫 && 系统超时 => 【患者端调用】 No Code
     *
     * ----------------------------------------------------------------
     *
     * 会诊
     * 视频未接通
     *
     * state 1，未接通前 => 会诊医生主叫 && 会诊医生拒绝 => 【会诊医生调用】
     * state 2，未接通前 => 会诊医生主叫 && 被会诊医生拒绝 => 【被会诊医生调用】
     * state 3，未接通前 => 被会诊医生主叫 && 会诊医生拒绝 => 【会诊医生调用】
     * state 4，未接通前 => 被会诊医生主叫 && 被会诊医生拒绝 => 【被会诊医生调用】
     * state 5，未接通前 => 会诊医生主叫 && 系统超时拒绝 => 【会诊医生调用】
     * state 6，未接通前 => 被会诊医生主叫 && 系统超时拒绝 => 【被会诊医生调用】
     *
     * @param {} params start: 开始；over: 结束
     */
    logExceptionVodeoTimeToServer(operator = 'doctor') {
      // 问诊
      if (this.custom.type === 'inquiry') {
        const params = {}
        params.inquiryNo = this.custom?.session?.content?.inquiryInfo?.inquiryNo

        // state 1
        if (this.beCalledRole === '主叫' && operator === 'doctor') {
          params.action = 'doctorHangup'
          params.sponsor = 'doctor'
        }
        // state 2
        if (this.beCalledRole !== '主叫' && operator === 'doctor') {
          params.action = 'doctorHangup'
          params.sponsor = 'patient'
        }
        // state 3
        if (this.beCalledRole === '主叫' && operator === 'system') {
          params.action = 'systemHangup'
          params.sponsor = 'doctor'
        }

        Peace.service.video.process(params)
      }
      // 会诊
      else if (this.custom.type === 'consult') {
        const getRole = () => {
          const doctorId = this.$store.state.user.userInfo.list.docInfo.doctor_id
          const startDoctorList = this.custom.session.content.consultInfo.startDoctor
          const receiveDoctorList = this.custom.session.content.consultInfo.receiveDoctor

          if (startDoctorList.find((item) => item.doctorId === doctorId)) {
            return 'from'
          }

          if (receiveDoctorList.find((item) => item.doctorId === doctorId)) {
            return 'to'
          }
        }

        const params = {}
        params.consultNo = this.custom?.session?.content?.consultInfo?.consultNo
        params.action = 'hangup'

        // 发起者
        if (getRole() === 'from') {
          // state 1
          if (this.beCalledRole === '主叫' && operator === 'doctor') {
            params.sonAction = 'fromHangup'
            params.role = 'from'
          }
          // state 3
          else if (this.isCalling !== '主叫' && operator === 'doctor') {
            params.sonAction = 'fromHangup'
            params.role = 'to'
          }
          // state 5
          else if (this.beCalledRole === '主叫' && operator === 'system') {
            params.sonAction = 'systemHangup'
            params.role = 'from'
          }
        }
        // 受邀者
        if (getRole() === 'to') {
          // state 2
          if (this.beCalledRole !== '主叫' && operator === 'doctor') {
            params.sonAction = 'toHangup'
            params.role = 'from'
          }
          // state 4
          else if (this.beCalledRole === '主叫' && operator === 'doctor') {
            params.sonAction = 'toHangup'
            params.role = 'to'
          }
          // state 6
          else if (this.beCalledRole === '主叫' && operator === 'system') {
            params.sonAction = 'systemHangup'
            params.role = 'to'
          }
        }

        Peace.service.video.processConsult(params)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.video {
  /deep/ .el-dialog__wrapper {
    // position: unset !important;
  }

  /deep/ .video-dialog {
    // position: absolute;
    // z-index: 2001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;

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

      &.hang-up {
        background-image: url('~@/assets/images/inquiry/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('~@/assets/images/inquiry/btn_answer@2x.png');
      }
    }
  }

  #local {
    position: absolute;
    top: 60px;
    right: 10px;
    width: 200px;
    height: 125px;
    z-index: 1;
  }

  #remote {
    width: 800px;
    height: 600px;
  }
}
</style>

<style lang="scss">
.video-class {
  .el-notification__group {
    width: 100%;
  }
}
</style>

