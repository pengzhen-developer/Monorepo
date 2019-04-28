/*
 * @Author: PengZhen 
 * @Date: 2019-04-16 09:16:09 
 * @Description: 我的诊室
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-04-26 19:31:29
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
      const appKey = $peace.config.nim[process.env.VUE_APP_MODE || process.env.NODE_ENV].appKey
      $peace.NIM = SDK.NIM.getInstance({
        appKey: appKey,
        account: $peace.cache.get('USER').list.registerInfo.user_id,
        token: $peace.cache.get('USER').list.registerInfo.token,

        // 系统
        onconnect: this.onConnect,
        onerror: this.onError,
        ondisconnect: this.ondisconnect,
        onwillreconnect: this.onWillReconnect,

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
    ondisconnect(error) {
      console.log('SDK 断开连接')

      if (error) {
        console.log(error)
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
    onWillReconnect(obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连')
      console.log(obj)

      $peace.util.warning('网络异常，即将重连...')
      $peace.util.warning(`${obj.duration / 1000} 秒后将进行第 ${obj.retryCount} 次重连`)
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
