/*
 * @Author: PengZhen 
 * @Date: 2019-04-16 09:16:09 
 * @Description: 我的诊室
 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-05-06 11:21:06
 */

<template>
  <div class="clinic">
    <!-- 会话列表 -->
    <chat-sessions class="left"></chat-sessions>

    <!-- 消息列表 -->
    <chat-session class="center"></chat-session>

    <!-- 患者详情 -->
    <chat-patient class="right"></chat-patient>
  </div>
</template> 

<script>
import ChatSessions from './ChatSessions'
import ChatSession from './ChatSession'
import ChatPatient from './ChatPatient'

export default {
  components: {
    ChatSessions,
    ChatSession,
    ChatPatient
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
    width: 214px;

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
