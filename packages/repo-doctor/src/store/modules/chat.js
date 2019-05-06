import SDK from './../../../public/static/NIM_Web_SDK_v6.2.0/NIM_Web_SDK_v6.2.0'

import { STATE, DeserializationSessions, DeserializationSessionMsgs } from './../../views/clinic/util'
import { isArray } from 'util'

const sdkUtil = {
  /**
   * SDK 连接成功
   *
   * @param {*} state
   */
  onConnect() {
    console.log(new Date().formatTime() + ': ' + '连接成功')
  },

  /**
   * SDK 连接失败
   *
   * @param {*} state
   * @param {*} error
   */
  onError(error) {
    console.log(new Date().formatTime() + ': ' + '连接失败', error)
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
      $peace.$store.commit('chat/unshiftSessionMsg', msg)

      // 验证是否退诊或结束
      // 问诊为已退针或者已结束，应该从问诊列表删除。
      const lastMsg = $peace.$store.chat.sessionMsgs.msgs[0]
      if (lastMsg.type === STATE.msgType['自定义消息']) {
        if (lastMsg.custom.ext.talkState === STATE.talkState['退诊'] || lastMsg.custom.ext.talkState === STATE.talkState['结束']) {
          $peace.$store.commit('chat/clearSession')
        }
      }
    }
  }
}

const state = {
  // 会话列表
  sessions: undefined,

  // 当前会话
  session: undefined,

  // 当前会话消息列表
  sessionMsgs: undefined
}

const actions = {
  initSDK() {
    const appKey = $peace.config.nim[process.env.VUE_APP_MODE || process.env.NODE_ENV].appKey
    const account = $peace.cache.get('USER').list.registerInfo.user_id
    const token = $peace.cache.get('USER').list.registerInfo.token

    $peace.NIM = SDK.NIM.getInstance({
      appKey,
      account,
      token,

      db: false,

      // 系统
      onconnect: sdkUtil.onConnect,
      onerror: sdkUtil.onError,
      ondisconnect: sdkUtil.onDisconnect,
      onwillreconnect: sdkUtil.onWillReconnect,

      // 会话
      onsessions: sdkUtil.onSessions,
      onupdatesession: sdkUtil.onUpdateSession,

      // 消息
      onmsg: sdkUtil.onMsg
    })

    return $peace.NIM
  },

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
          $peace.util.alert(error.message)
          return
        }

        msgsObj.msgs = DeserializationSessionMsgs(msgsObj.msgs)
        commit('setSessionMsg', msgsObj)
      }
    })
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
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
