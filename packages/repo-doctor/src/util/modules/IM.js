import Util from '@src/util'
import Type from '@src/type'

import NIM from '@public/static/js/IM/NIM_Web_NIM_v7.0.0'
import WebRTC from '@public/static/js/IM/NIM_Web_WebRTC_v7.0.0'
NIM.use(WebRTC)

/**
 * IM 帮助类
 */
export const IMHelper = {
  /**
   * 连接建立后的回调
   *
   * @param {*} connectObject 回调对象
   */
  onConnect(connectObject) {
    console.warn('【 IM 】【 onConnect 】', new Date(), connectObject)
  },

  /**
   *断开连接后的回调
   *
   * @param {*} disConnectObject 回调对象
   */
  onDisConnect(disConnectObject) {
    console.warn('【 IM 】【 onDisConnect 】', new Date(), disConnectObject)

    switch (disConnectObject.code) {
      case 302:
      case 417:
      case 'kicked':
        Peace.util.warning(disConnectObject.message)

        Util.user.removeUserInfo()
        Util.location.redirectToLogin()
        break

      default:
        break
    }
  },

  /**
   * 即将重连的回调
   *
   * @param {*} willReconnectObject 回调对象
   */
  onWillReconnect(willReconnectObject) {
    console.warn('【 IM 】【 onWillReconnect 】', new Date(), willReconnectObject)

    Peace.util.warning(`通讯异常，请检查你的网络连接`)
  },

  /**
   * 连接错误后的回调
   *
   * @param {*} errorObject 回调对象
   */
  onError(errorObject) {
    console.warn('【 IM 】【 onError 】', new Date(), errorObject)

    Peace.util.warning(`通讯异常，请重新登录`)

    Util.user.removeUserInfo()
    Util.location.redirectToLogin()
  },

  /**
   * 初始化完成后, 收到会话列表的回调
   *
   * 该回调只会初始化时运行一次
   *
   * @param {*} sessions 会话对象列表
   */
  onSessions(sessions) {
    console.warn('【 IM 】【 onSessions 】', new Date(), sessions)

    // 处理问诊
    // 1. 根据 sessions 获取最新的状态
    // 2. 储存最新状态
    // 3. 更新 vuex store
    inquiryHelper.getInquirySessionsStatus(sessions).then((inquirySessionsStatus) => {
      const sessionsStatus = inquiryHelper.setInquirySessionsStatus(sessions, inquirySessionsStatus)

      inquiryHelper.setInquirySessions(sessionsStatus)
    })
  },

  /**
   * 初始化完成后, 收到会话更新的回调
   *
   * 每次收到新消息都会执行该回调
   *
   */
  onUpdateSession(session) {
    console.warn('【 IM 】【 onUpdateSession 】', new Date(), session)

    // 当前会话处于激活状态，设定未读数为 0
    if (Peace.$store.state.inquiry.session?.id === session.id) {
      session.unread = 0
    }

    // 当前会话有状态更新，更新 session 和 vuex store
    // 因 resetSessionUnread 重置会话未读数，会触发 onUpdateSession 回调，使用 typeof session.lastMsg.content 验证是否已经更新状态

    // 问诊
    if (session.scene === 'p2p') {
      if (session.lastMsg.type === 'custom' && typeof session.lastMsg.content === 'string') {
        inquiryHelper.setInquirySessionStatus(session)
      }

      inquiryHelper.setInquirySessions(session)

      // 将新 session 更新到 session store
      // 将新 message 更新到 sessionMessages store
      if (Peace.$store.state.inquiry.session?.id === session.id) {
        if (Peace.$store.state.inquiry.sessions?.length > 0) {
          const currentSession = Peace.$store.state.inquiry.sessions?.find((temp) => temp.id === session.id)

          inquiryHelper.setInquirySession(currentSession)
          inquiryHelper.setInquirySessionMessages(currentSession?.lastMsg)
        } else {
          inquiryHelper.resetInquirySession()
          inquiryHelper.resetInquirySessionMessages()
        }
      }
    }
  },

  /**
   * 通知
   *
   * @param {*} message
   */
  onSysmsg(message) {
    console.warn('【 IM 】【 onSysmsg 】', new Date(), message)
  },

  /** 收到自定义系统通知 */
  onCustomSysMsg(message) {
    console.warn('【 IM 】【 onCustomSysMsg 】', new Date(), message)

    Peace.$store.commit('notification/setNotify', message)
  },

  /**
   * 消息
   *
   * @param {*} message
   */
  onMsg(message) {
    console.warn('【 IM 】【 onMsg 】', new Date(), message)
  },

  /**
   * 反序列化 sessions
   * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
   * 反序列化 sessions, 有助于显示数据和进行类型判断
   *
   * @param {*} sessions
   * @returns
   */
  deSerializationSessions(sessions) {
    if (!Array.isArray(sessions)) {
      sessions = [sessions]
    }

    sessions.forEach((session) => {
      if (session.lastMsg.custom && !(session.lastMsg.custom instanceof Object)) {
        session.lastMsg.custom = JSON.parse(session.lastMsg.custom)
      }

      if (session.lastMsg.content && !(session.lastMsg.content instanceof Object)) {
        session.lastMsg.content = JSON.parse(session.lastMsg.content)
      }
    })

    return sessions
  },

  /**
   * 反序列化 message
   * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
   * 反序列化 sessions, 有助于显示数据和进行类型判断
   *
   * @param {*} sessions
   * @returns
   */
  deSerializationMessages(messages) {
    messages.forEach((message) => {
      if (message.custom && !(message.custom instanceof Object)) {
        message.custom = JSON.parse(message.custom)
      }

      if (message.content && !(message.content instanceof Object)) {
        message.content = JSON.parse(message.content)
      }
    })

    return messages
  }
}

/**
 * 问诊帮助类
 */
export const inquiryHelper = {
  getSessionList(params) {
    const isMock = false

    const apiPath = 'client/v1/session/getList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 从服务器获取当前 【问诊】【session】 的最新状态
   *
   * @param { Array, Object } sessions
   */
  getInquirySessionsStatus(sessions) {
    if (!Array.isArray(sessions)) {
      sessions = [sessions]
    }

    sessions = sessions.filter((session) => session.scene === 'p2p')

    const params = {
      sessionIdList: sessions.map((item) => item.id),
      doctorId: Peace.$store.state.user.userInfo.list.docInfo.doctor_id
    }

    return this.getSessionList(params).then((res) => {
      return res.data.list
    })
  },

  /**
   * 设置 inquiry session 最新状态
   *
   * 用于 onUpdateSession 存在状态更新
   *
   * @param {*} sessionWithStatus 存在状态的 session
   */
  setInquirySessionStatus(sessionWithStatus) {
    // 合并当前 session with status 到 store
    Peace.$store.state.inquiry.sessions = Peace.NIM.mergeSessions(Peace.$store.state.inquiry.sessions, sessionWithStatus)

    // 反序列化当前 session with status
    sessionWithStatus = IMHelper.deSerializationSessions(sessionWithStatus)[0]

    // 将 session with status 更新到 session
    const currentSession = Peace.$store.state.inquiry.sessions.find((session) => session.id === sessionWithStatus.id)
    currentSession.content = sessionWithStatus.lastMsg.content.data

    // 过滤无效 session
    Peace.$store.state.inquiry.sessions = Peace.$store.state.inquiry.sessions.filter((session) => session.content)

    return Peace.$store.state.inquiry.sessions
  },

  /**
   * 将当前【问诊】【session】 的最新状态存储在 【session.content】 中
   *
   * @param {*} sessions 原始的 sessions
   * @param {*} sessionsStatus 存在状态的 sessions
   * @returns
   */
  setInquirySessionsStatus(sessions, sessionsStatus) {
    sessions.forEach((session) => {
      if (session.scene === 'p2p') {
        const currentSessionStatus = sessionsStatus.find((item) => item.sessionId === session.id || item.id === session.id)
        session.content = currentSessionStatus
      }
    })

    sessions = sessions.filter((session) => session.content)

    return sessions
  },

  /**
   * 设置 vuex inquiry sessions
   *
   * @param {*} session
   */
  setInquirySessions(sessions) {
    // 过滤规则:
    // 只显示 [待接诊] / [问诊中] 数据
    const filterMethod = (session) => {
      if (session.scene === 'p2p' && session.content && session.content.inquiryInfo) {
        if (
          session.content.inquiryInfo.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.待接诊 ||
          session.content.inquiryInfo.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.问诊中
        ) {
          return true
        }
      }

      return false
    }

    // 排序规则:
    // 1. 按照问诊状态排序
    // 2. 按照私人医生排序
    // 3. 按照会话时间排序
    const sortMethod = (prev, next) => {
      if (prev.content && next.content) {
        const prevInquiryStatus = prev.content.inquiryInfo.inquiryStatus
        const nextInquiryStatus = next.content.inquiryInfo.inquiryStatus
        const prevIsPrivateDoctor = prev.content.inquiryInfo.isPrivateDoctor
        const nextIsPrivateDoctor = next.content.inquiryInfo.isPrivateDoctor
        const prevTime = prev.updateTime
        const nextTime = next.updateTime

        if (prevInquiryStatus === nextInquiryStatus) {
          if (prevIsPrivateDoctor === nextIsPrivateDoctor) {
            return nextTime - prevTime
          }

          return nextIsPrivateDoctor - prevIsPrivateDoctor
        }

        return prevInquiryStatus - nextInquiryStatus
      }
    }

    // 当前 vuex session
    const sotreSessions = Peace.$store.state.inquiry.sessions
    // 合并
    const serializationSessions = Peace.NIM.mergeSessions(sotreSessions, sessions)
    // 反序列化
    const deserializationSessions = IMHelper.deSerializationSessions(serializationSessions)
    // 过滤并排序后
    const filterAndSortSessions = deserializationSessions.filter(filterMethod).sort(sortMethod)
    // 更新 vuex session
    Peace.$store.commit('inquiry/setInquirySessions', filterAndSortSessions)
  },

  /**
   * 更新 vuex inquiry session
   *
   * @param {*} session
   */
  setInquirySession(session) {
    Peace.$store.commit('inquiry/setInquirySession', session)
  },

  /**
   * 设置 inquiry session messages
   *
   * @param {*} message
   */
  setInquirySessionMessages(messages) {
    // 当前 vuex session message
    const sessionMessages = Peace.$store.state.inquiry.sessionMessages
    // 合并
    const serializationMessages = Peace.NIM.mergeMsgs(sessionMessages, messages)
    // 反序列化
    const deserializationMessages = IMHelper.deSerializationMessages(serializationMessages)
    // 更新 vuex session
    Peace.$store.commit('inquiry/setInquirySessionMessages', deserializationMessages)
  },

  /**
   * 重置 vuex inquiry session
   *
   * @param {*} session
   */
  resetInquirySession() {
    Peace.$store.commit('inquiry/resetInquirySession')
  },

  /**
   * 重置 vuex inquiry session messages
   *
   */
  resetInquirySessionMessages() {
    Peace.$store.commit('inquiry/resetInquirySessionMessages')
  }
}

/**
 * 初始化 IM SDK
 *
 */
export const initIM = () => {
  const user = Util.user.getUserInfo()

  const appKey = process.env.VUE_APP_IM_KEY
  const account = user.list.registerInfo.user_id
  const token = user.list.registerInfo.token
  const db = false

  return NIM.getInstance({
    debug: false,

    appKey,
    account,
    token,
    db,

    // 同步会话的未读数
    syncSessionUnread: true,

    // 系统
    onconnect: IMHelper.onConnect,
    ondisconnect: IMHelper.onDisConnect,
    onwillreconnect: IMHelper.onWillReconnect,
    onerror: IMHelper.onError,

    // 会话
    onsessions: IMHelper.onSessions,
    onupdatesession: IMHelper.onUpdateSession,

    /** 通知 */
    onsysmsg: IMHelper.onSysmsg,
    oncustomsysmsg: IMHelper.onCustomSysMsg,

    /** 消息 */
    onMsg: IMHelper.onMsg
  })
}

/**
 * 初始化 WebRTC SDK
 *
 */
export const initWebRTC = (IMInstance) => {
  return WebRTC.getInstance({
    debug: false,
    nim: IMInstance
  })
}

export default {
  inquiryHelper,

  initIM,
  initWebRTC
}
