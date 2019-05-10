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

    $peace.$store.commit('chat/setSessions', session)

    if ($peace.$store.state.chat.session && $peace.$store.state.chat.session.id === session.id) {
      $peace.$store.commit('chat/updateSession', session)
    }
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
      custom: '测试自定义数据',
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
    WebRTCUtil.onHangup()
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
          // 通知主叫正忙
          $peace.WebRTC.control({
            channelId: channelId,
            command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
          })
          // 拒绝通话
          $peace.WebRTC.response({
            accepted: false,
            beCalledInfo: obj
          })

          WebRTCUtil.hangUpVideo()
        }
      }
    })
  },

  // 被叫拒绝的通知
  onCallRejected() {
    $peace.WebRTC.on('callRejected', function() {
      console.log('on callRejected')

      $peace.$store.commit('chat/setBeCall', '拒绝')

      // 取消呼叫倒计时
      WebRTCUtil.hangUpVideo()
    })
  },

  // 被叫接听的通知
  onCallAccepted() {
    $peace.WebRTC.on('callAccepted', function(obj) {
      console.log('on callAccepted')

      $peace.$store.commit('chat/setBeCall', '接听')

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
        width: 360,
        height: 640,
        cut: true
      })
    })
  },

  // 挂断的通知
  onHangup() {
    $peace.WebRTC.on('hangup', function(obj) {
      console.log('on hangup', obj)
      // 判断需要挂断的通话是否是当前正在进行中的通话
      if (!WebRTCUtil.STATE.beCalledInfo || WebRTCUtil.STATE.beCalledInfo.channelId === obj.channelId) {
        WebRTCUtil.hangUpVideo()
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

        // 设置本地预览画面大小
        $peace.WebRTC.setVideoViewSize({
          width: 81,
          height: 125,
          cut: true
        })
      })
      .catch(function(err) {
        console.log('发生错误')
        console.log(err)
        WebRTCUtil.hangUpVideo()
      })
  },

  // 发送视频邀请
  sendVideo(session) {
    console.log(session)
    $peace.WebRTC.call({
      type: WebRTC.NETCALL_TYPE_VIDEO,
      // 泰樑的
      account: 'unayuzpaar',
      // 周佳的
      // account: 'ywoiuwkhbc',
      pushConfig: WebRTCUtil.STATE.pushConfig,
      sessionConfig: WebRTCUtil.STATE.sessionConfig,
      webrtcEnable: true
    })
      .then(function(obj) {
        // 成功发起呼叫
        console.log('call success', obj)

        WebRTCUtil.STATE.beCalledInfo = obj
      })
      .catch(function(err) {
        // 被叫不在线
        if (err.event.code === 11001) {
          console.log('callee offline', err)
        }
      })

    // 超时 30s，主叫挂断
    WebRTCUtil.hangupTimer = setTimeout(function() {
      if (!$peace.WebRTC.callAccepted) {
        console.log('超时未接听, hangup')
        $peace.util.warning('对方长时间未接听，已取消')
        WebRTCUtil.hangUpVideo()
      }
    }, 1000 * 30)
  },

  // 挂断并清理视频
  hangUpVideo() {
    console.log('挂断')

    // 挂断
    $peace.WebRTC.hangup()

    // 清理通话状态
    WebRTCUtil.clearState()

    // 清理 vuex beCall
    $peace.$store.commit('chat/setBeCall', undefined)
  }
}

const state = {
  // 会话列表
  sessions: undefined,

  // 当前会话
  session: undefined,

  // 当前会话消息列表
  sessionMsgs: undefined,

  beCall: undefined
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
      onmsg: NIMUtil.onMsg
    })

    return $peace.NIM
  },

  // 选中会话列表的一条会话
  selectSession({ commit }, session) {
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
  sendVideo({ commit }, session) {
    commit('setBeCall', '邀请')

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
    WebRTCUtil.hangUpVideo()
  },

  // 静音
  muteVideo() {
    $peace.WebRTC.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_IN).then(function() {
      console.log('麦克风关闭成功')
    })
  },

  // 主叫 / 被叫挂断视频
  hangUpVideo({ commit }) {
    commit('setBeCall', '挂断')

    WebRTCUtil.hangUpVideo()
  }
}

const mutations = {
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
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
