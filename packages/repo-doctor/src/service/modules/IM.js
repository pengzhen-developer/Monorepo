import peace from '@src/library'

import Store from '@src/store'

import NIM from '/public/static/IM/NIM_Web_NIM_v6.5.5'
import WebRTC from '/public/static/IM/NIM_Web_WebRTC_v6.5.5'
NIM.use(WebRTC)

/**
 * 初始化 IM
 *
 * @export
 * @param {*} 回调函数
 * @returns
 */
export function initNIM(
  options = {
    onconnect: peace.service.IM.onConnect,
    onerror: peace.service.IM.onError,
    ondisconnect: peace.service.IM.onDisConnect,
    onwillreconnect: peace.service.IM.onWillReconnect,

    // 会话
    onsessions: peace.service.IM.onSessions,
    onupdatesession: peace.service.IM.onUpdateSession,

    // 消息
    onmsg: peace.service.IM.onMsg
  }
) {
  const appKey = peace.config.NIM.key
  const account = Store.state.user.userInfo.list.registerInfo.user_id
  const token = Store.state.user.userInfo.list.registerInfo.token
  const db = false

  if (!$peace.NIM) {
    // 初始化 IM
    $peace.NIM = NIM.getInstance({
      appKey,
      account,
      token,
      db,

      ...options,

      // 过滤所有系统消息
      shouldIgnoreNotification() {
        return true
      }
    })
  } else {
    // 更新 IM
    $peace.NIM.disconnect()
    $peace.NIM.setOptions(options)
    $peace.NIM.connect()
  }

  return $peace.NIM
}

/**
 * 初始化 WebRTC
 *
 * @export
 * @param {*} 回调函数
 * @returns
 */
export function initWebRTC() {
  if ($peace.WebRTC) {
    $peace.WebRTC.destroy()
  }

  $peace.WebRTC = WebRTC.getInstance({
    nim: $peace.NIM
  })
}

/**
 * 连接建立后的回调
 *
 * @export
 * @param {*} connectObject 回调对象
 */
export function onConnect(connectObject) {
  console.warn('【 IM 】【 onConnect 】', new Date(), connectObject)
}

/**
 *断开连接后的回调
 *
 * @export
 * @param {*} disConnectObject 回调对象
 */
export function onDisConnect(disConnectObject) {
  console.warn('【 IM 】【 onDisConnect 】', new Date(), disConnectObject)

  switch (disConnectObject.code) {
    case 417:
    case 'kicked':
      peace.util.warning(disConnectObject.message)
      $peace.$router.replace(peace.config.system.loginPage)
      break

    default:
      $peace.NIM.connect()
      break
  }
}

/**
 * 即将重连的回调
 *
 * @export
 * @param {*} willReconnectObject 回调对象
 */
export function onWillReconnect(willReconnectObject) {
  console.warn('【 IM 】【 onWillReconnect 】', new Date(), willReconnectObject)

  $peace.util.warning(`检测到网络异常，${parseInt(willReconnectObject.duration / 1000)} 秒后进行第 ${willReconnectObject.retryCount} 次重接。`)
}

/**
 * 连接错误后的回调
 *
 * @export
 * @param {*} errorObject 回调对象
 */
export function onError(errorObject) {
  console.warn('【 IM 】【 onError 】', new Date(), errorObject)
}

/**
 * 初始化完成后, 收到会话列表的回调
 *
 * 该回调只会初始化时运行一次
 *
 * @export
 * @param {*} sessions 会话对象列表
 */
export function onSessions(sessions) {
  console.warn('【 IM 】【 onSessions 】', new Date(), sessions)

  // 处理问诊
  // 1. 根据 sessions 获取最新的状态
  // 2. 存储 store
  peace.service.IM.getInquirySessionsStatus(sessions).then(inquirySessionsStatus => {
    const sessionsStatus = peace.service.IM.setInquirySessionsStatus(sessions, inquirySessionsStatus)
    peace.service.IM.setInquirySessions(sessionsStatus)
  })

  // TODO
  // 处理会诊
  // 1. 根据 sessions 获取最新的状态
  // 2. 存储 store
  peace.service.IM.getConsultationSessionsStatus(sessions).then(consultationSessionsStatus => {
    const sessionsStatus = peace.service.IM.setConsultationSessionsStatus(sessions, consultationSessionsStatus)
    peace.service.IM.setConsultationSessions(sessionsStatus)
  })
}

/**
 * 初始化完成后, 收到会话更新的回调
 *
 * 每次收到新消息都会执行该回调
 *
 * @export
 * @param {*} session 会话对象
 */
export function onUpdateSession(session) {
  if (session.lastMsg.status === 'success') {
    console.warn('【 IM 】【 onUpdateSession 】', new Date(), session)

    // 更新 session 与当前 session 相同, 设定未读数为 0
    if (
      (Store.state.inquiry.session && Store.state.inquiry.session.id === session.id) ||
      (Store.state.consultation.session && Store.state.consultation.session.id === session.id)
    ) {
      session.unread = 0
    }

    // 处理 inquiry
    if (session.scene === 'p2p') {
      // 当前 session update 存在状态更新, 更新 sessions 为最新状态
      // 因 resetSessionUnread 重置会话未读数，会触发 onUpdateSession 回调，使用 typeof session.lastMsg.content 验证是否已经更新状态
      if (session.lastMsg.type === 'custom' && typeof session.lastMsg.content === 'string') {
        peace.service.IM.setInquirySessionStatus(session)
      }

      // 将新 sessions 更新到 sessions store
      peace.service.IM.setInquirySessions(session)

      // 将新 session 更新到 session store
      // 将新 message 更新到 sessionMessages store
      if (Store.state.inquiry.session && Store.state.inquiry.session.id === session.id) {
        if (Store.state.inquiry.sessions && Store.state.inquiry.sessions.length > 0) {
          peace.service.IM.setInquirySession(Store.state.inquiry.sessions.find(temp => temp.id === session.id))
          peace.service.IM.setInquirySessionMessages(session.lastMsg)
        } else {
          peace.service.IM.resetInquirySession()
          peace.service.IM.resetInquirySessionMessages()
        }
      }
    }
    // 处理 consultation
    else if (session.scene === 'team') {
      // 当前 session update 存在状态更新, 更新 sessions 为最新状态
      // 因 resetSessionUnread 重置会话未读数，会触发 onUpdateSession 回调，使用 typeof session.lastMsg.content 验证是否已经更新状态
      if (session.lastMsg.type === 'custom' && typeof session.lastMsg.content === 'string') {
        peace.service.IM.setConsultationSessionStatus(session)

        // 加入频道和拒绝加入频道，通过通知推送，并通知当前用户（不通知当前操作人）
        // 退出频道因为只调用一次接口，因此在 IM 的监听中通知当前用户（不通知当前操作人）
        // 详见 ConsultationVideo.vue => onLeaveChannel
        if (session.lastMsg.from !== Store.state.user.userInfo.list.docInfo.doctor_id) {
          if (
            session.lastMsg.content.code === peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.同意加入频道 ||
            session.lastMsg.content.code === peace.type.CONSULTATION.CONSULTATION_MESSAGE_TYPE.拒绝加入频道
          ) {
            peace.util.alert(session.lastMsg.content.data.showTextInfo.doctorClientText)
          }
        }
      }

      // 将新 sessions 更新到 sessions store
      peace.service.IM.setConsultationSessions(session)

      // 将新 session 更新到 session store
      // 将新 message 更新到 sessionMessages store
      if (Store.state.consultation.session && Store.state.consultation.session.id === session.id) {
        if (Store.state.consultation.sessions && Store.state.consultation.sessions.length > 0) {
          peace.service.IM.setConsultationSession(Store.state.consultation.sessions.find(temp => temp.id === session.id))
          peace.service.IM.setConsultationSessionMessages(session.lastMsg)
        } else {
          peace.service.IM.resetConsultationSession()
          peace.service.IM.resetConsultationSessionMessages()
        }
      }
    }
  }
}

/**
 *
 *
 * @export
 * @param {*} message
 */
export function onMsg(message) {
  console.warn('【 IM 】【 onMsg 】', new Date(), message)
}

/**
 * 设置 inquiry sessions
 *
 * @export
 * @param {*} session
 */
export function setInquirySessions(sessions) {
  const serializationSessions = $peace.NIM.mergeSessions(Store.state.inquiry.sessions, sessions)
  const deserializationSessions = peace.service.IM.deSerializationSessions(serializationSessions)

  // 过滤 [待接诊] / [问诊中] 数据
  const filterMethod = session => {
    if (session.scene === 'p2p' && session.content) {
      if (
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.待接诊 ||
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.问诊中
      ) {
        return true
      }
    }

    return false
  }

  // 排序规则:
  // 1. 按照私人医生排序
  // 2. 按照会话时间排序
  const sortMethod = (prev, next) => {
    if (prev.content && next.content) {
      const prevIsPrivateDoctor = prev.content.inquiryInfo.isPrivateDoctor
      const nextIsPrivateDoctor = next.content.inquiryInfo.isPrivateDoctor
      const prevTime = prev.updateTime
      const nextTime = next.updateTime

      if (prevIsPrivateDoctor === nextIsPrivateDoctor) {
        return nextTime - prevTime
      } else {
        return nextIsPrivateDoctor - prevIsPrivateDoctor
      }
    }
  }

  Store.commit('inquiry/setInquirySessions', deserializationSessions.filter(filterMethod).sort(sortMethod))
}

/**
 * 设置 consultation sessions
 *
 * @export
 * @param {*} session
 */
export function setConsultationSessions(sessions) {
  const serializationSessions = $peace.NIM.mergeSessions(Store.state.consultation.sessions, sessions)
  const deserializationSessions = peace.service.IM.deSerializationSessions(serializationSessions)

  // 过滤 [等待会诊] / [会诊中] 数据
  const filterMethod = session => {
    if (session.scene === 'team' && session.content) {
      if (
        session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.等待会诊 ||
        session.content.consultInfo.consultStatus === peace.type.CONSULTATION.CONSULTATION_STATUS.会诊中
      ) {
        return true
      }
    }

    return false
  }

  // 排序规则:
  // 1. 按照会诊状态排序
  // 2. 按照会诊时间排序
  const sortMethod = (prev, next) => {
    const prevStatus = prev.content.consultInfo.consultStatus
    const nextStatus = next.content.consultInfo.consultStatus
    const prevTime = new Date(prev.content.consultInfo.expectOverTime).getTime()
    const nextTime = new Date(next.content.consultInfo.expectOverTime).getTime()

    if (prevStatus === nextStatus) {
      return prevTime - nextTime
    } else {
      return nextStatus - prevStatus
    }
  }

  Store.commit('consultation/setConsultationSessions', deserializationSessions.filter(filterMethod).sort(sortMethod))
}

/**
 * 设置 inquriy session
 *
 * @export
 * @param {*} session
 */
export function setInquirySession(session) {
  Store.commit('inquiry/setInquirySession', session)
}

/**
 * 设置 consultation session
 *
 * @export
 * @param {*} session
 */
export function setConsultationSession(session) {
  Store.commit('consultation/setConsultationSession', session)
}

/**
 * 重置 inquiry session
 *
 * @export
 * @param {*} session
 */
export function resetInquirySession() {
  Store.commit('inquiry/resetInquirySession')
}

/**
 * 重置 consultation session
 *
 * @export
 * @param {*} session
 */
export function resetConsultationSession() {
  Store.commit('consultation/resetConsultationSession')
}

/**
 * 设置 inquriy session messages
 *
 * @export
 * @param {*} message
 */
export function setInquirySessionMessages(messages) {
  const serializationMessages = $peace.NIM.mergeMsgs(Store.state.inquiry.sessionMessages, messages)
  const deserializationMessages = peace.service.IM.deSerializationMessages(serializationMessages)

  Store.commit('inquiry/setInquirySessionMessages', deserializationMessages)
}

/**
 * 设置 consultation session messages
 *
 * @export
 * @param {*} message
 */
export function setConsultationSessionMessages(messages) {
  const serializationMessages = $peace.NIM.mergeMsgs(Store.state.consultation.sessionMessages, messages)
  const deserializationMessages = peace.service.IM.deSerializationMessages(serializationMessages)

  Store.commit('consultation/setConsultationSessionMessages', deserializationMessages)
}

/**
 * 重置 inquriy session messages
 *
 * @export
 */
export function resetInquirySessionMessages() {
  Store.commit('inquiry/resetInquirySessionMessages')
}

/**
 * 重置 consultation session messages
 *
 * @export
 */
export function resetConsultationSessionMessages() {
  Store.commit('consultation/resetConsultationSessionMessages')
}

/**
 * 获取 inquiry sessions 最新状态
 *
 * @export
 * @param { Array, Object } sessions
 */
export function getInquirySessionsStatus(sessions) {
  if (!Array.isArray(sessions)) {
    sessions = [sessions]
  }

  sessions = sessions.filter(session => session.scene === 'p2p')

  const params = {
    sessionIdList: sessions.map(item => item.id),
    doctorId: Store.state.user.userInfo.list.docInfo.doctor_id
  }

  return peace.service.inquiry.getList(params).then(res => {
    return res.data.list
  })
}

/**
 * 获取 consultation sessions 最新状态
 *
 * @export
 * @param { Array, Object } sessions
 */
export function getConsultationSessionsStatus(sessions) {
  if (!Array.isArray(sessions)) {
    sessions = [sessions]
  }

  sessions = sessions.filter(session => session.scene === 'team')

  const params = {
    teamIdList: sessions.map(item => item.id.replace('team-', ''))
  }

  return peace.service.consult.getInfoByTeamId(params).then(res => {
    return res.data.list
  })
}

/**
 * 设置 inquriy sessions 最新状态
 *
 * 用于 onSession 初始化
 *
 * @export
 * @param {*} sessions 原始的 sessions
 * @param {*} sessionsStatus 存在状态的 sessions
 * @returns
 */
export function setInquirySessionsStatus(sessions, sessionsStatus) {
  sessions.forEach(session => {
    if (session.scene === 'p2p') {
      const currentSessionStatus = sessionsStatus.find(item => item.sessionId === session.id || item.id === session.id)
      session.content = currentSessionStatus
    }
  })

  sessions = sessions.filter(session => session.content)

  return sessions
}

/**
 * 设置 consultation sessions 最新状态
 *
 * 用于 onSession 初始化
 *
 * @export
 * @param {*} sessions 原始的 sessions
 * @param {*} sessionsStatus 存在状态的 sessions
 * @returns
 */
export function setConsultationSessionsStatus(sessions, sessionsStatus) {
  sessions.forEach(session => {
    if (session.scene === 'team') {
      const currentSessionStatus = sessionsStatus.find(item => item.teamId === session.id.replace('team-', '') || item.id === session.id.replace('team-', ''))
      session.content = currentSessionStatus
    }
  })

  sessions = sessions.filter(session => session.content)

  return sessions
}

/**
 * 设置 inquiry sessions 最新状态
 *
 * 用于 onUpdateSession 存在状态更新
 *
 * @export
 * @param {*} sessionWithStatus 存在状态的 session
 * @returns
 */
export function setInquirySessionStatus(sessionWithStatus) {
  // 合并当前 session with status 到 store
  Store.state.inquiry.sessions = $peace.NIM.mergeSessions(Store.state.inquiry.sessions, sessionWithStatus)

  // 反序列化当前 session with status
  sessionWithStatus = peace.service.IM.deSerializationSessions(sessionWithStatus)[0]

  // 将 session with status 更新到 session
  const currentSession = Store.state.inquiry.sessions.find(session => session.id === sessionWithStatus.id)
  currentSession.content = sessionWithStatus.lastMsg.content.data

  // 过滤无效 session
  Store.state.inquiry.sessions = Store.state.inquiry.sessions.filter(session => session.content)

  return Store.state.inquiry.sessions
}

/**
 * 设置 consultation sessions 最新状态
 *
 * 用于 onUpdateSession 存在状态更新
 *
 * @export
 * @param {*} sessionWithStatus 存在状态的 session
 * @returns
 */
export function setConsultationSessionStatus(sessionWithStatus) {
  // 合并当前 session with status 到 store
  Store.state.consultation.sessions = $peace.NIM.mergeSessions(Store.state.consultation.sessions, sessionWithStatus)

  // 反序列化当前 session with status
  sessionWithStatus = peace.service.IM.deSerializationSessions(sessionWithStatus)[0]

  // 将 session with status 更新到 session
  const currentSession = Store.state.consultation.sessions.find(session => session.id === sessionWithStatus.id)
  currentSession.content = sessionWithStatus.lastMsg.content.data

  // 过滤无效 session
  Store.state.consultation.sessions = Store.state.consultation.sessions.filter(session => session.content)

  return Store.state.consultation.sessions
}

/**
 * 反序列化 sessions
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 sessions, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} sessions
 * @returns
 */
export function deSerializationSessions(sessions) {
  if (!Array.isArray(sessions)) {
    sessions = [sessions]
  }

  sessions.forEach(session => {
    if (session.lastMsg.custom && !(session.lastMsg.custom instanceof Object)) {
      session.lastMsg.custom = JSON.parse(session.lastMsg.custom)
    }

    if (session.lastMsg.content && !(session.lastMsg.content instanceof Object)) {
      session.lastMsg.content = JSON.parse(session.lastMsg.content)
    }
  })

  return sessions
}

/**
 * 反序列化 message
 * 对话消息的扩展信息, 都以 JSON 字符串的形式, 存储在消息体上
 * 反序列化 sessions, 有助于显示数据和进行类型判断
 *
 * @export
 * @param {*} sessions
 * @returns
 */
export function deSerializationMessages(messages) {
  messages.forEach(message => {
    if (message.custom && !(message.custom instanceof Object)) {
      message.custom = JSON.parse(message.custom)
    }

    if (message.content && !(message.content instanceof Object)) {
      message.content = JSON.parse(message.content)
    }
  })

  return messages
}

export default {
  initNIM,
  initWebRTC,
  onConnect,
  onDisConnect,
  onError,
  onWillReconnect,

  /** 初始化完成后, 收到会话列表的回调 */
  onSessions,
  /** 初始化完成后, 收到会话更新的回调 */
  onUpdateSession,

  /** 初始化完成后, 收到消息的回调 */
  onMsg,

  /** 获取 inquiry sessions 最新状态 */
  getInquirySessionsStatus,
  /** 设置 inquiry sessions 最新状态, 用于 onSession 初始化 */
  setInquirySessionsStatus,
  /** 设置 inquiry session 最新状态 , 用于 onUpdateSession 存在状态更新 */
  setInquirySessionStatus,
  /** 设置 inquiry sessions */
  setInquirySessions,
  /** 设置 inquiry session */
  setInquirySession,
  /** 重置 inquiry session */
  resetInquirySession,
  /** 设置 inquiry session messages */
  setInquirySessionMessages,
  /** 重置 inquiry session messages */
  resetInquirySessionMessages,

  /** 获取 consultation sessions 最新状态 */
  getConsultationSessionsStatus,
  /** 设置 consultation sessions 最新状态, 用于 onSession 初始化 */
  setConsultationSessionsStatus,
  /** 设置 consultation session 最新状态 , 用于 onUpdateSession 存在状态更新 */
  setConsultationSessionStatus,
  /** 设置 consultation sessions */
  setConsultationSessions,
  /** 设置 consultation session */
  setConsultationSession,
  /** 重置 consultation session */
  resetConsultationSession,
  /** 设置 consultation session */
  setConsultationSessionMessages,
  /** 重置 consultation session */
  resetConsultationSessionMessages,

  /** 反序列化 sessions */
  deSerializationSessions,
  /** 反序列化 session messages */
  deSerializationMessages
}
