/*
 * @Author: PengZhen 
 * @Date: 2019-04-16 09:16:09 
 * @Description: 我的诊室 - 我的问诊
 */

<template>
  <div class="clinic">
    <!-- 视频问诊 -->
    <chat-video></chat-video>

    <!-- 会话列表 -->
    <chat-sessions class="left" v-if="chat.sessions"></chat-sessions>

    <!-- 消息列表 -->
    <chat-session class="center" v-if="chat.session"></chat-session>

    <!-- 患者详情 -->
    <chat-patient class="right" v-if="chat.session"></chat-patient>
  </div>
</template> 

<script>
import { mapState, mapActions } from 'vuex'

import ChatVideo from './ChatVideo'

import ChatSessions from './ChatSessions'
import ChatSession from './ChatSession'
import ChatPatient from './ChatPatient'

export default {
  components: {
    ChatVideo,

    ChatSessions,
    ChatSession,
    ChatPatient
  },

  computed: {
    ...mapState(['chat'])
  },

  methods: {
    ...mapActions('chat', ['clearSession', 'initNIM', 'initWebRTC'])
  },

  // 初始化 IM
  created() {
    this.initNIM()
    this.initWebRTC()
  },

  // 销毁 IM
  destroyed() {
    this.clearSession()
  }
}
</script>

<style lang="scss" scoped>
.clinic {
  margin: 0 !important;
  padding: 0 !important;

  display: flex;

  .left,
  .right {
    width: 230px;

    border: 1px solid #efefef;
  }

  .center {
    flex: 1;

    border: 1px solid #efefef;
    border-left: none;
    border-right: none;
  }
}
</style>
