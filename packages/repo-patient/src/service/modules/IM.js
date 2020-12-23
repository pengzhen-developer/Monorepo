import peace from '@src/library'

import Store from '@src/store'

import NIM from '/public/static/IM/NIM_Web_NIM_v6.5.5'
// import WebRTC from '/public/static/IM/NIM_Web_WebRTC_v6.5.5'
// NIM.use(WebRTC)

/**
 * 获取用户下的im账号
 *  @export
 *  @returns
 */
export function getImlist() {
  const getImlist = 'client/v1/Patient/getImlist'

  return peace.http.post(getImlist)
}

/**
 * 初始化 IM
 *
 * @export
 * @returns
 */
export function initNIMS(info) {
  $peace.NIMS = {}
  if (info && info.type == 'delete') {
    $peace.NIMS[info.accid].im.disconnect()
    delete $peace.NIMS[info.accid]
    return
  }

  peace.service.IM.getImlist().then((res) => {
    let list = res.data

    list.map((item, index) => {
      if ($peace.NIMS[item.accid] && $peace.NIMS[item.accid].im) {
        if (!$peace.NIMS[item.accid].im.isConnected()) {
          $peace.NIMS[item.accid].im.connect()
        }
      } else {
        $peace.NIMS[item.accid] = {
          im: peace.service.IM.initNIM(item, index),
          sessions: []
        }
      }
    })
    Store.commit('inquiry/setInquirySessionsFamily', $peace.NIMS)

    // 更新服务提醒
    Store.dispatch('inquiry/getServiceRemind')

    return $peace.NIMS
  })
}
export function initNIM(args) {
  const appKey = peace.config.NIM.key

  const account = args && args.accid
  const token = args && args.imToken
  const db = false
  let nim = null
  const options = {
    onconnect: peace.service.IM.onConnect,
    onerror: peace.service.IM.onError,
    ondisconnect: peace.service.IM.onDisConnect,
    onwillreconnect: peace.service.IM.onWillReconnect,

    // 会话
    onsessions: peace.service.IM.onSessions,
    onupdatesession: peace.service.IM.onUpdateSession,

    // 消息
    onmsg: peace.service.IM.onMsg,

    // 系统通知
    oncustomsysmsg: peace.service.IM.onSysmsg
  }
  if (!$peace.NIMS[account]) {
    // 初始化 IM
    nim = NIM.getInstance({
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
    $peace.NIMS[account].disconnect()
    $peace.NIMS[account].setOptions({ appKey, account, token })
    $peace.NIMS[account].connect()
  }
  return nim
}

/**
 * 主动销毁所有IM实例
 *
 * @export
 * @param {*} 回调函数
 * @returns
 */
export function destroyNIMS() {
  for (const key in $peace.NIMS) {
    if (Object.hasOwnProperty.call($peace.NIMS, key)) {
      const element = $peace.NIMS[key]
      element.im.destroy()
      delete $peace.NIMS[key]
    }
  }
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

  // $peace.WebRTC = WebRTC.getInstance({
  //   nim: $peace.NIM
  // })
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
    case 302:
    case 417:
    case 'kicked':
      // 提示鉴权失败消息
      peace.util.warning('多地登录，请注意您的账号安全')

      // 清空登录缓存
      peace.cache.remove(peace.type.USER.INFO)
      peace.cache.remove(peace.type.SYSTEM.WX_AUTH_CODE)

      // 登录被 T 出，跳转错误页
      $peace.$router.replace(peace.config.system.errorPage)
      // window.location.reload()
      break
    case 'logout':
      //删除家人，主动断联IM
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

  peace.service.IM.getInquirySessionsStatus(sessions, this.account).then((inquirySessionsStatus) => {
    const sessionsStatus = peace.service.IM.setInquirySessionsStatus(sessions, inquirySessionsStatus)
    peace.service.IM.setInquirySessions(sessionsStatus, this.account)
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
      Store.state.inquiry.session &&
      Store.state.inquiry.session.id === session.id &&
      this.account === Store.state.inquiry.session.content.patientInfo.familyId
    ) {
      session.unread = 0
    }

    // 处理 inquiry
    if (session.scene === 'p2p') {
      // 当前 session update 存在状态更新, 更新 sessions 为最新状态
      // 因 resetSessionUnread 重置会话未读数，会触发 onUpdateSession 回调，使用 typeof session.lastMsg.content 验证是否已经更新状态
      if (session.lastMsg.type === 'custom' && typeof session.lastMsg.content === 'string') {
        peace.service.IM.setInquirySessionStatus(session, this.account)
      }

      // 将新 sessions 更新到 sessions store
      peace.service.IM.setInquirySessions(session, this.account)

      // 将新 session 更新到 session store
      // 将新 message 更新到 sessionMessages store

      let currrentSession = Store.state.inquiry.sessionsFamily[this.account].sessions
      if (
        Store.state.inquiry.session &&
        Store.state.inquiry.session.id === session.id &&
        this.account === Store.state.inquiry.session.content.patientInfo.familyId
      ) {
        if (currrentSession && currrentSession.length > 0) {
          peace.service.IM.setInquirySession(currrentSession.find((temp) => temp.id === session.id))
          peace.service.IM.setInquirySessionMessages(session.lastMsg, this.account)
        } else {
          peace.service.IM.resetInquirySession()
          peace.service.IM.resetInquirySessionMessages()
        }
      }
    }

    // 更新服务提醒
    Store.dispatch('inquiry/getServiceRemind')
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
  // 更新服务提醒
  Store.dispatch('inquiry/getServiceRemind')
}

/**
 *
 *
 * @export
 * @param {*} 系统消息
 */
export function onSysmsg(message) {
  console.warn('【 IM 】【 onSysmsg 】', new Date(), message)

  // 更新服务提醒
  Store.dispatch('inquiry/getServiceRemind')

  let href = window.location.href
  let tag = JSON.parse(message.content).tag
  if (
    (new RegExp('setting/userConsultList').test(href) && tag == 'inquiry') ||
    (new RegExp('setting/userConsultDetail').test(href) && tag == 'inquiry') ||
    (new RegExp('components/theRecipeList').test(href) && tag == 'purchaseDrug') ||
    (new RegExp('order/userDrugDetail').test(href) && tag == 'purchaseDrug') ||
    (new RegExp('setting/order/userOrderList').test(href) && tag == 'register') ||
    (new RegExp('setting/order/userOrderList').test(href) && tag == 'inquiry') ||
    (new RegExp('setting/order/userOrderDetail').test(href) && tag == 'register')
  ) {
    window.location.reload()
  }
  //Store.dispatch('appointMent/getList');
}

/**
 * 设置 inquiry sessions
 *
 * @export
 * @param {*} session
 */
export function setInquirySessions(sessions, account) {
  const currrentSession = $peace.NIMS[account].sessions
  const serializationSessions = $peace.NIMS[account].im.mergeSessions(currrentSession, sessions)
  const deserializationSessions = peace.service.IM.deSerializationSessions(serializationSessions)

  // 过滤 [待接诊] 与 [已取消] 与 [医生未接诊直接退诊] 与 [医生未接诊系统直接退诊（超时）] 数据
  const filterMethod = (session) => {
    if (session.scene === 'p2p' && session.content && session.content.inquiryInfo) {
      if (
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.待接诊 ||
        session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.已取消 ||
        (session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.已退诊 && session.content.inquiryInfo.quitStatus === 1) ||
        (session.content.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.已退诊 && session.content.inquiryInfo.quitStatus === 2)
      ) {
        return false
      }
    }

    return true
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
  $peace.NIMS[account].sessions = deserializationSessions.filter(filterMethod).sort(sortMethod)
  Store.commit('inquiry/setInquirySessionsFamily', $peace.NIMS)
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
 * 重置 inquiry session
 *
 * @export
 * @param {*} session
 */
export function resetInquirySession() {
  Store.commit('inquiry/resetInquirySession')
}

/**
 * 设置 inquriy session messages
 *
 * @export
 * @param {*} message
 */
export function setInquirySessionMessages(messages, account) {
  const serializationMessages = $peace.NIMS[account].im.mergeMsgs(Store.state.inquiry.sessionMessages, messages)
  const deserializationMessages = peace.service.IM.deSerializationMessages(serializationMessages)

  Store.commit('inquiry/setInquirySessionMessages', deserializationMessages)
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
 * 获取 inquiry sessions 最新状态
 *
 * @export
 * @param { Array, Object } sessions
 */
export function getInquirySessionsStatus(sessions, familyId) {
  if (!Array.isArray(sessions)) {
    sessions = [sessions]
  }

  sessions = sessions.filter((session) => session.scene === 'p2p')

  const params = {
    sessionIdList: sessions.map((item) => item.id),
    familyId: familyId
  }

  return peace.service.inquiry.getList(params).then((res) => {
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
  sessions.forEach((session) => {
    if (session.scene === 'p2p') {
      const rStatus = sessionsStatus.find((item) => item.sessionId === session.id || item.id === session.id)
      session.content = rStatus
    }
  })

  sessions = sessions.filter((session) => session.content)

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
export function setInquirySessionStatus(sessionWithStatus, account) {
  // 合并当前 session with status 到 store
  Store.state.inquiry.sessionsFamily[account].sessions = Store.state.inquiry.sessionsFamily[account].im.mergeSessions(
    Store.state.inquiry.sessionsFamily[account].sessions,
    sessionWithStatus
  )

  // 反序列化当前 session with status
  sessionWithStatus = peace.service.IM.deSerializationSessions(sessionWithStatus)[0]

  // 将 session with status 更新到 session
  const currrentSession = Store.state.inquiry.sessionsFamily[account].sessions.find((msg) => msg.id === sessionWithStatus.id)
  currrentSession.content = sessionWithStatus.lastMsg.content.data

  // 过滤无效 session

  Store.state.inquiry.sessionsFamily[account].sessions = Store.state.inquiry.sessionsFamily[account].sessions.filter((msg) => msg.content)

  return Store.state.inquiry.sessionsFamily[account].sessions
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
  sessions.forEach((session) => {
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

export default {
  getImlist,
  initNIM,
  initNIMS,
  destroyNIMS,
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
  onSysmsg,
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

  /** 反序列化 sessions */
  deSerializationSessions,
  /** 反序列化 session messages */
  deSerializationMessages
}
