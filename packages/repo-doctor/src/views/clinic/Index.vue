/*
 * @Author: PengZhen 
 * @Date: 2019-04-16 09:16:09 
 * @Description: 我的诊室
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-20 18:11:09
 */

<template>
  <div class="clinic layout">
    <chat-sessions :sessions="sessions" class="layout-left" ref="ChatSessions"></chat-sessions>
    <chat-session :session="session" @clear="clearSession" class="layout-center" ref="ChatSession"></chat-session>
    <chat-patient :session="session" class="layout-right" ref="ChatPatient"></chat-patient>
  </div>
</template>

<script>
import SDK from './../../../public/static/NIM_Web_SDK_v6.2.0/NIM_Web_SDK_v6.2.0'

import { state } from './util'

import ChatSessions from './ChatSessions'
import ChatSession from './ChatSession'
import ChatPatient from './ChatPatient'

export default {
  components: {
    // 会话列表
    ChatSessions,

    // 当前聊天
    ChatSession,

    // 当前患者
    ChatPatient
  },

  data() {
    return {
      state,

      // 会话列表
      sessions: undefined,

      // 当前会话
      session: undefined
    }
  },

  created() {
    this.initSDK()
  },

  destroyed() {
    this.destroySDK()
  },

  methods: {
    // 加载 NIM SDK
    initSDK() {
      $peace.NIM = SDK.NIM.getInstance({
        appKey: $peace.config.nim.appKey,
        account: $peace.cache.get('USER').list.registerInfo.user_id,
        token: $peace.cache.get('USER').list.registerInfo.token,

        // 系统
        onconnect: this.onConnect,
        onerror: this.onError,
        ondisconnect: this.ondisconnect,

        // 会话
        onsessions: this.onSessions,
        onupdatesession: this.onUpdateSession,

        // 消息
        onmsg: this.onMsg
      })
    },

    // 销毁 NIM SDK
    destroySDK() {
      $peace.NIM.destroy({
        done: function(err) {
          console.log('实例清除', err)
        }
      })
    },

    onConnect() {
      console.log('SDK 连接成功')
    },
    ondisconnect() {
      console.log('SDK 断开连接')
    },
    onError(error) {
      console.log('SDK 连接失败', error)
    },

    onSessions(sessions) {
      console.log('收到会话列表', sessions)

      this.sessions = $peace.NIM.mergeSessions(this.sessions, sessions)
    },
    onUpdateSession(session) {
      console.log('收到会话更新', session)

      // 收到会话更新时, 更新会话列表
      this.sessions = $peace.NIM.mergeSessions(this.sessions, session)
    },

    onMsg(msg) {
      console.log('收到消息', msg.scene, msg.type, msg)

      // 收到消息时, 更新当前消息
      this.$refs.ChatSession.updateMsgHistory(msg)

      // 验证是否退诊、转诊等问诊已结束状态
      if (msg.type === state.msgType['自定义消息']) {
        const tempMsg = $peace.util.clone(msg)

        tempMsg.custom = JSON.parse(tempMsg.custom)

        if (tempMsg.custom.ext.talkState === this.state.talkState['退诊'] || tempMsg.custom.ext.talkState === this.state.talkState['结束']) {
          this.clearSession()
        }
      }
    },

    clearSession() {
      this.session = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  padding: 0 !important;

  display: flex;

  .layout-left,
  .layout-right {
    width: 214px;
    height: 100%;
    border: 1px solid #efefef;
  }

  .layout-center {
    border: 1px solid #efefef;
    border-left: none;
    border-right: none;
    flex: 1;
  }
}
</style>
