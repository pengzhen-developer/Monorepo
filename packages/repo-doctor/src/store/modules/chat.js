import NIM from './../../../public/static/NIM_Web_SDK/NIM_Web_NIM_v6.3.0'
import WebRTC from './../../../public/static/NIM_Web_SDK/NIM_Web_WebRTC_v6.3.0'
NIM.use(WebRTC)

import { STATE, DeserializationSessions, DeserializationSessionMsgs } from './../../views/clinic/util'
import { isArray } from 'util'

const NIMUtil = {
  /**
   * SDK 连接成功
   *
   * @param {*} state
   */
  onConnect() {
    console.log(new Date().formatTime() + ': ' + '连接成功')

    WebRTCUtil.initWebRTC()
  },

  /**
   * SDK 连接失败
   *
   * @param {*} state
   * @param {*} error
   */
  onError(error) {
    console.log(new Date().formatTime() + ': ' + '连接失败', error)

    $peace.NIM.connect()

    $peace.util.warning(`心跳检测失败，请刷新页面后重试。`)
  },

  /**
   * SDK 断开连接
   *
   * @param {*} state
   * @param {*} error
   */
  onDisconnect(error) {
    console.log(new Date().formatTime() + ': ' + 'SDK 断开连接')

    if (error) {
      console.log(new Date().formatTime() + ': ' + error)
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          // TODO:
          // 在目前需求情况下，不会出现帐号密码错误
          break
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          $peace.util.warning(error.message)
          $peace.$router.replace($peace.config.theme.startPage)
          break
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          $peace.util.warning(error.message)
          $peace.$router.replace($peace.config.theme.startPage)
          break
        default:
          $peace.NIM.connect()
          break
      }
    }
  },

  /**
   * SDK 连接失败, 执行重连
   *
   * @param {*} state
   * @param {*} reconnect
   */
  onWillReconnect(reconnect) {
    console.log(new Date().formatTime() + ': ' + '即将重连', reconnect)

    $peace.util.warning(`检测到网络异常，即将进行第 ${reconnect.retryCount} 次重接。`)
  },

  /**
   * 收到会话列表, 更新会话列表
   *
   * @param {*} state
   * @param {*} sessions
   */
  onSessions(sessions) {
    console.log(new Date().formatTime() + ': ' + '收到会话列表', sessions)

    $peace.$store.commit('chat/setSessions', sessions)
  },

  /**
   * 收到会话更新, 更新会话列表
   *
   * @param {*} session
   */
  onUpdateSession(session) {
    console.log(new Date().formatTime() + ': ' + '收到会话更新', session)

    if ($peace.$store.state.chat.session && $peace.$store.state.chat.session.id === session.id) {
      session.unread = 0

      $peace.$store.commit('chat/updateSession', session)
    }

    $peace.$store.commit('chat/setSessions', session)
  },

  /**
   * 收到新消息，更新会话消息
   *
   * @param {*} msg
   */
  onMsg(msg) {
    console.log(new Date().formatTime() + ': ' + '收到消息', msg)

    // 更新当前消息列表
    if ($peace.$store.state.chat.session && $peace.$store.state.chat.session.id === msg.sessionId) {
      $peace.$store.commit('chat/updateSessionMsg', msg)

      // 验证是否退诊或结束
      // 问诊为已退针或者已结束，应该从问诊列表删除。
      const lastMsg = $peace.$store.state.chat.sessionMsgs.msgs[0]
      if (lastMsg.type === STATE.msgType['自定义消息']) {
        if (lastMsg.custom.ext.talkState === STATE.talkState['退诊'] || lastMsg.custom.ext.talkState === STATE.talkState['结束']) {
          $peace.$store.commit('chat/clearSession')
        }
      }
    }
  }
}

const WebRTCUtil = {
  // 状态
  STATE: {
    // 是否被叫中
    beCalling: undefined,
    // 被叫信息
    beCalledInfo: undefined,
    // 是否正忙
    busy: undefined,
    // 音视频类型
    type: undefined,
    // 视频市场定时器
    videoTimeInterval: undefined,

    // 会话配置
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
    },

    // 发送消息体配置
    pushConfig: {
      enable: true,
      needBadge: true,
      needPushNick: true,
      pushContent: '',
      custom: '测试视频问诊',
      pushPayload: '',
      sound: '',
      forceKeepCalling: 0
    }
  },

  // 挂断定时器
  hangupTimer: undefined,

  // 初始化 WebRTC
  initWebRTC() {
    $peace.WebRTC = WebRTC.getInstance({
      nim: $peace.NIM,
      container: document.getElementById('localContainer'),
      remoteContainer: document.getElementById('remoteContainer'),
      chromeId: '',
      // 是否开启日志打印
      debug: false
    })

    WebRTCUtil.onBeCalling()
    WebRTCUtil.onCallRejected()
    WebRTCUtil.onCallAccepted()
    WebRTCUtil.onRemoteTrack()
    WebRTCUtil.onControl()
    WebRTCUtil.onHangup()
    WebRTCUtil.onCallerAckSync()
  },

  // 被叫监听音视频
  onBeCalling() {
    $peace.WebRTC.on('beCalling', function(obj) {
      console.log('on beCalling', obj)
      const channelId = obj.channelId

      // 被叫回应主叫自己已经收到了通话请求
      $peace.WebRTC.control({
        channelId: channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
      })

      // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
      if (!$peace.WebRTC.calling && !WebRTCUtil.STATE.beCalling) {
        WebRTCUtil.STATE.beCalling = true
        WebRTCUtil.STATE.beCalledInfo = obj

        $peace.$store.commit('chat/setBeCall', '收到')
      } else {
        if ($peace.WebRTC.calling) {
          WebRTCUtil.STATE.busy = $peace.WebRTC.notCurrentChannelId(obj)
        } else if (WebRTCUtil.STATE.beCalling) {
          WebRTCUtil.STATE.busy = WebRTCUtil.STATE.beCalledInfo.channelId !== channelId
        }

        if (WebRTCUtil.STATE.busy) {
          // 通知对方正忙
          $peace.WebRTC.control({
            channelId: channelId,
            command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
          })
          // 拒绝通话
          $peace.WebRTC.response({
            accepted: false,
            beCalledInfo: obj
          })

          WebRTCUtil.hangUpVideo({ record: false })
        }
      }
    })
  },

  // 被叫拒绝的通知
  // 通话未连接， 对方拒绝
  onCallRejected() {
    $peace.WebRTC.on('callRejected', function() {
      console.log('on callRejected')

      $peace.util.warning('对方已拒绝')

      $peace.$store.commit('chat/setBeCall', '拒绝')

      // 取消呼叫倒计时
      WebRTCUtil.hangUpVideo({ recode: false })
    })
  },

  // 被叫接听的通知
  onCallAccepted() {
    $peace.WebRTC.on('callAccepted', function(obj) {
      console.log('on callAccepted')

      $peace.$store.commit('chat/setBeCall', '接听')

      const videoTimeBegin = new Date()
      WebRTCUtil.videoTimeInterval = setInterval(() => {
        $peace.$store.commit('chat/setVideoTime', videoTimeBegin)
      }, 500)

      // 记录视频问诊
      const videoProcessApi = '/client/v1/video/process'
      const params = { inquiryId: $peace.$store.state.chat.session.lastMsg.custom.ext.inquiryId, action: 'start' }
      $peace.$http.post(videoProcessApi, params).then(res => {
        console.log(res)
      })

      // 记录被叫信息
      WebRTCUtil.STATE.beCalledInfo = obj
      // 缓存呼叫类型，后面开启音视频连接需要用到
      WebRTCUtil.STATE.type = obj.type
      // 取消呼叫倒计时
      WebRTCUtil.clearCallTimer()
      // 开启音视频连接操作
      WebRTCUtil.startRtc()
    })
  },

  // 收到远程轨道信息 (被叫已加入)
  onRemoteTrack() {
    $peace.WebRTC.on('remoteTrack', function(obj) {
      console.log('user join', obj)

      // 播放对方声音
      $peace.WebRTC.startDevice({
        type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
      }).catch(function(err) {
        console.log('播放对方的声音失败')
        console.error(err)
      })

      // 预览对方视频画面
      $peace.WebRTC.startRemoteStream({
        account: obj.account,
        node: document.getElementById('remoteContainer')
      })

      // 设置对方预览画面大小
      $peace.WebRTC.setVideoViewRemoteSize({
        account: obj.account,
        width: document.getElementById('remoteContainer').parentElement.clientWidth,
        height: document.getElementById('remoteContainer').parentElement.clientHeight,
        cut: true
      })
    })
  },

  // 监听控制
  onControl() {
    $peace.WebRTC.on('control', function(obj) {
      // 如果不是当前通话的指令, 直接丢掉
      if ($peace.WebRTC.notCurrentChannelId(obj)) {
        console.log('非当前通话的控制信息')
        return
      }

      var type = obj.type
      switch (type) {
        // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
          console.log('对方打开了麦克风')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
          console.log('对方关闭了麦克风')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
          console.log('对方打开了摄像头')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
          console.log('对方关闭了摄像头')
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
          console.log('对方拒绝从音频切换到视频通话')
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
          console.log('对方请求从音频切换到视频通话')
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
          console.log('对方同意从音频切换到视频通话')
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
          console.log('对方请求从视频切换为音频')
          break
        // NETCALL_CONTROL_COMMAND_BUSY 占线
        case WebRTC.NETCALL_CONTROL_COMMAND_BUSY:
          console.log('对方占线')

          $peace.util.warning('对方占线')
          WebRTCUtil.hangUpVideo({ record: false })
          break
        // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
        case WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
          console.log('对方摄像头不可用')
          break
        // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
        // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 通知对方自己开始录制视频了
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 通知对方自己结束录制视频了
      }
    })
  },

  // 挂断的通知
  // 当一方挂断之后, 另一方会收到 hangup 事件, 此时做一些清理工作即可
  onHangup() {
    $peace.WebRTC.on('hangup', function(obj) {
      console.log('on hangup', obj)

      // 判断需要挂断的通话是否是当前正在进行中的通话
      if (!WebRTCUtil.STATE.beCalledInfo || WebRTCUtil.STATE.beCalledInfo.channelId === obj.channelId) {
        $peace.util.warning('对方已挂断')

        if (state.beCall === '接听') {
          // 接听情况下，挂断时候才需要向后端发送 over ，记录通话时间
          WebRTCUtil.hangUpVideo({ record: true })
        } else {
          WebRTCUtil.hangUpVideo({ record: false })
        }
      }
    })
  },

  // 其他端已处理
  onCallerAckSync() {
    $peace.WebRTC.on('onCallerAckSync', function(obj) {
      if (WebRTCUtil.STATE.beCalledInfo && obj.channelId === WebRTCUtil.STATE.beCalledInfo.channelId) {
        console.log('on caller ack async:', obj)

        $peace.util.warning('当前通话已经其它端处理')

        WebRTCUtil.clearState()
      }
    })
  },

  // 清理挂断计时器
  clearCallTimer() {
    console.log('clearCallTimer')

    window.clearTimeout(WebRTCUtil.hangupTimer)
  },

  // 清理通话状态
  clearState() {
    WebRTCUtil.STATE.beCalling = undefined
    WebRTCUtil.STATE.beCalledInfo = undefined
    WebRTCUtil.STATE.busy = undefined
    WebRTCUtil.STATE.type = undefined

    WebRTCUtil.clearCallTimer()
  },

  // 连接媒体网关
  startRtc() {
    $peace.WebRTC.startRtc()
      .then(function() {
        // 开启麦克风
        return $peace.WebRTC.startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_IN
        }).catch(function(err) {
          console.log('启动麦克风失败')
          console.error(err)
        })
      })
      .then(function() {
        // 设置采集音量
        $peace.WebRTC.setCaptureVolume(255)
        // 开启摄像头
        return $peace.WebRTC.startDevice({
          type: WebRTC.DEVICE_TYPE_VIDEO
        }).catch(function(err) {
          console.log('启动摄像头失败')
          console.error(err)
        })
      })
      .then(function() {
        //预览本地画面
        $peace.WebRTC.startLocalStream(document.getElementById('localContainer'))

        $peace.a = document.getElementById('localContainer')

        // 设置本地预览画面大小
        $peace.WebRTC.setVideoViewSize({
          width: document.getElementById('localContainer').parentElement.clientWidth / 3,
          height: document.getElementById('localContainer').parentElement.clientHeight / 3
        })
      })
      .catch(function(err) {
        console.log('发生错误')
        console.log(err)
        WebRTCUtil.hangUpVideo({ record: false })
      })
  },

  // 发送视频邀请
  sendVideo(session) {
    console.log(session)

    // 发送视频问诊, 并修改自定义消息体
    WebRTCUtil.STATE.pushConfig.custom = $peace.util.clone(state.session.lastMsg.custom)
    WebRTCUtil.STATE.pushConfig.custom.name = WebRTCUtil.STATE.pushConfig.custom.doctor.doctorName
    WebRTCUtil.STATE.pushConfig.custom.idcard = ''
    WebRTCUtil.STATE.pushConfig.custom.phone = ''
    WebRTCUtil.STATE.pushConfig.custom.id = ''

    WebRTCUtil.STATE.pushConfig.custom = JSON.stringify(WebRTCUtil.STATE.pushConfig.custom)

    $peace.WebRTC.call({
      type: WebRTC.NETCALL_TYPE_VIDEO,
      account: session.lastMsg.custom.patients.patientId,
      // 泰樑的
      // account: 'unayuzpaar',
      // 周佳的
      // account: 'ywoiuwkhbc',
      pushConfig: WebRTCUtil.STATE.pushConfig,
      sessionConfig: WebRTCUtil.STATE.sessionConfig,
      webrtcEnable: true
    })
      .then(function(obj) {
        // 成功发起呼叫
        console.log('call success', obj)

        // 更新视频状态
        $peace.$store.commit('chat/setBeCall', '邀请')

        // 存储当前视频
        WebRTCUtil.STATE.beCalledInfo = obj
      })
      .catch(function(err) {
        // 被叫不在线
        if (err.code === 11000) {
          $peace.util.warning('对方离线')
        }

        WebRTCUtil.hangUpVideo({ record: false })
      })

    // 超时 30s，主叫挂断
    WebRTCUtil.hangupTimer = setTimeout(function() {
      if (!$peace.WebRTC.callAccepted) {
        console.log('超时未接听, hangup')
        $peace.util.warning('对方无应答')
        WebRTCUtil.hangUpVideo({ record: false })
      }
    }, 1000 * 30)
  },

  // 挂断并清理视频
  hangUpVideo({ record }) {
    console.log('挂断')

    // 清空视频时长定时器
    window.clearInterval(WebRTCUtil.videoTimeInterval)

    // 挂断
    $peace.WebRTC.hangup()

    // 清理通话状态
    WebRTCUtil.clearState()

    // 清理 vuex beCall mute
    $peace.$store.commit('chat/setBeCall', undefined)
    $peace.$store.commit('chat/setMute', false)

    if (record) {
      // 记录视频问诊
      const videoProcessApi = '/client/v1/video/process'
      const params = { inquiryId: state.session.lastMsg.custom.ext.inquiryId, action: 'over' }
      $peace.$http.post(videoProcessApi, params).then(res => {
        console.log(res)
      })
    }
  }
}

const state = {
  // 会话列表
  sessions: undefined,

  // 当前会话
  session: undefined,

  // 当前会话消息列表
  sessionMsgs: undefined,

  // 视频状态
  // 邀请、接听、拒绝、挂断
  beCall: undefined,

  // 音频是否静音状态
  // true、false
  mute: false,

  // 视频通话时长
  videoTime: undefined
}

const actions = {
  // 初始化 IM
  initNIM() {
    const appKey = $peace.config.nim[process.env.VUE_APP_MODE || process.env.NODE_ENV].appKey
    const account = $peace.cache.get('USER').list.registerInfo.user_id
    const token = $peace.cache.get('USER').list.registerInfo.token

    $peace.NIM = NIM.getInstance({
      appKey,
      account,
      token,

      db: false,

      // 系统
      onconnect: NIMUtil.onConnect,
      onerror: NIMUtil.onError,
      ondisconnect: NIMUtil.onDisconnect,
      onwillreconnect: NIMUtil.onWillReconnect,

      // 会话
      onsessions: NIMUtil.onSessions,
      onupdatesession: NIMUtil.onUpdateSession,

      // 消息
      onmsg: NIMUtil.onMsg,

      // 过滤所有系统消息
      shouldIgnoreNotification() {
        return true
      }
    })

    return $peace.NIM
  },

  // 选中会话列表的一条会话
  selectSession({ commit }, session) {
    // 重置会话未读数
    $peace.NIM.resetSessionUnread(session.id)

    // 清理会话
    commit('clearSession')

    // 选中会话
    commit('setSession', session)

    // 获取会话历史消息
    $peace.NIM.getHistoryMsgs({
      scene: 'p2p',
      to: session.to,
      done: (error, msgsObj) => {
        console.log(new Date().formatTime() + ': ' + '获取历史会话', msgsObj)

        if (error) {
          $peace.util.error(error.message)
          return
        }

        msgsObj.msgs = DeserializationSessionMsgs(msgsObj.msgs)
        commit('setSessionMsg', msgsObj)
      }
    })
  },

  // 主叫发送视频请求
  sendVideo(argu, session) {
    WebRTCUtil.sendVideo(session)
  },

  // 被叫接听视频请求
  acceptVideo({ commit }) {
    commit('setBeCall', '接听')

    $peace.WebRTC.response({
      accepted: true,
      beCalledInfo: WebRTCUtil.STATE.beCalledInfo,
      sessionConfig: WebRTCUtil.STATE.sessionConfig
    }).catch(function(err) {
      console.log('接听失败', err)
    })
  },

  // 拒绝视频请求
  rejectVideo({ commit }) {
    commit('setBeCall', '拒绝')

    // 被叫拒绝
    if (WebRTCUtil.STATE.beCalledInfo) {
      // 通知主叫正忙
      $peace.WebRTC.control({
        channelId: WebRTCUtil.STATE.beCalledInfo.channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      // 通知主叫拒绝通话
      $peace.WebRTC.response({
        accepted: false,
        beCalledInfo: WebRTCUtil.STATE.beCalledInfo
      })
    }

    // 直接拒绝通话
    WebRTCUtil.hangUpVideo({ record: false })
  },

  // 静音
  muteVideo({ commit }) {
    $peace.WebRTC.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_IN)
      .then(function() {
        commit('setMute', true)

        // 通知对方自己关闭了麦克风
        $peace.WebRTC.control({
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
        })

        console.log('麦克风关闭成功')
      })
      .catch(() => {
        console.log('麦克风关闭失败')
      })
  },

  // 取消静音
  noMuteVideo({ commit }) {
    $peace.WebRTC.startDevice({
      type: WebRTC.DEVICE_TYPE_AUDIO_IN
    })
      .then(() => {
        commit('setMute', false)

        // 通知对方我方开启了麦克风
        $peace.WebRTC.control({
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
        })

        $peace.WebRTC.setCaptureVolume(255)

        console.log('麦克风开启成功')
      })
      .catch(() => {
        console.log('麦克风开启失败')
      })
  },

  // 主叫 / 被叫挂断视频
  hangUpVideo({ commit }) {
    commit('setBeCall', '挂断')

    WebRTCUtil.hangUpVideo({ record: true })
  },

  // 切换本地、远端视频
  toggleFullVideo() {
    // 设置对方预览画面大小
    $peace.WebRTC.setVideoViewRemoteSize({
      width: document.getElementById('remoteContainer').parentElement.clientWidth,
      height: document.getElementById('remoteContainer').parentElement.clientHeight
    })

    // 设置本地预览画面大小
    $peace.WebRTC.setVideoViewSize({
      width: document.getElementById('localContainer').parentElement.clientWidth / 3,
      height: document.getElementById('localContainer').parentElement.clientHeight / 3
    })
  },

  // 清理 session
  clearSession({ commit }) {
    commit('clearSession')
  }
}

const mutations = {
  /**
   * 选中 sessions
   *
   * @param {*} state
   * @param {*} session
   */
  setVideoTime(state, videoTime) {
    state.videoTime = $peace.util.formatDuration(new Date() - videoTime)
  },

  /**
   * 选中 sessions
   *
   * @param {*} state
   * @param {*} session
   */
  setSessions(state, sessions) {
    const serializationSessions = $peace.NIM.mergeSessions(state.sessions, sessions)
    const deserializationSessions = DeserializationSessions(serializationSessions)

    state.sessions = deserializationSessions
  },

  /**
   * 选中 session
   *
   * @param {*} state
   * @param {*} session
   */
  setSession(state, session) {
    const deserializationSession = DeserializationSessions([session])[0]

    state.session = deserializationSession
  },

  /**
   * 手动更新 session
   *
   * @param {*} state
   * @param {*} session
   */
  updateSession(state, session) {
    const deserializationSession = DeserializationSessions([session])[0]

    state.session = deserializationSession
  },

  /**
   * 根据 session 获取消息列表
   *
   * @param {*} state
   * @param {*} session
   */
  setSessionMsg(state, msgsObj) {
    state.sessionMsgs = msgsObj
  },

  /**
   * 手动更新消息列表
   *
   * @param {*} state
   * @param {*} msg
   */
  updateSessionMsg(state, msg) {
    if (isArray(msg)) {
      msg = DeserializationSessionMsgs(msg)
    } else {
      msg = DeserializationSessionMsgs([msg])
    }

    state.sessionMsgs.msgs.unshift(...msg)
  },

  /**
   * 清空信息
   *
   * @param {*} state
   */
  clearSession(state) {
    state.session = undefined
    state.sessionMsgs = undefined
  },

  /**
   * 视频状态
   *
   * @param {*} state
   * @param {*} beCallState
   */
  setBeCall(state, beCallState) {
    state.beCall = beCallState
  },

  /**
   * 视频状态
   *
   * @param {*} state
   * @param {*} beCallState
   */
  setMute(state, muteState) {
    state.mute = muteState
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
